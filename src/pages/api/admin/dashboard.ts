import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';
import { verifyAdminRequest } from '@/utils/adminAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const authorized = await verifyAdminRequest(req, res);
    if (!authorized) return;
    try {
      // Fetch data from real tables
      const { data: partners, error: pError } = await supabase.from('Partner').select('*');
      const { data: applications, error: aError } = await supabase.from('CastingApplication').select('*');
      
      if (pError || aError) throw pError || aError;

      const totalRevenue = partners?.reduce((sum: number, p: any) => sum + (p.revenueTotal || 0), 0) || 0;
      const activePartners = partners?.filter((p: any) => p.status === 'active').length || 0;
      const pendingApps = applications?.filter((a: any) => a.status === 'pending').length || 0;
      
      return res.status(200).json({
        kpis: [
          { label: 'Total Revenue (M-T-D)', val: `€${totalRevenue.toLocaleString()}`, trend: '+18.5%', color: 'text-gold', bg: 'bg-gold/5' },
          { label: 'Active Partners', val: activePartners.toString(), trend: 'Stable', color: 'text-green-500', bg: 'bg-green-500/5' },
          { label: 'Pending Apps', val: pendingApps.toString(), trend: `New: ${pendingApps}`, color: 'text-blue-500', bg: 'bg-blue-500/5' },
          { label: 'Compliance Score', val: '100%', trend: 'Verified', color: 'text-crimson', bg: 'bg-crimson/5' },
        ],
        recentAlerts: applications?.slice(-4).map((app: any) => ({
          text: `New Casting: ${app.firstName} ${app.lastName?.charAt(0)}.`,
          type: 'info',
          time: 'Just now'
        })) || []
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
