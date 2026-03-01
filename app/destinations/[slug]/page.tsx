"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "../../components/Navbar";
import destinations, { getDestinationBySlug } from "../../data/destinations";
import type { DestinationDetail } from "../../data/destinations";
import { useFavorites } from "../../context/FavoritesContext";
import { useAuth } from "../../context/AuthContext";

const Footer = dynamic(() => import("../../components/Footer"), { ssr: true });

export default function DestinationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const destination = getDestinationBySlug(slug);

  const [activeImage, setActiveImage] = useState(0);
  const [mapLoaded, setMapLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const favorited = destination ? isFavorite(destination.slug) : false;

  // Review state
  interface Review { id: string; userId: string; userName: string; destinationSlug: string; rating: number; comment: string; createdAt: string; }
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState('');

  // Edit review state
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState('');
  const [editLoading, setEditLoading] = useState(false);

  const startEditReview = (rev: Review) => {
    setEditingReviewId(rev.id);
    setEditRating(rev.rating);
    setEditComment(rev.comment);
  };

  const cancelEdit = () => {
    setEditingReviewId(null);
    setEditRating(5);
    setEditComment('');
  };

  const submitEditReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReviewId) return;
    setEditLoading(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingReviewId, rating: editRating, comment: editComment }),
      });
      const data = await res.json();
      if (res.ok) {
        setReviews(prev => prev.map(r => r.id === editingReviewId ? data.review : r));
        cancelEdit();
      }
    } catch {}
    setEditLoading(false);
  };

  const deleteReview = async (id: string) => {
    if (!confirm('Yakin mau hapus review ini?')) return;
    try {
      const res = await fetch(`/api/reviews?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setReviews(prev => prev.filter(r => r.id !== id));
      }
    } catch {}
  };

  // Fetch reviews
  useEffect(() => {
    if (!slug) return;
    fetch(`/api/reviews?slug=${slug}`)
      .then(r => r.json())
      .then(data => setReviews(data.reviews || []))
      .catch(() => {});
  }, [slug]);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { window.location.href = '/signin'; return; }
    setReviewError('');
    setReviewLoading(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destinationSlug: slug, rating: reviewRating, comment: reviewComment }),
      });
      const data = await res.json();
      if (res.ok) {
        setReviews(prev => [data.review, ...prev]);
        setReviewComment('');
        setReviewRating(5);
      } else {
        setReviewError(data.error || 'Gagal kirim review.');
      }
    } catch { setReviewError('Koneksi error.'); }
    setReviewLoading(false);
  };

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [destination]);

  // Hero parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const y = window.scrollY;
        heroRef.current.style.transform = `translateY(${y * 0.35}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fallback timeout for map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!destination) {
    return (
      <>
        <Navbar variant="subpage" />
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--background)",
            padding: "40px 20px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontFamily: "var(--font-display)",
              marginBottom: "16px",
            }}
          >
            Destinasi gak ditemukan
          </h1>
          <p style={{ color: "var(--text-muted)", marginBottom: "32px" }}>
            Kayaknya lo nyasar deh. Balik ke halaman destinasi yuk.
          </p>
          <a
            href="/destinations"
            className="btn-secondary"
            style={{ textDecoration: "none" }}
          >
            Kembali ke Destinasi
          </a>
        </main>
      </>
    );
  }

  // Related destinations — same category, excluding current
  const related = destinations
    .filter(
      (d) => d.category === destination.category && d.id !== destination.id,
    )
    .slice(0, 3);

  return (
    <>
      <Navbar variant="subpage" />

      <main>
        {/* ====== HERO IMAGE ====== */}
        <section
          style={{
            position: "relative",
            height: "65vh",
            minHeight: "420px",
            overflow: "hidden",
          }}
        >
          <div
            ref={heroRef}
            style={{
              position: "absolute",
              inset: "-20% 0 0 0",
              height: "140%",
            }}
          >
            <img
              src={destination.gallery[activeImage]}
              alt={destination.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 0.4s ease",
              }}
            />
          </div>

          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, var(--background) 0%, rgba(10,10,15,0.4) 40%, rgba(10,10,15,0.15) 70%, transparent 100%)",
            }}
          />

          {/* Back button */}
          <a
            href="/destinations"
            className="reveal"
            style={{
              position: "absolute",
              top: "90px",
              left: "clamp(20px, 5vw, 60px)",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "white",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 500,
              padding: "10px 18px",
              borderRadius: "50px",
              background: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,107,53,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,0.35)";
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Semua Destinasi
          </a>



          {/* Hero title overlay */}
          <div
            className="reveal"
            style={{
              position: "absolute",
              bottom: "50px",
              left: "clamp(20px, 5vw, 60px)",
              right: "clamp(20px, 5vw, 60px)",
              zIndex: 2,
            }}
          >
            <span
              className="glass"
              style={{
                display: "inline-block",
                padding: "8px 18px",
                borderRadius: "50px",
                fontSize: "0.8rem",
                color: "white",
                marginBottom: "16px",
              }}
            >
              {destination.category}
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                fontWeight: 700,
                color: "white",
                lineHeight: 1.1,
                marginBottom: "12px",
              }}
            >
              {destination.name}
            </h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "rgba(255,255,255,0.8)",
                fontSize: "0.95rem",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {destination.address}
            </div>
          </div>
        </section>

        {/* ====== CONTENT ====== */}
        <section
          style={{
            background: "var(--background)",
            padding: "60px 5% 80px",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 380px",
              gap: "60px",
              alignItems: "start",
            }}
          >
            {/* === LEFT COLUMN === */}
            <div>
              {/* Description */}
              <div className="reveal">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.8rem",
                      fontWeight: 700,
                      margin: 0,
                      color: "var(--foreground)",
                    }}
                  >
                    Tentang Tempat Ini
                  </h2>
                  <button
                    onClick={() => toggleFavorite(destination.slug)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: favorited ? 'white' : 'var(--foreground)',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      padding: '10px 20px',
                      borderRadius: '50px',
                      background: favorited ? 'rgba(255,59,48,0.85)' : 'var(--dark-surface-2)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      if (!favorited) e.currentTarget.style.background = 'rgba(255,59,48,0.15)';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      if (!favorited) e.currentTarget.style.background = 'var(--dark-surface-2)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={favorited ? 'white' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    {favorited ? 'Tersimpan' : 'Simpan'}
                  </button>
                </div>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "1.05rem",
                    lineHeight: 1.85,
                    marginBottom: "40px",
                  }}
                >
                  {destination.longDescription}
                </p>
              </div>

              {/* Highlights */}
              <div className="reveal" style={{ marginBottom: "50px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    marginBottom: "20px",
                    color: "var(--foreground)",
                  }}
                >
                  Yang Bikin Spesial
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  {destination.highlights.map((h, i) => (
                    <span
                      key={i}
                      style={{
                        padding: "10px 20px",
                        borderRadius: "50px",
                        background: "var(--dark-surface-2)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        color: "var(--foreground)",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              {destination.gallery.length > 1 && (
                <div className="reveal" style={{ marginBottom: "50px" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.3rem",
                      fontWeight: 600,
                      marginBottom: "20px",
                      color: "var(--foreground)",
                    }}
                  >
                    Galeri
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(180px, 1fr))",
                      gap: "12px",
                    }}
                  >
                    {destination.gallery.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => setActiveImage(i)}
                        style={{
                          position: "relative",
                          borderRadius: "12px",
                          overflow: "hidden",
                          aspectRatio: "4/3",
                          cursor: "pointer",
                          border:
                            activeImage === i
                              ? "2px solid var(--primary)"
                              : "2px solid transparent",
                          transition: "all 0.3s ease",
                          opacity: activeImage === i ? 1 : 0.6,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = "1";
                        }}
                        onMouseLeave={(e) => {
                          if (activeImage !== i)
                            e.currentTarget.style.opacity = "0.6";
                        }}
                      >
                        <img
                          src={img}
                          alt={`${destination.name} ${i + 1}`}
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="reveal" style={{ marginBottom: "50px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    marginBottom: "20px",
                    color: "var(--foreground)",
                  }}
                >
                  Tips dari Kita
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {destination.tips.map((tip, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: "14px",
                        alignItems: "flex-start",
                        padding: "16px 20px",
                        background: "var(--dark-surface)",
                        borderRadius: "14px",
                        border: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <span
                        style={{
                          flexShrink: 0,
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          background: "var(--gradient-1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "white",
                        }}
                      >
                        {i + 1}
                      </span>
                      <p
                        style={{
                          color: "var(--text-muted)",
                          fontSize: "0.95rem",
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="reveal">
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    marginBottom: "20px",
                    color: "var(--foreground)",
                  }}
                >
                  Lokasi
                </h3>
                <div
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.06)",
                    position: "relative",
                    aspectRatio: "16/9",
                    background: "var(--dark-surface)",
                  }}
                >
                  {!mapLoaded && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--text-muted)",
                        fontSize: "0.9rem",
                        zIndex: 1,
                      }}
                    >
                      Memuat peta...
                    </div>
                  )}
                  <iframe
                    title={`Peta ${destination.name}`}
                    src={`https://maps.google.com/maps?q=${destination.coords.lat},${destination.coords.lng}&z=16&output=embed`}
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      position: "relative",
                      zIndex: 2,
                      filter: "brightness(0.85) contrast(1.1) invert(0.92) hue-rotate(180deg)",
                      opacity: mapLoaded ? 1 : 0,
                      transition: "opacity 0.4s ease",
                    }}
                    loading="lazy"
                    onLoad={() => setMapLoaded(true)}
                  />
                </div>
                <a
                  href={`https://www.google.com/maps?q=${destination.coords.lat},${destination.coords.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "14px",
                    color: "var(--primary)",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.7";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Buka di Google Maps
                </a>
              </div>
            </div>

            {/* === RIGHT COLUMN — Info Card === */}
            <div style={{ position: "sticky", top: "100px" }}>
              <div
                className="reveal"
                style={{
                  background: "var(--dark-surface)",
                  borderRadius: "20px",
                  padding: "32px",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    marginBottom: "24px",
                    color: "var(--foreground)",
                  }}
                >
                  Info Penting
                </h3>

                {/* Price Range */}
                <InfoRow
                  icon={
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  }
                  label="Kisaran Harga"
                  value={destination.priceRange}
                />

                {/* Open Hours */}
                <InfoRow
                  icon={
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  }
                  label="Jam Buka"
                  value={destination.openHours}
                />

                {/* Location */}
                <InfoRow
                  icon={
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  }
                  label="Lokasi"
                  value={destination.location}
                  noBorder
                />

                {/* CTA */}
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(destination.name + " " + destination.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    width: "100%",
                    padding: "14px",
                    marginTop: "28px",
                    borderRadius: "14px",
                    background: "var(--gradient-1)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.85";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Buka di Maps
                </a>
              </div>

              {/* Share card */}
              <div
                className="reveal"
                style={{
                  background: "var(--dark-surface)",
                  borderRadius: "20px",
                  padding: "28px 32px",
                  marginTop: "20px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.85rem",
                    marginBottom: "6px",
                  }}
                >
                  Suka tempat ini?
                </p>
                <p
                  style={{
                    color: "var(--foreground)",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                  }}
                >
                  Share ke temen lo yang butuh healing 🫶
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== REVIEWS SECTION ====== */}
        <section style={{ background: 'var(--background)', padding: '0 5% 80px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal" style={{ marginBottom: '32px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700, marginBottom: '8px' }}>
                Review dari <span className="gradient-text">Pengunjung</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                {reviews.length > 0 ? `${reviews.length} review` : 'Belum ada review. Jadilah yang pertama!'}
              </p>
            </div>

            {/* Write review form */}
            <div className="reveal" style={{ background: 'var(--dark-surface-2)', borderRadius: '20px', padding: '28px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '32px' }}>
              {user ? (
                <form onSubmit={submitReview}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--gradient-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>
                      {user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tulis review lo</div>
                    </div>
                  </div>
                  {/* Star Rating */}
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} type="button" onClick={() => setReviewRating(star)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', fontSize: '1.4rem', transition: 'transform 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        {star <= reviewRating ? '⭐' : '☆'}
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Ceritain pengalaman lo di sini..."
                    required
                    rows={3}
                    style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid var(--dark-surface-3)', background: 'var(--dark-surface)', color: 'var(--foreground)', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.3s', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--dark-surface-3)'}
                  />
                  {reviewError && <p style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '8px' }}>{reviewError}</p>}
                  <button type="submit" disabled={reviewLoading} className="btn-primary" style={{ marginTop: '14px', padding: '10px 24px', fontSize: '0.85rem', fontWeight: 600, cursor: reviewLoading ? 'not-allowed' : 'pointer', opacity: reviewLoading ? 0.7 : 1 }}>
                    {reviewLoading ? 'Mengirim...' : 'Kirim Review'}
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '16px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '16px' }}>
                    Login dulu buat nulis review 🔒
                  </p>
                  <a href="/signin" style={{ display: 'inline-block', padding: '10px 24px', borderRadius: '12px', background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)', color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
                    Login
                  </a>
                </div>
              )}
            </div>

            {/* Reviews list — max 3 shown */}
            {reviews.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {reviews.slice(0, 3).map((rev) => (
                  <div key={rev.id} className="reveal" style={{ background: 'var(--dark-surface-2)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    {editingReviewId === rev.id ? (
                      /* Edit mode */
                      <form onSubmit={submitEditReview}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--gradient-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: 'white' }}>
                            {rev.userName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{rev.userName}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Mengedit review</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
                          {[1, 2, 3, 4, 5].map(star => (
                            <button key={star} type="button" onClick={() => setEditRating(star)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', fontSize: '1.2rem' }}>
                              {star <= editRating ? '⭐' : '☆'}
                            </button>
                          ))}
                        </div>
                        <textarea value={editComment} onChange={(e) => setEditComment(e.target.value)} required rows={2}
                          style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid var(--primary)', background: 'var(--dark-surface)', color: 'var(--foreground)', fontSize: '0.9rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }}
                        />
                        <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                          <button type="submit" disabled={editLoading} className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.8rem', fontWeight: 600, cursor: editLoading ? 'not-allowed' : 'pointer' }}>
                            {editLoading ? 'Menyimpan...' : 'Simpan'}
                          </button>
                          <button type="button" onClick={cancelEdit} style={{ padding: '8px 20px', fontSize: '0.8rem', fontWeight: 600, background: 'var(--dark-surface-3)', border: 'none', borderRadius: '10px', color: 'var(--text-muted)', cursor: 'pointer' }}>
                            Batal
                          </button>
                        </div>
                      </form>
                    ) : (
                      /* View mode */
                      <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: user && rev.userId === user.id ? 'var(--gradient-1)' : 'var(--dark-surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: user && rev.userId === user.id ? 'white' : 'var(--text-muted)' }}>
                            {rev.userName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{rev.userName}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontSize: '0.8rem' }}>{'⭐'.repeat(rev.rating)}</span>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                {new Date(rev.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                            </div>
                          </div>
                          {/* Edit/Delete buttons for own reviews */}
                          {user && rev.userId === user.id && (
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button onClick={() => startEditReview(rev)} title="Edit" style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.2s' }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,107,53,0.15)'; e.currentTarget.style.color = 'var(--primary)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                              </button>
                              <button onClick={() => deleteReview(rev.id)} title="Hapus" style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.2s' }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,59,48,0.15)'; e.currentTarget.style.color = '#ff3b30'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                              </button>
                            </div>
                          )}
                        </div>
                        <p style={{ color: 'var(--foreground)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                          {rev.comment}
                        </p>
                      </>
                    )}
                  </div>
                ))}

                {/* See more link */}
                {reviews.length > 3 && (
                  <div style={{ textAlign: 'center', marginTop: '8px' }}>
                    <a href={`/destinations/${slug}/reviews`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', borderRadius: '50px', background: 'var(--dark-surface-2)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, transition: 'all 0.3s ease' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,107,53,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,107,53,0.3)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--dark-surface-2)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                    >
                      Lihat Semua Review ({reviews.length})
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ====== RELATED DESTINATIONS ====== */}
        {related.length > 0 && (
          <section
            style={{
              background: "var(--dark-surface)",
              padding: "80px 5%",
            }}
          >
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <div
                className="reveal"
                style={{ textAlign: "center", marginBottom: "40px" }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    color: "var(--foreground)",
                  }}
                >
                  Spot Lain yang{" "}
                  <span className="gradient-text">Mirip Vibes-nya</span>
                </h2>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "24px",
                }}
              >
                {related.map((dest, idx) => (
                  <a
                    key={dest.id}
                    href={`/destinations/${dest.slug}`}
                    className="card destination-card reveal"
                    style={{
                      position: "relative",
                      height: "380px",
                      cursor: "pointer",
                      overflow: "hidden",
                      borderRadius: "16px",
                      textDecoration: "none",
                      transitionDelay: `${idx * 0.1}s`,
                    }}
                  >
                    <div
                      className="media-wrapper"
                      style={{
                        position: "absolute",
                        inset: 0,
                        overflow: "hidden",
                        borderRadius: "16px",
                      }}
                    >
                      <img
                        src={dest.image}
                        alt={dest.name}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.9) 10%, transparent 70%)",
                        }}
                      />
                    </div>
                    <div
                      className="content-wrapper"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "28px",
                        zIndex: 2,
                      }}
                    >
                      <span
                        className="glass"
                        style={{
                          display: "inline-block",
                          padding: "6px 14px",
                          borderRadius: "50px",
                          fontSize: "0.75rem",
                          color: "white",
                          marginBottom: "10px",
                        }}
                      >
                        {dest.category}
                      </span>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.5rem",
                          fontWeight: 700,
                          color: "white",
                          marginBottom: "6px",
                        }}
                      >
                        {dest.name}
                      </h3>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.75)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {dest.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer showNewsletter={false} />

      {/* Responsive */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        @media (max-width: 900px) {
          /* Stack layout on smaller screens */
          section > div[style*="grid-template-columns: 1fr 380px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

/* ====== Info Row sub-component ====== */
function InfoRow({
  icon,
  label,
  value,
  noBorder = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  noBorder?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "16px 0",
        borderBottom: noBorder ? "none" : "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <span style={{ color: "var(--primary)", flexShrink: 0 }}>{icon}</span>
      <div>
        <p
          style={{ color: "var(--text-muted)", fontSize: "0.8rem", margin: 0 }}
        >
          {label}
        </p>
        <p
          style={{
            color: "var(--foreground)",
            fontSize: "0.95rem",
            fontWeight: 500,
            margin: 0,
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
