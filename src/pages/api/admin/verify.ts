import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;
  // Temporary auth check - in production use JWT
  // if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

  const { method } = req;

  try {
    switch (method) {
      case 'POST': {
        // Create a new document for a partner (KYC submission)
        const { partnerId, type, frontUrl, backUrl, selfieUrl, expiryDate, notes } = req.body;
        
        if (!partnerId || !type || !frontUrl) {
          return res.status(400).json({ error: 'Partner ID, Type and Front URL are mandatory' });
        }

        const document = await prisma.partnerDocument.create({
          data: {
            partnerId,
            type,
            frontUrl,
            backUrl,
            selfieUrl,
            expiryDate: expiryDate ? new Date(expiryDate) : null,
            notes,
            status: 'pending'
          }
        });
        
        return res.status(201).json(document);
      }

      case 'PUT': {
        // Update document status (Verify or Reject)
        const { id, status, notes } = req.body;
        
        if (!id || !status) {
          return res.status(400).json({ error: 'Document ID and Status are mandatory' });
        }

        const document = await prisma.partnerDocument.update({
          where: { id },
          data: { 
            status, 
            notes,
            verifiedAt: status === 'verified' ? new Date() : undefined,
            verifiedBy: 'System Admin' // This would come from token in prod
          }
        });

        // Also update the partner status if needed
        if (status === 'verified') {
           const allDocs = await prisma.partnerDocument.findMany({
             where: { partnerId: document.partnerId }
           });
           const isFullyVerified = allDocs.every(d => d.status === 'verified');
           if (isFullyVerified) {
              await prisma.partner.update({
                where: { id: document.partnerId },
                data: { documentStatus: 'verified' }
              });
           }
        }

        return res.status(200).json(document);
      }

      default:
        res.setHeader('Allow', ['POST', 'PUT']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    console.error('Verify API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
