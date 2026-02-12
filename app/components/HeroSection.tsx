'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 240;
const IMAGE_PATH = '/image-sequences-hero-section/ezgif-frame-';

const getFrameSrc = (index: number): string => {
    const frameNum = Math.min(Math.max(index, 1), TOTAL_FRAMES);
    return `${IMAGE_PATH}${String(frameNum).padStart(3, '0')}.jpg`;
};

// Text slides that appear at different scroll points
const textSlides = [
    {
        title: 'Jelajahi',
        highlight: 'Jakarta',
        description: 'Kota metropolitan terbesar di Asia Tenggara yang penuh pesona dan kejutan di setiap sudutnya.',
    },
    {
        title: 'Warisan',
        highlight: 'Budaya',
        description: 'Dari Ondel-Ondel hingga Lenong, nikmati kekayaan budaya Betawi yang masih hidup dan lestari.',
    },
    {
        title: 'Cita Rasa',
        highlight: 'Nusantara',
        description: 'Kerak telor, soto Betawi, hingga gado-gado — surganya kuliner autentik yang menggugah selera.',
    },
    {
        title: 'Mulai',
        highlight: 'Petualangan',
        description: 'Temukan destinasi tersembunyi dan pengalaman tak terlupakan di ibu kota Indonesia.',
        showCTA: true,
    },
];

const HeroSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fixedContainerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef(0);
    const rafRef = useRef<number>(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    // Refs for each text slide
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);

    // Preload all images
    useEffect(() => {
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = getFrameSrc(i);
            img.onload = () => {
                loadedCount++;
                setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
                if (loadedCount === TOTAL_FRAMES) {
                    setIsLoaded(true);
                }
            };
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === TOTAL_FRAMES) {
                    setIsLoaded(true);
                }
            };
            images[i - 1] = img;
        }

        imagesRef.current = images;

        return () => {
            images.forEach(img => {
                img.onload = null;
                img.onerror = null;
            });
        };
    }, []);

    // Draw frame to canvas with high-DPI support
    const drawFrame = useCallback((frameIndex: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = imagesRef.current[frameIndex];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        const cw = canvas.width;
        const ch = canvas.height;

        // Cover-fit
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = cw / ch;

        let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

        if (imgRatio > canvasRatio) {
            sw = img.naturalHeight * canvasRatio;
            sx = (img.naturalWidth - sw) / 2;
        } else {
            sh = img.naturalWidth / canvasRatio;
            sy = (img.naturalHeight - sh) / 2;
        }

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    }, []);

    // Resize canvas for high-DPI
    useEffect(() => {
        const resizeCanvas = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const dpr = window.devicePixelRatio || 1;
            const w = window.innerWidth;
            const h = window.innerHeight;

            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;

            drawFrame(currentFrameRef.current);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, [drawFrame]);

    // Draw first frame when loaded
    useEffect(() => {
        if (isLoaded) {
            drawFrame(0);
        }
    }, [isLoaded, drawFrame]);

    // Scroll-linked animation
    useEffect(() => {
        if (!isLoaded) return;

        const handleScroll = () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }

            rafRef.current = requestAnimationFrame(() => {
                const section = sectionRef.current;
                const fixedContainer = fixedContainerRef.current;
                if (!section || !fixedContainer) return;

                const rect = section.getBoundingClientRect();
                const scrollableHeight = section.offsetHeight - window.innerHeight;

                // Hide when past hero
                if (rect.bottom <= 0) {
                    fixedContainer.style.visibility = 'hidden';
                    return;
                } else {
                    fixedContainer.style.visibility = 'visible';
                }

                // scrollProgress: 0 → 1
                const scrollProgress = Math.min(Math.max(-rect.top / scrollableHeight, 0), 1);

                // === FRAME ANIMATION ===
                const frameIndex = Math.min(
                    Math.floor(scrollProgress * (TOTAL_FRAMES - 1)),
                    TOTAL_FRAMES - 1
                );

                if (frameIndex !== currentFrameRef.current) {
                    currentFrameRef.current = frameIndex;
                    drawFrame(frameIndex);
                }

                // === SCROLL INDICATOR ===
                // Fade out scroll indicator quickly
                if (scrollIndicatorRef.current) {
                    const indicatorOpacity = Math.max(1 - scrollProgress * 8, 0);
                    scrollIndicatorRef.current.style.opacity = `${indicatorOpacity}`;
                }

                // === PROGRESS BAR ===
                const progressBar = fixedContainer.querySelector('.hero-progress-bar') as HTMLElement;
                if (progressBar) {
                    progressBar.style.height = `${scrollProgress * 100}%`;
                }

                // === TEXT SLIDES ===
                // Timeline: each slide owns a portion of the scroll
                // 0.00 - 0.08: empty (just video starts)
                // 0.08 - 0.30: slide 0
                // 0.30 - 0.52: slide 1
                // 0.52 - 0.74: slide 2
                // 0.74 - 0.96: slide 3
                // 0.96 - 1.00: fade out everything

                const slideCount = textSlides.length;
                const startOffset = 0.08;  // When first text starts
                const endOffset = 0.96;    // When last text ends
                const totalRange = endOffset - startOffset;
                const slideRange = totalRange / slideCount;

                slideRefs.current.forEach((slideEl, i) => {
                    if (!slideEl) return;

                    const slideStart = startOffset + i * slideRange;
                    const slideEnd = slideStart + slideRange;
                    const fadeDuration = slideRange * 0.3; // 30% of slide range for fade

                    let opacity = 0;
                    let translateY = 30;

                    if (scrollProgress >= slideStart && scrollProgress <= slideEnd) {
                        // Fade in phase
                        if (scrollProgress < slideStart + fadeDuration) {
                            const fadeProgress = (scrollProgress - slideStart) / fadeDuration;
                            opacity = fadeProgress;
                            translateY = 30 * (1 - fadeProgress);
                        }
                        // Visible phase
                        else if (scrollProgress < slideEnd - fadeDuration) {
                            opacity = 1;
                            translateY = 0;
                        }
                        // Fade out phase
                        else {
                            const fadeProgress = (slideEnd - scrollProgress) / fadeDuration;
                            opacity = fadeProgress;
                            translateY = -20 * (1 - fadeProgress);
                        }
                    }

                    slideEl.style.opacity = `${opacity}`;
                    slideEl.style.transform = `translateY(${translateY}px)`;
                    slideEl.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
                });
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isLoaded, drawFrame]);

    return (
        <>
            {/* Scroll spacer */}
            <section
                id="hero"
                ref={sectionRef}
                style={{
                    position: 'relative',
                    height: '400vh',
                    width: '100%',
                    background: 'transparent',
                }}
            />

            {/* Fixed fullscreen canvas + overlays */}
            <div
                ref={fixedContainerRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 1,
                    pointerEvents: 'none',
                }}
            >
                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        display: 'block',
                        filter: 'brightness(0.7) saturate(1.2)',
                    }}
                />

                {/* Gradient Overlay */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: `
                            linear-gradient(180deg, rgba(10, 10, 15, 0.15) 0%, rgba(10, 10, 15, 0.1) 40%, rgba(10, 10, 15, 0.6) 80%, rgba(10, 10, 15, 0.95) 100%),
                            linear-gradient(90deg, rgba(10, 10, 15, 0.3) 0%, transparent 50%)
                        `,
                        zIndex: 2,
                    }}
                />

                {/* Decorative Elements */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
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
                    <div className="decoration-grid" />
                </div>

                {/* Text Slides - positioned at bottom left */}
                {textSlides.map((slide, index) => (
                    <div
                        key={index}
                        ref={(el) => { slideRefs.current[index] = el; }}
                        style={{
                            position: 'absolute',
                            bottom: 'clamp(60px, 10vh, 100px)',
                            left: '5%',
                            maxWidth: '600px',
                            zIndex: 10,
                            opacity: 0,
                            willChange: 'transform, opacity',
                            transition: 'none',
                            pointerEvents: 'none',
                        }}
                    >
                        {/* Small label */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '16px',
                        }}>
                            <div style={{
                                width: '40px',
                                height: '2px',
                                background: 'var(--primary)',
                            }} />
                            <span style={{
                                color: 'var(--primary)',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.15em',
                            }}>
                                {String(index + 1).padStart(2, '0')} / {String(textSlides.length).padStart(2, '0')}
                            </span>
                        </div>

                        {/* Title */}
                        <h2 style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontWeight: 700,
                            lineHeight: 1.15,
                            letterSpacing: '-0.02em',
                            marginBottom: '12px',
                            color: 'var(--foreground)',
                        }}>
                            {slide.title}{' '}
                            <span className="gradient-text">{slide.highlight}</span>
                        </h2>

                        {/* Description */}
                        <p style={{
                            fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                            color: 'rgba(245, 245, 247, 0.7)',
                            maxWidth: '480px',
                            lineHeight: 1.7,
                            marginBottom: slide.showCTA ? '24px' : '0',
                        }}>
                            {slide.description}
                        </p>

                        {/* CTA Buttons - only on last slide */}
                        {slide.showCTA && (
                            <div style={{
                                display: 'flex',
                                gap: '12px',
                                flexWrap: 'wrap',
                                pointerEvents: 'auto',
                            }}>
                                <a href="#destinations" className="btn-primary" style={{
                                    textDecoration: 'none',
                                    fontSize: '0.85rem',
                                    padding: '12px 24px',
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
                                    padding: '12px 24px',
                                }}>
                                    Lihat Video
                                </a>
                            </div>
                        )}
                    </div>
                ))}

                {/* Scroll progress bar */}
                <div style={{
                    position: 'absolute',
                    right: '30px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '3px',
                    height: '120px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '2px',
                    zIndex: 10,
                    overflow: 'hidden',
                }}>
                    <div
                        className="hero-progress-bar"
                        style={{
                            width: '100%',
                            height: '0%',
                            background: 'var(--gradient-1)',
                            borderRadius: '2px',
                            transition: 'height 0.1s linear',
                        }}
                    />
                </div>

                {/* Scroll indicator - visible at start */}
                <div
                    ref={scrollIndicatorRef}
                    className="scroll-indicator"
                    style={{ zIndex: 10, pointerEvents: 'auto' }}
                >
                    <div className="mouse">
                        <div className="wheel" />
                    </div>
                    <span>Scroll</span>
                </div>

                {/* Loading overlay */}
                {!isLoaded && (
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'var(--background)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 50,
                            pointerEvents: 'auto',
                        }}
                    >
                        <div style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.2rem',
                            color: 'var(--text-muted)',
                            marginBottom: '20px',
                        }}>
                            Memuat visual...
                        </div>
                        <div style={{
                            width: '200px',
                            height: '4px',
                            background: 'var(--dark-surface-2)',
                            borderRadius: '2px',
                            overflow: 'hidden',
                        }}>
                            <div style={{
                                width: `${loadProgress}%`,
                                height: '100%',
                                background: 'var(--gradient-1)',
                                borderRadius: '2px',
                                transition: 'width 0.15s ease',
                            }} />
                        </div>
                        <div style={{
                            marginTop: '10px',
                            fontSize: '0.85rem',
                            color: 'var(--text-muted)',
                            opacity: 0.6,
                        }}>
                            {loadProgress}%
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default HeroSection;
