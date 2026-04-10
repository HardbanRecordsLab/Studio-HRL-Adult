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
      // Get single video
      const video = await prisma.academyVideo.findUnique({
        where: { id }
      });

      if (!video) {
        return NextResponse.json({ error: 'Video not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: video });
    } else {
      // Get all videos
      const videos = await prisma.academyVideo.findMany({
        orderBy: { order: 'asc' }
      });

      return NextResponse.json({ success: true, data: videos });
    }
  } catch (error) {
    console.error('Error fetching academy videos:', error);
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
      duration,
      level,
      cloudinaryId,
      url,
      thumbnail,
      format,
      bytes,
      width,
      height,
      isActive
    } = body;

    // Validate required fields
    if (!title || !duration || !level || !cloudinaryId || !url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get the highest order value and increment
    const lastVideo = await prisma.academyVideo.findFirst({
      orderBy: { order: 'desc' }
    });
    const newOrder = lastVideo ? lastVideo.order + 1 : 1;

    // Create video
    const video = await prisma.academyVideo.create({
      data: {
        title,
        description,
        duration,
        level,
        cloudinaryId,
        url,
        thumbnail,
        format,
        bytes,
        width,
        height,
        isActive: isActive !== false,
        order: newOrder
      }
    });

    return NextResponse.json({ success: true, data: video });
  } catch (error) {
    console.error('Error creating academy video:', error);
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
      return NextResponse.json({ error: 'Missing video ID' }, { status: 400 });
    }

    const body = await request.json();
    const {
      title,
      description,
      duration,
      level,
      cloudinaryId,
      url,
      thumbnail,
      format,
      bytes,
      width,
      height,
      isActive,
      order
    } = body;

    // Validate required fields
    if (!title || !duration || !level || !cloudinaryId || !url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Update video
    const video = await prisma.academyVideo.update({
      where: { id },
      data: {
        title,
        description,
        duration,
        level,
        cloudinaryId,
        url,
        thumbnail,
        format,
        bytes,
        width,
        height,
        isActive: isActive !== false,
        order: order !== undefined ? order : undefined
      }
    });

    return NextResponse.json({ success: true, data: video });
  } catch (error) {
    console.error('Error updating academy video:', error);
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
      return NextResponse.json({ error: 'Missing video ID' }, { status: 400 });
    }

    // Delete video
    await prisma.academyVideo.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting academy video:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
