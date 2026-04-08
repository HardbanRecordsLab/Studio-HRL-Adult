import React, { useState } from 'react';
import Head from 'next/head';
import Navigation from '@/components/common/Navigation';

const AdminPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Admin Panel | Studio HRL Adult</title>
      </Head>

      <div className="min-h-screen bg-dark text-text flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center p-8 pt-32">
          <div className="text-center space-y-6 max-w-2xl">
            <h1 className="font-cormorant text-5xl text-gold italic">Admin Panel</h1>
            <p className="text-dim text-lg leading-relaxed">
              The admin panel is currently under development and will include dashboard analytics, partner management, financial operations, and content management tools.
            </p>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminPage;
