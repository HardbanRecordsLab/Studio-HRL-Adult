import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { sendEmail, emailTemplates } from '@/lib/email';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

async function persistMediaAsset(value: unknown, resourceType: 'image' | 'video') {
  if (typeof value !== 'string' || !value.trim()) return null;
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  if (!value.startsWith('data:')) return null;

  const uploadResult = await cloudinary.uploader.upload(value, {
    folder: 'casting-applications',
    resource_type: resourceType,
  });

  return uploadResult.secure_url;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.birthDate || !data.motivation) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const [photo1Url, photo2Url, photo3Url, videoUrl] = await Promise.all([
        persistMediaAsset(data.photo1, 'image'),
        persistMediaAsset(data.photo2, 'image'),
        persistMediaAsset(data.photo3, 'image'),
        persistMediaAsset(data.video, 'video'),
      ]);

      const newApplication = await prisma.castingApplication.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          birthDate: new Date(data.birthDate),
          height: data.height ? parseInt(data.height, 10) : null,
          weight: data.weight ? parseInt(data.weight, 10) : null,
          hairColor: data.hairColor || null,
          eyeColor: data.eyeColor || null,
          breastSize: data.breastSize || null,
          experience: data.experience || 'no',
          experienceDesc: data.experienceDesc || null,
          platforms: data.platforms || [],
          contentTypes: data.contentTypes || [],
          limits: data.limits || null,
          sessionsPerWeek: data.sessionsPerWeek || null,
          workingTimes: data.workingTimes || [],
          motivation: data.motivation,
          bodyModifications: data.bodyModifications || null,
          skills: data.skills || null,
          consentAge: Boolean(data.consentAge),
          consentTerms: Boolean(data.consentTerms),
          consentData: Boolean(data.consentData),
          consentMarketing: Boolean(data.consentMarketing),
          photo1: photo1Url,
          photo2: photo2Url,
          photo3: photo3Url,
          video: videoUrl,
          status: 'pending',
        },
      });

      console.log('Casting application saved to DB:', newApplication.id);

      // Attempt to send email but don't fail the whole request if it fails
      try {
        const template = emailTemplates.castingApplication(data.firstName, 'pending');
        await sendEmail({
          to: data.email,
          subject: template.subject,
          html: template.html,
          text: template.text,
        });
        console.log('Confirmation email sent to:', data.email);
      } catch (emailError) {
        console.error('Email sending failed but application is saved:', emailError);
      }

      return res.status(201).json({ 
        success: true,
        message: 'Application submitted successfully', 
        id: newApplication.id 
      });
    } catch (error: any) {
      console.error('CRITICAL ERROR during casting submission:', error);
      return res.status(500).json({ 
        success: false,
        message: 'Error saving application', 
        error: error.message 
      });
    }
  }

  if (req.method === 'GET') {
    try {
      const applications = await prisma.castingApplication.findMany({ orderBy: { createdAt: 'desc' } });
      return res.status(200).json(applications);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader('Allow', ['POST', 'GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
