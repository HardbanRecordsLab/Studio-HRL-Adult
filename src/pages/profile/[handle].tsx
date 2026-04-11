import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ProfileTemplate } from './template';

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { handle } = router.query;
        if (!handle) return;

        const response = await fetch(`/api/profile/${handle}`);
        
        if (!response.ok) {
          setError('Profil nie został znaleziony');
          setLoading(false);
          return;
        }

        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError('Błąd podczas ładowania profilu');
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) {
      fetchProfile();
    }
  }, [router.isReady, router.query]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-white text-lg">Ładowanie profilu...</p>
        </div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <Head>
          <title>Profil nie znaleziony | Studio HRL Adult</title>
        </Head>
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <p className="text-white text-lg">{error || 'Profil nie został znaleziony'}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{profileData?.name} | Studio HRL Adult</title>
        <meta name="description" content={profileData?.bio} />
      </Head>
      <ProfileTemplate data={profileData} />
    </>
  );
};

export default ProfilePage;
