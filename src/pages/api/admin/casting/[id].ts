import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { sendEmail, emailTemplates } from '@/lib/email';
import { requireAdminSession } from '@/lib/adminSession';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!requireAdminSession(req, res)) {
    return;
  }

  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  if (req.method === 'PUT') {
    try {
      const { status, sendEmail: shouldSendEmail = true } = req.body;
      
      // Get current application to check if status is changing
      const currentApp = await prisma.castingApplication.findUnique({
        where: { id }
      });

      if (!currentApp) {
        return res.status(404).json({ error: 'Application not found' });
      }

      // Only send email if status is actually changing
      if (currentApp.status !== status && shouldSendEmail) {
        const template = emailTemplates.castingApplication(currentApp.firstName, status);
        await sendEmail({
          to: currentApp.email,
          subject: template.subject,
          html: template.html,
          text: template.text
        });
      }

      const updatedApp = await prisma.castingApplication.update({
        where: { id },
        data: { status }
      });
      
      return res.status(200).json(updatedApp);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.castingApplication.delete({
        where: { id }
      });
      return res.status(200).json({ message: 'Deleted successfully' });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
