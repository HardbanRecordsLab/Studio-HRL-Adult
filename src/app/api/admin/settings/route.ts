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

    // Get singleton settings (create if doesn't exist)
    let settings = await prisma.studioSettings.findUnique({
      where: { id: 'singleton' }
    });

    if (!settings) {
      settings = await prisma.studioSettings.create({
        data: { id: 'singleton' }
      });
    }

    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
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
    const {
      studioName,
      contactEmail,
      notificationEmail,
      revenueModelShare,
      revenuePartnerShare,
      revenueStudioShare,
      castingEmailTemplate,
      castingRejectTemplate
    } = body;

    // Validate revenue shares sum to 100
    const totalShare = (revenueModelShare || 0) + (revenuePartnerShare || 0) + (revenueStudioShare || 0);
    if (totalShare !== 100) {
      return NextResponse.json({ 
        error: 'Revenue shares must sum to 100%',
        details: `Current sum: ${totalShare}%`
      }, { status: 400 });
    }

    // Update settings (upsert)
    const settings = await prisma.studioSettings.upsert({
      where: { id: 'singleton' },
      update: {
        studioName,
        contactEmail,
        notificationEmail,
        revenueModelShare,
        revenuePartnerShare,
        revenueStudioShare,
        castingEmailTemplate,
        castingRejectTemplate
      },
      create: {
        id: 'singleton',
        studioName,
        contactEmail,
        notificationEmail,
        revenueModelShare,
        revenuePartnerShare,
        revenueStudioShare,
        castingEmailTemplate,
        castingRejectTemplate
      }
    });

    // Log the action
    await logAdminAction({
      adminEmail: auth.admin?.email || 'unknown',
      action: ADMIN_ACTIONS.UPDATE_SETTINGS,
      resource: ADMIN_RESOURCES.SETTINGS,
      details: JSON.stringify({ updatedFields: Object.keys(body) }),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    });

    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
