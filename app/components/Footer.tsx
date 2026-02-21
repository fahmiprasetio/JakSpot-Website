'use client';

import { useEffect, useRef } from 'react';

const Footer = () => {
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const revealElements = footerRef.current?.querySelectorAll('.reveal');
        revealElements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const footerLinks = {
        explore: [
            { name: 'Destinasi', href: '#destinations' },
            { name: 'Kuliner', href: '#culinary' },
            { name: 'Budaya', href: '#culture' },
            { name: 'Event', href: '#' },
            { name: 'Transportasi', href: '#' }
        ],
        info: [
            { name: 'Tentang Kami', href: '#' },
            { name: 'Kontak', href: '#contact' },
            { name: 'FAQ', href: '#' },
            { name: 'Kebijakan Privasi', href: '#' },
            { name: 'Syarat & Ketentuan', href: '#' }
        ],
        social: [
            { name: 'Instagram', href: '#', icon: 'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Z' },
            { name: 'Twitter', href: '#', icon: 'M22.46 6c-.85.38-1.78.64-2.75.76 1-.6 1.76-1.55 2.12-2.68-.93.55-1.96.95-3.06 1.17-.88-.94-2.13-1.53-3.51-1.53-2.66 0-4.81 2.16-4.81 4.81 0 .38.04.75.13 1.1-4-.2-7.58-2.11-9.96-5.02-.42.72-.66 1.56-.66 2.46 0 1.68.85 3.16 2.14 4.02-.79-.02-1.53-.24-2.18-.6v.06c0 2.35 1.67 4.31 3.88 4.76-.4.1-.83.16-1.27.16-.31 0-.62-.03-.92-.08.63 1.96 2.45 3.39 4.61 3.43-1.69 1.32-3.83 2.1-6.15 2.1-.4 0-.8-.02-1.19-.07 2.19 1.4 4.78 2.22 7.57 2.22 9.07 0 14.02-7.52 14.02-14.02 0-.21 0-.42-.01-.63.96-.7 1.79-1.56 2.45-2.55z' },
            { name: 'YouTube', href: '#', icon: 'M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z' },
            { name: 'Facebook', href: '#', icon: 'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z' }
        ]
    };

    return (
        <footer id="contact" ref={footerRef} style={{
            background: 'var(--dark-surface)',
            position: 'relative',
            zIndex: 2,
            overflow: 'hidden'
        }}>
            {/* Decorative Top Border */}
            <div style={{
                height: '4px',
                background: 'var(--gradient-1)'
            }} />

            {/* Newsletter Section */}
            <div className="reveal" style={{
                background: 'var(--dark-surface-2)',
                padding: '80px 5%'
            }}>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        marginBottom: '16px'
                    }}>
                        Stay in the <span className="gradient-text">Loop</span>
                    </h3>
                    <p style={{
                        color: 'var(--text-muted)',
                        marginBottom: '32px'
                    }}>
                        Drop email lo di sini, kita kirimin info spot baru, event terdekat, dan hal-hal Jakarta yang worth it.
                    </p>

                    <form style={{
                        display: 'flex',
                        gap: '12px',
                        maxWidth: '500px',
                        margin: '0 auto',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        <input
                            type="email"
                            placeholder="Email lo..."
                            style={{
                                flex: '1',
                                minWidth: '250px',
                                padding: '16px 24px',
                                borderRadius: '50px',
                                border: '2px solid var(--dark-surface-3)',
                                background: 'var(--dark-surface)',
                                color: 'var(--foreground)',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.3s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--dark-surface-3)'}
                        />
                        <button type="submit" className="btn-primary">
                            Berlangganan
                        </button>
                    </form>
                </div>
            </div>

            {/* Main Footer */}
            <div style={{
                padding: '80px 5%'
            }}>
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '60px'
                }}>
                    {/* Brand */}
                    <div className="reveal">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                background: 'var(--gradient-1)',
                                borderRadius: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: '800',
                                fontSize: '1.5rem',
                                color: 'white'
                            }}>
                                J
                            </div>
                            <span style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '1.8rem',
                                fontWeight: '700'
                            }}>
                                Jak<span className="gradient-text">Spot</span>
                            </span>
                        </div>
                        <p style={{
                            color: 'var(--text-muted)',
                            lineHeight: '1.8',
                            marginBottom: '24px'
                        }}>
                            Portal informasi lengkap tentang Jakarta. Temukan destinasi wisata, kuliner khas,
                            dan budaya Betawi dalam satu platform digital yang memukau.
                        </p>

                        {/* Social Links */}
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {footerLinks.social.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '12px',
                                        background: 'var(--dark-surface-2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s ease',
                                        color: 'var(--text-muted)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--primary)';
                                        e.currentTarget.style.color = 'white';
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'var(--dark-surface-2)';
                                        e.currentTarget.style.color = 'var(--text-muted)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d={social.icon} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Explore Links */}
                    <div className="reveal">
                        <h4 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            marginBottom: '24px',
                            color: 'var(--foreground)'
                        }}>
                            Jelajahi
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {footerLinks.explore.map((link) => (
                                <li key={link.name} style={{ overflow: 'visible' }}>
                                    <a
                                        href={link.href}
                                        className="footer-link"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Info Links */}
                    <div className="reveal">
                        <h4 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            marginBottom: '24px',
                            color: 'var(--foreground)'
                        }}>
                            Informasi
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {footerLinks.info.map((link) => (
                                <li key={link.name} style={{ overflow: 'visible' }}>
                                    <a
                                        href={link.href}
                                        className="footer-link"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="reveal">
                        <h4 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            marginBottom: '24px',
                            color: 'var(--foreground)'
                        }}>
                            Hubungi Kami
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                    Jl. Jakarta Pusat No. 123<br />
                                    DKI Jakarta, Indonesia
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                    info@jakspot.id
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                    +62 21 1234 5678
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{
                borderTop: '1px solid var(--dark-surface-2)',
                padding: '24px 5%'
            }}>
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px'
                }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        © 2026 JakSpot. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Decorative Background */}
            <div style={{
                position: 'absolute',
                bottom: '-200px',
                right: '-200px',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(255, 107, 53, 0.05) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />
        </footer>
    );
};

export default Footer;
