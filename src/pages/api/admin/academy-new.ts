import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase, db } from '@/lib/supabase';

// Admin verification helper
const verifyAdminRequest = async (req: NextApiRequest, res: NextApiResponse): Promise<boolean> => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }

  const token = authHeader.substring(7);
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    if (decoded.email !== 'hardbanrecordslab.pl@gmail.com') {
      res.status(401).json({ error: 'Unauthorized' });
      return false;
    }
    return true;
  } catch {
    res.status(401).json({ error: 'Invalid token' });
    return false;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authorized = await verifyAdminRequest(req, res);
  if (!authorized) return;

  try {
    if (req.method === 'GET') {
      const { type } = req.query;
      
      switch (type) {
        case 'videos':
          const videos = await db.getAcademyVideos();
          return res.status(200).json(videos);
          
        case 'podcasts':
          const podcasts = await db.getAcademyPodcasts();
          return res.status(200).json(podcasts);
          
        case 'documents':
          const documents = await db.getAcademyDocuments();
          return res.status(200).json(documents);
          
        case 'articles':
          const articles = await db.getAcademyBlogArticles();
          return res.status(200).json(articles);
          
        default:
          // Return all content
          const [videos, podcasts, documents, articles] = await Promise.all([
            db.getAcademyVideos(),
            db.getAcademyPodcasts(),
            db.getAcademyDocuments(),
            db.getAcademyBlogArticles()
          ]);
          
          return res.status(200).json({
            videos,
            podcasts,
            documents,
            articles
          });
      }
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Academy API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
