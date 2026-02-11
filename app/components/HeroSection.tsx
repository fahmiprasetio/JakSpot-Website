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
                    backgroundImage: `url('/Hero-Section Jakspot.png')`,
                    filter: 'brightness(0.75) saturate(1.2)',
                    transform: 'scale(1.1)'
                }}
            />

            {/* Gradient Overlay */}
            <div
                ref={layer2Ref}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(10, 10, 15, 0.1) 0%, rgba(10, 10, 15, 0.35) 50%, rgba(10, 10, 15, 0.95) 100%)',
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

                <h1 className="hero-title fade-in-up" style={{ animationDelay: '0.4s', marginBottom: '16px' }}>
                    Jelajahi{' '}
                    <span className="gradient-text">Jakarta</span>
                </h1>

                <p className="hero-description fade-in-up" style={{ animationDelay: '0.6s' }}>
                    Dari gedung pencakar langit yang megah hingga kampung-kampung bersejarah,
                    temukan pesona kota metropolitan terbesar di Asia Tenggara melalui
                    pengalaman digital yang memukau.
                </p>

                <div className="fade-in-up" style={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap',
                    animationDelay: '0.8s'
                }}>
                    <a href="#destinations" className="btn-primary" style={{
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        padding: '12px 24px'
                    }}>
                        Mulai Eksplorasi
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            style={{ marginLeft: '6px', display: 'inline' }}
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                    <a href="#culture" className="btn-secondary" style={{
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        padding: '12px 24px'
                    }}>
                        Lihat Video
                    </a>
                </div>
            </div>

        </section>
    );
};

export default HeroSection;
