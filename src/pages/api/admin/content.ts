import type { NextApiRequest, NextApiResponse } from 'next';
import { readDB, writeDB } from '@/utils/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
