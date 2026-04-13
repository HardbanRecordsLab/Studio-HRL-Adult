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

  const { method, query } = req;
  const range = (query.range as string) || '30';

  try {
    switch (method) {
      case 'GET': {
        // Fetch real data from Prisma
        const recentTransactions = await prisma.financialRecord.findMany({
          take: 50,
          orderBy: { date: 'desc' },
          include: {
            partner: {
              select: { name: true, handle: true }
            }
          }
        });

        // Calculate overview stats from DB
        const totalRevenue = await prisma.financialRecord.aggregate({
          where: { type: { not: 'payout' } },
          _sum: { amount: true }
        });

        const pendingPayouts = await prisma.financialRecord.aggregate({
          where: { type: 'payout', status: 'pending' },
          _sum: { amount: true }
        });

        // Mocking growth and periodic data for now as it requires complex grouping
        // but pointing to real aggregate values
        return res.status(200).json({
          overview: {
            totalRevenue: totalRevenue._sum.amount || 0,
            pendingPayouts: pendingPayouts._sum.amount || 0,
            growth: 12.5, // Logic for growth comparison would go here
            monthlyRevenue: (totalRevenue._sum.amount || 0) / 12, // Simple average for now
            quarterlyRevenue: (totalRevenue._sum.amount || 0) / 4,
            yearlyRevenue: totalRevenue._sum.amount || 0
          },
          revenueByPlatform: [
            { platform: 'OnlyFans', amount: (totalRevenue._sum.amount || 0) * 0.45, percentage: 45, change: 12 },
            { platform: 'Fansly', amount: (totalRevenue._sum.amount || 0) * 0.25, percentage: 25, change: 8 },
            { platform: 'Chaturbate', amount: (totalRevenue._sum.amount || 0) * 0.20, percentage: 20, change: -2 },
            { platform: 'Other', amount: (totalRevenue._sum.amount || 0) * 0.10, percentage: 10, change: 5 }
          ],
          recentTransactions,
          payoutHistory: recentTransactions.filter(t => t.type === 'payout')
        });
      }

      case 'POST': {
        const { action, partnerId, amount } = req.body;
        if (action === 'schedule_payout') {
          const payout = await prisma.financialRecord.create({
            data: {
              partnerId,
              amount: -Math.abs(amount), // Payouts are negative
              type: 'payout',
              status: 'pending',
              date: new Date()
            }
          });
          return res.status(201).json(payout);
        }
        return res.status(400).json({ error: 'Unknown action' });
      }

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    console.error('Finance API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
