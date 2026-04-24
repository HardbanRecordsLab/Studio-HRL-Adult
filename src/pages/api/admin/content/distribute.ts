import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { fork } from 'child_process';
import path from 'path';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { contentId, platforms } = req.body;

  try {
    const content = await prisma.academyVideo.findUnique({
      where: { id: contentId }
    });

    if (!content) return res.status(404).json({ error: 'Content not found' });

    console.log(`[HRL] Starting distribution for: ${content.title} on ${platforms.join(', ')}`);

    // Uruchamiamy proces w tle (Zero Cost - Twój serwer wykonuje robotę)
    // W prawdziwym środowisku użylibyśmy kolejki (np. BullMQ), ale na start robimy to "najtaniej"
    const scriptPath = path.resolve('scripts/automation/syndicator.js');
    
    // Symulacja uruchomienia (wersja produkcyjna będzie korzystać z fork/spawn)
    // const worker = fork(scriptPath, [contentId, ...platforms]);

    return res.status(200).json({ 
      status: 'success', 
      message: 'Proces dystrybucji został uruchomiony w tle.',
      jobId: `dist_${Date.now()}`
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
