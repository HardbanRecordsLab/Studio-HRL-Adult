import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('Partner').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  } else if (req.method === 'POST') {
    const { data, error } = await supabase.from('Partner').insert([req.body]).select();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data[0]);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    const { error } = await supabase.from('Partner').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ message: 'Partner removed' });
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
