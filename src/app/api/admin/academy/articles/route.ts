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
      // Get single article
      const article = await prisma.academyBlogArticle.findUnique({
        where: { id }
      });

      if (!article) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: article });
    } else {
      // Get all articles
      const articles = await prisma.academyBlogArticle.findMany({
        orderBy: { order: 'asc' }
      });

      return NextResponse.json({ success: true, data: articles });
    }
  } catch (error) {
    console.error('Error fetching academy articles:', error);
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
      slug,
      category,
      tag,
      excerpt,
      content,
      readTime,
      thumbnail,
      isPublished
    } = body;

    // Validate required fields
    if (!title || !slug || !category || !tag || !excerpt || !content || !readTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if slug is unique
    const existingArticle = await prisma.academyBlogArticle.findFirst({
      where: { slug }
    });

    if (existingArticle) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
    }

    // Get the highest order value and increment
    const lastArticle = await prisma.academyBlogArticle.findFirst({
      orderBy: { order: 'desc' }
    });
    const newOrder = lastArticle ? lastArticle.order + 1 : 1;

    // Create article
    const article = await prisma.academyBlogArticle.create({
      data: {
        title,
        slug,
        category,
        tag,
        excerpt,
        content,
        readTime,
        thumbnail,
        isPublished: isPublished === true,
        publishedAt: isPublished === true ? new Date() : null,
        order: newOrder
      }
    });

    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error('Error creating academy article:', error);
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
      return NextResponse.json({ error: 'Missing article ID' }, { status: 400 });
    }

    const body = await request.json();
    const {
      title,
      slug,
      category,
      tag,
      excerpt,
      content,
      readTime,
      thumbnail,
      isPublished,
      order
    } = body;

    // Validate required fields
    if (!title || !slug || !category || !tag || !excerpt || !content || !readTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if slug is unique (excluding current article)
    const existingArticle = await prisma.academyBlogArticle.findFirst({
      where: { 
        slug,
        id: { not: id }
      }
    });

    if (existingArticle) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
    }

    // Get current article to check if it's being published for the first time
    const currentArticle = await prisma.academyBlogArticle.findUnique({
      where: { id }
    });

    const wasPublished = currentArticle?.isPublished || false;
    const isNowPublished = isPublished === true;

    // Update article
    const article = await prisma.academyBlogArticle.update({
      where: { id },
      data: {
        title,
        slug,
        category,
        tag,
        excerpt,
        content,
        readTime,
        thumbnail,
        isPublished: isNowPublished,
        publishedAt: (!wasPublished && isNowPublished) ? new Date() : undefined,
        order: order !== undefined ? order : undefined
      }
    });

    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error('Error updating academy article:', error);
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
      return NextResponse.json({ error: 'Missing article ID' }, { status: 400 });
    }

    // Delete article
    await prisma.academyBlogArticle.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting academy article:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
