import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendEmail({ to, subject, html, text }: EmailOptions): Promise<boolean> {
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

// Email templates for different purposes
export const emailTemplates = {
  castingApplication: (firstName: string, status: 'approved' | 'rejected' | 'pending') => {
    if (status === 'approved') {
      return {
        subject: 'Studio HRL Adult - Twoja aplikacja została zatwierdzona! 🎉',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #c9a84c;">Witaj ${firstName}!</h2>
            <p>Z przyjemnością informujemy, że Twoja aplikacja do Studio HRL Adult została <strong>zatwierdzona</strong>!</p>
            <p>Nasz zespół skontaktuje się z Tobą wkrótce w celu ustalenia szczegółów sesji testowej.</p>
            <p>Jeśli masz jakiekolwiek pytania, nie wahaj się skontaktować z nami.</p>
            <p>Z poważaniem,<br/>Zespół Studio HRL Adult</p>
          </div>
        `,
        text: `Witaj ${firstName}! Z przyjemnością informujemy, że Twoja aplikacja do Studio HRL Adult została zatwierdzona! Nasz zespół skontaktuje się z Tobą wkrótce. Z poważaniem, Zespół Studio HRL Adult`
      };
    } else if (status === 'rejected') {
      return {
        subject: 'Studio HRL Adult - Informacja o Twojej aplikacji',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #c9a84c;">Witaj ${firstName}!</h2>
            <p>Dziękujemy za zainteresowanie współpracą z Studio HRL Adult.</p>
            <p>Po przeanalizowaniu Twojej aplikacji niestety musimy poinformować, że w tym momencie nie możemy przyjąć Cię do naszego zespołu.</p>
            <p>Możesz ponownie złożyć aplikację w przyszłości, gdy będziemy prowadzić nowe rekrutacje.</p>
            <p>Z poważaniem,<br/>Zespół Studio HRL Adult</p>
          </div>
        `,
        text: `Witaj ${firstName}! Dziękujemy za zainteresowanie współpracą z Studio HRL Adult. Po przeanalizowaniu Twojej aplikacji niestety musimy poinformować, że w tym momencie nie możemy przyjąć Cię do naszego zespołu. Z poważaniem, Zespół Studio HRL Adult`
      };
    } else {
      return {
        subject: 'Studio HRL Adult - Otrzymaliśmy Twoją aplikację',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #c9a84c;">Witaj ${firstName}!</h2>
            <p>Dziękujemy za złożenie aplikacji do Studio HRL Adult.</p>
            <p>Twoja aplikacja została odebrana i jest obecnie w trakcie analizy przez nasz zespół.</p>
            <p>Skontaktujemy się z Tobą w ciągu 24-48 godzin z informacją o dalszych krokach.</p>
            <p>Z poważaniem,<br/>Zespół Studio HRL Adult</p>
          </div>
        `,
        text: `Witaj ${firstName}! Dziękujemy za złożenie aplikacji do Studio HRL Adult. Twoja aplikacja została odebrana i jest obecnie w trakcie analizy. Skontaktujemy się z Tobą w ciągu 24-48 godzin. Z poważaniem, Zespół Studio HRL Adult`
      };
    }
  },
  
  castingReminder: (firstName: string) => ({
    subject: 'Studio HRL Adult - Przypomnienie o sesji testowej',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #c9a84c;">Witaj ${firstName}!</h2>
        <p>To jest przypomnienie o zaplanowanej sesji testowej w Studio HRL Adult.</p>
        <p>Prosimy o potwierdzenie swojej obecności i przybycie na czas.</p>
        <p>Jeśli masz jakiekolwiek pytania lub musisz przełożyć termin, skontaktuj się z nami.</p>
        <p>Z poważaniem,<br/>Zespół Studio HRL Adult</p>
      </div>
    `,
    text: `Witaj ${firstName}! To jest przypomnienie o zaplanowanej sesji testowej w Studio HRL Adult. Prosimy o potwierdzenie obecności. Z poważaniem, Zespół Studio HRL Adult`
  }),

  customEmail: (subject: string, html: string, text: string) => ({
    subject,
    html,
    text
  }),

  contactForm: (name: string, email: string, topic: string, message: string, phone?: string) => ({
    subject: `Nowa wiadomość kontaktowa: ${topic}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #c9a84c;">Nowa wiadomość z formularza kontaktowego</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Imię i Nazwisko</td><td style="padding: 8px; border-bottom: 1px solid #333; color: #ccc;">${name}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Email</td><td style="padding: 8px; border-bottom: 1px solid #333; color: #ccc;">${email}</td></tr>
          ${phone ? `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Telefon</td><td style="padding: 8px; border-bottom: 1px solid #333; color: #ccc;">${phone}</td></tr>` : ''}
          <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Temat</td><td style="padding: 8px; border-bottom: 1px solid #333; color: #ccc;">${topic}</td></tr>
        </table>
        <h3 style="color: #c9a84c; margin-top: 20px;">Wiadomość:</h3>
        <p style="color: #ccc; line-height: 1.7;">${message}</p>
      </div>
    `,
    text: `Nowa wiadomość od ${name} (${email})\nTemat: ${topic}\n${phone ? `Telefon: ${phone}\n` : ''}Wiadomość: ${message}`
  })
};
