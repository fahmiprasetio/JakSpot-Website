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
        name: 'Waroeng Roekoen',
        origin: 'Jakarta',
        image: '/Destination/Cafe, Bar, and Eatery/waroeng roekoen.jpg',
        price: 'Rp 50k - 150k',
        description: 'Suasana nyaman dengan sajian kuliner yang menggugah selera.'
    },
    {
        id: 2,
        name: 'The Cafe Hotel Mulia',
        origin: 'Senayan',
        image: '/Destination/Cafe, Bar, and Eatery/The Cafe Hotel Mulia.jpg',
        price: 'Rp 500k++',
        description: 'Experience dining mewah dengan pilihan menu internasional terbaik.'
    },
    {
        id: 3,
        name: 'The Platform Bar',
        origin: 'Jakarta',
        image: '/Destination/Cafe, Bar, and Eatery/The Platform Jakarta.webp',
        price: 'Rp 100k - 300k',
        description: 'Bar dengan pemandangan kota Jakarta yang menakjubkan.'
    },
    {
        id: 4,
        name: 'St. Regis Bar',
        origin: 'Kuningan',
        image: '/Destination/Cafe, Bar, and Eatery/St Regis Jakarta Bar.jpg',
        price: 'Rp 200k++',
        description: 'Jazz bar elegan dengan koleksi cocktail premium.'
    },
    {
        id: 5,
        name: 'Sarang Semut',
        origin: 'Jakarta',
        image: '/Destination/Cafe, Bar, and Eatery/sarang-semut.jpg',
        price: 'Rp 50k - 100k',
        description: 'Tempat nongkrong unik dengan desain artistik.'
    },
    {
        id: 6,
        name: 'Costess Bar',
        origin: 'Kuningan',
        image: '/Destination/Cafe, Bar, and Eatery/Costess Cafe Jakarta.jpg',
        price: 'Rp 150k - 300k',
        description: 'Rooftop bar dengan view 360 derajat kota Jakarta.'
    },
    {
        id: 7,
        name: 'Row 9 Cafe',
        origin: 'Blok M',
        image: '/Destination/Cafe, Bar, and Eatery/row9.jpg',
        price: 'Rp 50k - 150k',
        description: 'Cafe hits di Blok M dengan suasana yang cozy.'
    },
    {
        id: 8,
        name: 'Masagi Coffee',
        origin: 'BSD / Jakarta',
        image: '/Destination/Cafe, Bar, and Eatery/Masagi Coffee.webp',
        price: 'Rp 30k - 70k',
        description: 'Kopi berkualitas dengan suasana taman yang asri.'
    },
    {
        id: 9,
        name: 'Tugo Coffee',
        origin: 'Jakarta',
        image: '/Destination/Cafe, Bar, and Eatery/Tugo Coffee.jpg',
        price: 'Rp 30k - 80k',
        description: 'Spot ngopi favorit dengan biji kopi pilihan.'
    },
    {
        id: 10,
        name: 'Kurasu Kissaten',
        origin: 'Senopati',
        image: '/Destination/Cafe, Bar, and Eatery/Kurasu.jpg',
        price: 'Rp 50k - 100k',
        description: 'Cabang coffee shop populer dari Kyoto.'
    },
    {
        id: 11,
        name: 'HOMS Jakarta',
        origin: 'Jakarta',
        image: '/Destination/Cafe, Bar, and Eatery/HOMS.jpg',
        price: 'Rp 50k - 150k',
        description: 'Homey vibes cafe yang cocok untuk work from cafe.'
    },
    {
        id: 12,
        name: 'Salty Salty PIK',
        origin: 'PIK',
        image: '/Destination/Cafe, Bar, and Eatery/Salty Salty.jpg',
        price: 'Rp 50k - 150k',
        description: 'Cafe estetik di PIK dengan menu brunch andalan.'
    },
    {
        id: 13,
        name: "Billy's Block",
        origin: 'Jakarta',
        image: "/Destination/Cafe, Bar, and Eatery/Billy's Block.jpeg",
        price: 'Rp 50k - 150k',
        description: 'Tempat hangout seru dengan musik dan vibes yang asik.'
    },
    {
        id: 14,
        name: 'RM. Fariz',
        origin: 'Jakarta',
        image: '/Destination/Cafe, Bar, and Eatery/RM Fariz.jpeg',
        price: 'Rp 30k - 80k',
        description: 'Rumah makan legendaris dengan cita rasa nusantara.'
    },
    {
        id: 15,
        name: 'Toko Kopi Maru',
        origin: 'Fatmawati',
        image: '/Destination/Cafe, Bar, and Eatery/Toko Kopi Maru.jpeg',
        price: 'Rp 30k - 70k',
        description: 'Kopi susu gula aren yang creamy dan nagih.'
    },
    {
        id: 16,
        name: 'Dudung Maman Kopi',
        origin: 'Jakarta',
        image: '/Destination/Cafe, Bar, and Eatery/Dudung Maman Kopi.jpg',
        price: 'Rp 20k - 50k',
        description: 'Warung kopi sederhana dengan rasa istimewa.'
    },
    {
        id: 17,
        name: 'Kopi Kalyan',
        origin: 'Cikajang',
        image: '/Destination/Cafe, Bar, and Eatery/Kopi Kalyan.jpeg',
        price: 'Rp 40k - 90k',
        description: 'Coffee shop luas yang nyaman untuk meeting atau nongkrong.'
    },
    {
        id: 18,
        name: 'Smiljan Makarya',
        origin: 'Jakarta',
        image: '/Destination/Cafe, Bar, and Eatery/Smiljan Makarya.jpeg',
        price: 'Rp 50k - 100k',
        description: 'Cafe dengan konsep industrial yang instagramable.'
    },
    {
        id: 19,
        name: 'Ngoepi',
        origin: 'Jakarta',
        image: '/Destination/Cafe, Bar, and Eatery/Ngoepi.jpg',
        price: 'Rp 20k - 50k',
        description: 'Tempat ngopi santai harga bersahabat.'
    },
    {
        id: 20,
        name: 'Tsuki at the Alley',
        origin: 'Jakarta',
        image: '/Destination/Cafe, Bar, and Eatery/Tsuki at the Alley.jpg',
        price: 'Rp 50k - 100k',
        description: 'Hidden gem cafe dengan nuansa Jepang.'
    },
    {
        id: 21,
        name: 'Bossanova',
        origin: 'Jakarta',
        image: '/Destination/Cafe, Bar, and Eatery/Bossanova.jpeg',
        price: 'Rp 50k - 150k',
        description: 'Cafe dengan suasana retro yang unik.'
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
                        Spot Favorit
                    </span>
                    <h2 className="section-title" style={{ marginTop: '16px' }}>
                        Cafe, Bar &<br />
                        <span className="gradient-text">Eatery</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Jelajahi destinasi kuliner hits dan tempat nongkrong terbaik di Jakarta.
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
                                    loading="lazy"
                                    decoding="async"
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
