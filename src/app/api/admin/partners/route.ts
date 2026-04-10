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

    if (id) {
      // Get single partner
      const partner = await prisma.partner.findUnique({
        where: { id },
        include: {
          platforms: true,
          liveSchedule: true
        }
      });

      if (!partner) {
        return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: partner });
    } else {
      // Get all partners
      const partners = await prisma.partner.findMany({
        include: {
          platforms: true,
          liveSchedule: true
        },
        orderBy: { createdAt: 'desc' }
      });

      return NextResponse.json({ success: true, data: partners });
    }
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdminRequest(request);
    if (!auth.success) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      handle,
      email,
      type,
      status,
      bio,
      description,
      avatar,
      heroImage,
      aboutImage1,
      aboutImage2,
      platforms,
      liveSchedule
    } = body;

    // Validate required fields
    if (!name || !handle || !email || !type || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if handle is unique
    const existingPartner = await prisma.partner.findFirst({
      where: { handle }
    });

    if (existingPartner) {
      return NextResponse.json({ error: 'Handle already exists' }, { status: 400 });
    }

    // Create partner
    const partner = await prisma.partner.create({
      data: {
        name,
        handle,
        email,
        type,
        status,
        bio,
        description,
        avatar,
        heroImage,
        aboutImage1,
        aboutImage2,
        platforms: platforms ? {
          create: platforms.map((p: any) => ({
            name: p.name,
            username: p.username,
            url: p.url,
            followers: p.followers || 0
          }))
        } : undefined,
        liveSchedule: liveSchedule ? {
          create: liveSchedule.map((s: any) => ({
            dayOfWeek: s.dayOfWeek,
            startTime: s.startTime,
            endTime: s.endTime,
            isActive: s.isActive !== false
          }))
        } : undefined
      },
      include: {
        platforms: true,
        liveSchedule: true
      }
    });

    return NextResponse.json({ success: true, data: partner });
  } catch (error) {
    console.error('Error creating partner:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = await verifyAdminRequest(request);
    if (!auth.success) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing partner ID' }, { status: 400 });
    }

    const body = await request.json();
    const {
      name,
      handle,
      email,
      type,
      status,
      bio,
      description,
      avatar,
      heroImage,
      aboutImage1,
      aboutImage2,
      platforms,
      liveSchedule
    } = body;

    // Validate required fields
    if (!name || !handle || !email || !type || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if handle is unique (excluding current partner)
    const existingPartner = await prisma.partner.findFirst({
      where: { 
        handle,
        id: { not: id }
      }
    });

    if (existingPartner) {
      return NextResponse.json({ error: 'Handle already exists' }, { status: 400 });
    }

    // Update partner
    const partner = await prisma.partner.update({
      where: { id },
      data: {
        name,
        handle,
        email,
        type,
        status,
        bio,
        description,
        avatar,
        heroImage,
        aboutImage1,
        aboutImage2,
        platforms: platforms ? {
          deleteMany: {},
          create: platforms.map((p: any) => ({
            name: p.name,
            username: p.username,
            url: p.url,
            followers: p.followers || 0
          }))
        } : undefined,
        liveSchedule: liveSchedule ? {
          deleteMany: {},
          create: liveSchedule.map((s: any) => ({
            dayOfWeek: s.dayOfWeek,
            startTime: s.startTime,
            endTime: s.endTime,
            isActive: s.isActive !== false
          }))
        } : undefined
      },
      include: {
        platforms: true,
        liveSchedule: true
      }
    });

    return NextResponse.json({ success: true, data: partner });
  } catch (error) {
    console.error('Error updating partner:', error);
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
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing partner ID' }, { status: 400 });
    }

    // Delete partner
    await prisma.partner.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Error deleting partner:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
