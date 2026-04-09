import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { logAdminAction, ADMIN_ACTIONS, ADMIN_RESOURCES } from '@/lib/adminLog';

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdminRequest(request);
    if (!auth.success) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const resource = searchParams.get('resource');
    const action = searchParams.get('action');
    const adminEmail = searchParams.get('adminEmail');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const fromDate = searchParams.get('fromDate');
    const toDate = searchParams.get('toDate');

    // Build where clause
    const whereClause: any = {};

    if (resource && resource !== 'all') {
      whereClause.resource = resource;
    }

    if (action && action !== 'all') {
      whereClause.action = action;
    }

    if (adminEmail) {
      whereClause.adminEmail = {
        contains: adminEmail,
        mode: 'insensitive'
      };
    }

    if (fromDate || toDate) {
      whereClause.createdAt = {};
      if (fromDate) {
        whereClause.createdAt.gte = new Date(fromDate);
      }
      if (toDate) {
        whereClause.createdAt.lte = new Date(toDate);
      }
    }

    // Get total count for pagination
    const total = await prisma.adminLog.count({
      where: whereClause
    });

    // Get logs with pagination
    const logs = await prisma.adminLog.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    });

    return NextResponse.json({
      success: true,
      data: logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching logs:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = await verifyAdminRequest(request);
    if (!auth.success) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');

    if (!days || days < 1) {
      return NextResponse.json({ error: 'Invalid days parameter' }, { status: 400 });
    }

    // Delete logs older than specified days
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const result = await prisma.adminLog.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate
        }
      }
    });

    // Log the cleanup action
    await logAdminAction({
      adminEmail: auth.admin?.email || 'unknown',
      action: ADMIN_ACTIONS.CLEANUP_LOGS,
      resource: ADMIN_RESOURCES.LOGS,
      details: JSON.stringify({ deletedCount: result.count, days }),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    });

    return NextResponse.json({
      success: true,
      message: `Deleted ${result.count} log entries older than ${days} days`
    });
  } catch (error) {
    console.error('Error cleaning up logs:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdminRequest(request);
    if (!auth.success) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const exportType = searchParams.get('type');

    if (exportType === 'csv') {
      // Get all logs for CSV export
      const logs = await prisma.adminLog.findMany({
        orderBy: { createdAt: 'desc' }
      });

      // Convert to CSV
      const headers = ['Date', 'Admin Email', 'Action', 'Resource', 'Resource ID', 'Details', 'IP'];
      const csvContent = [
        headers.join(','),
        ...logs.map(log => [
          log.createdAt.toISOString(),
          log.adminEmail,
          log.action,
          log.resource,
          log.resourceId || '',
          log.details || '',
          log.ip || ''
        ].map(field => `"${field}"`).join(','))
      ].join('\n');

      // Log the export action
      await logAdminAction({
        adminEmail: auth.admin?.email || 'unknown',
        action: ADMIN_ACTIONS.EXPORT_DATA,
        resource: ADMIN_RESOURCES.LOGS,
        details: JSON.stringify({ exportType: 'csv', recordCount: logs.length }),
        ip: request.headers.get('x-forwarded-for') || 'unknown'
      });

      return new Response(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="admin-logs-${new Date().toISOString().split('T')[0]}.csv"`
        }
      });
    }

    return NextResponse.json({ error: 'Invalid export type' }, { status: 400 });
  } catch (error) {
    console.error('Error exporting logs:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
