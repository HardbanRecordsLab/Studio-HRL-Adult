import type { NextApiRequest, NextApiResponse } from 'next';
import { readDB, writeDB } from '@/utils/db';
import { verifyAdminRequest } from '@/utils/adminAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authorized = await verifyAdminRequest(req, res);
  if (!authorized) return;
  const db = readDB();
  
  if (req.method === 'GET') {
    return res.status(200).json(db.content || []);
  } else if (req.method === 'POST') {
    const newItem = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...req.body,
    };
    if (!db.content) db.content = [];
    db.content.push(newItem);
    writeDB(db);
    return res.status(201).json(newItem);
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
