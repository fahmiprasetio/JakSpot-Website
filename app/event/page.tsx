'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import allEvents from '../data/events';
import type { EventDetail } from '../data/events';

const Footer = dynamic(() => import('../components/Footer'), { ssr: true });

const categories = ['Semua', 'Festival', 'Musik', 'Seni', 'Budaya', 'Food & Drink', 'Olahraga', 'Komunitas'];

// Month labels for timeline
const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

export default function EventPage() {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const contentRef = useRef<HTMLDivElement>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const featuredEvents = allEvents.filter((e) => e.isFeatured);

  // Auto-cycle featured events
  useEffect(() => {
    if (featuredEvents.length <= 1) return;
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredEvents.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredEvents.length]);

  // Reveal animation — re-observe when filter changes
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const timeout = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }, 10);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [activeFilter, viewMode]);

  const filteredEvents =
    activeFilter === 'Semua'
      ? allEvents
      : allEvents.filter((e) => e.category === activeFilter);

  // Sort by date for timeline
  const sortedEvents = [...filteredEvents].sort((a, b) =>
    a.dateStart.localeCompare(b.dateStart)
  );

  const currentFeatured = featuredEvents[featuredIndex];

  // Get month index from dateStart
  const getMonth = (dateStart: string) => {
    return parseInt(dateStart.split('-')[1], 10) - 1;
  };

  return (
    <>
      <Navbar variant="subpage" />

      <main>
        {/* ====== HERO SECTION ====== */}
        <section
          style={{
            position: 'relative',
            height: '70vh',
            minHeight: '500px',
            overflow: 'hidden',
          }}
        >
          {/* Featured Event Background with Crossfade */}
          {featuredEvents.map((event, idx) => (
            <div
              key={event.id}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: idx === featuredIndex ? 1 : 0,
                transition: 'opacity 1s ease',
                zIndex: idx === featuredIndex ? 1 : 0,
              }}
            >
              <img
                src={event.image}
                alt={event.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          ))}

          {/* Gradient overlays */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, rgba(10,10,15,0.92) 0%, rgba(10,10,15,0.6) 50%, rgba(10,10,15,0.3) 100%)',
              zIndex: 2,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, var(--dark-surface) 0%, rgba(10,10,15,0.3) 40%, transparent 100%)',
              zIndex: 2,
            }}
          />

          {/* Hero Content */}
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              left: '5%',
              right: '5%',
              zIndex: 3,
              maxWidth: '700px',
            }}
          >
            <div className="reveal">
              <span
                style={{
                  color: 'var(--accent)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                }}
              >
                What&apos;s Happening in Jakarta
              </span>
              <h1
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 700,
                  color: 'var(--foreground)',
                  marginTop: '8px',
                  lineHeight: 1.1,
                }}
              >
                Event &<br />
                <span className="gradient-text">Festival</span>
              </h1>
              <p
                style={{
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                  maxWidth: '550px',
                  marginTop: '12px',
                  lineHeight: 1.6,
                }}
              >
                Jakarta gak pernah sepi. Dari konser yang bikin merinding sampai festival yang bikin kantong jebol — 
                ini semua yang worth it buat lo datengin di 2026.
              </p>
            </div>

            {/* Featured event mini-card */}
            {currentFeatured && (
              <a
                href={`/event/${currentFeatured.slug}`}
                className="reveal"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginTop: '20px',
                  padding: '10px 16px 10px 10px',
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.background = 'rgba(255,107,53,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={currentFeatured.image}
                    alt={currentFeatured.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <div style={{ color: 'var(--primary)', fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Featured — {currentFeatured.date}
                  </div>
                  <div style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600 }}>
                    {currentFeatured.title}
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" style={{ marginLeft: '4px', flexShrink: 0 }}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            )}

            {/* Featured dots */}
            {featuredEvents.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
                {featuredEvents.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setFeaturedIndex(idx)}
                    style={{
                      width: idx === featuredIndex ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: idx === featuredIndex ? 'var(--primary)' : 'rgba(255,255,255,0.3)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ====== EVENTS CONTENT ====== */}
        <section
          ref={contentRef}
          style={{
            background: 'var(--dark-surface)',
            padding: '60px 5% 100px',
            position: 'relative',
          }}
        >
          {/* Background Decoration */}
          <div
            style={{
              position: 'absolute',
              top: '200px',
              right: '-200px',
              width: '600px',
              height: '600px',
              background:
                'radial-gradient(circle, rgba(255, 107, 53, 0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '300px',
              left: '-200px',
              width: '500px',
              height: '500px',
              background:
                'radial-gradient(circle, rgba(255, 193, 7, 0.04) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Filter & View Toggle Row */}
          <div
            className="reveal"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            {/* Filter Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '50px',
                    border: 'none',
                    background:
                      activeFilter === cat
                        ? 'var(--gradient-1)'
                        : 'var(--dark-surface-2)',
                    color:
                      activeFilter === cat ? 'white' : 'var(--text-muted)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '10px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: viewMode === 'grid' ? 'var(--dark-surface-3)' : 'transparent',
                  color: viewMode === 'grid' ? 'white' : 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.85rem',
                  transition: 'all 0.3s ease',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                </svg>
                Grid
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                style={{
                  padding: '10px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: viewMode === 'timeline' ? 'var(--dark-surface-3)' : 'transparent',
                  color: viewMode === 'timeline' ? 'white' : 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.85rem',
                  transition: 'all 0.3s ease',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
                Timeline
              </button>
            </div>
          </div>

          {/* Result Count */}
          <div
            className="reveal"
            style={{
              marginBottom: '40px',
            }}
          >
            <span
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
              }}
            >
              Menampilkan{' '}
              <strong style={{ color: 'var(--primary)' }}>
                {filteredEvents.length}
              </strong>{' '}
              event
            </span>
          </div>

          {/* ====== GRID VIEW ====== */}
          {viewMode === 'grid' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
                gap: '30px',
                maxWidth: '1400px',
                margin: '0 auto',
              }}
            >
              {filteredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          )}

          {/* ====== TIMELINE VIEW ====== */}
          {viewMode === 'timeline' && (
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              {/* Month bar */}
              <div
                className="reveal"
                style={{
                  display: 'flex',
                  gap: '0',
                  marginBottom: '48px',
                  overflow: 'hidden',
                  borderRadius: '12px',
                  background: 'var(--dark-surface-2)',
                }}
              >
                {monthLabels.map((m, idx) => {
                  const hasEvent = sortedEvents.some((e) => getMonth(e.dateStart) === idx);
                  return (
                    <div
                      key={m}
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        padding: '10px 4px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: hasEvent ? 'var(--primary)' : 'var(--text-muted)',
                        background: hasEvent ? 'rgba(255,107,53,0.08)' : 'transparent',
                        position: 'relative',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {m}
                      {hasEvent && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '20%',
                            right: '20%',
                            height: '3px',
                            background: 'var(--gradient-1)',
                            borderRadius: '2px',
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Timeline items */}
              <div style={{ position: 'relative' }}>
                {/* Vertical line */}
                <div
                  style={{
                    position: 'absolute',
                    left: '20px',
                    top: '0',
                    bottom: '0',
                    width: '2px',
                    background: 'linear-gradient(to bottom, var(--primary), rgba(255,107,53,0.1))',
                  }}
                />

                {sortedEvents.map((event, index) => (
                  <a
                    href={`/event/${event.slug}`}
                    key={event.id}
                    className="reveal"
                    style={{
                      display: 'flex',
                      gap: '32px',
                      marginBottom: '32px',
                      paddingLeft: '52px',
                      position: 'relative',
                      textDecoration: 'none',
                      transitionDelay: `${index * 0.08}s`,
                    }}
                  >
                    {/* Timeline dot */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '13px',
                        top: '20px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: event.isFeatured ? 'var(--gradient-1)' : 'var(--dark-surface-3)',
                        border: '3px solid var(--dark-surface)',
                        boxShadow: event.isFeatured ? '0 0 12px rgba(255,107,53,0.4)' : 'none',
                        zIndex: 1,
                      }}
                    />

                    {/* Content card */}
                    <div
                      className="event-timeline-card"
                      style={{
                        flex: 1,
                        display: 'flex',
                        gap: '20px',
                        background: 'var(--dark-surface-2)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.06)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      {/* Image */}
                      <div style={{ width: '180px', minHeight: '140px', flexShrink: 0 }}>
                        <img
                          src={event.image}
                          alt={event.title}
                          loading="lazy"
                          decoding="async"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>

                      {/* Info */}
                      <div style={{ padding: '20px 20px 20px 0', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                          <span
                            style={{
                              background: 'var(--gradient-1)',
                              padding: '4px 12px',
                              borderRadius: '50px',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              color: 'white',
                              textTransform: 'uppercase',
                              letterSpacing: '0.04em',
                            }}
                          >
                            {event.category}
                          </span>
                          <span style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 500 }}>
                            {event.date}
                          </span>
                        </div>
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.15rem',
                            fontWeight: 700,
                            color: 'white',
                            marginBottom: '6px',
                          }}
                        >
                          {event.title}
                        </h3>
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
                          {event.description}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {event.venue}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 20px',
                color: 'var(--text-muted)',
              }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" style={{ marginBottom: '16px', opacity: 0.5 }}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <p style={{ fontSize: '1.1rem' }}>
                Belum ada event untuk kategori ini.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer showNewsletter={false} />

      {/* Page-specific responsive styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .event-timeline-card {
            flex-direction: column !important;
          }
          .event-timeline-card > div:first-child {
            width: 100% !important;
            min-height: 160px !important;
          }
          .event-timeline-card > div:last-child {
            padding: 16px !important;
          }
        }
        @media (max-width: 500px) {
          .event-card-inner {
            height: 380px !important;
          }
        }
      `}</style>
    </>
  );
}

/* ====== EVENT CARD COMPONENT ====== */
function EventCard({ event, index }: { event: EventDetail; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`/event/${event.slug}`}
      className="reveal"
      style={{
        position: 'relative',
        display: 'block',
        textDecoration: 'none',
        transitionDelay: `${(index % 6) * 0.1}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="event-card-inner"
        style={{
          position: 'relative',
          height: '420px',
          borderRadius: '20px',
          overflow: 'hidden',
          border: hovered ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.08)',
          transition: 'all 0.4s ease',
          boxShadow: hovered ? '0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(255,107,53,0.08)' : '0 4px 20px rgba(0,0,0,0.2)',
        }}
      >
        {/* Image */}
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: hovered
              ? 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 100%)'
              : 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
            transition: 'background 0.4s ease',
          }}
        />

        {/* Date badge - top left */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            zIndex: 5,
          }}
        >
          <div
            style={{
              background: 'rgba(10,10,15,0.7)',
              backdropFilter: 'blur(10px)',
              borderRadius: '14px',
              padding: '10px 14px',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.1)',
              minWidth: '60px',
            }}
          >
            <div style={{ color: 'var(--primary)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {event.date.split(' ')[0]}
            </div>
            <div style={{ color: 'white', fontSize: '0.75rem', fontWeight: 600, marginTop: '2px' }}>
              {event.date.split(' ').length > 1 ? event.date.split(' ').slice(1).join(' ') : '2026'}
            </div>
          </div>
        </div>

        {/* Category badge - top right */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 5,
          }}
        >
          <span
            className="glass"
            style={{
              padding: '8px 16px',
              borderRadius: '50px',
              fontSize: '0.75rem',
              color: 'white',
              fontWeight: 500,
            }}
          >
            {event.category}
          </span>
        </div>

        {/* Featured indicator */}
        {event.isFeatured && (
          <div
            style={{
              position: 'absolute',
              top: '16px',
              right: event.category.length > 6 ? '130px' : '110px',
              zIndex: 5,
            }}
          >
            <span
              style={{
                background: 'var(--gradient-1)',
                padding: '8px 12px',
                borderRadius: '50px',
                fontSize: '0.65rem',
                fontWeight: 700,
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Hot
            </span>
          </div>
        )}

        {/* Content - bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '28px',
            zIndex: 5,
            transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
            transition: 'transform 0.4s ease',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'white',
              marginBottom: '8px',
              lineHeight: 1.2,
            }}
          >
            {event.title}
          </h3>
          <p
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              marginBottom: '16px',
            }}
          >
            {event.description}
          </p>

          {/* Meta row */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 500 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {event.date}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {event.location}
            </div>
          </div>

          {/* CTA */}
          <div
            style={{
              marginTop: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--primary)',
              fontSize: '0.85rem',
              fontWeight: 600,
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0)' : 'translateY(8px)',
              transition: 'all 0.4s ease',
            }}
          >
            <span>Lihat Detail</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}
