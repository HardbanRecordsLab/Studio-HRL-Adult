import React from 'react';
import Head from 'next/head';
import Navigation from '@/components/common/Navigation';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import Philosophy from '@/components/sections/Philosophy';
import RevenueModel from '@/components/sections/RevenueModel';
import Platforms from '@/components/sections/Platforms';
import Studios from '@/components/sections/Studios';
import Process from '@/components/sections/Process';
import Safety from '@/components/sections/Safety';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/common/Footer';

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Studio HRL Adult – Premium Adult Content Production</title>
        <meta name="description" content="Studio HRL Adult - profesjonalna produkcja i dystrybucja treści dla dorosłych. Model 60/30/10, studia 4K, pełne wsparcie i dyskrecja." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-dark text-text relative">
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <Hero />

          {/* Stats Bar */}
          <Stats />

          {/* Philosophy Section */}
          <Philosophy />

          {/* Revenue Model Section */}
          <RevenueModel />

          {/* Platforms Section */}
          <Platforms />

          {/* Studios Section */}
          <Studios />

          {/* Process Section */}
          <Process />

          {/* Safety & Legal Section */}
          <Safety />

          {/* Final CTA Section */}
          <CTA />
        </main>
        
        {/* Footer */}
        <Footer />

        {/* Global UI Elements */}
        <div className="grain-overlay" />
      </div>

      <style jsx global>{`
        .grain-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
          opacity: 0.35;
        }
      `}</style>
    </>
  );
};

export default HomePage;
