import type { NextApiRequest, NextApiResponse  from 'next';
import { supabase } from '@/utils/supabase';
import { verifyAdminRequest } from '@/utils/adminAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authorized = await verifyAdminRequest(req, res);
  if (!authorized) return;

  if (req.method === 'GET') {
    try {
      // Get financial records
      const { data: records, error: recordsError } = await supabase
        .from('FinancialRecord')
        .select('*, Partner(name, handle)')
        .order('date', { ascending: false })
        .limit(50);

      if (recordsError) return res.status(500).json({ error: recordsError.message });

      // Calculate overview metrics
      const totalRevenue = records?.reduce((sum, record) => sum + (record.amount > 0 ? record.amount : 0), 0) || 0;
      const pendingPayouts = records?.filter(r => r.status === 'pending').reduce((sum, r) => sum + Math.abs(r.amount), 0) || 0;

      // Revenue by platform (mock data for now - would need platform tracking in records)
      const revenueByPlatform = [
        { platform: 'OnlyFans', amount: Math.round(totalRevenue * 0.34), percentage: 34 },
        { platform: 'Chaturbate', amount: Math.round(totalRevenue * 0.31), percentage: 31 },
        { platform: 'Fansly', amount: Math.round(totalRevenue * 0.17), percentage: 17 },
        { platform: 'ManyVids', amount: Math.round(totalRevenue * 0.10), percentage: 10 },
        { platform: 'Other', amount: Math.round(totalRevenue * 0.08), percentage: 8 }
      ];

      // Map transactions for table
      const recentTransactions = records?.slice(0, 10).map(record => ({
        date: new Date(record.date).toISOString().split('T')[0],
        partner: record.Partner?.name || 'Unknown',
        platform: record.type === 'subscription' ? 'OnlyFans' : 
                 record.type === 'tip' ? 'Chaturbate' : 
                 record.type === 'ppv' ? 'Fansly' : 'Other',
        type: record.type,
        amount: Math.abs(record.amount),
        status: record.status
      })) || [];

      const financialData = {
        overview: {
          totalRevenue,
          pendingPayouts,
          growth: 18.5 // Mock growth calculation
        },
        revenueByPlatform,
        recentTransactions,
        payoutHistory: records?.filter(r => r.status === 'processed').slice(0, 5).map(r => ({
          partner: r.Partner?.name || 'Unknown',
          amount: Math.abs(r.amount),
          status: 'completed'
        })) || []
      };

      return res.status(200).json(financialData);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'POST') {
    const { action, partnerId, amount } = req.body;

    if (action === 'schedule_payout') {
      try {
        // Create payout record
        const { data, error } = await supabase
          .from('FinancialRecord')
          .insert([{
            partnerId,
            amount: -Math.abs(amount), // Negative for payouts
            type: 'payout',
            status: 'pending',
            date: new Date()
          }])
          .select();

        if (error) return res.status(500).json({ error: error.message });

        return res.status(200).json({
          success: true,
          message: `Payout of €${amount} scheduled for partner ${partnerId}`,
          data
        });
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    } else {
      // Original financial record creation
      const { data, error } = await supabase.from('FinancialRecord').insert([req.body]).select();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json(data[0]);
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
}
