'use client';

import { useEffect, useState, useRef } from 'react';

interface LoadingScreenProps {
  progress: number;
  isReady: boolean;
  onExitComplete: () => void;
}

// Pre-calculated particle data to avoid hydration mismatch from Math.random()
const PARTICLE_DATA = [
  { left: 12, top: 25, delay: 0.3, duration: 4.2, size: 3, opacity: 0.25 },
  { left: 85, top: 15, delay: 1.8, duration: 5.1, size: 2.5, opacity: 0.35 },
  { left: 45, top: 78, delay: 0.7, duration: 3.8, size: 4, opacity: 0.3 },
  { left: 68, top: 42, delay: 2.5, duration: 6.2, size: 2, opacity: 0.4 },
  { left: 23, top: 88, delay: 4.1, duration: 4.5, size: 3.5, opacity: 0.28 },
  { left: 91, top: 55, delay: 1.2, duration: 5.8, size: 2.8, opacity: 0.32 },
  { left: 37, top: 12, delay: 3.5, duration: 3.5, size: 4.5, opacity: 0.22 },
  { left: 56, top: 92, delay: 0.1, duration: 6.5, size: 2.2, opacity: 0.38 },
  { left: 8, top: 65, delay: 2.9, duration: 4.8, size: 3.2, opacity: 0.26 },
  { left: 74, top: 33, delay: 4.5, duration: 5.5, size: 5, opacity: 0.45 },
  { left: 42, top: 48, delay: 1.5, duration: 4.1, size: 2.6, opacity: 0.34 },
  { left: 95, top: 82, delay: 3.2, duration: 3.3, size: 3.8, opacity: 0.29 },
  { left: 18, top: 38, delay: 0.8, duration: 5.3, size: 4.2, opacity: 0.42 },
  { left: 63, top: 72, delay: 2.1, duration: 6.0, size: 2.4, opacity: 0.36 },
  { left: 31, top: 5, delay: 4.8, duration: 4.4, size: 3.6, opacity: 0.24 },
  { left: 79, top: 95, delay: 1.0, duration: 5.6, size: 5.2, opacity: 0.33 },
  { left: 52, top: 22, delay: 3.8, duration: 3.7, size: 2.3, opacity: 0.41 },
  { left: 6, top: 52, delay: 0.5, duration: 4.9, size: 3.4, opacity: 0.27 },
  { left: 88, top: 68, delay: 2.7, duration: 5.2, size: 4.8, opacity: 0.39 },
  { left: 47, top: 85, delay: 4.3, duration: 6.3, size: 2.7, opacity: 0.31 },
];

const LoadingScreen = ({ progress, isReady, onExitComplete }: LoadingScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const hasTriggeredExit = useRef(false);

  const tips = [
    'Menyiapkan pemandangan kota...',
    'Memuat landmark Jakarta...',
    'Menyusun pengalaman visual...',
    'Hampir selesai...',
  ];

  // Only render particles after client mount to avoid any SSR issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Cycle through tips
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [tips.length]);

  // When ready, start exit animation
  useEffect(() => {
    if (isReady && !hasTriggeredExit.current) {
      hasTriggeredExit.current = true;
      const timer = setTimeout(() => {
        setIsExiting(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  // After exit animation completes, notify parent
  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        onExitComplete();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isExiting, onExitComplete]);

  return (
    <>
      <div
        className={`loading-screen ${isExiting ? 'loading-screen--exit' : ''}`}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          background: '#0a0a0f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        {/* Background ambient glow */}
        <div className="loading-ambient" />

        {/* Floating particles - only rendered after mount */}
        {isMounted && (
          <div className="loading-particles">
            {PARTICLE_DATA.map((p, i) => (
              <div
                key={i}
                className="loading-particle"
                style={{
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.duration}s`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  opacity: p.opacity,
                }}
              />
            ))}
          </div>
        )}

        {/* Main content */}
        <div className="loading-content">
          {/* Skyline + Logo combined zone */}
          <div className="loading-center-zone">
            {/* Jakarta Skyline Silhouette - behind text */}
            <div className="loading-skyline">
              <svg
                viewBox="0 0 800 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="loading-skyline-svg"
              >
                {/* Monas */}
                <g className="skyline-element skyline-monas">
                  <rect x="385" y="40" width="6" height="160" fill="url(#skylineGrad)" opacity="0.6" />
                  <rect x="375" y="120" width="26" height="80" fill="url(#skylineGrad)" opacity="0.5" />
                  <polygon points="388,10 394,40 382,40" fill="url(#skylineGrad)" opacity="0.7" />
                  <circle cx="388" cy="10" r="4" fill="#ff6b35" opacity="0.9" />
                </g>

                {/* Buildings Left */}
                <g className="skyline-element skyline-buildings-left">
                  <rect x="80" y="100" width="35" height="100" rx="2" fill="url(#skylineGrad)" opacity="0.3" />
                  <rect x="125" y="80" width="28" height="120" rx="2" fill="url(#skylineGrad)" opacity="0.35" />
                  <rect x="160" y="110" width="40" height="90" rx="2" fill="url(#skylineGrad)" opacity="0.25" />
                  <rect x="210" y="70" width="32" height="130" rx="2" fill="url(#skylineGrad)" opacity="0.4" />
                  <rect x="250" y="90" width="25" height="110" rx="2" fill="url(#skylineGrad)" opacity="0.3" />
                  <rect x="285" y="60" width="30" height="140" rx="2" fill="url(#skylineGrad)" opacity="0.35" />
                  <rect x="325" y="100" width="35" height="100" rx="2" fill="url(#skylineGrad)" opacity="0.3" />
                </g>

                {/* Buildings Right */}
                <g className="skyline-element skyline-buildings-right">
                  <rect x="420" y="90" width="35" height="110" rx="2" fill="url(#skylineGrad)" opacity="0.3" />
                  <rect x="465" y="65" width="30" height="135" rx="2" fill="url(#skylineGrad)" opacity="0.4" />
                  <rect x="505" y="100" width="38" height="100" rx="2" fill="url(#skylineGrad)" opacity="0.3" />
                  <rect x="550" y="80" width="28" height="120" rx="2" fill="url(#skylineGrad)" opacity="0.35" />
                  <rect x="590" y="110" width="40" height="90" rx="2" fill="url(#skylineGrad)" opacity="0.25" />
                  <rect x="640" y="75" width="32" height="125" rx="2" fill="url(#skylineGrad)" opacity="0.35" />
                  <rect x="685" y="95" width="35" height="105" rx="2" fill="url(#skylineGrad)" opacity="0.3" />
                </g>

                {/* Glowing windows */}
                {[130, 140, 135, 170, 180, 220, 230, 215, 295, 300, 290, 340, 350, 430, 440, 475, 480, 515, 525, 560, 570, 600, 610, 650, 660, 695, 705].map((x, i) => (
                  <rect
                    key={i}
                    x={x}
                    y={100 + (i % 5) * 20}
                    width="3"
                    height="3"
                    fill="#ff6b35"
                    opacity={0.3 + (i % 3) * 0.2}
                    className="window-light"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}

                <defs>
                  <linearGradient id="skylineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ff6b35" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Logo - overlaid on top of skyline */}
            <div className="loading-logo-wrapper">
              <h1 className="loading-logo">
                <span style={{ color: '#f5f5f7' }}>Jak</span>
                <span className="gradient-text">Spot</span>
              </h1>
            </div>
          </div>

          {/* Progress section */}
          <div className="loading-progress-section">
            {/* Progress bar */}
            <div className="loading-progress-track">
              <div
                className="loading-progress-fill"
                style={{ width: `${progress}%` }}
              />
              <div
                className="loading-progress-glow"
                style={{ left: `${progress}%` }}
              />
            </div>

            {/* Progress text */}
            <div className="loading-progress-info">
              <span className="loading-tip">{tips[currentTip]}</span>
              <span className="loading-percentage">{progress}%</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .loading-screen {
          transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .loading-screen--exit {
          opacity: 0;
          transform: scale(1.05);
          pointer-events: none;
        }

        .loading-ambient {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 107, 53, 0.08) 0%, transparent 70%);
          animation: ambientPulse 4s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes ambientPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
        }

        .loading-particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .loading-particle {
          position: absolute;
          background: #ff6b35;
          border-radius: 50%;
          animation: particleFloat 5s ease-in-out infinite;
        }

        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          25% { opacity: 0.5; }
          50% { transform: translateY(-40px) translateX(20px); opacity: 0.3; }
          75% { opacity: 0.5; }
        }

        .loading-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          width: 90%;
          max-width: 500px;
        }

        /* Center zone: skyline behind logo */
        .loading-center-zone {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Skyline */
        .loading-skyline {
          position: absolute;
          width: 120%;
          max-width: 550px;
          opacity: 0;
          animation: skylineReveal 1.5s ease forwards 0.3s;
          pointer-events: none;
          /* Position so buildings align vertically with the logo text center */
          top: 50%;
          left: 50%;
          transform: translate(-50%, -55%);
        }

        @keyframes skylineReveal {
          from { opacity: 0; transform: translate(-50%, -45%); }
          to { opacity: 0.35; transform: translate(-50%, -55%); }
        }

        .loading-skyline-svg {
          width: 100%;
          height: auto;
        }

        .skyline-element {
          animation: skylineGlow 3s ease-in-out infinite;
        }

        .skyline-monas {
          animation: skylineGlow 3s ease-in-out infinite, monasGlow 2s ease-in-out infinite;
        }

        @keyframes skylineGlow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
        }

        @keyframes monasGlow {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(255, 107, 53, 0.3)); }
          50% { filter: drop-shadow(0 0 10px rgba(255, 107, 53, 0.6)); }
        }

        :global(.window-light) {
          animation: windowBlink 3s ease-in-out infinite;
        }

        @keyframes windowBlink {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }

        /* Logo */
        .loading-logo-wrapper {
          position: relative;
          z-index: 2;
          text-align: center;
          opacity: 0;
          animation: logoReveal 1s ease forwards 0.8s;
          padding: 64px 0 0;
        }

        @keyframes logoReveal {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .loading-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 8vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0;
          line-height: 1.2;
        }

        .loading-logo-line {
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #ff6b35, #ffc107);
          margin: 12px auto 0;
          border-radius: 2px;
          animation: lineExpand 1.5s ease forwards 1.2s;
          transform: scaleX(0);
        }

        @keyframes lineExpand {
          to { transform: scaleX(1); }
        }

        /* Progress */
        .loading-progress-section {
          width: 100%;
          max-width: 320px;
          margin-top: 32px;
          opacity: 0;
          animation: progressReveal 0.8s ease forwards 1.4s;
        }

        @keyframes progressReveal {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .loading-progress-track {
          position: relative;
          width: 100%;
          height: 3px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          overflow: visible;
        }

        .loading-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #ff6b35, #ff8c5a, #ffc107);
          border-radius: 4px;
          transition: width 0.3s ease;
          position: relative;
        }

        .loading-progress-glow {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 12px;
          background: #ff6b35;
          border-radius: 50%;
          filter: blur(6px);
          opacity: 0.8;
          transition: left 0.3s ease;
          pointer-events: none;
        }

        .loading-progress-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
        }

        .loading-tip {
          font-size: 0.8rem;
          color: rgba(139, 139, 158, 0.8);
          font-family: 'Poppins', sans-serif;
          animation: tipFade 2.5s ease-in-out infinite;
        }

        @keyframes tipFade {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .loading-percentage {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: #ff6b35;
          min-width: 40px;
          text-align: right;
        }
      `}</style>
    </>
  );
};

export default LoadingScreen;
