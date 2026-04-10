# Studio HRL Adult - Deployment Guide

## Overview

This guide covers deployment of the Studio HRL Adult application to production environments.

## Prerequisites

- Node.js 18+
- PostgreSQL database
- Cloudinary account
- Vercel account (recommended)
- Environment variables configured

## Environment Variables

### Required Variables
```env
# Database
DATABASE_URL=postgresql://username:password@host:5432/database_name

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

### Security Notes
- Never commit `.env.local` to version control
- Use strong, unique passwords
- Rotate secrets regularly
- Use different values for development and production

## Vercel Deployment (Recommended)

### 1. Prepare Repository
```bash
# Ensure clean working directory
git status
git add .
git commit -m "feat: prepare for deployment"

# Push to GitHub
git push origin main
```

### 2. Vercel Setup
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 3. Environment Variables in Vercel
```bash
# Set database URL
vercel env add DATABASE_URL production

# Set Cloudinary variables
vercel env add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME production
vercel env add NEXT_PUBLIC_CLOUDINARY_API_KEY production
vercel env add CLOUDINARY_API_SECRET production

# Set admin password
vercel env add ADMIN_PASSWORD production

# Optional: Supabase
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Push schema to production database
npx prisma db push

# Seed initial data (if available)
npx prisma db seed
```

### 5. Verify Deployment
```bash
# Check deployment status
vercel ls

# View logs
vercel logs

# Open deployed app
vercel open
```

## Docker Deployment

### 1. Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### 2. Docker Compose
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/studio_hrl
      - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME}
      - NEXT_PUBLIC_CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
      - CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}
      - ADMIN_PASSWORD=${ADMIN_PASSWORD}
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=studio_hrl
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### 3. Docker Commands
```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild
docker-compose up -d --build
```

## Traditional Server Deployment

### 1. Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y
```

### 2. Application Setup
```bash
# Clone repository
git clone https://github.com/HardbanRecordsLab/Studio-HRL-Adult.git
cd Studio-HRL-Adult

# Install dependencies
npm install --legacy-peer-deps

# Build application
npm run build

# Generate Prisma client
npx prisma generate

# Setup database
sudo -u postgres createdb studio_hrl
npx prisma db push
```

### 3. PM2 Configuration
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'studio-hrl-adult',
    script: 'npm',
    args: 'start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      DATABASE_URL: 'postgresql://postgres:password@localhost:5432/studio_hrl',
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: 'your-cloud-name',
      NEXT_PUBLIC_CLOUDINARY_API_KEY: 'your-api-key',
      CLOUDINARY_API_SECRET: 'your-api-secret',
      ADMIN_PASSWORD: 'your-secure-password'
    }
  }]
};
```

### 4. Start Application
```bash
# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup
```

### 5. Nginx Configuration
```nginx
# /etc/nginx/sites-available/studio-hrl-adult
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/studio-hrl-adult /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Database Deployment

### 1. PostgreSQL Setup
```bash
# Create database
sudo -u postgres createdb studio_hrl

# Create user
sudo -u postgres psql
CREATE USER studio_hrl_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE studio_hrl TO studio_hrl_user;
\q
```

### 2. Prisma Deployment
```bash
# Generate client
npx prisma generate

# Push schema
npx prisma db push

# Run migrations (if using)
npx prisma migrate deploy

# Seed data (if available)
npx prisma db seed
```

### 3. Database Backup
```bash
# Create backup script
#!/bin/bash
BACKUP_DIR="/var/backups/studio-hrl"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="studio_hrl"

mkdir -p $BACKUP_DIR

# Create backup
pg_dump $DB_NAME > $BACKUP_DIR/backup_$DATE.sql

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete
```

## SSL/HTTPS Setup

### 1. Let's Encrypt with Certbot
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### 2. Nginx SSL Configuration
```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

## Monitoring and Maintenance

### 1. Application Monitoring
```bash
# PM2 monitoring
pm2 monit

# View logs
pm2 logs studio-hrl-adult

# Restart application
pm2 restart studio-hrl-adult

# Check status
pm2 status
```

### 2. Database Monitoring
```bash
# Check database connections
sudo -u postgres psql -c "SELECT count(*) FROM pg_stat_activity;"

# Check database size
sudo -u postgres psql -c "SELECT pg_size_pretty(pg_database_size('studio_hrl'));"

# View slow queries
sudo -u postgres psql -c "SELECT query, mean_time, calls FROM pg_stat_statements ORDER BY mean_time DESC LIMIT 10;"
```

### 3. Log Management
```bash
# Setup log rotation
sudo nano /etc/logrotate.d/studio-hrl-adult

# Content:
/var/log/studio-hrl-adult/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        pm2 reloadLogs
    endscript
}
```

## Performance Optimization

### 1. Database Optimization
```sql
-- Create indexes
CREATE INDEX idx_partners_status ON partners(status);
CREATE INDEX idx_partners_country ON partners(country);
CREATE INDEX idx_applications_created_at ON casting_applications(created_at);

-- Analyze tables
ANALYZE partners;
ANALYZE casting_applications;
ANALYZE financial_records;
```

### 2. Application Optimization
```bash
# Enable Next.js optimizations
export NODE_OPTIONS="--max-old-space-size=4096"

# Build with optimizations
npm run build

# Use gzip compression
npm install compression
```

### 3. Caching Strategy
```javascript
// next.config.js
module.exports = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

## Security Hardening

### 1. Firewall Setup
```bash
# Install UFW
sudo apt install ufw -y

# Default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH
sudo ufw allow ssh

# Allow HTTP/HTTPS
sudo ufw allow 80
sudo ufw allow 443

# Enable firewall
sudo ufw enable
```

### 2. Security Headers
```nginx
# Add to Nginx configuration
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

### 3. Database Security
```bash
# Restrict PostgreSQL access
sudo nano /etc/postgresql/15/main/pg_hba.conf

# Add restrictions:
local   all             postgres                                md5
host    all             all             127.0.0.1/32            md5
host    all             all             ::1/128                 md5
```

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Check Node.js version
node --version  # Should be 18+

# Clear cache
rm -rf .next
npm run build

# Check dependencies
npm audit
npm audit fix
```

#### Database Connection Issues
```bash
# Test connection
npx prisma db pull

# Check schema
npx prisma validate

# Reset database (last resort)
npx prisma migrate reset
```

#### Runtime Errors
```bash
# Check logs
pm2 logs studio-hrl-adult

# Check environment variables
pm2 env 0

# Restart application
pm2 restart studio-hrl-adult
```

### Health Checks
```bash
# Create health check endpoint
curl -f http://localhost:3000/api/health || exit 1

# Check database connectivity
npx prisma db execute --sql "SELECT 1"

# Check external services
curl -f https://api.cloudinary.com/v1_1/your-cloud-name || exit 1
```

## Backup and Recovery

### 1. Automated Backups
```bash
# Create backup script
#!/bin/bash
BACKUP_DIR="/var/backups/studio-hrl"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="studio_hrl"

# Database backup
pg_dump $DB_NAME | gzip > $BACKUP_DIR/db_backup_$DATE.sql.gz

# File backup
tar -czf $BACKUP_DIR/files_backup_$DATE.tar.gz /path/to/app

# Upload to cloud storage (optional)
# aws s3 cp $BACKUP_DIR/db_backup_$DATE.sql.gz s3://your-backup-bucket/
```

### 2. Recovery Process
```bash
# Restore database
gunzip -c /var/backups/studio-hrl/db_backup_20240410_120000.sql.gz | psql studio_hrl

# Restore files
tar -xzf /var/backups/studio-hrl/files_backup_20240410_120000.tar.gz -C /

# Restart application
pm2 restart studio-hrl-adult
```

This deployment guide provides comprehensive instructions for deploying Studio HRL Adult to various environments with security, monitoring, and maintenance considerations.
