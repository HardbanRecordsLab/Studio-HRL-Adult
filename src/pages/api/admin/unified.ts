import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';
import { verifyAdminRequest } from '@/utils/adminAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const authorized = await verifyAdminRequest(req, res);
    if (!authorized) return;

    try {
      const { data: partners, error } = await supabase.from('Partner').select('*');
      if (error) throw error;

      // Parse platforms JSON and add platform-specific features
      const enhancedPartners = partners?.map(partner => ({
        ...partner,
        platformsData: partner.platforms ? JSON.parse(partner.platforms) : {},
        platformFeatures: {
          // Live Cam
          chaturbate: ['Tip Menu', 'Private Show', 'Interactive Toys', 'Fanclub'],
          myfreecams: ['Premium', 'MFCCoins', 'Club Members'],
          livejasmin: ['Private Show', 'VIP Show', 'HD/4K'],
          stripchat: ['Fan Club', 'VR Shows', 'Gold Shows'],
          camsoda: ['VR Shows', 'Crypto Tips', 'VOD'],
          bongacams: ['Gold Shows', 'European Focus'],
          flirt4free: ['Party Chat', 'Feature Shows'],
          imlive: ['Multi-Viewer', 'Wish List'],
          // Subscription
          onlyfans: ['Subskrypcja', 'PPV', 'DM', 'Custom Content'],
          fansly: ['Algorytm', 'Tiers', 'Multi-media'],
          manyvids: ['VOD', 'MV Crush', 'Store'],
          clips4sale: ['Fetish Niche', 'Studio System'],
          avnstars: ['Sub', 'VOD', 'Live Cam'],
          fanvue: ['Low Fee', 'AI Tools'],
          // Tube
          pornhub: ['ModelHub', 'Rev Share', 'Fanclub'],
          xhamster: ['Creator Program', 'SEO'],
          xvideos: ['RED Sub', 'Rev Share'],
          xhamsterlive: ['Live Cam', 'xHamster Base'],
          // Marketing
          twitter: ['Threads', 'Spaces', 'Polls'],
          reddit: ['Subreddits', 'Upvotes'],
          telegram: ['VIP Channel', 'TON Blockchain'],
          tiktok: ['Duets', 'Stitches', 'Live'],
          instagram: ['Stories', 'Reels', 'SFW Only']
        }
      }));

      return res.status(200).json(enhancedPartners);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    const authorized = await verifyAdminRequest(req, res);
    if (!authorized) return;

    try {
      const { partnerId, platform, action, content } = req.body;

      // Handle platform-specific actions (placeholder for future API integrations)
      switch (platform) {
        case 'onlyfans':
          // Integrate with OnlyFans API
          break;
        case 'instagram':
          // Integrate with Meta API
          break;
        case 'twitter':
          // Integrate with Twitter API v2
          break;
        case 'tiktok':
          // Integrate with TikTok API
          break;
        // Add other platforms...
      }

      // Update partner platforms data
      const { data: partner } = await supabase.from('Partner').select('platforms').eq('id', partnerId).single();
      const platformsData = partner?.platforms ? JSON.parse(partner.platforms) : {};

      if (action === 'sync') {
        // Simulate sync - in real implementation, call platform APIs
        platformsData[platform] = {
          ...platformsData[platform],
          lastSync: new Date().toISOString(),
          followers: platformsData[platform]?.followers || 0,
          posts: platformsData[platform]?.posts || 0
        };
      }

      await supabase.from('Partner').update({
        platforms: JSON.stringify(platformsData),
        lastSync: new Date()
      }).eq('id', partnerId);

      return res.status(200).json({ success: true, platformsData });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.status(405).end(`Method ${req.method} Not Allowed`);
}