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
  // Temporary auth token mock logic
  // if (!verifyToken(req)) {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }

  const { method } = req;
  const type = req.query.type || req.body.type;

  if (!type) {
    return res.status(400).json({ error: 'Missing content type' });
  }

  try {
    switch (method) {
      case 'GET':
        let data = [];
        if (type === 'videos') {
          data = await prisma.academyVideo.findMany({ orderBy: { order: 'asc', createdAt: 'desc' } });
        } else if (type === 'podcasts') {
          data = await prisma.academyPodcast.findMany({ orderBy: { order: 'asc', createdAt: 'desc' } });
        } else if (type === 'documents') {
          data = await prisma.academyDocument.findMany({ orderBy: { order: 'asc', createdAt: 'desc' } });
        } else if (type === 'articles') {
          data = await prisma.academyBlogArticle.findMany({ orderBy: { order: 'asc', createdAt: 'desc' } });
        } else {
          return res.status(400).json({ error: 'Invalid type' });
        }
        return res.status(200).json({ data });

      case 'POST':
        let newData;
        if (type === 'video') {
          newData = await prisma.academyVideo.create({
            data: {
              title: req.body.title,
              description: req.body.description,
              duration: req.body.duration,
              level: req.body.level || 'Początkujący',
              cloudinaryId: 'manual', // dummy
              url: req.body.url,
              thumbnail: req.body.thumbnail,
              format: req.body.format,
            }
          });
        } else if (type === 'podcast') {
          newData = await prisma.academyPodcast.create({
            data: {
              title: req.body.title,
              description: req.body.description,
              duration: req.body.duration,
              episodeNumber: req.body.episodeNumber,
              cloudinaryId: 'manual',
              url: req.body.url,
              format: req.body.format,
            }
          });
        } else if (type === 'document') {
          newData = await prisma.academyDocument.create({
            data: {
              title: req.body.title,
              description: req.body.description,
              type: req.body.type_doc || 'PDF',
              category: req.body.category || 'Operacyjny',
              size: req.body.size,
              icon: req.body.icon,
              url: req.body.url,
            }
          });
        } else if (type === 'article') {
          newData = await prisma.academyBlogArticle.create({
            data: {
              title: req.body.title,
              slug: req.body.slug,
              category: req.body.category || 'Biznes',
              tag: req.body.tag || 'PORADNIK',
              excerpt: req.body.excerpt,
              content: req.body.content,
              readTime: req.body.readTime,
              isPublished: req.body.isPublished,
            }
          });
        } else {
          return res.status(400).json({ error: 'Invalid type' });
        }
        return res.status(201).json({ message: 'Created', data: newData });

      case 'PUT':
        const { id } = req.body;
        if (!id) return res.status(400).json({ error: 'Missing id' });
        let updatedData;
        
        if (type === 'video') {
          updatedData = await prisma.academyVideo.update({
            where: { id },
            data: {
              title: req.body.title,
              description: req.body.description,
              duration: req.body.duration,
              level: req.body.level,
              url: req.body.url,
              thumbnail: req.body.thumbnail,
              format: req.body.format,
            }
          });
        } else if (type === 'podcast') {
          updatedData = await prisma.academyPodcast.update({
            where: { id },
            data: {
              title: req.body.title,
              description: req.body.description,
              duration: req.body.duration,
              episodeNumber: req.body.episodeNumber,
              url: req.body.url,
              format: req.body.format,
            }
          });
        } else if (type === 'document') {
          updatedData = await prisma.academyDocument.update({
            where: { id },
            data: {
              title: req.body.title,
              description: req.body.description,
              type: req.body.type_doc,
              category: req.body.category,
              size: req.body.size,
              icon: req.body.icon,
              url: req.body.url,
            }
          });
        } else if (type === 'article') {
          updatedData = await prisma.academyBlogArticle.update({
            where: { id },
            data: {
              title: req.body.title,
              slug: req.body.slug,
              category: req.body.category,
              tag: req.body.tag,
              excerpt: req.body.excerpt,
              content: req.body.content,
              readTime: req.body.readTime,
              isPublished: req.body.isPublished,
            }
          });
        }
        return res.status(200).json({ message: 'Updated', data: updatedData });

      case 'DELETE':
        const delId = req.query.id as string;
        if (!delId) return res.status(400).json({ error: 'Missing id' });

        if (type === 'video' || type === 'videos') {
          await prisma.academyVideo.delete({ where: { id: delId } });
        } else if (type === 'podcast' || type === 'podcasts') {
          await prisma.academyPodcast.delete({ where: { id: delId } });
        } else if (type === 'document' || type === 'documents') {
          await prisma.academyDocument.delete({ where: { id: delId } });
        } else if (type === 'article' || type === 'articles') {
          await prisma.academyBlogArticle.delete({ where: { id: delId } });
        } else {
          return res.status(400).json({ error: `Invalid type ${type}` });
        }
        return res.status(200).json({ message: 'Deleted' });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
