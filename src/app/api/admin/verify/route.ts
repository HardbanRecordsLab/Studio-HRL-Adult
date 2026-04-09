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
    const partnerId = searchParams.get('partnerId');
    const status = searchParams.get('status');

    if (partnerId) {
      // Get documents for specific partner
      const documents = await prisma.partnerDocument.findMany({
        where: { partnerId },
        orderBy: { createdAt: 'desc' }
      });

      return NextResponse.json({ success: true, data: documents });
    } else {
      // Get all partners with their documents
      const whereClause = status ? {
        documents: {
          some: {
            status: status
          }
        }
      } : {};

      const partners = await prisma.partner.findMany({
        where: whereClause,
        include: {
          documents: {
            orderBy: { createdAt: 'desc' }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      // Add document status summary to each partner
      const partnersWithStatus = partners.map(partner => {
        const documents = partner.documents || [];
        const latestDocument = documents[0];
        
        let documentStatus = 'none';
        if (documents.length > 0) {
          documentStatus = latestDocument.status;
        }

        return {
          ...partner,
          documentStatus,
          documentsCount: documents.length,
          latestDocument,
          documents
        };
      });

      return NextResponse.json({ success: true, data: partnersWithStatus });
    }
  } catch (error) {
    console.error('Error fetching verification data:', error);
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
      partnerId,
      type,
      frontUrl,
      backUrl,
      selfieUrl,
      expiryDate,
      notes
    } = body;

    // Validate required fields
    if (!partnerId || !type || !frontUrl) {
      return NextResponse.json({ error: 'Missing required fields: partnerId, type, frontUrl' }, { status: 400 });
    }

    // Check if partner exists
    const partner = await prisma.partner.findUnique({
      where: { id: partnerId }
    });

    if (!partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    // Create document
    const document = await prisma.partnerDocument.create({
      data: {
        partnerId,
        type,
        frontUrl,
        backUrl,
        selfieUrl,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        notes
      }
    });

    return NextResponse.json({ success: true, data: document });
  } catch (error) {
    console.error('Error creating document:', error);
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
    const { id, status, notes, verifiedBy } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing required fields: id, status' }, { status: 400 });
    }

    if (!['pending', 'verified', 'rejected', 'expired'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    // If rejecting, notes are required
    if (status === 'rejected' && !notes) {
      return NextResponse.json({ error: 'Notes are required when rejecting a document' }, { status: 400 });
    }

    // Update document
    const updateData: any = {
      status,
      notes
    };

    if (status === 'verified') {
      updateData.verifiedAt = new Date();
      updateData.verifiedBy = verifiedBy || auth.admin?.email || 'admin';
    }

    const document = await prisma.partnerDocument.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({ success: true, data: document });
  } catch (error) {
    console.error('Error updating document:', error);
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
    await prisma.partnerDocument.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
