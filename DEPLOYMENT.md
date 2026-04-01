# 🚀 Deployment Guide - Studio HRL Adult

## 📋 Deployment Checklist

### ✅ Prerequisites
- [ ] Node.js 18+ installed locally
- [ ] Vercel account
- [ ] Domain: `studio-adult.hardbanrecordslab.online`
- [ ] Email: `hrl-adult-studio@hardbanrecordslab.online`
- [ ] Git repository (GitHub/GitLab)

## 🔧 Setup Instructions

### 1. **Environment Configuration**
```bash
# Copy environment template
cp .env.local.example .env.local

# Edit with your values
NEXT_PUBLIC_API_URL=https://studio-adult.hardbanrecordslab.online/api
NEXT_PUBLIC_SITE_URL=https://studio-adult.hardbanrecordslab.online
NEXT_PUBLIC_CONTACT_EMAIL=hrl-adult-studio@hardbanrecordslab.online
```

### 2. **Install Dependencies**
```bash
cd react-app
npm install
```

### 3. **Build Test**
```bash
npm run build
npm run start
```

## 🌐 Vercel Deployment

### **Option 1: Vercel CLI (Recommended)**
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd react-app
vercel

# Follow prompts:
# - Project name: studio-hrl-adult
# - Directory: ./
# - Framework: Next.js
# - Build command: npm run build
# - Output directory: .next
```

### **Option 2: Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Connect your Git repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./react-app`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### **Option 3: GitHub Integration**
1. Connect GitHub to Vercel
2. Push code to repository
3. Vercel auto-deploys on push

## 🔧 Domain Configuration

### **Custom Domain Setup**
```bash
# Using Vercel CLI
vercel domains add studio-adult.hardbanrecordslab.online

# Or in Vercel Dashboard:
# Settings → Domains → Add Custom Domain
# Enter: studio-adult.hardbanrecordslab.online
```

### **DNS Configuration**
Add these DNS records to your domain:
```
Type: CNAME
Name: studio-adult
Value: cname.vercel-dns.com

Type: TXT
Name: @
Value: v=spf1 include:_spf.vercel.com ~all
```

## 🛡️ Security Headers

### **Automatic Headers (vercel.json)**
- ✅ X-Content-Type-Options: nosniff
- ✅ X-Frame-Options: DENY
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ Permissions-Policy: camera=(), microphone=(), geolocation=()

### **SSL Certificate**
- ✅ Automatic SSL by Vercel
- ✅ HTTPS enforced
- ✅ Certificate auto-renewal

## 📊 Environment Variables

### **Production Environment**
In Vercel Dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_API_URL=https://studio-adult.hardbanrecordslab.online/api
NEXT_PUBLIC_SITE_URL=https://studio-adult.hardbanrecordslab.online
NEXT_PUBLIC_CONTACT_EMAIL=hrl-adult-studio@hardbanrecordslab.online
NEXT_PUBLIC_COMPANY_NAME=Studio HRL Adult
JWT_SECRET=your-super-secret-jwt-key
```

### **Development Environment**
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/api
JWT_SECRET=dev-jwt-secret
```

## 🔍 SEO Optimization

### **Files Included**
- ✅ `public/robots.txt` - Search engine instructions
- ✅ `public/sitemap.xml` - Site structure
- ✅ `vercel.json` - SEO-friendly redirects

### **Meta Tags**
```typescript
// pages/index.tsx
<Head>
  <title>Studio HRL Adult - Premium Adult Content Production</title>
  <meta name="description" content="..." />
  <meta name="keywords" content="..." />
  <meta property="og:title" content="..." />
  <meta property="og:description" content="..." />
  <meta property="og:image" content="/logo/studio hrl adultbezła logo.png" />
</Head>
```

## 📱 Performance Optimization

### **Next.js Optimizations**
- ✅ Automatic code splitting
- ✅ Image optimization with next/image
- ✅ Font optimization
- ✅ Bundle analysis

### **Vercel Performance**
- ✅ Global CDN
- ✅ Edge caching
- ✅ Automatic compression
- ✅ HTTP/2 support

## 🚀 Deployment Commands

### **Manual Deployment**
```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel

# View deployment logs
vercel logs
```

### **Automatic Deployment**
```bash
# Git push triggers deployment
git add .
git commit -m "Deploy to production"
git push origin main
```

## 🔧 Troubleshooting

### **Common Issues**

#### **Build Failures**
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

#### **Environment Variables**
```bash
# Check variables
vercel env ls

# Add missing variables
vercel env add NEXT_PUBLIC_API_URL production
```

#### **Domain Issues**
```bash
# Check DNS
nslookup studio-adult.hardbanrecordslab.online

# Verify SSL
openssl s_client -connect studio-adult.hardbanrecordslab.online:443
```

### **Performance Issues**
```bash
# Analyze bundle
npm run build
npx @next/bundle-analyzer .next

# Check Core Web Vitals
npx lighthouse https://studio-adult.hardbanrecordslab.online
```

## 📈 Monitoring

### **Vercel Analytics**
- Real-time performance metrics
- Core Web Vitals
- Error tracking
- Usage statistics

### **External Monitoring**
```bash
# Uptime monitoring
curl https://studio-adult.hardbanrecordslab.online/api/health

# Performance monitoring
npx lighthouse --output=json --output-path=./report.json
```

## 🔐 Legal & Compliance

### **Required Legal Pages**
1. **Privacy Policy** - `/privacy-policy`
2. **Terms of Service** - `/terms`
3. **Age Verification** - `/age-verification`
4. **Cookie Policy** - `/cookie-policy`
5. **DMCA Notice** - `/dmca`

### **Age Verification Implementation**
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const ageVerified = request.cookies.get('age-verified');
  
  if (!ageVerified && request.nextUrl.pathname !== '/age-verification') {
    return NextResponse.redirect(new URL('/age-verification', request.url));
  }
  
  return NextResponse.next();
}
```

### **Content Compliance**
- ✅ 18+ age verification
- ✅ Content warnings
- ✅ Safe browsing
- ✅ Legal disclaimers

## 📞 Support

### **Vercel Support**
- Documentation: [vercel.com/docs](https://vercel.com/docs)
- Status: [vercel-status.com](https://vercel-status.com)
- Support: [vercel.com/support](https://vercel.com/support)

### **Emergency Contacts**
- **Technical**: hrl-adult-studio@hardbanrecordslab.online
- **Domain**: Domain provider support
- **SSL**: Vercel automatic management

## 🎯 Post-Deployment Checklist

### **Immediate Checks**
- [ ] Site loads at `https://studio-adult.hardbanrecordslab.online`
- [ ] SSL certificate valid
- [ ] All pages accessible
- [ ] Forms working
- [ ] API endpoints responding
- [ ] Mobile responsive

### **Performance Checks**
- [ ] Page load speed < 3 seconds
- [ ] Core Web Vitals green
- [ ] Mobile performance good
- [ ] SEO score > 90

### **Security Checks**
- [ ] HTTPS enforced
- [ ] Security headers present
- [ ] No console errors
- [ ] Age verification working
- [ ] Forms protected

### **Legal Compliance**
- [ ] Privacy policy accessible
- [ ] Terms of service present
- [ ] Age verification functional
- [ ] Content warnings displayed
- [ ] Contact information visible

---

## 🚀 Ready for Production!

**Your Studio HRL Adult platform is ready for deployment!**

**Next Steps:**
1. Run `npm install` in react-app directory
2. Deploy with `vercel` or Vercel Dashboard
3. Configure custom domain
4. Set up environment variables
5. Test all functionality

**Live URL:** `https://studio-adult.hardbanrecordslab.online`
**Contact:** `hrl-adult-studio@hardbanrecordslab.online`
