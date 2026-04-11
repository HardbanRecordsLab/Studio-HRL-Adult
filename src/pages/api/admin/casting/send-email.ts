import type { NextApiRequest, NextApiResponse } from 'next';
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

  if (req.method === 'POST') {
    // In the future this will trigger SendGrid, Resend, or Nodemailer for actual emails
    console.log('[MOCK EMAIL SENT]', req.body);
    return res.status(200).json({ message: 'Email mock sent successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
