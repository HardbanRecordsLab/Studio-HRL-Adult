import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { sendEmail, emailTemplates } from '@/lib/email';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { name, email, phone, topic, message } = req.body;

    if (!name || !email || !topic || !message) {
      return res.status(400).json({ error: 'Wymagane pola: name, email, topic, message' });
    }

    const contactMsg = await prisma.contactMessage.create({
      data: { name, email, phone: phone || null, topic, message },
    });

    const emailResults = {
      adminNotificationSent: false,
      senderConfirmationSent: false,
    };

    const studioEmail = process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER;
    if (studioEmail) {
      const template = emailTemplates.contactForm(name, email, topic, message, phone);
      emailResults.adminNotificationSent = await sendEmail({
        to: studioEmail,
        subject: template.subject,
        html: template.html,
        text: template.text,
      });
    }

    emailResults.senderConfirmationSent = await sendEmail({
      to: email,
      subject: 'Studio HRL Adult - Otrzymaliśmy Twoją wiadomość',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #c9a84c;">Dziękujemy za kontakt, ${name}!</h2>
          <p>Otrzymaliśmy Twoją wiadomość i odpowiemy w ciągu 24-48 godzin.</p>
          <p>Temat: <strong>${topic}</strong></p>
          <p>Z poważaniem,<br/>Zespół Studio HRL Adult</p>
        </div>
      `,
      text: `Dziękujemy za kontakt, ${name}! Otrzymaliśmy Twoją wiadomość i odpowiemy w ciągu 24-48 godzin. Z poważaniem, Zespół Studio HRL Adult`,
    });

    return res.status(200).json({ success: true, id: contactMsg.id, emailResults });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Wystąpił błąd podczas wysyłania wiadomości' });
  }
}
