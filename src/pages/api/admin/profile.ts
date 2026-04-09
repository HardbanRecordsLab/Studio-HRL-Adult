import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/utils/adminAuth';

interface UpdateProfileRequest {
  handle: string;
  name?: string;
  bio?: string;
  description?: string;
  heroImage?: string;
  aboutImage1?: string;
  aboutImage2?: string;
  yearsTogether?: number;
  type?: 'couple' | 'solo';
  stats?: {
    subscribers: number;
    content: number;
    satisfaction: number;
  };
  platforms?: Array<{
    id: string;
    name: string;
    url: string;
    followers: number;
    icon: string;
    verified?: boolean;
  }>;
  liveSchedule?: Array<{
    day: string;
    time: string;
    active: boolean;
  }>;
  subscriptionPlans?: Array<{
    name: string;
    description: string;
    price: number;
    period: string;
    perks: string[];
    featured?: boolean;
    ofUrl?: string;
  }>;
  testimonials?: Array<{
    username: string;
    text: string;
    since: string;
    rating: number;
    avatar: string;
  }>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean; data?: any } | { error: string }>
) {
  // Only allow PUT and GET
  if (req.method !== 'PUT' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify admin authentication
  const adminToken = req.headers.authorization?.split(' ')[1];
  if (!adminToken || !verifyAdminToken(adminToken)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    // Get list of profiles
    try {
      const profiles = await prisma.partner.findMany({
        select: {
          id: true,
          handle: true,
          name: true,
          bio: true,
          status: true,
          avatar: true,
          type: true,
        },
      });
      return res.status(200).json({ success: true, data: profiles });
    } catch (error) {
      console.error('Profile list error:', error);
      return res.status(500).json({ error: 'Failed to fetch profiles' });
    }
  }

  if (req.method === 'PUT') {
    // Update profile
    const { handle, ...updateData } = req.body as UpdateProfileRequest;

    if (!handle) {
      return res.status(400).json({ error: 'Handle is required' });
    }

    try {
      const partner = await prisma.partner.findUnique({
        where: { handle },
      });

      if (!partner) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      // Build update object
      const updatePayload: any = {};

      if (updateData.name) updatePayload.name = updateData.name;
      if (updateData.bio !== undefined) updatePayload.bio = updateData.bio;
      if (updateData.description !== undefined) updatePayload.description = updateData.description;
      if (updateData.heroImage) updatePayload.heroImage = updateData.heroImage;
      if (updateData.aboutImage1) updatePayload.aboutImage1 = updateData.aboutImage1;
      if (updateData.aboutImage2) updatePayload.aboutImage2 = updateData.aboutImage2;
      if (updateData.yearsTogether !== undefined) updatePayload.yearsTogether = updateData.yearsTogether;
      if (updateData.type) updatePayload.type = updateData.type;

      // Handle JSON fields
      if (updateData.stats) updatePayload.profileStats = JSON.stringify(updateData.stats);
      if (updateData.platforms) updatePayload.platforms = JSON.stringify(updateData.platforms);
      if (updateData.liveSchedule) updatePayload.liveSchedule = JSON.stringify(updateData.liveSchedule);
      if (updateData.subscriptionPlans) updatePayload.subscriptionPlans = JSON.stringify(updateData.subscriptionPlans);
      if (updateData.testimonials) updatePayload.testimonials = JSON.stringify(updateData.testimonials);

      const updatedPartner = await prisma.partner.update({
        where: { handle },
        data: updatePayload,
      });

      return res.status(200).json({ success: true, data: updatedPartner });
    } catch (error) {
      console.error('Profile update error:', error);
      return res.status(500).json({ error: 'Failed to update profile' });
    }
  }
}
