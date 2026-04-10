import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdminRequest(request);
    if (!auth.success) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const status = searchParams.get('status');

    if (id) {
      // Get single application
      const application = await prisma.castingApplication.findUnique({
        where: { id }
      });

      if (!application) {
        return NextResponse.json({ error: 'Application not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: application });
    } else {
      // Get all applications with optional status filter
      const whereClause = status ? { status } : {};
      
      const applications = await prisma.castingApplication.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' }
      });

      return NextResponse.json({ success: true, data: applications });
    }
  } catch (error) {
    console.error('Error fetching casting applications:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = await verifyAdminRequest(request);
    if (!auth.success) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing required fields: id, status' }, { status: 400 });
    }

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    // Update application status
    const application = await prisma.castingApplication.update({
      where: { id },
      data: { 
        status,
        updatedAt: new Date()
      }
    });

    // TODO: Send email notification if Resend is configured
    // This would be implemented here

    return NextResponse.json({ success: true, data: application });
  } catch (error) {
    console.error('Error updating casting application:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
