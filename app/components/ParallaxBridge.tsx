'use client';

import { useEffect, useRef } from 'react';

const ParallaxBridge = () => {
    const bridgeRef = useRef<HTMLDivElement>(null);
    const skylineRef = useRef<SVGSVGElement>(null);
    const backRef = useRef<SVGSVGElement>(null);

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

                if (skylineRef.current) {
                    skylineRef.current.style.transform = `translate3d(0, ${centered * 40}px, 0)`;
                }
                if (backRef.current) {
                    backRef.current.style.transform = `translate3d(0, ${centered * 15}px, 0)`;
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
            height: '50vh', // Reduced from 80vh
            minHeight: '400px', // Reduced from 600px
            overflow: 'hidden',
            backgroundColor: '#0a0a0f',
        }}>

            {/* 1. ATMOSPHERE: Sunset Gradient */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, #7a2c10 0%, #3a1505 60%, #0a0a0f 100%)',
                zIndex: 0
            }} />

            {/* 2. SUN GLOW */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -20%)',
                width: '500px', height: '500px',
                background: 'radial-gradient(circle, rgba(255, 100, 20, 0.4) 0%, transparent 70%)',
                filter: 'blur(60px)',
                zIndex: 0
            }} />

            {/* 3. LAYER BELAKANG: Gedung Tinggi Transparan */}
            <svg
                ref={backRef}
                viewBox="0 0 1440 600"
                preserveAspectRatio="none"
                style={{
                    position: 'absolute', bottom: 0, left: 0,
                    width: '100%', height: '90%',
                    zIndex: 1, opacity: 0.3
                }}
            >
                <path fill="#0a0a0f" d="M0,600 L0,300 L100,300 L100,200 L180,200 L180,600 L250,600 L250,150 L350,150 L350,600 L450,600 L450,250 L550,250 L550,600 L850,600 L850,200 L950,200 L950,600 L1050,600 L1050,100 L1150,100 L1150,600 L1250,600 L1250,250 L1350,250 L1350,600 L1440,600 Z" />
            </svg>

            {/* 4. LAYER DEPAN: ICONIC JAKARTA (Monas Presisi + Wisma 46) */}
            <svg
                ref={skylineRef}
                viewBox="0 0 1440 600"
                preserveAspectRatio="none"
                style={{
                    position: 'absolute', bottom: 0, left: 0,
                    width: '100%', height: '110%', // Giving slightly more height to avoid cutoff
                    zIndex: 2, willChange: 'transform'
                }}
            >
                <defs>
                    <linearGradient id="frontGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#151010" />
                        <stop offset="100%" stopColor="#050505" />
                    </linearGradient>
                </defs>

                {/* GROUND */}
                <rect x="0" y="580" width="1440" height="20" fill="#050505" />

                {/* --- WISMA 46 (KIRI) --- */}
                <path fill="url(#frontGrad)" d="M220,600 L220,400 L220,250 Q220,50 320,100 L320,600 Z" />

                {/* --- MONAS (TENGAH) --- */}
                <g transform="translate(720, 600)">
                    {/* Cawan Bawah */}
                    <path fill="#080808" d="M-120,0 L-100,-40 L100,-40 L120,0 Z" />
                    {/* Cawan Atas */}
                    <path fill="#080808" d="M-80,-40 L-90,-80 L90,-80 L80,-40 Z" />
                    {/* Tugu - Adjusted height for shorter container view */}
                    <path fill="#080808" d="M-15,-80 L-10,-450 L10,-450 L15,-80 Z" />
                    {/* Lidah Api Emas */}
                    <path fill="#ffd700" d="M0,-450 Q-15,-470 0,-500 Q15,-470 0,-450 Z" style={{ filter: 'drop-shadow(0 0 10px #ff8c00)' }} />
                </g>

                {/* --- MENARA BCA (KANAN) --- */}
                <path fill="url(#frontGrad)" d="M1100,600 L1100,50 L1200,50 L1200,600 Z" />
                <rect x="1110" y="60" width="80" height="5" fill="#333" /> {/* Top Detail */}

                {/* --- GEDUNG LAIN (FILLER) --- */}
                <path fill="#0a0a0f" d="M0,600 L0,450 L80,450 L80,350 L150,350 L150,600 Z" />
                <path fill="#0a0a0f" d="M350,600 L350,500 L450,500 L450,400 L550,400 L550,600 Z" />
                <path fill="#0a0a0f" d="M850,600 L850,420 L950,420 L950,350 L1050,350 L1050,600 Z" />
                <path fill="#0a0a0f" d="M1250,600 L1250,380 L1350,380 L1350,450 L1440,450 L1440,600 Z" />
            </svg>

            {/* 5. GIGI BALANG / ORNAMEN BETAWI */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '40px', display: 'flex', overflow: 'hidden',
                zIndex: 3
            }}>
                {Array.from({ length: 50 }).map((_, i) => (
                    <div key={i} style={{
                        flexShrink: 0, width: '40px', height: '40px',
                        backgroundColor: '#0a0a0f',
                        borderRadius: '50% 50% 0 0',
                        border: '2px solid #221105',
                        borderBottom: 'none',
                        marginRight: '-5px',
                        boxShadow: '0 -2px 10px rgba(0,0,0,0.5)'
                    }} />
                ))}
            </div>

            {/* FADES */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '100px', // Reduced fade height
                background: 'linear-gradient(to bottom, #12121a 0%, transparent 100%)',
                zIndex: 4, pointerEvents: 'none'
            }} />
        </div>
    );
};

export default ParallaxBridge;
