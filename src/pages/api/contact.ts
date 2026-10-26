import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { sendEmail, emailTemplates } from '@/lib/email';
import { toLocale, Messages } from '@/i18n';

const en = {
  required: 'Required fields: name, email, topic, message',
  failed: 'An error occurred while sending the message',
};

const pl: typeof en = {
  required: 'Wymagane pola: name, email, topic, message',
  failed: 'Wystąpił błąd podczas wysyłania wiadomości',
};

const messages: Messages<typeof en> = { en, pl };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  const locale = toLocale(req.body?.locale);
  const t = messages[locale];

  try {
    const { name, email, phone, topic, message } = req.body;

    if (!name || !email || !topic || !message) {
      return res.status(400).json({ error: t.required });
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

    const confirmation = emailTemplates.contactConfirmation(name, topic, locale);
    emailResults.senderConfirmationSent = await sendEmail({
      to: email,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    });

    return res.status(200).json({ success: true, id: contactMsg.id, emailResults });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: t.failed });
  }
}
