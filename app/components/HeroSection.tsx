'use client';

import { useEffect, useRef } from 'react';

const HeroSection = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const layer1Ref = useRef<HTMLDivElement>(null);
    const layer2Ref = useRef<HTMLDivElement>(null);
    const layer3Ref = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            // Multi-layer parallax effect
            if (layer1Ref.current) {
                layer1Ref.current.style.transform = `translateY(${scrollY * 0.5}px) scale(1.1)`;
            }
            if (layer2Ref.current) {
                layer2Ref.current.style.transform = `translateY(${scrollY * 0.3}px)`;
            }
            if (layer3Ref.current) {
                layer3Ref.current.style.transform = `translateY(${scrollY * 0.1}px)`;
            }
            if (contentRef.current) {
                contentRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
                contentRef.current.style.opacity = `${1 - scrollY / 600}`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="hero" ref={heroRef} className="hero-section">
            {/* Parallax Background Layers */}
            <div
                ref={layer1Ref}
                className="hero-bg-layer"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=2000&q=80')`,
                    filter: 'brightness(0.3) saturate(1.2)',
                    transform: 'scale(1.1)'
                }}
            />

            {/* Gradient Overlay */}
            <div
                ref={layer2Ref}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(10, 10, 15, 0.4) 0%, rgba(10, 10, 15, 0.6) 50%, rgba(10, 10, 15, 1) 100%)',
                    zIndex: 2
                }}
            />

            {/* Decorative Elements */}
            <div
                ref={layer3Ref}
                style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}
            >
                {/* Floating Circles */}
                <div
                    className="decoration-circle float"
                    style={{
                        width: '400px',
                        height: '400px',
                        top: '10%',
                        left: '-10%'
                    }}
                />
                <div
                    className="decoration-circle float-delay-1"
                    style={{
                        width: '300px',
                        height: '300px',
                        bottom: '20%',
                        right: '-5%',
                        background: 'var(--gradient-2)'
                    }}
                />

                {/* Grid Pattern */}
                <div className="decoration-grid" />
            </div>

            {/* Hero Content */}
            <div ref={contentRef} className="hero-content" style={{ zIndex: 10 }}>

                <h1 className="hero-title fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <span className="split-line">
                        <span>Jelajahi</span>
                    </span>
                    <span className="gradient-text split-line">
                        <span style={{ animationDelay: '0.1s' }}>Jakarta</span>
                    </span>
                </h1>

                <p className="hero-description fade-in-up" style={{ animationDelay: '0.6s' }}>
                    Dari gedung pencakar langit yang megah hingga kampung-kampung bersejarah,
                    temukan pesona kota metropolitan terbesar di Asia Tenggara melalui
                    pengalaman digital yang memukau.
                </p>

                <div className="fade-in-up" style={{
                    display: 'flex',
                    gap: '16px',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    animationDelay: '0.8s'
                }}>
                    <a href="#destinations" className="btn-primary" style={{ textDecoration: 'none' }}>
                        Mulai Eksplorasi
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            style={{ marginLeft: '8px', display: 'inline' }}
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                    <a href="#culture" className="btn-secondary" style={{ textDecoration: 'none' }}>
                        Lihat Video
                    </a>
                </div>

                {/* Stats */}
                <div className="fade-in-up" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '60px',
                    marginTop: '80px',
                    flexWrap: 'wrap',
                    animationDelay: '1s'
                }}>
                    {[
                        { number: '10M+', label: 'Penduduk' },
                        { number: '500+', label: 'Destinasi Wisata' },
                        { number: '100+', label: 'Kuliner Khas' },
                    ].map((stat, index) => (
                        <div key={index} style={{ textAlign: 'center' }}>
                            <div style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2.5rem',
                                fontWeight: '700',
                                color: 'var(--primary)'
                            }}>
                                {stat.number}
                            </div>
                            <div style={{
                                fontSize: '0.9rem',
                                color: 'var(--text-muted)',
                                marginTop: '4px'
                            }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator fade-in-up" style={{ animationDelay: '1.2s', zIndex: 10 }}>
                <div className="mouse">
                    <div className="wheel" />
                </div>
                <span>Scroll ke bawah</span>
            </div>
        </section>
    );
};

export default HeroSection;
