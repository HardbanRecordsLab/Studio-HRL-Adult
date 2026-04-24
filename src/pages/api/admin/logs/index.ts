import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { requireAdminSession } from '@/lib/adminSession';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!requireAdminSession(req, res)) {
    return;
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { page = '1', limit = '50', resource, action } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};
    if (resource && resource !== 'all') where.resource = resource;
    if (action && action !== 'all') where.action = action;

    const [logs, total] = await Promise.all([
      prisma.adminLog.findMany({
        where,
        take: Number(limit),
        skip,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.adminLog.count({ where })
    ]);

    return res.status(200).json({
      logs,
      pagination: {
        total,
        pages: Math.ceil(total / Number(limit)),
        currentPage: Number(page)
      }
    });
  } catch (error: any) {
    console.error('Logs API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
