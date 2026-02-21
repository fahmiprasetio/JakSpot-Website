'use client';

import { useEffect, useRef, useState } from 'react';

const cultureItems = [
    {
        title: 'Ondel-Ondel',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
        description: 'Ikon paling ikonik dari Jakarta. Muka yang agak serem itu justru lambang pelindung, bukan buat nakut-nakutin.'
    },
    {
        title: 'Tari Topeng',
        image: 'https://images.unsplash.com/photo-1545893835-abaa50cbe628?auto=format&fit=crop&w=800&q=80',
        description: 'Di balik topeng kayu itu ada cerita panjang. Setiap gerakan punya makna, setiap warna punya pesan.'
    },
    {
        title: 'Lenong',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        description: 'Teater rakyat Betawi yang pecah banget. Penuh humor khas Jakarta tapi nyentil juga. Drama, tapi yang bikin ngakak.'
    }
];

const CultureSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

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

        const revealElements = sectionRef.current?.querySelectorAll('.reveal');
        revealElements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    // Parallax effect for culture images
    useEffect(() => {
        const handleScroll = () => {
            imageRefs.current.forEach((ref, index) => {
                if (ref) {
                    const rect = ref.getBoundingClientRect();
                    const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                    if (scrollProgress > 0 && scrollProgress < 1) {
                        const scale = 1 + scrollProgress * 0.1;
                        const translateY = (1 - scrollProgress) * 30;
                        ref.style.transform = `scale(${scale}) translateY(${translateY}px)`;
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="culture" ref={sectionRef} className="section" style={{
            background: 'linear-gradient(180deg, var(--dark-surface) 0%, var(--background) 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative Elements */}
            <div className="decoration-circle" style={{
                width: '500px',
                height: '500px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(255, 107, 53, 0.15) 0%, transparent 70%)'
            }} />

            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {/* Section Header */}
                <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <span style={{
                        color: 'var(--secondary-light)',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                    }}>
                        Jangan Sampe Lo Lupa
                    </span>
                    <h2 className="section-title" style={{ marginTop: '16px' }}>
                        Akar Budaya<br />
                        <span className="gradient-text">Betawi</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Jakarta itu bukan cuma gedung tinggi dan macet. Ada budaya Betawi yang udah ada jauh sebelum semua itu, dan masih hidup sampai sekarang.
                    </p>
                </div>

                {/* Culture Showcase */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gap: '30px',
                    alignItems: 'center'
                }}>
                    {/* Large Featured Image */}
                    <div
                        className="reveal"
                        style={{
                            gridColumn: 'span 7',
                            position: 'relative',
                            height: '600px',
                            borderRadius: '24px',
                            overflow: 'hidden'
                        }}
                    >
                        <div
                            ref={(el) => { imageRefs.current[0] = el; }}
                            style={{
                                position: 'absolute',
                                inset: '-10%',
                                backgroundImage: `url(${cultureItems[activeIndex].image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                transition: 'all 0.6s ease'
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(180deg, transparent 50%, rgba(10, 10, 15, 0.9) 100%)'
                        }} />

                        {/* Image Counter */}
                        <div style={{
                            position: 'absolute',
                            top: '30px',
                            right: '30px',
                            display: 'flex',
                            gap: '8px'
                        }}>
                            {cultureItems.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    style={{
                                        width: index === activeIndex ? '40px' : '12px',
                                        height: '12px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        background: index === activeIndex ? 'var(--primary)' : 'rgba(255, 255, 255, 0.3)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            ))}
                        </div>

                        {/* Content Overlay */}
                        <div style={{
                            position: 'absolute',
                            bottom: '40px',
                            left: '40px',
                            right: '40px'
                        }}>
                            <h3 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2.5rem',
                                fontWeight: '700',
                                marginBottom: '12px'
                            }}>
                                {cultureItems[activeIndex].title}
                            </h3>
                            <p style={{
                                color: 'var(--text-muted)',
                                fontSize: '1rem',
                                lineHeight: '1.7',
                                maxWidth: '500px'
                            }}>
                                {cultureItems[activeIndex].description}
                            </p>
                        </div>
                    </div>

                    {/* Side Content */}
                    <div style={{
                        gridColumn: 'span 5',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px'
                    }}>
                        {/* Stats */}
                        <div className="reveal glass" style={{
                            padding: '30px',
                            borderRadius: '20px'
                        }}>
                            <h4 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '1.2rem',
                                fontWeight: '600',
                                marginBottom: '24px',
                                color: 'var(--primary)'
                            }}>
                                Fakta Menarik
                            </h4>
                            <div style={{ display: 'grid', gap: '20px' }}>
                                {[
                                    { number: '400+', label: 'Tahun Sejarah Betawi' },
                                    { number: '50+', label: 'Kesenian Tradisional' },
                                    { number: '100+', label: 'Festival Tahunan' }
                                ].map((stat, index) => (
                                    <div key={index} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px'
                                    }}>
                                        <div style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '16px',
                                            background: 'var(--dark-surface-2)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontFamily: 'var(--font-display)',
                                            fontSize: '1.2rem',
                                            fontWeight: '700',
                                            color: 'var(--accent)'
                                        }}>
                                            {stat.number}
                                        </div>
                                        <span style={{ color: 'var(--text-muted)' }}>
                                            {stat.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Small Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            {cultureItems.slice(1).map((item, index) => (
                                <div
                                    key={index}
                                    className="reveal card"
                                    onClick={() => setActiveIndex(index + 1)}
                                    style={{
                                        height: '180px',
                                        cursor: 'pointer',
                                        opacity: activeIndex === index + 1 ? 1 : 0.7,
                                        border: activeIndex === index + 1 ? '2px solid var(--primary)' : 'none',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div
                                        ref={(el) => { imageRefs.current[index + 1] = el; }}
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            backgroundImage: `url(${item.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            transition: 'transform 0.4s ease'
                                        }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(180deg, transparent 30%, rgba(10, 10, 15, 0.9) 100%)'
                                    }} />
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '16px',
                                        left: '16px',
                                        right: '16px'
                                    }}>
                                        <h4 style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: '1.1rem',
                                            fontWeight: '600'
                                        }}>
                                            {item.title}
                                        </h4>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <a href="#" className="btn-primary reveal" style={{
                            textDecoration: 'none',
                            textAlign: 'center',
                            marginTop: '10px'
                        }}>
                            Pelajari Lebih Lanjut
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CultureSection;
