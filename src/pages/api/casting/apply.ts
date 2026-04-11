import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      
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
