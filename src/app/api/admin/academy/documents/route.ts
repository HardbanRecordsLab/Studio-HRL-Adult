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
      // Get single document
      const document = await prisma.academyDocument.findUnique({
        where: { id }
      });

      if (!document) {
        return NextResponse.json({ error: 'Document not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: document });
    } else {
      // Get all documents
      const documents = await prisma.academyDocument.findMany({
        orderBy: { order: 'asc' }
      });

      return NextResponse.json({ success: true, data: documents });
    }
  } catch (error) {
    console.error('Error fetching academy documents:', error);
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
      type,
      category,
      icon,
      cloudinaryId,
      url,
      size,
      isActive
    } = body;

    // Validate required fields
    if (!title || !type || !category || !cloudinaryId || !url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get the highest order value and increment
    const lastDocument = await prisma.academyDocument.findFirst({
      orderBy: { order: 'desc' }
    });
    const newOrder = lastDocument ? lastDocument.order + 1 : 1;

    // Create document
    const document = await prisma.academyDocument.create({
      data: {
        title,
        description,
        type,
        category,
        icon: icon || 'document',
        cloudinaryId,
        url,
        size,
        isActive: isActive !== false,
        order: newOrder
      }
    });

    return NextResponse.json({ success: true, data: document });
  } catch (error) {
    console.error('Error creating academy document:', error);
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
      return NextResponse.json({ error: 'Missing document ID' }, { status: 400 });
    }

    const body = await request.json();
    const {
      title,
      description,
      type,
      category,
      icon,
      cloudinaryId,
      url,
      size,
      isActive,
      order
    } = body;

    // Validate required fields
    if (!title || !type || !category || !cloudinaryId || !url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Update document
    const document = await prisma.academyDocument.update({
      where: { id },
      data: {
        title,
        description,
        type,
        category,
        icon: icon || 'document',
        cloudinaryId,
        url,
        size,
        isActive: isActive !== false,
        order: order !== undefined ? order : undefined
      }
    });

    return NextResponse.json({ success: true, data: document });
  } catch (error) {
    console.error('Error updating academy document:', error);
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
      return NextResponse.json({ error: 'Missing document ID' }, { status: 400 });
    }

    // Delete document
    await prisma.academyDocument.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting academy document:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
