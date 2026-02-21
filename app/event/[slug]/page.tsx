'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from '../../components/Navbar';
import allEvents, { getEventBySlug } from '../../data/events';
import type { EventDetail } from '../../data/events';

const Footer = dynamic(() => import('../../components/Footer'), { ssr: true });

export default function EventDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const event = getEventBySlug(slug);

  const [activeImage, setActiveImage] = useState(0);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [event]);

  // Hero parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const y = window.scrollY;
        heroRef.current.style.transform = `translateY(${y * 0.35}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!event) {
    return (
      <>
        <Navbar variant="subpage" />
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--background)',
            padding: '40px 20px',
            textAlign: 'center',
          }}
        >
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" style={{ marginBottom: '20px', opacity: 0.5 }}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <h1
            style={{
              fontSize: '2rem',
              fontFamily: 'var(--font-display)',
              marginBottom: '16px',
            }}
          >
            Event gak ditemukan
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
            Kayaknya event-nya udah lewat atau link-nya salah. Balik yuk.
          </p>
          <a
            href="/event"
            className="btn-secondary"
            style={{ textDecoration: 'none' }}
          >
            Kembali ke Event
          </a>
        </main>
      </>
    );
  }

  // Related events — same category, excluding current
  const related = allEvents
    .filter((e) => e.category === event.category && e.id !== event.id)
    .slice(0, 3);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: event.title, url });
      } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    }
  };

  return (
    <>
      <Navbar variant="subpage" />

      <main>
        {/* ====== HERO IMAGE ====== */}
        <section
          style={{
            position: 'relative',
            height: '65vh',
            minHeight: '450px',
            overflow: 'hidden',
          }}
        >
          <div
            ref={heroRef}
            style={{
              position: 'absolute',
              inset: '-50px 0 0 0',
              willChange: 'transform',
            }}
          >
            <img
              src={event.gallery[activeImage] || event.image}
              alt={event.title}
              style={{
                width: '100%',
                height: 'calc(100% + 50px)',
                objectFit: 'cover',
                transition: 'opacity 0.4s ease',
              }}
            />
          </div>

          {/* Gradient overlays */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, var(--background) 0%, rgba(10,10,15,0.4) 40%, rgba(10,10,15,0.2) 70%, rgba(10,10,15,0.4) 100%)',
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, rgba(10,10,15,0.7) 0%, transparent 60%)',
              zIndex: 1,
            }}
          />

          {/* Back button */}
          <a
            href="/event"
            style={{
              position: 'absolute',
              top: '100px',
              left: '5%',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'white',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              background: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)',
              padding: '10px 18px',
              borderRadius: '50px',
              border: '1px solid rgba(255,255,255,0.15)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--primary)';
              e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.3)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Kembali
          </a>

          {/* Hero bottom content */}
          <div
            style={{
              position: 'absolute',
              bottom: '50px',
              left: '5%',
              right: '5%',
              zIndex: 2,
              maxWidth: '700px',
            }}
          >
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span
                style={{
                  background: 'var(--gradient-1)',
                  padding: '6px 16px',
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {event.category}
              </span>
              {event.isFeatured && (
                <span
                  style={{
                    background: 'rgba(255,193,7,0.2)',
                    border: '1px solid var(--accent)',
                    padding: '6px 14px',
                    borderRadius: '50px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  Featured
                </span>
              )}
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.15,
              }}
            >
              {event.title}
            </h1>
          </div>
        </section>

        {/* ====== CONTENT AREA ====== */}
        <section
          style={{
            background: 'var(--background)',
            padding: '0 5% 80px',
            position: 'relative',
          }}
        >
          {/* Quick info bar */}
          <div
            className="reveal"
            style={{
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap',
              padding: '24px 0',
              marginBottom: '40px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'rgba(255,107,53,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Tanggal</div>
                <div style={{ color: 'white', fontSize: '0.95rem', fontWeight: 600 }}>{event.date}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'rgba(255,193,7,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Waktu</div>
                <div style={{ color: 'white', fontSize: '0.95rem', fontWeight: 600 }}>{event.time}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'rgba(41,128,185,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-light)" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Venue</div>
                <div style={{ color: 'white', fontSize: '0.95rem', fontWeight: 600 }}>{event.venue}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'rgba(255,107,53,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Tiket</div>
                <div style={{ color: 'white', fontSize: '0.95rem', fontWeight: 600 }}>{event.ticketPrice}</div>
              </div>
            </div>
          </div>

          {/* Two-column layout */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 380px',
              gap: '60px',
              maxWidth: '1300px',
              margin: '0 auto',
            }}
          >
            {/* LEFT COLUMN */}
            <div>
              {/* Description */}
              <div className="reveal">
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    marginBottom: '20px',
                    color: 'var(--foreground)',
                  }}
                >
                  Tentang Event Ini
                </h2>
                <p
                  style={{
                    color: 'var(--text-muted)',
                    lineHeight: 1.9,
                    fontSize: '1.05rem',
                  }}
                >
                  {event.longDescription}
                </p>
              </div>

              {/* Highlights */}
              <div className="reveal" style={{ marginTop: '40px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    marginBottom: '16px',
                    color: 'var(--foreground)',
                  }}
                >
                  Yang Bakal Lo Dapetin
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {event.highlights.map((h, i) => (
                    <span
                      key={i}
                      style={{
                        background: 'var(--dark-surface-2)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        padding: '10px 18px',
                        borderRadius: '50px',
                        fontSize: '0.9rem',
                        color: 'var(--foreground)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>&#9679;</span>
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lineup / Program */}
              {event.lineup && event.lineup.length > 0 && (
                <div className="reveal" style={{ marginTop: '40px' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.3rem',
                      fontWeight: 600,
                      marginBottom: '16px',
                      color: 'var(--foreground)',
                    }}
                  >
                    Lineup & Program
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {event.lineup.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          padding: '16px 20px',
                          background: 'var(--dark-surface-2)',
                          borderRadius: '14px',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            background: 'var(--gradient-1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            color: 'white',
                            flexShrink: 0,
                          }}
                        >
                          {i + 1}
                        </div>
                        <span style={{ color: 'var(--foreground)', fontSize: '0.95rem' }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {event.gallery.length > 1 && (
                <div className="reveal" style={{ marginTop: '40px' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.3rem',
                      fontWeight: 600,
                      marginBottom: '16px',
                      color: 'var(--foreground)',
                    }}
                  >
                    Gallery
                  </h3>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${Math.min(event.gallery.length, 3)}, 1fr)`,
                      gap: '12px',
                    }}
                  >
                    {event.gallery.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => setActiveImage(i)}
                        style={{
                          borderRadius: '14px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: activeImage === i ? '2px solid var(--primary)' : '2px solid transparent',
                          transition: 'all 0.3s ease',
                          aspectRatio: '16/10',
                        }}
                      >
                        <img
                          src={img}
                          alt={`${event.title} ${i + 1}`}
                          loading="lazy"
                          decoding="async"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="reveal" style={{ marginTop: '40px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    marginBottom: '16px',
                    color: 'var(--foreground)',
                  }}
                >
                  Tips dari Kita
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {event.tips.map((tip, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        gap: '14px',
                        alignItems: 'flex-start',
                        padding: '16px 20px',
                        background: 'var(--dark-surface-2)',
                        borderRadius: '14px',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          background: 'rgba(255,107,53,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                          <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z" />
                        </svg>
                      </div>
                      <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="reveal" style={{ marginTop: '40px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    marginBottom: '16px',
                    color: 'var(--foreground)',
                  }}
                >
                  Lokasi
                </h3>
                <div
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.08)',
                    height: '300px',
                    position: 'relative',
                    background: 'var(--dark-surface-2)',
                  }}
                >
                  {!mapLoaded && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-muted)',
                        fontSize: '0.9rem',
                        zIndex: 1,
                      }}
                    >
                      Loading map...
                    </div>
                  )}
                  <iframe
                    title="Event Location"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${event.coords.lng - 0.008}%2C${event.coords.lat - 0.005}%2C${event.coords.lng + 0.008}%2C${event.coords.lat + 0.005}&layer=mapnik&marker=${event.coords.lat}%2C${event.coords.lng}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      filter: 'invert(0.9) hue-rotate(180deg) brightness(1.2) contrast(1.1)',
                      opacity: mapLoaded ? 1 : 0,
                      transition: 'opacity 0.4s ease',
                    }}
                    onLoad={() => setMapLoaded(true)}
                    loading="lazy"
                  />
                </div>
                <a
                  href={`https://www.google.com/maps?q=${event.coords.lat},${event.coords.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '12px',
                    color: 'var(--primary)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Buka di Google Maps
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN — Sticky sidebar */}
            <div>
              <div
                className="reveal"
                style={{
                  position: 'sticky',
                  top: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                {/* Ticket Card */}
                <div
                  style={{
                    background: 'var(--dark-surface-2)',
                    borderRadius: '20px',
                    padding: '28px',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      marginBottom: '20px',
                      color: 'var(--foreground)',
                    }}
                  >
                    Info Tiket
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Price */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Harga</span>
                      <span style={{ color: 'var(--accent)', fontSize: '1.05rem', fontWeight: 700 }}>
                        {event.ticketPrice}
                      </span>
                    </div>

                    {/* Date */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Tanggal</span>
                      <span style={{ color: 'var(--foreground)', fontSize: '0.9rem', fontWeight: 500 }}>
                        {event.date}
                      </span>
                    </div>

                    {/* Time */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Waktu</span>
                      <span style={{ color: 'var(--foreground)', fontSize: '0.9rem', fontWeight: 500 }}>
                        {event.time}
                      </span>
                    </div>

                    {/* Venue */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', flexShrink: 0 }}>Venue</span>
                      <span style={{ color: 'var(--foreground)', fontSize: '0.9rem', fontWeight: 500, textAlign: 'right' }}>
                        {event.venue}
                      </span>
                    </div>

                    {/* Address */}
                    <div
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '12px',
                        padding: '14px 16px',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'flex-start',
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                        {event.address}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  {event.ticketLink ? (
                    <a
                      href={event.ticketLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        width: '100%',
                        marginTop: '24px',
                        textDecoration: 'none',
                        textAlign: 'center',
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 5l-1 1M2 2l20 20M20.5 20.5L3.5 3.5" />
                        <rect x="2" y="6" width="20" height="12" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                      Beli Tiket
                    </a>
                  ) : (
                    <div
                      style={{
                        marginTop: '24px',
                        padding: '14px',
                        borderRadius: '50px',
                        background: 'rgba(255,107,53,0.1)',
                        border: '1px solid rgba(255,107,53,0.2)',
                        textAlign: 'center',
                        color: 'var(--primary)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                      }}
                    >
                      {event.ticketPrice === 'Gratis' ? '🎉 Event Gratis!' : 'Tiket tersedia di lokasi'}
                    </div>
                  )}
                </div>

                {/* Share Card */}
                <div
                  style={{
                    background: 'var(--dark-surface-2)',
                    borderRadius: '20px',
                    padding: '24px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>
                    Ajak temen lo ke event ini
                  </p>
                  <button
                    onClick={handleShare}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '12px',
                      borderRadius: '14px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'var(--foreground)',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.color = 'var(--primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                      e.currentTarget.style.color = 'var(--foreground)';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                    Share Event
                  </button>
                </div>

                {/* Back to events */}
                <a
                  href="/event"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '14px',
                    borderRadius: '14px',
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Lihat Semua Event
                </a>
              </div>
            </div>
          </div>

          {/* ====== RELATED EVENTS ====== */}
          {related.length > 0 && (
            <div style={{ maxWidth: '1300px', margin: '80px auto 0' }}>
              <div className="reveal">
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    marginBottom: '32px',
                    color: 'var(--foreground)',
                  }}
                >
                  Event Serupa
                </h2>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${Math.min(related.length, 3)}, 1fr)`,
                  gap: '24px',
                }}
              >
                {related.map((rel) => (
                  <a
                    key={rel.id}
                    href={`/event/${rel.slug}`}
                    className="reveal"
                    style={{
                      display: 'block',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      background: 'var(--dark-surface-2)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ height: '180px', overflow: 'hidden' }}>
                      <img
                        src={rel.image}
                        alt={rel.title}
                        loading="lazy"
                        decoding="async"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.4s ease',
                        }}
                      />
                    </div>
                    <div style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <span
                          style={{
                            background: 'var(--gradient-1)',
                            padding: '4px 10px',
                            borderRadius: '50px',
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            color: 'white',
                            textTransform: 'uppercase',
                          }}
                        >
                          {rel.category}
                        </span>
                        <span style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 500 }}>
                          {rel.date}
                        </span>
                      </div>
                      <h4
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          color: 'white',
                          marginBottom: '6px',
                        }}
                      >
                        {rel.title}
                      </h4>
                      <p
                        style={{
                          color: 'var(--text-muted)',
                          fontSize: '0.85rem',
                          lineHeight: 1.5,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {rel.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />

      {/* Share toast */}
      {showShareToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--dark-surface-3)',
            color: 'var(--foreground)',
            padding: '12px 24px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.15)',
            fontSize: '0.9rem',
            fontWeight: 500,
            zIndex: 9999,
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            animation: 'fadeInUp 0.3s ease forwards',
          }}
        >
          Link copied to clipboard!
        </div>
      )}

      {/* Responsive styles */}
      <style jsx global>{`
        @media (max-width: 900px) {
          main section > div[style*="grid-template-columns: 1fr 380px"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          main section div[style*="gap: 24px"][style*="border-bottom"] {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
