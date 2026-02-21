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
        description: 'Masakan rumahan yang bikin lo makan banyak tanpa drama dan tanpa kantong jebol'
    },
    {
        id: 2,
        name: 'The Cafe Hotel Mulia',
        origin: 'Senayan',
        image: '/Destination/Cafe, Bar, and Eatery/The Cafe Hotel Mulia.jpg',
        price: 'Rp 500k++',
        description: 'Kalau lo mau impress seseorang, ini tempatnya. Fine dining level dewa di jantung Senayan'
    },
    {
        id: 3,
        name: 'The Platform Bar',
        origin: 'Jakarta',
        image: '/Destination/Cafe, Bar, and Eatery/The Platform Jakarta.webp',
        price: 'Rp 100k - 300k',
        description: 'Cocktail sambil ngeliatin Bundaran HI dari atas? Serius, ini nyata dan lo bisa'
    },
    {
        id: 4,
        name: 'St. Regis Bar',
        origin: 'Kuningan',
        image: '/Destination/Cafe, Bar, and Eatery/St Regis Jakarta Bar.jpg',
        price: 'Rp 200k++',
        description: 'Jazz live, cocktail premium, WiFi kenceng. New York vibe tapi koordinatnya Kuningan'
    },
    {
        id: 5,
        name: 'Sarang Semut',
        origin: 'Jakarta',
        image: '/Destination/Cafe, Bar, and Eatery/sarang-semut.jpg',
        price: 'Rp 50k - 100k',
        description: 'Interior gua batu yang literally unik parah, setiap sudut foto lo bakal auto keren'
    },
    {
        id: 6,
        name: 'Costess Bar',
        origin: 'Kuningan',
        image: '/Destination/Cafe, Bar, and Eatery/Costess Cafe Jakarta.jpg',
        price: 'Rp 150k - 300k',
        description: 'View gedung kaca Kuningan dari atas sambil pegang cocktail. Gak ada yang lebih Jakarta dari ini'
    },
    {
        id: 7,
        name: 'Row 9 Cafe',
        origin: 'Blok M',
        image: '/Destination/Cafe, Bar, and Eatery/row9.jpg',
        price: 'Rp 50k - 150k',
        description: 'Outdoor vibes di Blok M, cocok banget buat sore-sorean sambil nunggu macet kelar'
    },
    {
        id: 8,
        name: 'Masagi Coffee',
        origin: 'BSD / Jakarta',
        image: '/Destination/Cafe, Bar, and Eatery/Masagi Coffee.webp',
        price: 'Rp 30k - 70k',
        description: 'Ngopi di tengah taman, gak ada drama, chill total'
    },
    {
        id: 9,
        name: 'Tugo Coffee',
        origin: 'Jakarta',
        image: '/Destination/Cafe, Bar, and Eatery/Tugo Coffee.jpg',
        price: 'Rp 30k - 80k',
        description: 'Single origin yang dikerjain serius, buat lo yang udah beyond kopi sachet'
    },
    {
        id: 10,
        name: 'Kurasu Kissaten',
        origin: 'Senopati',
        image: '/Destination/Cafe, Bar, and Eatery/Kurasu.jpg',
        price: 'Rp 50k - 100k',
        description: 'Straight from Kyoto. Precision coffee yang bikin lo ngerti kenapa orang rela bayar mahal'
    },
    {
        id: 11,
        name: 'HOMS Jakarta',
        origin: 'Jakarta',
        image: '/Destination/Cafe, Bar, and Eatery/HOMS.jpg',
        price: 'Rp 50k - 150k',
        description: 'Vibes rumah orang kaya yang cozy banget, WiFi-nya kenceng, cocok WFC seharian'
    },
    {
        id: 12,
        name: 'Salty Salty PIK',
        origin: 'PIK',
        image: '/Destination/Cafe, Bar, and Eatery/Salty Salty.jpg',
        price: 'Rp 50k - 150k',
        description: 'Brunch yang instagramable parah tapi rasanya beneran enak, bukan cuma cantik doang'
    },
    {
        id: 13,
        name: "Billy's Block",
        origin: 'Jakarta',
        image: "/Destination/Cafe, Bar, and Eatery/Billy's Block.jpeg",
        price: 'Rp 50k - 150k',
        description: 'Live music, crowd asik, vibes naik terus tiap malam. Weekend lo harus di sini'
    },
    {
        id: 14,
        name: 'RM. Fariz',
        origin: 'Jakarta',
        image: '/Destination/Cafe, Bar, and Eatery/RM Fariz.jpeg',
        price: 'Rp 30k - 80k',
        description: 'Cita rasa nusantara yang jujur dan familiar, harga yang gak bikin lo overthinking'
    },
    {
        id: 15,
        name: 'Toko Kopi Maru',
        origin: 'Fatmawati',
        image: '/Destination/Cafe, Bar, and Eatery/Toko Kopi Maru.jpeg',
        price: 'Rp 30k - 70k',
        description: 'Gula aren, susu, kopi. Formula sederhana yang bikin lo balik lagi dan lagi'
    },
    {
        id: 16,
        name: 'Dudung Maman Kopi',
        origin: 'Jakarta',
        image: '/Destination/Cafe, Bar, and Eatery/Dudung Maman Kopi.jpg',
        price: 'Rp 20k - 50k',
        description: 'Harga warung tapi kualitasnya specialty. Temuan terbaik yang lo mau flex ke temen'
    },
    {
        id: 17,
        name: 'Kopi Kalyan',
        origin: 'Cikajang',
        image: '/Destination/Cafe, Bar, and Eatery/Kopi Kalyan.jpeg',
        price: 'Rp 40k - 90k',
        description: 'Luas, adem, WiFi lancar. Surga buat lo yang kerja remote tapi butuh suasana baru'
    },
    {
        id: 18,
        name: 'Smiljan Makarya',
        origin: 'Jakarta',
        image: '/Destination/Cafe, Bar, and Eatery/Smiljan Makarya.jpeg',
        price: 'Rp 50k - 100k',
        description: 'Industrial vibes yang foto-fotonya auto kece dan kopi-nya dikerjain dengan serius'
    },
    {
        id: 19,
        name: 'Ngoepi',
        origin: 'Jakarta',
        image: '/Destination/Cafe, Bar, and Eatery/Ngoepi.jpg',
        price: 'Rp 20k - 50k',
        description: 'Santai, murah, dan enak. Trifecta langka yang jarang banget lo temuin sekaligus'
    },
    {
        id: 20,
        name: 'Tsuki at the Alley',
        origin: 'Jakarta',
        image: '/Destination/Cafe, Bar, and Eatery/Tsuki at the Alley.jpg',
        price: 'Rp 50k - 100k',
        description: 'Gang tersembunyi dengan nuansa malam Tokyo. Lo harus nemu sendiri buat ngerasainnya'
    },
    {
        id: 21,
        name: 'Bossanova',
        origin: 'Jakarta',
        image: '/Destination/Cafe, Bar, and Eatery/Bossanova.jpeg',
        price: 'Rp 50k - 150k',
        description: 'Retro yang gak dipaksain, malah bikin lo pengen duduk lama-lama dan gak mau pulang'
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
                        Dari kopi yang serius sampe rooftop buat flex, ini daftar wajib lo kalau lagi muter-muter Jakarta.
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
