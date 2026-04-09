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
      // Get single podcast
      const podcast = await prisma.academyPodcast.findUnique({
        where: { id }
      });

      if (!podcast) {
        return NextResponse.json({ error: 'Podcast not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: podcast });
    } else {
      // Get all podcasts
      const podcasts = await prisma.academyPodcast.findMany({
        orderBy: { order: 'asc' }
      });

      return NextResponse.json({ success: true, data: podcasts });
    }
  } catch (error) {
    console.error('Error fetching academy podcasts:', error);
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
      title,
      description,
      episodeNumber,
      duration,
      cloudinaryId,
      url,
      format,
      bytes,
      isActive
    } = body;

    // Validate required fields
    if (!title || !episodeNumber || !duration || !cloudinaryId || !url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get the highest order value and increment
    const lastPodcast = await prisma.academyPodcast.findFirst({
      orderBy: { order: 'desc' }
    });
    const newOrder = lastPodcast ? lastPodcast.order + 1 : 1;

    // Create podcast
    const podcast = await prisma.academyPodcast.create({
      data: {
        title,
        description,
        episodeNumber,
        duration,
        cloudinaryId,
        url,
        format,
        bytes,
        isActive: isActive !== false,
        order: newOrder
      }
    });

    return NextResponse.json({ success: true, data: podcast });
  } catch (error) {
    console.error('Error creating academy podcast:', error);
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
      return NextResponse.json({ error: 'Missing podcast ID' }, { status: 400 });
    }

    const body = await request.json();
    const {
      title,
      description,
      episodeNumber,
      duration,
      cloudinaryId,
      url,
      format,
      bytes,
      isActive,
      order
    } = body;

    // Validate required fields
    if (!title || !episodeNumber || !duration || !cloudinaryId || !url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Update podcast
    const podcast = await prisma.academyPodcast.update({
      where: { id },
      data: {
        title,
        description,
        episodeNumber,
        duration,
        cloudinaryId,
        url,
        format,
        bytes,
        isActive: isActive !== false,
        order: order !== undefined ? order : undefined
      }
    });

    return NextResponse.json({ success: true, data: podcast });
  } catch (error) {
    console.error('Error updating academy podcast:', error);
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
      return NextResponse.json({ error: 'Missing podcast ID' }, { status: 400 });
    }

    // Delete podcast
    await prisma.academyPodcast.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: 'Podcast deleted successfully' });
  } catch (error) {
    console.error('Error deleting academy podcast:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
