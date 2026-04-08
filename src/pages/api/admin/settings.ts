import type { NextApiRequest, NextApiResponse } from 'next';
import { readDB, writeDB } from '@/utils/db';
import { verifyAdminRequest } from '@/utils/adminAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authorized = await verifyAdminRequest(req, res);
  if (!authorized) return;

  if (req.method === 'GET') {
    const db = readDB();
    const settings = db.settings || {
      general: {
        siteName: 'Studio HRL Adult',
        adminEmail: 'admin@hrlstudio.com',
        currency: 'EUR',
        timezone: 'Europe/Warsaw'
      },
      integrations: {
        cloudinary: { status: 'connected' },
        supabase: { status: 'connected' },
        stripe: { status: 'not_configured' },
        sendgrid: { status: 'not_configured' },
        twitter: { status: 'pending' },
        meta: { status: 'pending' }
      },
      maintenance: {
        lastBackup: '2026-04-08 02:00',
        systemUptime: '15 days',
        version: '2.1.0'
      }
    };

    return res.status(200).json(settings);
  }

  if (req.method === 'POST') {
    const db = readDB();
    const { section, data } = req.body;

    if (!db.settings) db.settings = {};

    if (section === 'general') {
      db.settings.general = { ...db.settings.general, ...data };
    } else if (section === 'integrations') {
      db.settings.integrations = { ...db.settings.integrations, ...data };
    } else if (section === 'maintenance') {
      if (data.action === 'clear_cache') {
        // Mock cache clearing
        db.settings.maintenance = {
          ...db.settings.maintenance,
          lastCacheClear: new Date().toISOString()
        };
      } else if (data.action === 'backup_database') {
        // Mock database backup
        db.settings.maintenance = {
          ...db.settings.maintenance,
          lastBackup: new Date().toISOString()
        };
      } else if (data.action === 'reset_settings') {
        // Reset to defaults
        db.settings = {};
      }
    }

    writeDB(db);
    return res.status(200).json({ success: true, settings: db.settings });
  }

  res.status(405).end(`Method ${req.method} Not Allowed`);
}