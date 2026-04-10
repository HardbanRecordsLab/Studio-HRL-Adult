import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase, db } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authorized = await verifyAdminRequest(req, res);
  if (!authorized) return;

  if (req.method === 'GET') {
    try {
      const { type } = req.query;
      
      let data;
      switch (type) {
        case 'videos':
          data = await prisma.academyVideo.findMany({
            orderBy: { order: 'asc' },
          });
          break;
        case 'podcasts':
          data = await prisma.academyPodcast.findMany({
            orderBy: { order: 'asc' },
          });
          break;
        case 'documents':
          data = await prisma.academyDocument.findMany({
            orderBy: { order: 'asc' },
          });
          break;
        case 'articles':
          data = await prisma.academyBlogArticle.findMany({
            orderBy: { order: 'asc' },
          });
          break;
        default:
          // Return all academy content
          const [videos, podcasts, documents, articles] = await Promise.all([
            prisma.academyVideo.findMany({ orderBy: { order: 'asc' } }),
            prisma.academyPodcast.findMany({ orderBy: { order: 'asc' } }),
            prisma.academyDocument.findMany({ orderBy: { order: 'asc' } }),
            prisma.academyBlogArticle.findMany({ orderBy: { order: 'asc' } }),
          ]);
          data = { videos, podcasts, documents, articles };
      }
      
      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error('Error fetching academy content:', error);
      return res.status(500).json({ success: false, error: 'Failed to fetch academy content' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { type, ...data } = req.body;
      
      let result;
      switch (type) {
        case 'video':
          result = await prisma.academyVideo.create({
            data: {
              title: data.title,
              description: data.description,
              duration: data.duration,
              level: data.level || 'Początkujący',
              cloudinaryId: data.cloudinaryId,
              url: data.url,
              thumbnail: data.thumbnail,
              format: data.format,
              bytes: data.bytes,
              width: data.width,
              height: data.height,
              isActive: data.isActive ?? true,
              order: data.order || 0,
            },
          });
          break;
        case 'podcast':
          result = await prisma.academyPodcast.create({
            data: {
              title: data.title,
              description: data.description,
              duration: data.duration,
              episodeNumber: data.episodeNumber,
              cloudinaryId: data.cloudinaryId,
              url: data.url,
              format: data.format,
              bytes: data.bytes,
              isActive: data.isActive ?? true,
              order: data.order || 0,
            },
          });
          break;
        case 'document':
          result = await prisma.academyDocument.create({
            data: {
              title: data.title,
              description: data.description,
              type: data.type,
              category: data.category,
              size: data.size,
              cloudinaryId: data.cloudinaryId,
              url: data.url,
              icon: data.icon || '📄',
              isActive: data.isActive ?? true,
              order: data.order || 0,
            },
          });
          break;
        case 'article':
          result = await prisma.academyBlogArticle.create({
            data: {
              slug: data.slug,
              title: data.title,
              category: data.category,
              tag: data.tag,
              excerpt: data.excerpt,
              content: data.content,
              readTime: data.readTime,
              thumbnail: data.thumbnail,
              isPublished: data.isPublished ?? false,
              publishedAt: data.isPublished ? new Date() : null,
              order: data.order || 0,
            },
          });
          break;
        default:
          return res.status(400).json({ success: false, error: 'Invalid content type' });
      }
      
      return res.status(201).json({ success: true, data: result });
    } catch (error) {
      console.error('Error creating academy content:', error);
      return res.status(500).json({ success: false, error: 'Failed to create academy content' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { type, id, ...data } = req.body;
      
      let result;
      switch (type) {
        case 'video':
          result = await prisma.academyVideo.update({
            where: { id },
            data: {
              ...(data.title && { title: data.title }),
              ...(data.description && { description: data.description }),
              ...(data.duration && { duration: data.duration }),
              ...(data.level && { level: data.level }),
              ...(data.cloudinaryId && { cloudinaryId: data.cloudinaryId }),
              ...(data.url && { url: data.url }),
              ...(data.thumbnail && { thumbnail: data.thumbnail }),
              ...(data.format && { format: data.format }),
              ...(data.bytes && { bytes: data.bytes }),
              ...(data.width && { width: data.width }),
              ...(data.height && { height: data.height }),
              ...(data.isActive !== undefined && { isActive: data.isActive }),
              ...(data.order !== undefined && { order: data.order }),
            },
          });
          break;
        case 'podcast':
          result = await prisma.academyPodcast.update({
            where: { id },
            data: {
              ...(data.title && { title: data.title }),
              ...(data.description && { description: data.description }),
              ...(data.duration && { duration: data.duration }),
              ...(data.episodeNumber && { episodeNumber: data.episodeNumber }),
              ...(data.cloudinaryId && { cloudinaryId: data.cloudinaryId }),
              ...(data.url && { url: data.url }),
              ...(data.format && { format: data.format }),
              ...(data.bytes && { bytes: data.bytes }),
              ...(data.isActive !== undefined && { isActive: data.isActive }),
              ...(data.order !== undefined && { order: data.order }),
            },
          });
          break;
        case 'document':
          result = await prisma.academyDocument.update({
            where: { id },
            data: {
              ...(data.title && { title: data.title }),
              ...(data.description && { description: data.description }),
              ...(data.type && { type: data.type }),
              ...(data.category && { category: data.category }),
              ...(data.size && { size: data.size }),
              ...(data.cloudinaryId && { cloudinaryId: data.cloudinaryId }),
              ...(data.url && { url: data.url }),
              ...(data.icon && { icon: data.icon }),
              ...(data.isActive !== undefined && { isActive: data.isActive }),
              ...(data.order !== undefined && { order: data.order }),
            },
          });
          break;
        case 'article':
          result = await prisma.academyBlogArticle.update({
            where: { id },
            data: {
              ...(data.slug && { slug: data.slug }),
              ...(data.title && { title: data.title }),
              ...(data.category && { category: data.category }),
              ...(data.tag && { tag: data.tag }),
              ...(data.excerpt && { excerpt: data.excerpt }),
              ...(data.content && { content: data.content }),
              ...(data.readTime && { readTime: data.readTime }),
              ...(data.thumbnail && { thumbnail: data.thumbnail }),
              ...(data.isPublished !== undefined && { 
                isPublished: data.isPublished,
                publishedAt: data.isPublished ? new Date() : null,
              }),
              ...(data.order !== undefined && { order: data.order }),
            },
          });
          break;
        default:
          return res.status(400).json({ success: false, error: 'Invalid content type' });
      }
      
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error('Error updating academy content:', error);
      return res.status(500).json({ success: false, error: 'Failed to update academy content' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { type, id } = req.query;
      
      if (!type || !id) {
        return res.status(400).json({ success: false, error: 'Type and ID are required' });
      }
      
      switch (type) {
        case 'video':
          await prisma.academyVideo.delete({ where: { id: id as string } });
          break;
        case 'podcast':
          await prisma.academyPodcast.delete({ where: { id: id as string } });
          break;
        case 'document':
          await prisma.academyDocument.delete({ where: { id: id as string } });
          break;
        case 'article':
          await prisma.academyBlogArticle.delete({ where: { id: id as string } });
          break;
        default:
          return res.status(400).json({ success: false, error: 'Invalid content type' });
      }
      
      return res.status(200).json({ success: true, message: 'Content deleted successfully' });
    } catch (error) {
      console.error('Error deleting academy content:', error);
      return res.status(500).json({ success: false, error: 'Failed to delete academy content' });
    }
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
