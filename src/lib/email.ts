import nodemailer from 'nodemailer';
import type { Locale } from '@/i18n';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587', 10),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendEmail({ to, subject, html, text }: EmailOptions): Promise<boolean> {
  if (!process.env.EMAIL_SERVER_HOST || !process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD) {
    console.warn('Email transport is not configured. Skipping send.');
    return false;
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER,
      to,
      subject,
      html,
      text,
    });
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error: any) {
    console.error('Error sending email:', error);
    return false;
  }
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch] as string);

interface EmailCopy {
  greeting: string;
  paragraphs: string[];
  signoff: string;
  team: string;
  subject: string;
  text: string;
}

const renderEmail = ({ subject, greeting, paragraphs, signoff, team, text }: EmailCopy) => ({
  subject,
  html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><h2 style="color: #c9a84c;">${greeting}</h2>${paragraphs.map((p) => `<p>${p}</p>`).join('')}<p>${signoff}<br/>${team}</p></div>`,
  text,
});

const SIGN_OFF: Record<Locale, { signoff: string; team: string }> = {
  pl: { signoff: 'Z poważaniem,', team: 'Zespół Studio HRL Adult' },
  en: { signoff: 'Kind regards,', team: 'The Studio HRL Adult Team' },
};

const castingApplicationCopy = (firstName: string, status: 'approved' | 'rejected' | 'pending'): Record<Locale, Omit<EmailCopy, 'signoff' | 'team'>> => {
  const copy = {
    approved: {
      pl: {
        subject: 'Studio HRL Adult - Twoja aplikacja została zatwierdzona!',
        greeting: `Witaj ${firstName}!`,
        paragraphs: [
          'Z przyjemnością informujemy, że Twoja aplikacja do Studio HRL Adult została <strong>zatwierdzona</strong>.',
          'Nasz zespół skontaktuje się z Tobą wkrótce w celu ustalenia szczegółów sesji testowej.',
          'Jeśli masz pytania, napisz do nas śmiało.',
        ],
        text: `Witaj ${firstName}! Z przyjemnością informujemy, że Twoja aplikacja do Studio HRL Adult została zatwierdzona. Nasz zespół skontaktuje się z Tobą wkrótce. Z poważaniem, Zespół Studio HRL Adult`,
      },
      en: {
        subject: 'Studio HRL Adult - Your application has been approved!',
        greeting: `Hello ${firstName}!`,
        paragraphs: [
          'We are pleased to inform you that your application to Studio HRL Adult has been <strong>approved</strong>.',
          'Our team will contact you shortly to arrange the details of your test session.',
          'If you have any questions, feel free to write to us.',
        ],
        text: `Hello ${firstName}! We are pleased to inform you that your application to Studio HRL Adult has been approved. Our team will contact you shortly. Kind regards, The Studio HRL Adult Team`,
      },
    },
    rejected: {
      pl: {
        subject: 'Studio HRL Adult - Informacja o Twojej aplikacji',
        greeting: `Witaj ${firstName}!`,
        paragraphs: [
          'Dziękujemy za zainteresowanie współpracą z Studio HRL Adult.',
          'Po przeanalizowaniu Twojej aplikacji niestety musimy poinformować, że w tym momencie nie możemy przyjąć Cię do naszego zespołu.',
          'Możesz ponownie złożyć aplikację w przyszłości, gdy będziemy prowadzić nowe rekrutacje.',
        ],
        text: `Witaj ${firstName}! Dziękujemy za zainteresowanie współpracą z Studio HRL Adult. Po przeanalizowaniu Twojej aplikacji nie możemy przyjąć Cię do zespołu. Z poważaniem, Zespół Studio HRL Adult`,
      },
      en: {
        subject: 'Studio HRL Adult - Information about your application',
        greeting: `Hello ${firstName}!`,
        paragraphs: [
          'Thank you for your interest in working with Studio HRL Adult.',
          'After reviewing your application, we regret to inform you that we are unable to accept you into our team at this time.',
          'You are welcome to apply again in the future when we run new recruitment rounds.',
        ],
        text: `Hello ${firstName}! Thank you for your interest in working with Studio HRL Adult. After reviewing your application we are unable to accept you into the team. Kind regards, The Studio HRL Adult Team`,
      },
    },
    pending: {
      pl: {
        subject: 'Studio HRL Adult - Otrzymaliśmy Twoją aplikację',
        greeting: `Witaj ${firstName}!`,
        paragraphs: [
          'Dziękujemy za złożenie aplikacji do Studio HRL Adult.',
          'Twoja aplikacja została odebrana i jest obecnie w trakcie analizy przez nasz zespół.',
          'Skontaktujemy się z Tobą w ciągu 24-48 godzin z informacją o dalszych krokach.',
        ],
        text: `Witaj ${firstName}! Dziękujemy za złożenie aplikacji do Studio HRL Adult. Twoja aplikacja została odebrana i jest analizowana. Skontaktujemy się z Tobą w ciągu 24-48 godzin. Z poważaniem, Zespół Studio HRL Adult`,
      },
      en: {
        subject: 'Studio HRL Adult - We have received your application',
        greeting: `Hello ${firstName}!`,
        paragraphs: [
          'Thank you for submitting your application to Studio HRL Adult.',
          'Your application has been received and is currently being reviewed by our team.',
          'We will get back to you within 24-48 hours with information about the next steps.',
        ],
        text: `Hello ${firstName}! Thank you for submitting your application to Studio HRL Adult. Your application has been received and is being reviewed. We will get back to you within 24-48 hours. Kind regards, The Studio HRL Adult Team`,
      },
    },
  };
  return copy[status];
};

export const emailTemplates = {
  // Messages to applicants/contacts are rendered in the language they used on the site (default: Polish).
  castingApplication: (firstName: string, status: 'approved' | 'rejected' | 'pending', locale: Locale = 'pl') =>
    renderEmail({ ...castingApplicationCopy(firstName, status)[locale], ...SIGN_OFF[locale] }),
  castingReminder: (firstName: string, locale: Locale = 'pl') =>
    renderEmail({
      ...SIGN_OFF[locale],
      ...{
        pl: {
          subject: 'Studio HRL Adult - Przypomnienie o sesji testowej',
          greeting: `Witaj ${firstName}!`,
          paragraphs: [
            'To jest przypomnienie o zaplanowanej sesji testowej w Studio HRL Adult.',
            'Prosimy o potwierdzenie swojej obecności i przybycie na czas.',
            'Jeśli musisz przełożyć termin, skontaktuj się z nami.',
          ],
          text: `Witaj ${firstName}! To jest przypomnienie o zaplanowanej sesji testowej w Studio HRL Adult. Prosimy o potwierdzenie obecności. Z poważaniem, Zespół Studio HRL Adult`,
        },
        en: {
          subject: 'Studio HRL Adult - Test session reminder',
          greeting: `Hello ${firstName}!`,
          paragraphs: [
            'This is a reminder about your scheduled test session at Studio HRL Adult.',
            'Please confirm your attendance and arrive on time.',
            'If you need to reschedule, please contact us.',
          ],
          text: `Hello ${firstName}! This is a reminder about your scheduled test session at Studio HRL Adult. Please confirm your attendance. Kind regards, The Studio HRL Adult Team`,
        },
      }[locale],
    }),
  customEmail: (subject: string, html: string, text: string) => ({ subject, html, text }),
  contactConfirmation: (name: string, topic: string, locale: Locale = 'pl') => {
    const safeName = escapeHtml(name);
    const safeTopic = escapeHtml(topic);
    return renderEmail({
      ...SIGN_OFF[locale],
      ...{
        pl: {
          subject: 'Studio HRL Adult - Otrzymaliśmy Twoją wiadomość',
          greeting: `Dziękujemy za kontakt, ${safeName}!`,
          paragraphs: ['Otrzymaliśmy Twoją wiadomość i odpowiemy w ciągu 24-48 godzin.', `Temat: <strong>${safeTopic}</strong>`],
          text: `Dziękujemy za kontakt, ${name}! Otrzymaliśmy Twoją wiadomość i odpowiemy w ciągu 24-48 godzin. Z poważaniem, Zespół Studio HRL Adult`,
        },
        en: {
          subject: 'Studio HRL Adult - We have received your message',
          greeting: `Thank you for getting in touch, ${safeName}!`,
          paragraphs: ['We have received your message and will reply within 24-48 hours.', `Topic: <strong>${safeTopic}</strong>`],
          text: `Thank you for getting in touch, ${name}! We have received your message and will reply within 24-48 hours. Kind regards, The Studio HRL Adult Team`,
        },
      }[locale],
    });
  },
  // Internal notification for the studio team; always Polish.
  contactForm: (name: string, email: string, topic: string, message: string, phone?: string) => ({
    subject: `Nowa wiadomość kontaktowa: ${topic}`,
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><h2 style="color: #c9a84c;">Nowa wiadomość z formularza kontaktowego</h2><table style="width: 100%; border-collapse: collapse;"><tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Imię i nazwisko</td><td style="padding: 8px; border-bottom: 1px solid #333; color: #ccc;">${name}</td></tr><tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Email</td><td style="padding: 8px; border-bottom: 1px solid #333; color: #ccc;">${email}</td></tr>${phone ? `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Telefon</td><td style="padding: 8px; border-bottom: 1px solid #333; color: #ccc;">${phone}</td></tr>` : ''}<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Temat</td><td style="padding: 8px; border-bottom: 1px solid #333; color: #ccc;">${topic}</td></tr></table><h3 style="color: #c9a84c; margin-top: 20px;">Wiadomość:</h3><p style="color: #ccc; line-height: 1.7;">${message}</p></div>`,
    text: `Nowa wiadomość od ${name} (${email})\nTemat: ${topic}\n${phone ? `Telefon: ${phone}\n` : ''}Wiadomość: ${message}`,
  }),
};
