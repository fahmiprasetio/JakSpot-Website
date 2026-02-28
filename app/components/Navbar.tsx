'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ variant = 'homepage' }: { variant?: 'homepage' | 'subpage' }) => {
  const isHomepage = variant === 'homepage';
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const heroLogoRef = useRef<HTMLDivElement>(null);
  const navLogoRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorGroupRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Scroll threshold: how quickly the logo transitions (in px)
  const SCROLL_THRESHOLD = 300;

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const y = window.scrollY;
      const progress = Math.min(y / SCROLL_THRESHOLD, 1);

      // === HERO LOGO (centered, large) — homepage only ===
      if (isHomepage && heroLogoRef.current) {
        const opacity = Math.max(1 - progress * 2.5, 0);
        const scale = 1 - progress * 0.6;
        const moveUp = progress * 120;
        heroLogoRef.current.style.opacity = `${opacity}`;
        heroLogoRef.current.style.transform = `translate(-50%, -50%) scale(${scale}) translateY(-${moveUp}px)`;
        heroLogoRef.current.style.pointerEvents = opacity > 0.1 ? 'auto' : 'none';
      }

      // === SCROLL INDICATOR — homepage only ===
      if (isHomepage && scrollIndicatorGroupRef.current) {
        const indicatorOpacity = Math.max(1 - progress * 4, 0);
        scrollIndicatorGroupRef.current.style.opacity = `${indicatorOpacity}`;
      }

      // === NAVBAR LOGO (small, top-left) ===
      if (navLogoRef.current && isHomepage) {
        const navOpacity = Math.min(progress * 2.5, 1);
        navLogoRef.current.style.opacity = `${navOpacity}`;
      }

      // === NAVBAR BACKGROUND ===
      const navbar = document.querySelector('.jk-navbar') as HTMLElement;
      const navWrapper = document.querySelector('.jk-nav-wrapper') as HTMLElement;
      if (navbar && navWrapper) {
        const scrolled = y > 50;
        // Nav wrapper
        navWrapper.style.padding = scrolled ? '12px 20px' : '0';

        // Nav bar
        navbar.style.maxWidth = scrolled ? '700px' : '100%';
        navbar.style.padding = scrolled ? '12px 24px' : '20px 40px';
        navbar.style.background = scrolled ? 'rgba(15, 15, 20, 0.6)' : 'transparent';
        navbar.style.backdropFilter = scrolled ? 'blur(20px) saturate(1.5)' : 'none';
        (navbar.style as any).WebkitBackdropFilter = scrolled ? 'blur(20px) saturate(1.5)' : 'none';
        navbar.style.borderRadius = scrolled ? '50px' : '0';
        navbar.style.border = scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent';
        navbar.style.boxShadow = scrolled ? '0 8px 32px rgba(0, 0, 0, 0.3)' : 'none';
      }
    });
  }, [isHomepage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial call
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      if (isHomepage && heroLogoRef.current) heroLogoRef.current.style.opacity = '0';
      if (isHomepage && scrollIndicatorGroupRef.current) scrollIndicatorGroupRef.current.style.opacity = '0';
    } else {
      document.body.style.overflow = '';
      handleScroll();
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, handleScroll, isHomepage]);

  const navLinks = isHomepage ? [
    { name: 'Beranda', href: '#hero' },
    { name: 'Destinasi', href: '/destinations' },
    { name: 'Event', href: '/event' },
    { name: 'Tentang', href: '/about' },
    { name: 'Kontak', href: '#contact' },
  ] : [
    { name: 'Beranda', href: '/' },
    { name: 'Destinasi', href: '/destinations' },
    { name: 'Event', href: '/event' },
    { name: 'Tentang', href: '/about' },
    { name: 'Kontak', href: '/#contact' },
  ];

  return (
    <>
      {/* === HERO LOGO — Centered, Large, visible at top === */}
      {isHomepage && (
      <div
        ref={heroLogoRef}
        style={{
          position: 'fixed',
          top: '48%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1002,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          willChange: 'transform, opacity',
          pointerEvents: menuOpen ? 'none' : 'auto',
        }}
      >
        {/* Big Logo Icon */}
        <div style={{
          width: '90px',
          height: '90px',
          background: 'var(--gradient-1)',
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '800',
          fontSize: '2.8rem',
          color: 'white',
          boxShadow: '0 12px 40px rgba(255, 107, 53, 0.35)',
        }}>
          J
        </div>

        {/* Big Logo Text */}
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '3rem',
          fontWeight: '700',
          color: 'var(--foreground)',
          letterSpacing: '-0.02em',
        }}>
          Jak<span className="gradient-text">Spot</span>
        </span>


      </div>
      )}

      {/* === SCROLL INDICATOR — Below hero logo === */}
      {isHomepage && (
      <div
        ref={scrollIndicatorGroupRef}
        style={{
          position: 'fixed',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1002,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          willChange: 'opacity',
        }}
      >
        <span className="mouse-btn">
          <span className="mouse-scroll"></span>
        </span>
        <span style={{
          fontSize: '0.75rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--foreground)',
          opacity: 0.7,
        }}>
          Scroll untuk menjelajahi
        </span>
      </div>
      )}

      {/* === NAVBAR — Top bar with small logo appearing on scroll === */}
      <div
        className="jk-nav-wrapper"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          padding: '0',
          transition: 'padding 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <nav
          className="jk-navbar"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: '100%',
            padding: '20px 40px',
            background: 'transparent',
            borderRadius: '0',
            border: '1px solid transparent',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Navbar Logo — fades in on scroll */}
          <a href={isHomepage ? '#hero' : '/'} style={{ textDecoration: 'none', zIndex: 1001 }}>
            <div
              ref={navLogoRef}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                opacity: isHomepage ? 0 : 1,
                transition: 'none',
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                background: 'var(--gradient-1)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '0.95rem',
                color: 'white',
              }}>
                J
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                fontWeight: '700',
                color: 'var(--foreground)',
              }}>
                Jak<span className="gradient-text">Spot</span>
              </span>
            </div>
          </a>

          {/* Auth + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 1001 }}>
            {user ? (
              <a
                href="/profile"
                style={{
                  width: '34px', height: '34px', borderRadius: '10px',
                  background: 'var(--gradient-1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.8rem', color: 'white',
                  textDecoration: 'none', transition: 'transform 0.3s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
              </a>
            ) : (
              <a
                href="/signin"
                style={{
                  padding: '8px 18px', borderRadius: '10px',
                  background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)',
                  color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600,
                  textDecoration: 'none', transition: 'all 0.3s', whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,107,53,0.1)'; e.currentTarget.style.color = 'var(--primary)'; }}
              >
                Login
              </a>
            )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              padding: '8px',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              WebkitAppearance: 'none',
            }}
          >
            <div style={{
              width: '24px',
              height: '2px',
              background: 'var(--foreground)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: menuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none',
              borderRadius: '2px',
            }} />
            <div style={{
              width: '16px',
              height: '2px',
              background: 'var(--foreground)',
              marginTop: '7px',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? 'translateX(10px)' : 'none',
              borderRadius: '2px',
            }} />
            <div style={{
              width: '20px',
              height: '2px',
              background: 'var(--foreground)',
              marginTop: '7px',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: menuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none',
              borderRadius: '2px',
            }} />
          </button>
          </div>
        </nav>
      </div>

      {/* Fullscreen Menu Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 10, 15, 0.85)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '4px',
          paddingLeft: 'clamp(40px, 8vw, 120px)',
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? 'visible' : 'hidden',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {navLinks.map((link, index) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="menu-link"
            style={{
              color: 'var(--foreground)',
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              fontWeight: '500',
              padding: '12px 0',
              position: 'relative',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
              transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.08 + 0.15}s`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--foreground)';
              const underline = e.currentTarget.querySelector('.menu-underline') as HTMLElement;
              if (underline) underline.style.width = '100%';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--foreground)';
              const underline = e.currentTarget.querySelector('.menu-underline') as HTMLElement;
              if (underline) underline.style.width = '0%';
            }}
          >
            {link.name}
            <span
              className="menu-underline"
              style={{
                position: 'absolute',
                bottom: '8px',
                left: '0',
                width: '0%',
                height: '2px',
                background: 'var(--primary)',
                borderRadius: '2px',
                transition: 'width 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          </a>
        ))}

        {/* Auth link in menu */}
        <div style={{
          marginTop: '24px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
          transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${navLinks.length * 0.08 + 0.15}s`,
        }}>
          {user ? (
            <a href="/profile" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'var(--foreground)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--gradient-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', color: 'white' }}>
                {user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600 }}>{user.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Lihat Profil</div>
              </div>
            </a>
          ) : (
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="/signin" onClick={() => setMenuOpen(false)} className="btn-primary" style={{ textDecoration: 'none', padding: '12px 28px', fontSize: '0.9rem' }}>
                Login
              </a>
              <a href="/signup" onClick={() => setMenuOpen(false)} style={{ padding: '12px 28px', borderRadius: '12px', background: 'var(--dark-surface-3)', color: 'var(--foreground)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, display: 'inline-block' }}>
                Daftar
              </a>
            </div>
          )}
        </div>

        <div style={{
          position: 'absolute',
          bottom: '40px',
          display: 'flex',
          gap: '40px',
          opacity: menuOpen ? 0.5 : 0,
          transition: `all 0.5s ease 0.5s`,
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.05em',
        }}>
          <span>Jakarta, Indonesia</span>
          <span>© 2026 JakSpot</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
