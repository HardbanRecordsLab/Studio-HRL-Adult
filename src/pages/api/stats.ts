import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const partnerCount = await prisma.partner.count({ where: { status: 'active' } });
    const articleCount = await prisma.academyBlogArticle.count({ where: { isPublished: true } });
    const videoCount = await prisma.academyVideo.count({ where: { isActive: true } });
    
    // Static values mixed with dynamic ones for a premium look
    return res.status(200).json({
      success: true,
      stats: {
        models: partnerCount || 5, // Fallback to 5 if empty for aesthetics
        modelsLabel: 'Aktywnych Twórców',
        content: (articleCount + videoCount) + 200 || '2K+',
        contentLabel: 'Premium Treści',
        experience: '4K',
        experienceLabel: 'PRODUCTION',
        support: '24/7',
        supportLabel: 'SUPPORT'
      }
    });
  } catch (error) {
    console.error('Stats API Error:', error);
    return res.status(200).json({
      success: true,
      stats: {
        models: 5,
        modelsLabel: 'Aktywnych Twórców',
        content: '2K+',
        contentLabel: 'Premium Treści',
        experience: '4K',
        experienceLabel: 'PRODUCTION',
        support: '24/7',
        supportLabel: 'SUPPORT'
      }
    });
  }
}
