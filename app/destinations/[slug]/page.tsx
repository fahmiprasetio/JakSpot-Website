"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "../../components/Navbar";
import destinations, { getDestinationBySlug } from "../../data/destinations";
import type { DestinationDetail } from "../../data/destinations";

const Footer = dynamic(() => import("../../components/Footer"), { ssr: true });

export default function DestinationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const destination = getDestinationBySlug(slug);

  const [activeImage, setActiveImage] = useState(0);
  const [mapLoaded, setMapLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

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
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    marginBottom: "20px",
                    color: "var(--foreground)",
                  }}
                >
                  Tentang Tempat Ini
                </h2>
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
