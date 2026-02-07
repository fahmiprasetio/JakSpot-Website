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

  const navLinks = [
    { name: 'Beranda', href: '#hero' },
    { name: 'Destinasi', href: '#destinations' },
    { name: 'Kuliner', href: '#culinary' },
    { name: 'Budaya', href: '#culture' },
    { name: 'Kontak', href: '#contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Logo */}
        <a href="#hero" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'var(--gradient-1)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '1.2rem',
              color: 'white'
            }}>
              J
            </div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--foreground)'
            }}>
              Jak<span className="gradient-text">Spot</span>
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '40px'
        }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: '500',
                transition: 'color 0.3s',
                position: 'relative'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a href="#contact" className="btn-primary desktop-nav" style={{ 
          textDecoration: 'none',
          fontSize: '0.9rem',
          padding: '12px 24px'
        }}>
          Jelajahi Jakarta
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '10px',
            zIndex: 100
          }}
        >
          <div style={{
            width: '24px',
            height: '2px',
            background: 'var(--foreground)',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
          }} />
          <div style={{
            width: '24px',
            height: '2px',
            background: 'var(--foreground)',
            marginTop: '6px',
            transition: 'all 0.3s',
            opacity: menuOpen ? 0 : 1
          }} />
          <div style={{
            width: '24px',
            height: '2px',
            background: 'var(--foreground)',
            marginTop: '6px',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
          }} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: menuOpen ? 0 : '-100%',
          width: '100%',
          height: '100vh',
          background: 'var(--dark-surface)',
          transition: 'right 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '30px',
          zIndex: 90
        }}
        className="mobile-menu"
      >
        {navLinks.map((link, index) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              color: 'var(--foreground)',
              textDecoration: 'none',
              fontSize: '1.5rem',
              fontWeight: '600',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.4s ease ${index * 0.1}s`
            }}
          >
            {link.name}
          </a>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
