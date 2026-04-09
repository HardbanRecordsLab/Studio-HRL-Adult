import { prisma } from '@/lib/prisma';

interface LogAdminActionParams {
  adminEmail: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: string;
  ip?: string;
}

export async function logAdminAction({
  adminEmail,
  action,
  resource,
  resourceId,
  details,
  ip
}: LogAdminActionParams) {
  try {
    await prisma.adminLog.create({
      data: {
        adminEmail,
        action,
        resource,
        resourceId,
        details,
        ip: ip || 'unknown'
      }
    });
  } catch (error) {
    console.error('Failed to log admin action:', error);
    // Don't throw error - logging should not break the main flow
  }
}

// Action constants for consistency
export const ADMIN_ACTIONS = {
  // Partners
  CREATE_PARTNER: 'CREATE_PARTNER',
  UPDATE_PARTNER: 'UPDATE_PARTNER',
  DELETE_PARTNER: 'DELETE_PARTNER',
  
  // Casting
  UPDATE_CASTING_STATUS: 'UPDATE_CASTING_STATUS',
  
  // Finance
  CREATE_FINANCIAL_RECORD: 'CREATE_FINANCIAL_RECORD',
  UPDATE_FINANCIAL_RECORD: 'UPDATE_FINANCIAL_RECORD',
  DELETE_FINANCIAL_RECORD: 'DELETE_FINANCIAL_RECORD',
  
  // Documents
  VERIFY_DOCUMENT: 'VERIFY_DOCUMENT',
  REJECT_DOCUMENT: 'REJECT_DOCUMENT',
  CREATE_DOCUMENT: 'CREATE_DOCUMENT',
  DELETE_DOCUMENT: 'DELETE_DOCUMENT',
  
  // Academy
  CREATE_ACADEMY_CONTENT: 'CREATE_ACADEMY_CONTENT',
  UPDATE_ACADEMY_CONTENT: 'UPDATE_ACADEMY_CONTENT',
  DELETE_ACADEMY_CONTENT: 'DELETE_ACADEMY_CONTENT',
  
  // Authentication
  LOGIN: 'LOGIN',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGOUT: 'LOGOUT',
  
  // Settings
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  
  // System
  EXPORT_DATA: 'EXPORT_DATA',
  CLEANUP_LOGS: 'CLEANUP_LOGS'
} as const;

// Resource constants for consistency
export const ADMIN_RESOURCES = {
  PARTNERS: 'partners',
  CASTING: 'casting',
  FINANCE: 'finance',
  DOCUMENTS: 'documents',
  ACADEMY: 'academy',
  SETTINGS: 'settings',
  LOGS: 'logs',
  AUTH: 'auth'
} as const;
