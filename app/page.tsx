'use client';

import { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LoadingScreen from './components/LoadingScreen';

// Skeleton placeholder for lazy-loaded sections
const SectionSkeleton = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--dark-surface)',
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid rgba(255, 107, 53, 0.2)',
      borderTopColor: 'var(--primary)',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
    <style jsx>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// Lazy-load below-fold sections — JS is fetched only when needed
const DestinationsSection = dynamic(() => import('./components/DestinationsSection'), {
  loading: () => <SectionSkeleton />,
  ssr: true,
});
const EventSection = dynamic(() => import('./components/EventSection'), {
  loading: () => <SectionSkeleton />,
  ssr: true,
});


const Footer = dynamic(() => import('./components/Footer'), {
  loading: () => <SectionSkeleton />,
  ssr: true,
});

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



          {/* Smooth Transition between Sections */}
          <div style={{
            position: 'relative',
            height: '150px',
            background: 'linear-gradient(to bottom, var(--dark-surface) 0%, var(--background) 100%)',
            zIndex: 2,
          }} />

          <EventSection />

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
