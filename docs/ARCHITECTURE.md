# Studio HRL Adult - Architecture Documentation

## Overview

Studio HRL Adult is a comprehensive Next.js 14 application built with modern web technologies for managing adult content creators, platforms, and business operations.

## Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with unified design system
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **File Upload**: Cloudinary integration

### Backend & Database
- **Database**: PostgreSQL
- **ORM**: Prisma
- **API**: Next.js API Routes
- **Authentication**: Token-based admin system
- **File Storage**: Cloudinary

### Infrastructure
- **Deployment**: Vercel
- **Environment**: Node.js 18+
- **Package Manager**: npm

## Application Structure

```
src/
app/                          # Next.js 14 App Router
  admin/                       # Admin panel pages
    academy/                   # Academy management
      page.tsx                 # Academy overview
      [id]/page.tsx            # Academy content details
    casting/                   # Casting applications
      page.tsx                 # Applications list
      [id]/page.tsx            # Application details
    content/                   # Content management
      page.tsx                 # Content overview
    documents/                 # Document verification
      page.tsx                 # Verification dashboard
    finance/                   # Financial records
      page.tsx                 # Finance overview
    logs/                      # System logs
      page.tsx                 # Logs viewer
    partners/                   # Partner management
      page.tsx                 # Partners list
      [id]/page.tsx            # Partner details
      new/page.tsx             # New partner
      [id]/edit/page.tsx       # Edit partner
    platforms/                 # Platform connections
      page.tsx                 # Platform management
    settings/                  # System settings
      page.tsx                 # Settings dashboard
  api/                         # API routes
    admin/                      # Admin API endpoints
      academy/                  # Academy API
        route.ts                # GET/POST academy content
      casting/                  # Casting API
        route.ts                # GET/POST/PUT applications
      content/                  # Content API
        route.ts                # GET/POST/PUT content
      documents/                # Documents API
        route.ts                # GET/POST/PUT documents
      finance/                  # Finance API
        route.ts                # GET/POST financial records
      logs/                     # Logs API
        route.ts                # GET/DELETE/POST logs
      partners/                 # Partners API
        route.ts                # GET/POST/PUT/DELETE partners
      platforms/                # Platforms API
        route.ts                # GET/POST platforms
      settings/                 # Settings API
        route.ts                # GET/PUT settings
      verify/                   # Verification API
        route.ts                # GET/POST verification
      login.ts                  # Admin authentication
  globals.css                  # Global styles
  layout.tsx                   # Root layout
  page.tsx                     # Homepage
components/
  admin/                       # Admin-specific components
    AcademyManager.tsx         # Academy management
    AddDocumentForm.tsx        # Document form
    ArticleModal.tsx           # Article modal
    CastingDetailDrawer.tsx    # Casting details
    ContentManager.tsx         # Content management
    DocumentModal.tsx          # Document modal
    DocumentVerifyDrawer.tsx   # Document verification
    FinanceManager.tsx         # Finance management
    PartnersManager.tsx        # Partner management
    PlatformsManager.tsx      # Platform management
    PodcastModal.tsx           # Podcast modal
    ProfileManager.tsx         # Profile management
    UnifiedPlatformManager.tsx # Platform manager
    VideoModal.tsx             # Video modal
  common/                      # Shared components
    Footer.tsx                 # Footer
    Navigation.tsx             # Navigation
  sections/                    # Page sections
    CTA.tsx                    # Call to action
    Hero.tsx                   # Hero section
    Philosophy.tsx             # Philosophy section
    Platforms.tsx              # Platforms section
    Process.tsx                # Process section
    Safety.tsx                 # Safety section
    Stats.tsx                  # Statistics
    Studios.tsx                # Studios section
    World.tsx                  # World section
  ui/                          # UI components
    Badge.tsx                  # Badge component
    Button.tsx                 # Button component
    Card.tsx                   # Card component
    Toast.tsx                  # Toast notifications
lib/                          # Utilities and helpers
  adminLog.ts                 # Admin logging helper
  prisma.ts                   # Prisma client
utils/                        # Constants and utilities
  constants.ts                # Application constants
  cloudinary.ts               # Cloudinary utilities
prisma/
  schema.prisma               # Database schema
public/                       # Static assets
```

## Database Architecture

### Core Models

#### Partner
```typescript
model Partner {
  id              String   @id @default(cuid())
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  // Profile Information
  firstName       String
  lastName        String
  email           String   @unique
  phone           String
  dateOfBirth      DateTime
  nationality     String
  city            String
  country         String
  
  // Physical Attributes
  height          Float
  weight          Float
  measurements    Json     // {bust, waist, hips}
  hairColor       String
  eyeColor        String
  tattoos         Boolean  @default(false)
  piercings       Boolean  @default(false)
  
  // Professional Details
  experience      String
  categories      Json     // Array of categories
  availability    Json     // Schedule
  equipment       Json     // Equipment list
  languages       Json     // Languages spoken
  
  // Platform Integration
  platforms       Json     // Platform connections
  earnings        Json     // Revenue tracking
  
  // Status
  status          String   @default("pending")
  isVerified      Boolean  @default(false)
  
  // Relations
  applications    CastingApplication[]
  documents       PartnerDocument[]
  financialRecords FinancialRecord[]
  
  @@map("partners")
}
```

#### CastingApplication
```typescript
model CastingApplication {
  id              String   @id @default(cuid())
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  // Application Data
  firstName       String
  lastName        String
  email           String
  phone           String
  dateOfBirth      DateTime
  nationality     String
  city            String
  country         String
  
  // Physical Details
  height          Float
  weight          Float
  measurements    Json
  hairColor       String
  eyeColor        String
  tattoos         Boolean
  piercings       Boolean
  
  // Professional Info
  experience      String
  categories      Json
  availability    Json
  equipment       Json
  languages       Json
  motivation      String
  
  // Media
  photos          Json     // Array of photo URLs
  videos          Json     // Array of video URLs
  
  // Status
  status          String   @default("pending")
  adminNotes      String?
  
  // Relations
  partnerId       String?
  partner         Partner?  @relation(fields: [partnerId], references: [id])
  
  @@map("casting_applications")
}
```

#### FinancialRecord
```typescript
model FinancialRecord {
  id              String   @id @default(cuid())
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  // Financial Data
  partnerId       String
  platform        String
  revenueType     String
  amount          Float
  currency        String   @default("USD")
  period          String   // "2024-01"
  
  // Breakdown
  platformFee     Float
  studioFee       Float
  partnerEarnings Float
  
  // Status
  status          String   @default("pending")
  
  // Relations
  partner         Partner   @relation(fields: [partnerId], references: [id])
  
  @@map("financial_records")
}
```

#### Academy Content
```typescript
model AcademyVideo {
  id          String   @id @default(cuid())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  title       String
  description String
  videoUrl    String
  thumbnail   String
  duration    Int
  category    String
  tags        Json
  isPublished Boolean  @default(false)
  
  @@map("academy_videos")
}

model AcademyPodcast {
  id          String   @id @default(cuid())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  title       String
  description String
  audioUrl    String
  duration    Int
  category    String
  tags        Json
  isPublished Boolean  @default(false)
  
  @@map("academy_podcasts")
}

model AcademyDocument {
  id          String   @id @default(cuid())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  title       String
  description String
  fileUrl     String
  fileType    String
  category    String
  tags        Json
  isPublished Boolean  @default(false)
  
  @@map("academy_documents")
}

model AcademyBlogArticle {
  id          String   @id @default(cuid())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  slug        String   @unique
  title       String
  category    String
  tag         String
  excerpt     String
  content     String
  readTime    String
  isPublished Boolean  @default(false)
  
  @@map("academy_blog_articles")
}
```

#### System Models
```typescript
model AdminLog {
  id          String   @id @default(cuid())
  createdAt   DateTime @default(now())
  
  adminEmail  String
  action      String
  resource    String
  resourceId  String?
  details     String?
  ip          String?
  
  @@map("admin_logs")
}

model StudioSettings {
  id                    String @id @default("singleton")
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
  
  // General Settings
  studioName            String
  contactEmail          String
  notificationEmail     String
  
  // Revenue Sharing
  partnerModelShare     Float  @default(60)
  externalPartnerShare  Float  @default(30)
  studioShare           Float  @default(10)
  
  // Email Templates
  castingEmailTemplate  String
  castingRejectTemplate String
  
  @@map("studio_settings")
}
```

## API Architecture

### Authentication
- **Admin Login**: `/api/admin/login`
- **Token Verification**: `/api/admin/verify`
- **Session Management**: localStorage-based tokens

### Admin API Routes
- **Partners**: `/api/admin/partners`
- **Casting**: `/api/admin/casting`
- **Finance**: `/api/admin/finance`
- **Academy**: `/api/admin/academy`
- **Documents**: `/api/admin/documents`
- **Logs**: `/api/admin/logs`
- **Settings**: `/api/admin/settings`
- **Platforms**: `/api/admin/platforms`

### Public API Routes
- **Academy Content**: `/api/academy/content`
- **Casting Applications**: `/api/casting/apply`

## Security Architecture

### Authentication
- **Email-based**: Only `hardbanrecordslab.pl@gmail.com` can access admin
- **Token-based**: JWT-like tokens stored in localStorage
- **Session Expiration**: 24-hour token validity
- **IP Tracking**: Log admin IP addresses

### Data Protection
- **Document Privacy**: Blurred verification documents
- **Audit Logging**: Complete activity tracking
- **Input Validation**: Zod schemas throughout
- **SQL Injection Protection**: Prisma ORM

### Authorization
- **Admin Middleware**: `verifyAdminRequest` helper
- **Resource-based**: Different access levels for different resources
- **Action Logging**: All admin actions are logged

## Design System

### Color Palette
```typescript
colors: {
  primary: '#C9A84C',      // Gold
  accent: '#9B1F35',       // Crimson
  dark: '#07050A',         // Dark background
  gray: {                  // Gray scale
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617'
  }
}
```

### Typography
- **Primary**: Inter (system default)
- **Display**: Bebas Neue
- **Serif**: Cormorant Garamond
- **Sans-serif**: Montserrat

### Components
- **Button**: Multiple variants (primary, secondary, outline, danger, ghost)
- **Card**: Glass, default, gradient variants
- **Badge**: Status indicators with colors
- **Toast**: Notification system with animations

## Performance Optimization

### Code Splitting
- **Route-based**: Automatic with Next.js App Router
- **Component-based**: Lazy loading for heavy components
- **API Routes**: Server-side rendering for data

### Database Optimization
- **Indexing**: Proper indexes on frequently queried fields
- **Connection Pooling**: Prisma connection management
- **Query Optimization**: Efficient Prisma queries

### Asset Optimization
- **Images**: Next.js Image component with optimization
- **File Upload**: Cloudinary CDN integration
- **Static Assets**: Vercel Edge Network

## Deployment Architecture

### Production Environment
- **Platform**: Vercel
- **Database**: PostgreSQL (managed)
- **File Storage**: Cloudinary
- **Environment Variables**: Secure configuration

### Build Process
- **Next.js Build**: Optimized production build
- **Prisma Generate**: Database client generation
- **Asset Optimization**: Automatic optimization

### Monitoring
- **Error Tracking**: Built-in error handling
- **Performance Monitoring**: Vercel Analytics
- **Uptime Monitoring**: Platform-level monitoring

## Development Workflow

### Local Development
```bash
npm run dev          # Development server
npx prisma studio    # Database GUI
npm run build        # Production build
npm run start        # Production server
```

### Database Management
```bash
npx prisma generate  # Generate client
npx prisma db push   # Push schema changes
npx prisma migrate   # Run migrations
```

### Code Quality
- **TypeScript**: Full type coverage
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Git Hooks**: Pre-commit checks

## Integration Points

### External Services
- **Cloudinary**: File upload and CDN
- **Supabase**: Optional database backend
- **Email Service**: Future notifications
- **Payment Processors**: Future payment integration

### Platform APIs
- **OnlyFans**: Creator management API
- **Fansly**: Platform integration
- **Chaturbate**: Live streaming integration
- **ManyVids**: Content distribution

## Future Architecture Considerations

### Scalability
- **Microservices**: Potential service separation
- **Queue System**: Background job processing
- **Caching Layer**: Redis implementation
- **Load Balancing**: Multi-instance deployment

### Features
- **Real-time**: WebSocket integration
- **Mobile App**: React Native development
- **API Gateway**: Centralized API management
- **Analytics**: Advanced reporting system

## Security Best Practices

### Data Protection
- **Encryption**: Data at rest and in transit
- **Backup Strategy**: Regular database backups
- **Access Control**: Role-based permissions
- **Compliance**: GDPR and industry regulations

### Monitoring
- **Security Logs**: Comprehensive audit trail
- **Anomaly Detection**: Suspicious activity monitoring
- **Access Logs**: Admin access tracking
- **Error Monitoring**: Production error tracking

This architecture documentation provides a comprehensive overview of the Studio HRL Adult application structure, technologies, and best practices for development and maintenance.
