'use client';

import { useEffect, useRef } from 'react';

const ParallaxBridge = () => {
    const bridgeRef = useRef<HTMLDivElement>(null);
    const layersRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const handleScroll = () => {
            if (!bridgeRef.current) return;

            const rect = bridgeRef.current.getBoundingClientRect();
            const viewH = window.innerHeight;
            // 0 when top of bridge enters bottom of viewport, 1 when bottom exits top
            const progress = Math.max(0, Math.min(1, (viewH - rect.top) / (viewH + rect.height)));

            layersRef.current.forEach((layer, i) => {
                if (!layer) return;
                const speed = (i + 1) * 0.15; // Each layer moves at different speed
                const yOffset = (progress - 0.5) * speed * 200;
                const scale = 1 + progress * 0.05 * (i + 1);
                layer.style.transform = `translateY(${yOffset}px) scale(${scale})`;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            ref={bridgeRef}
            style={{
                position: 'relative',
                zIndex: 2,
                height: '70vh',
                overflow: 'hidden',
                background: 'var(--dark-surface)',
            }}
        >
            {/* Layer 1 — Far background: large radial gradient glow */}
            <div
                ref={(el) => { layersRef.current[0] = el; }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `
                        radial-gradient(ellipse 80% 50% at 50% 60%, rgba(255, 107, 53, 0.12) 0%, transparent 70%),
                        radial-gradient(ellipse 60% 40% at 20% 40%, rgba(255, 193, 7, 0.06) 0%, transparent 60%)
                    `,
                    willChange: 'transform',
                }}
            />

            {/* Layer 2 — Midground: floating geometric shapes */}
            <div
                ref={(el) => { layersRef.current[1] = el; }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    willChange: 'transform',
                }}
            >
                {/* Diagonal line */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '200px',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.3), transparent)',
                    transform: 'rotate(-15deg)',
                }} />
                {/* Circle ring */}
                <div style={{
                    position: 'absolute',
                    top: '30%',
                    right: '15%',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 107, 53, 0.15)',
                }} />
                {/* Small dot cluster */}
                <div style={{
                    position: 'absolute',
                    top: '60%',
                    left: '25%',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'rgba(255, 193, 7, 0.4)',
                    boxShadow: `
                        20px -10px 0 rgba(255, 193, 7, 0.2),
                        40px 5px 0 rgba(255, 107, 53, 0.3),
                        -15px 20px 0 rgba(255, 193, 7, 0.15)
                    `,
                }} />
                {/* Another diagonal line */}
                <div style={{
                    position: 'absolute',
                    bottom: '25%',
                    right: '25%',
                    width: '150px',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 193, 7, 0.25), transparent)',
                    transform: 'rotate(20deg)',
                }} />
            </div>

            {/* Layer 3 — Foreground: big blurred orb that moves faster */}
            <div
                ref={(el) => { layersRef.current[2] = el; }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    willChange: 'transform',
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 107, 53, 0.08) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }} />
            </div>

            {/* Center quote text */}
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5,
                padding: '0 10%',
                textAlign: 'center',
            }}>
                {/* Decorative top line */}
                <div style={{
                    width: '60px',
                    height: '2px',
                    background: 'var(--gradient-1)',
                    marginBottom: '30px',
                    borderRadius: '2px',
                }} />

                <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                    fontWeight: '600',
                    color: 'var(--foreground)',
                    lineHeight: '1.5',
                    maxWidth: '700px',
                    opacity: 0.9,
                }}>
                    Bukan cuma tempatnya —{' '}
                    <span style={{
                        background: 'var(--gradient-1)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>
                        eventnya juga gak kalah seru
                    </span>
                </p>

                <p style={{
                    fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
                    color: 'var(--text-muted)',
                    marginTop: '16px',
                    maxWidth: '500px',
                    lineHeight: '1.7',
                }}>
                    Jakarta selalu punya alasan buat lo balik lagi.
                </p>

                {/* Decorative bottom line */}
                <div style={{
                    width: '60px',
                    height: '2px',
                    background: 'var(--gradient-1)',
                    marginTop: '30px',
                    borderRadius: '2px',
                }} />
            </div>

            {/* Top gradient fade from section 2 */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '30%',
                background: 'linear-gradient(180deg, var(--dark-surface) 0%, transparent 100%)',
                zIndex: 4,
                pointerEvents: 'none',
            }} />

            {/* Bottom gradient fade into section 3 */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '30%',
                background: 'linear-gradient(0deg, var(--background) 0%, transparent 100%)',
                zIndex: 4,
                pointerEvents: 'none',
            }} />

            {/* Subtle grid pattern */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                    linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px',
                pointerEvents: 'none',
                zIndex: 1,
            }} />
        </div>
    );
};

export default ParallaxBridge;
