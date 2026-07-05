'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { CSSProperties } from 'react';
import type { EventDetail } from '../data/events';

const sectionStyle: CSSProperties = { background: 'var(--background)', position: 'relative', overflow: 'hidden', padding: '60px 0' };
const headerStyle: CSSProperties = { textAlign: 'center', marginBottom: '60px', padding: '0 5%' };
const eyebrowStyle: CSSProperties = { color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' };
const h2Style: CSSProperties = { marginTop: '16px' };
const subtitleStyle: CSSProperties = { margin: '0 auto' };
const carouselWrapStyle: CSSProperties = { position: 'relative', width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 5%' };
const stageStyle: CSSProperties = { position: 'relative', width: '100%', height: '550px', borderRadius: '24px', overflow: 'hidden' };
const imgStyle: CSSProperties = { width: '100%', height: '100%', objectFit: 'cover' };
const overlayA: CSSProperties = { position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)', zIndex: 2 };
const overlayB: CSSProperties = { position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)', zIndex: 2 };
const contentStyle: CSSProperties = { position: 'absolute', bottom: '50px', left: '50px', right: '50px', zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px', flexWrap: 'wrap' };
const infoStyle: CSSProperties = { maxWidth: '550px' };
const badgeStyle: CSSProperties = { display: 'inline-block', background: 'var(--gradient-1)', padding: '6px 16px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600, color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' };
const titleStyle: CSSProperties = { fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, color: 'white', lineHeight: 1.2, marginBottom: '12px' };
const descStyle: CSSProperties = { color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '20px' };
const metaRow: CSSProperties = { display: 'flex', gap: '24px', flexWrap: 'wrap' };
const metaItemA: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 500 };
const metaItemB: CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', fontWeight: 500 };
const navWrap: CSSProperties = { display: 'flex', gap: '12px' };
const navBtn: CSSProperties = { width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const progressTrack: CSSProperties = { position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.1)', zIndex: 3 };
const thumbsRow: CSSProperties = { display: 'flex', gap: '16px', marginTop: '24px', overflowX: 'auto', paddingBottom: '8px' };
const thumbLabel: CSSProperties = { position: 'absolute', bottom: '8px', left: '10px', right: '10px', color: 'white', fontSize: '0.7rem', fontWeight: 600, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
const viewAllWrap: CSSProperties = { textAlign: 'center', marginTop: '48px' };
const viewAllLink: CSSProperties = { textDecoration: 'none' };

const EventSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<EventDetail[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    fetch('/api/events')
      .then((r) => r.json())
      .then((data) => setEvents(data.events || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [events.length]);

  useEffect(() => {
    if (events.length === 0) return;
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % events.length);
    }, 6000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [events.length]);

  const goToSlide = useCallback((index: number) => setActiveIndex(index), []);
  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (events.length ? (prev + 1) % events.length : 0));
  }, [events.length]);
  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (events.length ? (prev - 1 + events.length) % events.length : 0));
  }, [events.length]);

  const pauseAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };
  const resumeAutoPlay = () => {
    if (events.length === 0) return;
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % events.length);
    }, 6000);
  };

  if (events.length === 0) return null;

  const currentEvent = events[activeIndex] ?? events[0];

  const slideStyle = (index: number): CSSProperties => ({
    position: 'absolute',
    inset: 0,
    opacity: index === activeIndex ? 1 : 0,
    transition: 'opacity 0.6s ease',
    zIndex: index === activeIndex ? 1 : 0,
  });
  const thumbStyle = (index: number): CSSProperties => ({
    flexShrink: 0,
    width: '200px',
    height: '70px',
    borderRadius: '12px',
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer',
    border: index === activeIndex ? '2px solid var(--primary)' : '2px solid transparent',
    opacity: index === activeIndex ? 1 : 0.5,
    background: 'none',
    padding: 0,
  });
  const progressFill: CSSProperties = {
    height: '100%',
    width: ((activeIndex + 1) / events.length) * 100 + '%',
    background: 'var(--gradient-1)',
    transition: 'width 0.6s ease',
  };

  return (
    <section id="events" ref={sectionRef} className="section" style={sectionStyle}>
      <div className="reveal" style={headerStyle}>
        <span style={eyebrowStyle}>What&apos;s Happening</span>
        <h2 className="section-title" style={h2Style}>
          Event &<br />
          <span className="gradient-text">Festival</span>
        </h2>
        <p className="section-subtitle" style={subtitleStyle}>
          Jakarta gak pernah sepi. Tiap bulan ada aja yang worth it buat lo datengin — ini yang paling gak boleh lo skip.
        </p>
      </div>

      <div
        className="reveal"
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}
        style={carouselWrapStyle}
      >
        <div style={stageStyle}>
          {events.map((event, index) => (
            <div key={event.id} style={slideStyle(index)}>
              <img src={event.image} alt={event.title} loading="lazy" decoding="async" style={imgStyle} />
            </div>
          ))}

          <div style={overlayA} />
          <div style={overlayB} />

          <div style={contentStyle}>
            <div style={infoStyle}>
              <span style={badgeStyle}>{currentEvent.category}</span>
              <h3 style={titleStyle}>{currentEvent.title}</h3>
              <p style={descStyle}>{currentEvent.description}</p>
              <div style={metaRow}>
                <div style={metaItemA}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {currentEvent.date}
                </div>
                <div style={metaItemB}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {currentEvent.venue}
                </div>
              </div>
            </div>

            <div style={navWrap}>
              <button onClick={prevSlide} aria-label="Sebelumnya" style={navBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={nextSlide} aria-label="Berikutnya" style={navBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div style={progressTrack}>
            <div style={progressFill} />
          </div>
        </div>

        <div style={thumbsRow}>
          {events.map((event, index) => (
            <button key={event.id} onClick={() => goToSlide(index)} style={thumbStyle(index)}>
              <img src={event.image} alt={event.title} loading="lazy" decoding="async" style={imgStyle} />
              <span style={thumbLabel}>{event.title}</span>
            </button>
          ))}
        </div>

        <div style={viewAllWrap}>
          <a href="/event" className="btn-secondary" style={viewAllLink}>
            Lihat Semua Event
          </a>
        </div>
      </div>
    </section>
  );
};

export default EventSection;
