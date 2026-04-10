import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyAdminRequest } from '@/utils/adminAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authorized = await verifyAdminRequest(req, res);
  if (!authorized) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { applicationId, decision, template } = req.body;

  try {
    // This would typically integrate with an email service like SendGrid, Nodemailer, etc.
    // For now, we'll simulate the email sending
    
    const emailTemplates = {
      approval: {
        subject: 'Congratulations! Your Application Has Been Approved',
        body: `
Dear Applicant,

Congratulations! We are pleased to inform you that your application to join Studio HRL has been approved.

Next steps:
1. Complete your profile setup
2. Submit verification documents
3. Schedule your onboarding session

We're excited to work with you!

Best regards,
Studio HRL Team
        `
      },
      rejection: {
        subject: 'Update on Your Application',
        body: `
Dear Applicant,

Thank you for your interest in joining Studio HRL. After careful consideration, we have decided not to move forward with your application at this time.

We appreciate the time you took to apply and wish you the best in your future endeavors.

Best regards,
Studio HRL Team
        `
      },
      review: {
        subject: 'Your Application is Under Review',
        body: `
Dear Applicant,

Thank you for your application to join Studio HRL. We have received your application and it is currently under review.

We will contact you within 3-5 business days with an update on your application status.

Best regards,
Studio HRL Team
        `
      }
    };

    const templateData = emailTemplates[template as keyof typeof emailTemplates];
    if (!templateData) {
      return res.status(400).json({ error: 'Invalid email template' });
    }

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real implementation, you would use an email service here:
    // await sendEmail({
    //   to: applicantEmail,
    //   subject: templateData.subject,
    //   body: templateData.body
    // });

    console.log(`Email sent to application ${applicationId}:`, {
      template,
      decision,
      subject: templateData.subject
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      template: template,
      decision: decision
    });

  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
