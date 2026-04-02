import React, { useEffect } from 'react';
import Head from 'next/head';
import Navigation from '@/components/common/Navigation';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import Philosophy from '@/components/sections/Philosophy';
import RevenueModel from '@/components/sections/RevenueModel';
import Studios from '@/components/sections/Studios';
import Safety from '@/components/sections/Safety';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/common/Footer';

const HomePage: React.FC = () => {
  useEffect(() => {
    // Custom cursor animation
    const cursor = document.querySelector('.custom-cursor') as HTMLElement;
    const cursorRing = document.querySelector('.custom-cursor-ring') as HTMLElement;

    const handleMouseMove = (e: MouseEvent) => {
      if (cursor && cursorRing) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorRing.style.left = e.clientX + 'px';
        cursorRing.style.top = e.clientY + 'px';
      }
    };

    const handleMouseDown = () => {
      if (cursor) cursor.style.transform = 'scale(0.8)';
      if (cursorRing) cursorRing.style.transform = 'scale(0.8)';
    };

    const handleMouseUp = () => {
      if (cursor) cursor.style.transform = 'scale(1)';
      if (cursorRing) cursorRing.style.transform = 'scale(1)';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Studio HRL Adult - Premium Adult Content Production</title>
        <meta name="description" content="Studio HRL Adult - profesjonalna produkcja treści dla dorosłych. Model 60/30/10, studia 4K, kompleksowe wsparcie." />
        <meta name="keywords" content="adult content, studio, production, 60/30/10 model, casting, onlyfans, chaturbate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-dark text-text">
        <Navigation currentPage="/" />
        
        <main>
          <Hero />
          <Stats />
          <Philosophy />
          <RevenueModel />
          <Studios />
          <Safety />
          <CTA />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
