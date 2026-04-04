import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type } = req.query;
    
    let data;
    switch (type) {
      case 'videos':
        data = await prisma.academyVideo.findMany({
          where: { isActive: true },
          orderBy: { order: 'asc' },
          select: {
            id: true,
            title: true,
            description: true,
            duration: true,
            level: true,
            url: true,
            thumbnail: true,
            format: true,
          },
        });
        break;
      case 'podcasts':
        data = await prisma.academyPodcast.findMany({
          where: { isActive: true },
          orderBy: { order: 'asc' },
          select: {
            id: true,
            title: true,
            description: true,
            duration: true,
            episodeNumber: true,
            url: true,
            format: true,
          },
        });
        break;
      case 'documents':
        data = await prisma.academyDocument.findMany({
          where: { isActive: true },
          orderBy: { order: 'asc' },
          select: {
            id: true,
            title: true,
            description: true,
            type: true,
            category: true,
            size: true,
            url: true,
            icon: true,
          },
        });
        break;
      case 'articles':
        data = await prisma.academyBlogArticle.findMany({
          where: { isPublished: true },
          orderBy: { order: 'asc' },
          select: {
            id: true,
            slug: true,
            title: true,
            category: true,
            tag: true,
            excerpt: true,
            readTime: true,
            thumbnail: true,
            publishedAt: true,
          },
        });
        break;
      default:
        // Return all academy content
        const [videos, podcasts, documents, articles] = await Promise.all([
          prisma.academyVideo.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
            select: {
              id: true,
              title: true,
              description: true,
              duration: true,
              level: true,
              url: true,
              thumbnail: true,
              format: true,
            },
          }),
          prisma.academyPodcast.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
            select: {
              id: true,
              title: true,
              description: true,
              duration: true,
              episodeNumber: true,
              url: true,
              format: true,
            },
          }),
          prisma.academyDocument.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
            select: {
              id: true,
              title: true,
              description: true,
              type: true,
              category: true,
              size: true,
              url: true,
              icon: true,
            },
          }),
          prisma.academyBlogArticle.findMany({
            where: { isPublished: true },
            orderBy: { order: 'asc' },
            select: {
              id: true,
              slug: true,
              title: true,
              category: true,
              tag: true,
              excerpt: true,
              readTime: true,
              thumbnail: true,
              publishedAt: true,
            },
          }),
        ]);
        data = { videos, podcasts, documents, articles };
    }
    
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error fetching academy content:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch academy content' });
  }
}
