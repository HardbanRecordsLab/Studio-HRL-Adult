import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { data, error } = await supabase
        .from('CastingApplication')
        .insert([{
          ...req.body,
          status: 'pending'
        }])
        .select();

      if (error) throw error;
      
      return res.status(201).json({ message: 'Application submitted successfully', data });
    } catch (error: any) {
      console.error('Submission error:', error);
      return res.status(500).json({ message: 'Error saving application', error: error.message });
    }
  } else if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('CastingApplication')
      .select('*');
      
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
