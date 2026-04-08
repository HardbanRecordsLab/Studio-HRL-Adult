# Blog Articles Setup Guide

## Overview
The blog articles have been moved from hardcoded data to a database-backed system. There are 6 real, comprehensive articles seeded into the system, covering key topics for creators:

1. **Psychologia widza** - Psychology of audience building
2. **OnlyFans vs Fansly 2026** - Platform comparison analysis
3. **Pierwsze 30 dni na Chaturbate** - First 30 days strategy
4. **Geo-blocking i prywatność** - Privacy and security guide
5. **PPV strategia** - Pay-Per-View monetization strategies
6. **Budowanie marki jako para** - Couple branding strategies

## How to Populate the Database

### Option 1: Using the Seed API Endpoint (Recommended)

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Send a POST request to seed the articles:
   ```bash
   curl -X POST http://localhost:3000/api/admin/seed-articles \
     -H "Content-Type: application/json" \
     -d '{"force": true}'
   ```

   Or use the browser console:
   ```javascript
   fetch('/api/admin/seed-articles', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ force: true })
   }).then(r => r.json()).then(console.log)
   ```

3. You should see a response like:
   ```json
   {
     "success": true,
     "message": "Successfully seeded 6 blog articles",
     "count": 6
   }
   ```

### Option 2: Using Prisma Studio (Alternative)

1. Open Prisma Studio:
   ```bash
   npx prisma studio
   ```

2. Navigate to the `AcademyBlogArticle` table
3. Manually create articles using the schema provided

## Troubleshooting

### Issue: "Database connection error"
- Make sure your `DATABASE_URL` environment variable is set correctly
- Check that your PostgreSQL database is running
- Run migrations if needed: `npx prisma migrate dev`

### Issue: "Articles not showing in the academy page"
- Check browser console for errors
- Verify articles are in the database using Prisma Studio
- Make sure the `/api/academy/content` endpoint is returning data

### Issue: "Articles showing but with "Ładowanie artykułów...""
- Check the network tab to see if the fetch is failing
- Verify the API endpoint `GET /api/academy/content?type=articles` is working
- Check server logs for errors

## Features

### Blog Articles Display
- Articles are fetched from the database on page load
- Responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop)
- Category and tag badges for easy filtering
- Read time estimates
- Publication date
- Article excerpts

### Article Management
The admin panel (`pages/api/admin/academy.ts`) supports:
- GET: Fetch articles
- POST: Create new articles
- PUT: Update articles
- DELETE: Remove articles

### Adding New Articles

To add new articles, use the admin API:

```bash
curl -X POST http://localhost:3000/api/admin/academy \
  -H "Content-Type: application/json" \
  -d '{
    "type": "article",
    "slug": "my-article-slug",
    "title": "My Article Title",
    "category": "My Category",
    "tag": "MY TAG",
    "excerpt": "Short description",
    "content": "<h2>Full content</h2><p>With HTML formatting</p>",
    "readTime": "10 min",
    "isPublished": true
  }'
```

## Files Modified

- `/src/pages/academy.tsx` - Updated to fetch articles from DB
- `/src/pages/api/admin/seed-articles.ts` - New seed endpoint
- `/src/pages/api/academy/content.ts` - Already supports article fetching

## Next Steps

1. ✅ Seed the database with articles
2. ✅ Test the academy page displays articles
3. Create an admin interface for managing articles
4. Add article detail page (`/academy/[slug]`)
5. Add category filtering
6. Implement search functionality
