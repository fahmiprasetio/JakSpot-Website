'use client';

import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { name: 'Beranda', href: '#hero' },
    { name: 'Destinasi', href: '#destinations' },
    { name: 'Kuliner', href: '#culinary' },
    { name: 'Budaya', href: '#culture' },
    { name: 'Kontak', href: '#contact' },
  ];

  return (
    <>
      {/* Navbar Wrapper - controls positioning */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        padding: scrolled ? '12px 20px' : '0',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {/* Navbar Bar */}
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: scrolled ? '700px' : '100%',
          padding: scrolled ? '12px 24px' : '20px 40px',
          background: scrolled ? 'rgba(15, 15, 20, 0.6)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
          borderRadius: scrolled ? '50px' : '0',
          border: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
          boxShadow: scrolled ? '0 8px 32px rgba(0, 0, 0, 0.3)' : 'none',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          {/* Logo */}
          <a href="#hero" style={{ textDecoration: 'none', zIndex: 1001 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: scrolled ? '32px' : '38px',
                height: scrolled ? '32px' : '38px',
                background: 'var(--gradient-1)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: scrolled ? '0.95rem' : '1.1rem',
                color: 'white',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}>
                J
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: scrolled ? '1.15rem' : '1.4rem',
                fontWeight: '700',
                color: 'var(--foreground)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}>
                Jak<span className="gradient-text">Spot</span>
              </span>
            </div>
          </a>

          {/* Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <div style={{
              width: scrolled ? '22px' : '26px',
              height: '2px',
              background: 'var(--foreground)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: menuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none',
              borderRadius: '2px',
            }} />
            <div style={{
              width: scrolled ? '14px' : '18px',
              height: '2px',
              background: 'var(--foreground)',
              marginTop: '7px',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? 'translateX(10px)' : 'none',
              borderRadius: '2px',
            }} />
            <div style={{
              width: scrolled ? '18px' : '22px',
              height: '2px',
              background: 'var(--foreground)',
              marginTop: '7px',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: menuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none',
              borderRadius: '2px',
            }} />
          </button>
        </nav>
      </div>

      {/* Fullscreen Menu Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 10, 15, 0.95)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0px',
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
            style={{
              color: 'var(--foreground)',
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '600',
              padding: '16px 0',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
              transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.08 + 0.15}s`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--primary)';
              e.currentTarget.style.transform = 'translateY(0) scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--foreground)';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}
          >
            {link.name}
          </a>
        ))}

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
