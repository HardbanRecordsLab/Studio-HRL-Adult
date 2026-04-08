import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';
import { verifyAdminRequest } from '@/utils/adminAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const authorized = await verifyAdminRequest(req, res);
    if (!authorized) return;

    try {
      // Mock security data - in real implementation, track actual logs
      const securityData = {
        overview: {
          complianceScore: 100,
          activeSessions: 12,
          failedLogins: 3,
          lastBackup: '2026-04-08 02:00'
        },
        auditLog: [
          { time: '2026-04-08 14:32', action: 'User login', user: 'admin@hrl.com', ip: '192.168.1.1', status: 'success' },
          { time: '2026-04-08 14:15', action: 'Profile updated', user: 'Anna K.', ip: '10.0.0.5', status: 'success' },
          { time: '2026-04-08 13:45', action: 'Failed login attempt', user: 'unknown', ip: '203.0.113.1', status: 'failed' },
          { time: '2026-04-08 13:22', action: 'Content published', user: 'admin@hrl.com', ip: '192.168.1.1', status: 'success' },
          { time: '2026-04-08 12:58', action: 'Payment processed', user: 'system', ip: '127.0.0.1', status: 'success' },
          { time: '2026-04-08 12:30', action: 'Compliance check', user: 'system', ip: '127.0.0.1', status: 'success' }
        ],
        compliance: {
          ageVerification: {
            verified: 98.5,
            pending: 1.5,
            rejected: 0
          },
          contentModeration: {
            approved: 95.2,
            underReview: 4.8,
            blocked: 0
          }
        }
      };

      return res.status(200).json(securityData);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    const authorized = await verifyAdminRequest(req, res);
    if (!authorized) return;

    try {
      const { action } = req.body;

      if (action === 'run_compliance_audit') {
        // Mock compliance audit - in real implementation, run actual checks
        return res.status(200).json({
          success: true,
          message: 'Compliance audit completed successfully',
          results: {
            ageVerification: 'All users verified',
            contentModeration: 'No violations found',
            dataPrivacy: 'GDPR compliant',
            timestamp: new Date().toISOString()
          }
        });
      }

      return res.status(400).json({ error: 'Invalid action' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.status(405).end(`Method ${req.method} Not Allowed`);
}