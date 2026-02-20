'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface EventItem {
    id: number;
    title: string;
    category: string;
    date: string;
    location: string;
    description: string;
    image: string;
    videoSrc?: string; // Will be used later when videos are ready
}

const events: EventItem[] = [
    {
        id: 1,
        title: 'Jakarta Fair (PRJ)',
        category: 'Festival',
        date: 'Juni - Juli 2026',
        location: 'JIExpo Kemayoran',
        description: 'Pameran dan hiburan tahunan terbesar di Jakarta. Nikmati wahana, konser musik, dan ribuan stand kuliner & produk lokal.',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1920&q=80',
    },
    {
        id: 2,
        title: 'Java Jazz Festival',
        category: 'Musik',
        date: 'Maret 2026',
        location: 'JIExpo Kemayoran',
        description: 'Festival jazz bertaraf internasional dengan line-up artis dunia. Tiga hari penuh musik berkualitas tinggi.',
        image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1920&q=80',
    },
    {
        id: 3,
        title: 'Djakarta Warehouse Project',
        category: 'Musik',
        date: 'Desember 2026',
        location: 'JIExpo Kemayoran',
        description: 'Festival musik EDM terbesar di Asia Tenggara. Pengalaman yang tak terlupakan dengan DJ-DJ kelas dunia.',
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1920&q=80',
    },
    {
        id: 4,
        title: 'Art Jakarta',
        category: 'Seni',
        date: 'Agustus 2026',
        location: 'Jakarta Convention Center',
        description: 'Pameran seni kontemporer terbesar di Indonesia, menampilkan karya dari galeri-galeri ternama Asia Tenggara.',
        image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?auto=format&fit=crop&w=1920&q=80',
    },
    {
        id: 5,
        title: 'Festival Palang Pintu',
        category: 'Budaya',
        date: 'Juni 2026',
        location: 'Kemang, Jakarta Selatan',
        description: 'Festival budaya Betawi yang menampilkan tradisi palang pintu, pencak silat, dan kesenian khas Betawi.',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1920&q=80',
    },
];

const EventSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

    // Reveal animation
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

    const goToSlide = useCallback((index: number) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setActiveIndex(index);
        setTimeout(() => setIsTransitioning(false), 600);
    }, [isTransitioning]);

    const nextSlide = useCallback(() => {
        goToSlide((activeIndex + 1) % events.length);
    }, [activeIndex, goToSlide]);

    const prevSlide = useCallback(() => {
        goToSlide((activeIndex - 1 + events.length) % events.length);
    }, [activeIndex, goToSlide]);

    // Auto-play
    useEffect(() => {
        autoPlayRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % events.length);
        }, 6000);

        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };
    }, []);

    // Pause auto-play on hover
    const pauseAutoPlay = () => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };

    const resumeAutoPlay = () => {
        autoPlayRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % events.length);
        }, 6000);
    };

    const currentEvent = events[activeIndex];

    return (
        <section
            id="events"
            ref={sectionRef}
            className="section"
            style={{
                background: 'var(--background)',
                position: 'relative',
                overflow: 'hidden',
                padding: '60px 0',
            }}
        >
            {/* Section Header */}
            <div className="reveal" style={{
                textAlign: 'center',
                marginBottom: '60px',
                padding: '0 5%',
            }}>
                <span style={{
                    color: 'var(--accent)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                }}>
                    What&apos;s Happening
                </span>
                <h2 className="section-title" style={{ marginTop: '16px' }}>
                    Event &<br />
                    <span className="gradient-text">Festival</span>
                </h2>
                <p className="section-subtitle" style={{ margin: '0 auto' }}>
                    Jangan lewatkan event dan festival seru yang berlangsung di Jakarta.
                </p>
            </div>

            {/* Carousel */}
            <div
                className="reveal"
                onMouseEnter={pauseAutoPlay}
                onMouseLeave={resumeAutoPlay}
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '0 5%',
                }}
            >
                {/* Main Slide */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '550px',
                    borderRadius: '24px',
                    overflow: 'hidden',
                }}>
                    {/* Background Images - all rendered, only active visible */}
                    {events.map((event, index) => (
                        <div
                            key={event.id}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                opacity: index === activeIndex ? 1 : 0,
                                transform: index === activeIndex ? 'scale(1)' : 'scale(1.05)',
                                transition: 'opacity 0.6s ease, transform 4s ease',
                                zIndex: index === activeIndex ? 1 : 0,
                            }}
                        >
                            {/* Image or Video placeholder */}
                            <img
                                src={event.image}
                                alt={event.title}
                                loading="lazy"
                                decoding="async"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                    ))}

                    {/* Gradient Overlay */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                        zIndex: 2,
                    }} />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
                        zIndex: 2,
                    }} />

                    {/* Content Overlay */}
                    <div style={{
                        position: 'absolute',
                        bottom: '50px',
                        left: '50px',
                        right: '50px',
                        zIndex: 3,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                    }}>
                        {/* Left - Event Info */}
                        <div style={{ maxWidth: '550px' }}>
                            {/* Category Badge */}
                            <span style={{
                                display: 'inline-block',
                                background: 'var(--gradient-1)',
                                padding: '6px 16px',
                                borderRadius: '50px',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                color: 'white',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                marginBottom: '16px',
                            }}>
                                {currentEvent.category}
                            </span>

                            {/* Title */}
                            <h3 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                                fontWeight: '700',
                                color: 'white',
                                lineHeight: '1.2',
                                marginBottom: '12px',
                            }}>
                                {currentEvent.title}
                            </h3>

                            {/* Description */}
                            <p style={{
                                color: 'rgba(255,255,255,0.8)',
                                fontSize: '1rem',
                                lineHeight: '1.7',
                                marginBottom: '20px',
                            }}>
                                {currentEvent.description}
                            </p>

                            {/* Date & Location */}
                            <div style={{
                                display: 'flex',
                                gap: '24px',
                                flexWrap: 'wrap',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    color: 'var(--accent)',
                                    fontSize: '0.9rem',
                                    fontWeight: '500',
                                }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                    {currentEvent.date}
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    color: 'rgba(255,255,255,0.7)',
                                    fontSize: '0.9rem',
                                    fontWeight: '500',
                                }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    {currentEvent.location}
                                </div>
                            </div>
                        </div>

                        {/* Right - Navigation */}
                        <div style={{
                            display: 'flex',
                            gap: '12px',
                        }}>
                            <button
                                onClick={prevSlide}
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    color: 'white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--primary)';
                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={nextSlide}
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    color: 'white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--primary)';
                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: 'rgba(255,255,255,0.1)',
                        zIndex: 3,
                    }}>
                        <div style={{
                            height: '100%',
                            width: `${((activeIndex + 1) / events.length) * 100}%`,
                            background: 'var(--gradient-1)',
                            transition: 'width 0.6s ease',
                        }} />
                    </div>
                </div>

                {/* Thumbnail Navigation */}
                <div style={{
                    display: 'flex',
                    gap: '16px',
                    marginTop: '24px',
                    overflowX: 'auto',
                    paddingBottom: '8px',
                }}>
                    {events.map((event, index) => (
                        <button
                            key={event.id}
                            onClick={() => goToSlide(index)}
                            style={{
                                flexShrink: 0,
                                width: '200px',
                                height: '70px',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                position: 'relative',
                                cursor: 'pointer',
                                border: index === activeIndex
                                    ? '2px solid var(--primary)'
                                    : '2px solid transparent',
                                opacity: index === activeIndex ? 1 : 0.5,
                                transition: 'all 0.3s ease',
                                background: 'none',
                                padding: 0,
                            }}
                        >
                            <img
                                src={event.image}
                                alt={event.title}
                                loading="lazy"
                                decoding="async"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: index === activeIndex
                                    ? 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)'
                                    : 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 100%)',
                            }} />
                            <span style={{
                                position: 'absolute',
                                bottom: '8px',
                                left: '10px',
                                right: '10px',
                                color: 'white',
                                fontSize: '0.7rem',
                                fontWeight: '600',
                                textAlign: 'left',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>
                                {event.title}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventSection;
