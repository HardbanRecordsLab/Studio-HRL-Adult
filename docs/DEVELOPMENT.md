# Studio HRL Adult - Development Guide

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Cloudinary account (for file uploads)

### Installation
```bash
# Clone repository
git clone https://github.com/HardbanRecordsLab/Studio-HRL-Adult.git
cd Studio-HRL-Adult

# Install dependencies
npm install --legacy-peer-deps

# Environment setup
cp .env.example .env.local
# Configure .env.local with your credentials

# Database setup
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

## Environment Variables

Create `.env.local` with:
```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/studio_hrl

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Admin Authentication
ADMIN_PASSWORD=your-secure-admin-password

# Optional: Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # ESLint
npm run type-check       # TypeScript check
npm run test             # Run tests
npm run test:watch       # Watch mode

# Database
npx prisma studio        # Database GUI
npx prisma generate      # Generate Prisma client
npx prisma db push       # Push schema changes
npx prisma migrate       # Run migrations
npx prisma seed          # Seed database (if available)
```

## Project Structure Deep Dive

### App Router (Next.js 14)
```
src/app/
  admin/                    # Admin panel
    academy/                # Academy management
    casting/                # Casting applications
    content/                # Content management
    documents/              # Document verification
    finance/                # Financial records
    logs/                   # System logs
    partners/               # Partner management
    platforms/              # Platform connections
    settings/               # System settings
  api/                     # API routes
    admin/                  # Admin API endpoints
  globals.css              # Global styles
  layout.tsx               # Root layout
  page.tsx                 # Homepage
```

### Components Architecture
```
src/components/
  admin/                   # Admin-specific components
    AcademyManager.tsx     # Academy CRUD
    PartnersManager.tsx    # Partner CRUD
    FinanceManager.tsx     # Finance management
    # ... other admin components
  common/                  # Shared components
    Footer.tsx             # Site footer
    Navigation.tsx         # Site navigation
  sections/                # Page sections
    Hero.tsx               # Hero section
    Stats.tsx              # Statistics
    # ... other sections
  ui/                      # Reusable UI components
    Button.tsx             # Button component
    Card.tsx               # Card component
    Badge.tsx              # Badge component
    Toast.tsx              # Toast notifications
```

### Database Schema
```typescript
// Core Models
Partner                  # Creator profiles
CastingApplication      # Casting applications
FinancialRecord         # Revenue tracking
PartnerDocument        # Verification documents

// Academy Content
AcademyVideo           # Educational videos
AcademyPodcast         # Audio content
AcademyDocument        # PDF guides
AcademyBlogArticle     # Blog posts

// System
AdminLog               # Activity logging
StudioSettings         # Configuration (singleton)
```

## Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# ... development work ...

# Test changes
npm run dev
# Test in browser

# Commit changes
git add .
git commit -m "feat: add new feature"

# Push branch
git push origin feature/new-feature
```

### 2. Database Changes
```bash
# Update schema in prisma/schema.prisma
# ... edit schema ...

# Push changes to database
npx prisma db push

# Generate new client
npx prisma generate

# Test changes
npm run dev
```

### 3. Adding New Admin Pages
```typescript
// 1. Create page: src/app/admin/new-feature/page.tsx
export default function NewFeaturePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Your component */}
    </div>
  );
}

// 2. Create API route: src/app/api/admin/new-feature/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  // Handle GET request
}

export async function POST(request: NextRequest) {
  // Handle POST request
}
```

### 4. Adding New UI Components
```typescript
// src/components/ui/NewComponent.tsx
import React from 'react';
import { cn } from '@/utils/utils';

interface NewComponentProps {
  className?: string;
  children?: React.ReactNode;
}

const NewComponent: React.FC<NewComponentProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('base-classes', className)} {...props}>
      {children}
    </div>
  );
};

export default NewComponent;
```

## Code Style Guide

### TypeScript
- Use strict TypeScript mode
- Define interfaces for all props
- Use proper typing for API responses
- Avoid `any` type when possible

### Component Structure
```typescript
// Component template
import React from 'react';
import { cn } from '@/utils/utils';

interface ComponentProps {
  // Define props here
  className?: string;
}

const Component: React.FC<ComponentProps> = ({
  // Destructure props
  className,
  ...props
}) => {
  // Component logic here
  
  return (
    <div className={cn('base-classes', className)} {...props}>
      {/* JSX content */}
    </div>
  );
};

export default Component;
```

### API Routes Structure
```typescript
// API route template
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminRequest } from '@/lib/adminLog';

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const admin = await verifyAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Your logic here
    const data = await prisma.model.findMany();

    return NextResponse.json({ data });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const admin = await verifyAdminRequest(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();

    // Your logic here
    const data = await prisma.model.create({
      data: body
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## Database Operations

### Querying Data
```typescript
// Basic queries
const partners = await prisma.partner.findMany();
const partner = await prisma.partner.findUnique({
  where: { id: partnerId }
});

// With relations
const partnersWithApplications = await prisma.partner.findMany({
  include: {
    applications: true,
    documents: true
  }
});

// Filtering and sorting
const filteredPartners = await prisma.partner.findMany({
  where: {
    status: 'active',
    country: 'Poland'
  },
  orderBy: {
    createdAt: 'desc'
  }
});
```

### Creating Data
```typescript
// Create single record
const newPartner = await prisma.partner.create({
  data: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    // ... other fields
  }
});

// Create with relations
const newApplication = await prisma.castingApplication.create({
  data: {
    firstName: 'Jane',
    lastName: 'Smith',
    // ... other fields
    partner: {
      connect: { id: partnerId }
    }
  }
});
```

### Updating Data
```typescript
// Update single record
const updatedPartner = await prisma.partner.update({
  where: { id: partnerId },
  data: {
    status: 'active',
    updatedAt: new Date()
  }
});

// Update multiple
const updatedMultiple = await prisma.partner.updateMany({
  where: { status: 'pending' },
  data: { status: 'reviewed' }
});
```

## File Upload Integration

### Cloudinary Setup
```typescript
// utils/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadFile(file: File) {
  const buffer = await file.arrayBuffer();
  const result = await cloudinary.uploader.upload(
    `data:${file.type};base64,${Buffer.from(buffer).toString('base64')}`,
    {
      folder: 'studio-hrl',
      resource_type: 'auto',
    }
  );
  return result;
}
```

### File Upload Component
```typescript
// components/ui/FileUpload.tsx
import React, { useState } from 'react';
import { uploadFile } from '@/utils/cloudinary';

interface FileUploadProps {
  onUpload: (url: string) => void;
  accept?: string;
  maxSize?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB
}) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSize) {
      alert('File too large');
      return;
    }

    setUploading(true);
    try {
      const result = await uploadFile(file);
      onUpload(result.secure_url);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <div>Uploading...</div>}
    </div>
  );
};

export default FileUpload;
```

## Admin Authentication

### Login Process
```typescript
// pages/api/admin/login.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logAdminAction } from '@/lib/adminLog';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate credentials
    if (email !== 'hardbanrecordslab.pl@gmail.com' || 
        password !== process.env.ADMIN_PASSWORD) {
      await logAdminAction(email, 'LOGIN_FAILED', 'AUTH', 'Invalid credentials', request.ip);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate token
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    
    await logAdminAction(email, 'LOGIN', 'AUTH', 'Successful login', request.ip);

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Verification Middleware
```typescript
// lib/adminLog.ts
import { NextRequest } from 'next/server';
import { prisma } from './prisma';

export async function verifyAdminRequest(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [email, timestamp] = decoded.split(':');
    
    // Check if token is recent (24 hours)
    const tokenTime = parseInt(timestamp);
    const now = Date.now();
    if (now - tokenTime > 24 * 60 * 60 * 1000) {
      return null;
    }

    return email;
  } catch {
    return null;
  }
}

export async function logAdminAction(
  adminEmail: string,
  action: string,
  resource: string,
  resourceId?: string,
  details?: string,
  ip?: string
) {
  try {
    await prisma.adminLog.create({
      data: {
        adminEmail,
        action,
        resource,
        resourceId,
        details,
        ip,
      },
    });
  } catch (error) {
    console.error('Failed to log admin action:', error);
  }
}
```

## Testing

### Unit Tests
```typescript
// __tests__/utils.test.ts
import { describe, it, expect } from '@jest/globals';
import { formatCurrency } from '@/utils/formatters';

describe('formatCurrency', () => {
  it('should format currency correctly', () => {
    expect(formatCurrency(1000)).toBe('$1,000.00');
    expect(formatCurrency(0)).toBe('$0.00');
  });
});
```

### Integration Tests
```typescript
// __tests__/api/admin/partners.test.ts
import { describe, it, expect, beforeAll } from '@jest/globals';
import { GET } from '@/app/api/admin/partners/route';

describe('/api/admin/partners', () => {
  beforeAll(async () => {
    // Setup test database
  });

  it('should return partners list', async () => {
    const request = new Request('http://localhost:3000/api/admin/partners', {
      headers: {
        'Authorization': 'Bearer valid-token'
      }
    });
    
    const response = await GET(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toHaveProperty('data');
  });
});
```

## Debugging

### Common Issues

#### Database Connection
```bash
# Check database connection
npx prisma db pull

# Reset database
npx prisma migrate reset

# Check schema
npx prisma validate
```

#### Build Issues
```bash
# Check TypeScript
npm run type-check

# Check for unused dependencies
npx depcheck

# Clean build
rm -rf .next && npm run build
```

#### Development Server
```bash
# Clear cache
rm -rf .next

# Restart with fresh dependencies
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run dev
```

## Performance Tips

### Database Optimization
- Use `select` to limit returned fields
- Add proper indexes to frequently queried fields
- Use `include` vs `select` appropriately
- Implement pagination for large datasets

### Frontend Optimization
- Use React.memo for expensive components
- Implement lazy loading for heavy components
- Optimize images with Next.js Image component
- Use proper loading states

### API Optimization
- Implement caching where appropriate
- Use streaming responses for large datasets
- Validate inputs early to avoid unnecessary processing
- Implement proper error handling

## Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod

# Set environment variables
vercel env add DATABASE_URL
vercel env add CLOUDINARY_API_SECRET
```

### Environment Variables for Production
```env
DATABASE_URL=postgresql://user:pass@host:5432/db
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud
NEXT_PUBLIC_CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
ADMIN_PASSWORD=your-secure-password
```

## Contributing

### Code Review Checklist
- [ ] TypeScript types are correct
- [ ] Components are properly structured
- [ ] API routes have proper error handling
- [ ] Database queries are optimized
- [ ] Security considerations are addressed
- [ ] Tests are included where appropriate
- [ ] Documentation is updated

### Git Workflow
1. Create feature branch from `main`
2. Make changes with small, logical commits
3. Test thoroughly
4. Submit pull request with description
5. Address feedback
6. Merge to main

This development guide provides comprehensive information for working with the Studio HRL Adult codebase.
