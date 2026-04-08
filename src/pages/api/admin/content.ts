import type { NextApiRequest, NextApiResponse } from 'next';
import { readDB, writeDB } from '@/utils/db';
import { verifyAdminRequest } from '@/utils/adminAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authorized = await verifyAdminRequest(req, res);
  if (!authorized) return;
  const db = readDB();
  
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authorized = await verifyAdminRequest(req, res);
  if (!authorized) return;
  const db = readDB();
  
  if (req.method === 'GET') {
    const content = db.content || [];
    
    // Calculate statistics
    const stats = {
      publishedArticles: content.filter((item: any) => item.status === 'published').length,
      draftArticles: content.filter((item: any) => item.status === 'draft').length,
      videoTutorials: content.filter((item: any) => item.type === 'video').length,
      totalViews: content.reduce((sum: number, item: any) => sum + (item.views || 0), 0)
    };
    
    // Get categories with counts
    const categories = {};
    content.forEach((item: any) => {
      if (item.category) {
        categories[item.category] = (categories[item.category] || 0) + 1;
      }
    });
    
    return res.status(200).json({
      content,
      stats,
      categories: Object.entries(categories).map(([name, count]) => ({ name, count }))
    });
  } else if (req.method === 'POST') {
    const newItem = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      views: 0,
      ...req.body,
    };
    if (!db.content) db.content = [];
    db.content.push(newItem);
    writeDB(db);
    return res.status(201).json(newItem);
  } else if (req.method === 'PUT') {
    const { id } = req.query;
    const updateData = req.body;
    
    if (!id) {
      return res.status(400).json({ error: 'Missing id' });
    }
    
    db.content = (db.content || []).map((item: any) => 
      item.id === id ? { ...item, ...updateData, updatedAt: new Date().toISOString() } : item
    );
    writeDB(db);
    
    const updatedItem = db.content.find((item: any) => item.id === id);
    return res.status(200).json(updatedItem);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'Missing id' });
    }
    db.content = (db.content || []).filter((item: any) => item.id !== id);
    writeDB(db);
    return res.status(200).json({ success: true });
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
}
