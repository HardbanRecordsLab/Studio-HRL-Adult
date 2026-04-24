import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { requireAdminSession } from '@/lib/adminSession';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!requireAdminSession(req, res)) {
    return;
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

        // 1. Calculate totals
        const totalRevenue = await prisma.financialRecord.aggregate({
          where: { type: { not: 'payout' } },
          _sum: { amount: true }
        });

        const pendingPayouts = await prisma.financialRecord.aggregate({
          where: { type: 'payout', status: 'pending' },
          _sum: { amount: true }
        });

        const totalAmt = totalRevenue._sum.amount || 0;

        // 2. Group by platform
        const platformGroups = await prisma.financialRecord.groupBy({
          by: ['platform'],
          where: { type: { not: 'payout' } },
          _sum: { amount: true }
        });

        const revenueByPlatform = platformGroups.map(group => ({
          platform: group.platform || 'General',
          amount: group._sum.amount || 0,
          percentage: totalAmt > 0 ? Math.round(((group._sum.amount || 0) / totalAmt) * 100) : 0,
          change: 0
        }));

        // If no data, add default platforms
        if (revenueByPlatform.length === 0) {
          ['OnlyFans', 'Fansly', 'Chaturbate'].forEach(p => {
             revenueByPlatform.push({ platform: p, amount: 0, percentage: 0, change: 0 });
          });
        }

        return res.status(200).json({
          overview: {
            totalRevenue: totalAmt,
            pendingPayouts: pendingPayouts._sum.amount || 0,
            growth: 0, 
            monthlyRevenue: totalAmt / (parseInt(range) > 30 ? (parseInt(range) / 30) : 1),
            quarterlyRevenue: totalAmt / (parseInt(range) > 90 ? (parseInt(range) / 90) : 1),
            yearlyRevenue: totalAmt
          },
          revenueByPlatform,
          recentTransactions,
          payoutHistory: recentTransactions.filter(t => t.type === 'payout')
        });
      }

      case 'POST': {
        const session = requireAdminSession(req, res);
        if (!session) return;

        const { action, partnerId, amount, type, platform } = req.body;
        
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

          // AUDIT LOG
          await prisma.adminLog.create({
            data: {
              adminEmail: session.email,
              action: 'SCHEDULE_PAYOUT',
              resource: 'finance',
              resourceId: payout.id,
              details: JSON.stringify({ partnerId, amount })
            }
          });

          return res.status(201).json(payout);
        }

        if (action === 'add_revenue') {
          const record = await prisma.financialRecord.create({
            data: {
              partnerId,
              amount: Math.abs(amount),
              type: type || 'subscription',
              platform: platform || 'Other',
              status: 'processed',
              date: new Date()
            }
          });

          // AUDIT LOG
          await prisma.adminLog.create({
            data: {
              adminEmail: session.email,
              action: 'ADD_REVENUE',
              resource: 'finance',
              resourceId: record.id,
              details: JSON.stringify({ partnerId, amount, type, platform })
            }
          });

          return res.status(201).json(record);
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
