import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('FinancialRecord').select('*, Partner(name)');
    if (error) return res.status(500).json({ error: error.message });
    
    // Map to the format expected by the frontend
    const mappedData = data.map((t: any) => ({
      id: t.id,
      user: t.Partner?.name || 'Unknown',
      amt: t.amount,
      type: t.type,
      date: new Date(t.date).toLocaleString('en-US', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
      isPositive: t.amount > 0
    }));
    
    return res.status(200).json(mappedData);
  } else if (req.method === 'POST') {
    const { data, error } = await supabase.from('FinancialRecord').insert([req.body]).select();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data[0]);
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
