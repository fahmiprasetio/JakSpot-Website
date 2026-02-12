'use client';

import { useEffect, useRef } from 'react';

interface CulinaryItem {
    id: number;
    name: string;
    origin: string;
    image: string;
    price: string;
    description: string;
}

const culinaryItems: CulinaryItem[] = [
    {
        id: 1,
        name: 'Martabak Boss',
        origin: 'Menteng',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
        price: 'Rp 45.000',
        description: 'Martabak manis overload yang bikin lo gak mau share'
    },
    {
        id: 2,
        name: 'Ramen Nagi',
        origin: 'Grand Indo',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
        price: 'Rp 85.000',
        description: 'Kuahnya rich banget, antri panjang tapi worth it'
    },
    {
        id: 3,
        name: 'Kopi Kenangan',
        origin: 'Everywhere',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
        price: 'Rp 18.000',
        description: 'Es kopi susu yang jadi daily fuel anak Jakarta'
    },
    {
        id: 4,
        name: 'Sei Sapiku',
        origin: 'Sunter',
        image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80',
        price: 'Rp 55.000',
        description: 'Daging asap NTT yang hype-nya gak pernah turun'
    },
    {
        id: 5,
        name: 'Taco Local',
        origin: 'Kemang',
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80',
        price: 'Rp 35.000',
        description: 'Mexican food di gang kecil, rasanya beneran authentic'
    },
    {
        id: 6,
        name: 'Bakmi GM',
        origin: 'Jakarta',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
        price: 'Rp 42.000',
        description: 'Comfort food legendaris yang gak ada matinya'
    }
];

const CulinarySection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

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

    // Horizontal scroll parallax
    useEffect(() => {
        const handleScroll = () => {
            if (!scrollContainerRef.current || !sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const scrollProgress = -rect.top / (rect.height - window.innerHeight);

            if (scrollProgress > 0 && scrollProgress < 1) {
                const translateX = scrollProgress * -50; // Move cards horizontally
                scrollContainerRef.current.style.transform = `translateX(${translateX}%)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="culinary" ref={sectionRef} className="section" style={{
            background: 'var(--background)',
            position: 'relative',
            minHeight: '200vh', // Extended height for horizontal scroll effect
            overflow: 'hidden'
        }}>
            {/* Sticky Container */}
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                {/* Background Pattern */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(255, 193, 7, 0.1) 0%, transparent 50%)
          `,
                    pointerEvents: 'none'
                }} />

                {/* Section Header */}
                <div className="reveal" style={{
                    textAlign: 'center',
                    marginBottom: '60px',
                    padding: '0 5%'
                }}>
                    <span style={{
                        color: 'var(--accent)',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                    }}>
                        Kuliner Khas
                    </span>
                    <h2 className="section-title" style={{ marginTop: '16px' }}>
                        Cita Rasa<br />
                        <span className="gradient-text">Jakarta</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Nikmati kelezatan kuliner khas Betawi yang autentik dan menggugah selera.
                    </p>
                </div>

                {/* Horizontal Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    style={{
                        display: 'flex',
                        gap: '30px',
                        padding: '20px 10%',
                        transition: 'transform 0.1s ease-out',
                        willChange: 'transform'
                    }}
                >
                    {culinaryItems.map((item, index) => (
                        <div
                            key={item.id}
                            className="card reveal"
                            style={{
                                minWidth: '350px',
                                flexShrink: 0,
                                transitionDelay: `${index * 0.1}s`
                            }}
                        >
                            {/* Image */}
                            <div className="img-wrapper" style={{ height: '220px' }}>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>

                            {/* Content */}
                            <div style={{ padding: '24px' }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '12px'
                                }}>
                                    <div>
                                        <h3 style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: '1.4rem',
                                            fontWeight: '700'
                                        }}>
                                            {item.name}
                                        </h3>
                                        <span style={{
                                            fontSize: '0.85rem',
                                            color: 'var(--primary)'
                                        }}>
                                            {item.origin}
                                        </span>
                                    </div>
                                    <span style={{
                                        background: 'var(--dark-surface-3)',
                                        padding: '6px 12px',
                                        borderRadius: '8px',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        color: 'var(--accent)'
                                    }}>
                                        {item.price}
                                    </span>
                                </div>

                                <p style={{
                                    color: 'var(--text-muted)',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.6'
                                }}>
                                    {item.description}
                                </p>

                                {/* Rating */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    marginTop: '16px'
                                }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                            key={star}
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill={star <= 4 ? 'var(--accent)' : 'none'}
                                            stroke="var(--accent)"
                                            strokeWidth="2"
                                        >
                                            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                                        </svg>
                                    ))}
                                    <span style={{
                                        marginLeft: '8px',
                                        fontSize: '0.85rem',
                                        color: 'var(--text-muted)'
                                    }}>
                                        4.8
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Scroll Hint */}
                <div className="reveal" style={{
                    textAlign: 'center',
                    marginTop: '40px',
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem'
                }}>
                    <span>Scroll untuk melihat lebih banyak →</span>
                </div>
            </div>
        </section>
    );
};

export default CulinarySection;
