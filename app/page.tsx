'use client';

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DestinationsSection from './components/DestinationsSection';
import CulinarySection from './components/CulinarySection';
import CultureSection from './components/CultureSection';
import Footer from './components/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for smooth entrance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Smooth reveal animation on scroll
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isLoading]);

  return (
    <>
      {/* Loading Screen */}
      <div className={`loader ${!isLoading ? 'hidden' : ''}`}>
        <div className="loader-content">
          <div className="loader-logo">
            <span style={{ color: 'var(--foreground)' }}>Jak</span>
            <span className="gradient-text">Spot</span>
          </div>
          <p style={{
            color: 'var(--text-muted)',
            marginTop: '16px',
            fontSize: '0.9rem'
          }}>
            Memuat pengalaman Jakarta...
          </p>

          {/* Loading Bar */}
          <div style={{
            width: '200px',
            height: '4px',
            background: 'var(--dark-surface-2)',
            borderRadius: '2px',
            marginTop: '24px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: 'var(--gradient-1)',
              borderRadius: '2px',
              animation: 'loadingBar 2s ease-in-out'
            }} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      {!isLoading && (
        <div style={{ opacity: 1, transition: 'opacity 0.5s ease' }}>
          <Navbar />
          <main>
            <HeroSection />
            {/* Bridge gradient: smooth transition from hero canvas to dark section */}
            <div style={{
              position: 'relative',
              zIndex: 2,
              height: '300px',
              background: 'linear-gradient(180deg, transparent 0%, var(--dark-surface) 100%)',
              pointerEvents: 'none',
            }} />
            <DestinationsSection />
            <CulinarySection />
            <CultureSection />
          </main>
          <Footer />
        </div>
      )}

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes loadingBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }

        /* Smooth scroll for anchor links */
        html {
          scroll-behavior: smooth;
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          #culture > div > div:last-child {
            grid-template-columns: 1fr !important;
          }

          #culture > div > div:last-child > div:first-child {
            grid-column: span 12 !important;
          }

          #culture > div > div:last-child > div:last-child {
            grid-column: span 12 !important;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            min-height: 100svh;
          }

          #destinations .card {
            height: 350px !important;
          }

          #culinary > div > div:last-child > div {
            min-width: 280px !important;
          }

          #culture > div > div:last-child {
            display: flex !important;
            flex-direction: column !important;
          }

          #culture > div > div:last-child > div:first-child {
            height: 400px !important;
          }
        }
      `}</style>
    </>
  );
}
