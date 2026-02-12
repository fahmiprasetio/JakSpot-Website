'use client';

import { useEffect, useRef, useState } from 'react';

interface Destination {
    id: number;
    name: string;
    category: string;
    image: string;
    description: string;
}

const destinations: Destination[] = [
    {
        id: 1,
        name: 'Monas',
        category: 'Monumen',
        image: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=800&q=80',
        description: 'Belum ke Jakarta kalau belum foto di sini'
    },
    {
        id: 2,
        name: 'Kota Tua',
        category: 'Sejarah',
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
        description: 'Jalan-jalan sambil belajar sejarah, vibes-nya beda'
    },
    {
        id: 3,
        name: 'Ancol',
        category: 'Hiburan',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        description: 'Weekend seru bareng teman atau keluarga'
    },
    {
        id: 4,
        name: 'SCBD',
        category: 'Modern',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80',
        description: 'Nongkrong kekinian sambil nikmatin skyline Jakarta'
    },
    {
        id: 5,
        name: 'Taman Mini',
        category: 'Budaya',
        image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
        description: 'Keliling Indonesia dalam satu hari? Bisa banget'
    },
    {
        id: 6,
        name: 'Pulau Seribu',
        category: 'Alam',
        image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=800&q=80',
        description: 'Kabur sebentar dari hiruk pikuk kota'
    }
];

const DestinationsSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeFilter, setActiveFilter] = useState('Semua');
    const filters = ['Semua', 'Monumen', 'Sejarah', 'Hiburan', 'Modern', 'Budaya', 'Alam'];

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

    // Parallax effect for cards
    useEffect(() => {
        const handleScroll = () => {
            const cards = document.querySelectorAll('.destination-card');
            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                if (scrollProgress > 0 && scrollProgress < 1) {
                    const offset = (scrollProgress - 0.5) * 50 * (index % 2 === 0 ? 1 : -1);
                    (card as HTMLElement).style.transform = `translateY(${offset}px)`;
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filteredDestinations = activeFilter === 'Semua'
        ? destinations
        : destinations.filter(d => d.category === activeFilter);

    return (
        <section id="destinations" ref={sectionRef} className="section" style={{
            background: 'var(--dark-surface)',
            position: 'relative',
            overflow: 'hidden'
        }}>

            {/* Background Decoration */}
            <div style={{
                position: 'absolute',
                top: '100px',
                right: '-200px',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(255, 107, 53, 0.1) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />

            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {/* Section Header */}
                <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <span style={{
                        color: 'var(--primary)',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                    }}>
                        Mau ke Mana Dulu?
                    </span>
                    <h2 className="section-title" style={{ marginTop: '16px' }}>
                        Spot Favorit yang<br />
                        <span className="gradient-text">Sayang Dilewatkan</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Dari yang klasik sampai yang hits, ini tempat-tempat
                        yang bikin kamu pengen balik lagi ke Jakarta.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="reveal" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '12px',
                    marginBottom: '50px',
                    flexWrap: 'wrap'
                }}>
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            style={{
                                padding: '10px 24px',
                                borderRadius: '50px',
                                border: 'none',
                                background: activeFilter === filter
                                    ? 'var(--gradient-1)'
                                    : 'var(--dark-surface-2)',
                                color: activeFilter === filter
                                    ? 'white'
                                    : 'var(--text-muted)',
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Destinations Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '30px'
                }}>
                    {filteredDestinations.map((destination, index) => (
                        <div
                            key={destination.id}
                            className="card destination-card reveal"
                            style={{
                                position: 'relative',
                                height: '450px',
                                cursor: 'pointer',
                                transitionDelay: `${index * 0.1}s`
                            }}
                        >
                            {/* Image */}
                            <div className="img-wrapper" style={{ position: 'absolute', inset: 0 }}>
                                <img
                                    src={destination.image}
                                    alt={destination.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                                <div className="img-overlay" />
                            </div>

                            {/* Category Badge */}
                            <div style={{
                                position: 'absolute',
                                top: '20px',
                                left: '20px',
                                zIndex: 10
                            }}>
                                <span className="glass" style={{
                                    padding: '8px 16px',
                                    borderRadius: '50px',
                                    fontSize: '0.8rem',
                                    color: 'white'
                                }}>
                                    {destination.category}
                                </span>
                            </div>

                            {/* Content */}
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: '30px',
                                zIndex: 10
                            }}>
                                <h3 style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '1.8rem',
                                    fontWeight: '700',
                                    marginBottom: '8px'
                                }}>
                                    {destination.name}
                                </h3>
                                <p style={{
                                    color: 'var(--text-muted)',
                                    fontSize: '0.95rem'
                                }}>
                                    {destination.description}
                                </p>

                                {/* Explore Button */}
                                <div style={{
                                    marginTop: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    color: 'var(--primary)',
                                    fontSize: '0.9rem',
                                    fontWeight: '600'
                                }}>
                                    <span>Jelajahi</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="reveal" style={{ textAlign: 'center', marginTop: '60px' }}>
                    <a href="#" className="btn-secondary" style={{ textDecoration: 'none' }}>
                        Lihat Semua Destinasi
                    </a>
                </div>
            </div>
        </section>
    );
};

export default DestinationsSection;
