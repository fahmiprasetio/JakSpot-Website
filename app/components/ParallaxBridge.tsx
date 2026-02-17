'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const ParallaxBridge = () => {
    const bridgeRef = useRef<HTMLDivElement>(null);
    const buildingRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                if (!bridgeRef.current) { ticking = false; return; }
                const rect = bridgeRef.current.getBoundingClientRect();
                const vh = window.innerHeight;
                const progress = (vh - rect.top) / (vh + rect.height);
                const centered = Math.max(-0.5, Math.min(0.5, progress - 0.5));

                // Buildings (foreground) stay static relative to container (user wants it "diam")
                if (buildingRef.current) {
                    buildingRef.current.style.transform = 'translate3d(0, 0, 0)';
                }
                // Background image scans vertically to show its height (user wants it "terscroll")
                if (glowRef.current) {
                    glowRef.current.style.transform = `translate3d(0, ${(progress - 0.5) * -150}px, 0)`;
                }

                ticking = false;
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={bridgeRef} style={{
            position: 'relative',
            zIndex: 10,
            height: '80vh',
            minHeight: '500px',
            maxHeight: '900px',
            overflow: 'hidden',
            backgroundColor: '#0a0a0f',
        }}>

            {/* LAYER 1 (PALING BELAKANG): Bridge Background Image */}
            <div
                ref={glowRef}
                style={{
                    position: 'absolute',
                    inset: '-50%',
                    zIndex: 0,
                    willChange: 'transform',
                    pointerEvents: 'none',
                    // Fade out towards the top using mask
                    maskImage: 'linear-gradient(to top, black 0%, black 25%, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.8) 55%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.2) 90%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 0%, black 25%, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.8) 55%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.2) 90%, transparent 100%)',
                }}
            >
                <Image
                    src="/background lebar.png"
                    alt="Jakarta sunset sky wide"
                    fill
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center center',
                    }}
                    priority
                />
            </div>

            {/* Extra sun glow for depth */}
            <div
                style={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -30%)',
                    width: '700px',
                    height: '700px',
                    background: 'radial-gradient(circle, rgba(255, 140, 40, 0.5) 0%, rgba(255, 100, 20, 0.2) 40%, transparent 70%)',
                    filter: 'blur(40px)',
                    zIndex: 1,
                    pointerEvents: 'none',
                }}
            />

            {/* LAYER 2 (PALING DEPAN): Bridge Buildings Silhouette */}
            <div
                ref={buildingRef}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 2,
                    willChange: 'transform',
                    pointerEvents: 'none',
                }}
            >
                <Image
                    src="/Bridge Upscale.png"
                    alt="Jakarta skyline silhouette"
                    fill
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center bottom',
                    }}
                    priority
                />
            </div>

            {/* TOP FADE — blends into DestinationsSection above */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '100px',
                background: 'linear-gradient(to bottom, var(--dark-surface) 0%, transparent 100%)',
                zIndex: 3,
                pointerEvents: 'none',
            }} />

            {/* BOTTOM FADE — blends into EventSection below */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '120px',
                background: 'linear-gradient(to top, var(--background) 0%, transparent 100%)',
                zIndex: 3,
                pointerEvents: 'none',
            }} />
        </div>
    );
};

export default ParallaxBridge;
