import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const verifyToken = (req: NextApiRequest) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return false;
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'hrl-studio-secret-key-2026');
    return true;
  } catch (e) {
    return false;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!verifyToken(req)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const partnersCount = await prisma.partner.count();
    
    // Aggregating real revenue from FinancialRecord
    const revenueStats = await prisma.financialRecord.aggregate({
      where: { type: { not: 'payout' } },
      _sum: { amount: true }
    });

    // Counting all academy assets for true statistics
    const videoCount = await prisma.academyVideo.count();
    const podcastCount = await prisma.academyPodcast.count();
    const docCount = await prisma.academyDocument.count();
    const articleCount = await prisma.academyBlogArticle.count();
    
    const coursesCount = videoCount + podcastCount + docCount + articleCount;

    // Global supported platforms count (sync with platforms API)
    const platformsCount = 38; // Or fetch from a central config/DB if that's where they are stored

    return res.status(200).json({
      status: 'success',
      partnersCount,
      revenue: revenueStats._sum.amount || 0,
      coursesCount,
      platformsCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Database fetch failed' });
  }
}
