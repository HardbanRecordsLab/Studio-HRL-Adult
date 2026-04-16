import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail, emailTemplates } from '@/lib/email';
import { requireAdminSession } from '@/lib/adminSession';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!requireAdminSession(req, res)) {
    return;
  }

  if (req.method === 'POST') {
    try {
      const { to, type, firstName, status, subject, html, text } = req.body;
      
      let emailOptions;
      
      if (type === 'casting') {
        const template = emailTemplates.castingApplication(firstName, status);
        emailOptions = {
          to,
          subject: template.subject,
          html: template.html,
          text: template.text
        };
      } else if (type === 'reminder') {
        const template = emailTemplates.castingReminder(firstName);
        emailOptions = {
          to,
          subject: template.subject,
          html: template.html,
          text: template.text
        };
      } else if (type === 'custom') {
        emailOptions = {
          to,
          subject,
          html,
          text
        };
      } else {
        return res.status(400).json({ message: 'Invalid email type' });
      }
      
      const success = await sendEmail(emailOptions);
      
      if (success) {
        return res.status(200).json({ message: 'Email sent successfully' });
      } else {
        return res.status(500).json({ message: 'Failed to send email' });
      }
    } catch (error: any) {
      console.error('Email sending error:', error);
      return res.status(500).json({ message: 'Error sending email', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
