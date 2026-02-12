'use client';

import { useEffect, useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DestinationsSection from './components/DestinationsSection';
import CulinarySection from './components/CulinarySection';
import CultureSection from './components/CultureSection';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

export default function Home() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isHeroReady, setIsHeroReady] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Called by HeroSection when image progress updates
  const handleLoadProgress = useCallback((progress: number) => {
    setLoadProgress(progress);
  }, []);

  // Called by HeroSection when all images are loaded
  const handleLoadComplete = useCallback(() => {
    setIsHeroReady(true);
  }, []);

  // Called by LoadingScreen when exit animation finishes
  const handleExitComplete = useCallback(() => {
    setShowContent(true);
  }, []);

  useEffect(() => {
    // Smooth reveal animation on scroll
    if (!showContent) return;

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
  }, [showContent]);

  // Prevent scroll while loading & reset to top when content is shown
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (!showContent) {
      // Lock scroll completely
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      html.style.position = 'fixed';
      html.style.width = '100%';
      html.style.top = '0';
      window.scrollTo(0, 0);
    } else {
      // Unlock scroll & ensure we start at top
      html.style.overflow = '';
      body.style.overflow = '';
      html.style.position = '';
      html.style.width = '';
      html.style.top = '';
      window.scrollTo(0, 0);
    }
    return () => {
      html.style.overflow = '';
      body.style.overflow = '';
      html.style.position = '';
      html.style.width = '';
      html.style.top = '';
    };
  }, [showContent]);

  return (
    <>
      {/* Loading Screen - shows until hero images are loaded */}
      {!showContent && (
        <LoadingScreen
          progress={loadProgress}
          isReady={isHeroReady}
          onExitComplete={handleExitComplete}
        />
      )}

      {/* Main Content - always mounted so images load immediately */}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.3s ease',
          visibility: showContent ? 'visible' : 'hidden',
        }}
      >
        <Navbar />
        <main>
          <HeroSection
            onLoadProgress={handleLoadProgress}
            onLoadComplete={handleLoadComplete}
          />
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

      {/* Global Styles */}
      <style jsx global>{`
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
