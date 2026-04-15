import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      
      // Upload files to Cloudinary if they exist
      let photo1Url = null;
      let photo2Url = null;
      let photo3Url = null;
      let videoUrl = null;

      if (data.photo1 && typeof data.photo1 === 'string') {
        try {
          const uploadResult = await cloudinary.uploader.upload(data.photo1, {
            folder: 'casting-applications',
            resource_type: 'image',
          });
          photo1Url = uploadResult.secure_url;
        } catch (error) {
          console.error('Error uploading photo1:', error);
        }
      }

      if (data.photo2 && typeof data.photo2 === 'string') {
        try {
          const uploadResult = await cloudinary.uploader.upload(data.photo2, {
            folder: 'casting-applications',
            resource_type: 'image',
          });
          photo2Url = uploadResult.secure_url;
        } catch (error) {
          console.error('Error uploading photo2:', error);
        }
      }

      if (data.photo3 && typeof data.photo3 === 'string') {
        try {
          const uploadResult = await cloudinary.uploader.upload(data.photo3, {
            folder: 'casting-applications',
            resource_type: 'image',
          });
          photo3Url = uploadResult.secure_url;
        } catch (error) {
          console.error('Error uploading photo3:', error);
        }
      }

      if (data.video && typeof data.video === 'string') {
        try {
          const uploadResult = await cloudinary.uploader.upload(data.video, {
            folder: 'casting-applications',
            resource_type: 'video',
          });
          videoUrl = uploadResult.secure_url;
        } catch (error) {
          console.error('Error uploading video:', error);
        }
      }
      
      const newApplication = await prisma.castingApplication.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          birthDate: new Date(data.birthDate),
          height: data.height ? parseInt(data.height) : null,
          weight: data.weight ? parseInt(data.weight) : null,
          hairColor: data.hairColor,
          eyeColor: data.eyeColor,
          breastSize: data.breastSize,
          experience: data.experience,
          experienceDesc: data.experienceDesc,
          platforms: JSON.stringify(data.platforms || []),
          contentTypes: JSON.stringify(data.contentTypes || []),
          limits: data.limits,
          sessionsPerWeek: data.sessionsPerWeek,
          workingTimes: JSON.stringify(data.workingTimes || []),
          motivation: data.motivation,
          bodyModifications: data.bodyModifications,
          skills: data.skills,
          consentAge: data.consentAge,
          consentTerms: data.consentTerms,
          consentData: data.consentData,
          consentMarketing: data.consentMarketing,
          photo1: photo1Url,
          photo2: photo2Url,
          photo3: photo3Url,
          video: videoUrl,
          status: 'pending'
        }
      });
      
      return res.status(201).json({ message: 'Application submitted successfully', data: newApplication });
    } catch (error: any) {
      console.error('Submission error:', error);
      return res.status(500).json({ message: 'Error saving application', error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const applications = await prisma.castingApplication.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json(applications);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
