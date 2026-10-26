import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { ProfileTemplate } from "@/components/profile/ProfileTemplate";
import { useMessages } from "@/i18n";
import { profileCopy } from "@/i18n/profiles";
import type { ProfileModel } from "@/lib/profileModel";

type ProfileData = ProfileModel;

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { profilePage: t } = useMessages(profileCopy);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [errorKind, setErrorKind] = useState<"notFound" | "loadError" | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { handle } = router.query;
        if (!handle) return;

        const response = await fetch(`/api/profile/${handle}?locale=${router.locale ?? "en"}`);
        if (!response.ok) {
          setErrorKind("notFound");
          setLoading(false);
          return;
        }

        const data = await response.json();
        setProfileData(data);
      } catch {
        setErrorKind("loadError");
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) fetchProfile();
  }, [router.isReady, router.query, router.locale]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-white text-lg">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (errorKind || !profileData) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <Head>
          <title>{t.notFoundTitle}</title>
        </Head>
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <p className="text-white text-lg">
            {t[errorKind ?? "notFound"]}
          </p>
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
