# AI Project Context

## Project summary

- Project name: `Studio HRL`
- Type: web application
- Current stack: Next.js, React, TypeScript, Prisma, PostgreSQL, TailwindCSS
- Main areas: public website, casting flow, academy/content, admin dashboard, media and profile management

## Business purpose

- Present the brand publicly
- Collect and manage inbound leads
- Support internal operations through admin tools
- Manage profiles, content, documents, and reporting

## Key product surfaces

- Public pages
- Casting/application flow
- Contact flow
- Portfolio/profile pages
- Academy/content area
- Admin panel
- API endpoints
- Database models

## Technical conventions

- Frontend uses React with Next.js pages routing
- Backend logic is implemented in Next.js API routes
- Database access uses Prisma
- Styling uses TailwindCSS and custom styles
- Shared logic lives in `src/lib`, `src/utils`, and `src/hooks`

## Important folders

- `src/pages`: routes and API endpoints
- `src/components`: UI and feature components
- `src/lib`: core integrations and backend helpers
- `src/utils`: utilities and shared helpers
- `prisma`: schema and database layer
- `docs`: project documentation

## Current priorities

- Reliability over visual polish
- Stable data flow across forms and admin tools
- Consistent auth and permissions behavior
- Better error handling and operational clarity
- Cleaner content quality and maintainability

## Known risk areas

- Form submission and file upload flows
- Data mismatches between UI, API, and database
- Inconsistent admin authentication logic
- Static/demo data mixed with real data
- Encoding/content quality issues in UI text

## What the AI should optimize for

- Correctness first
- Small, safe changes
- Clear reasoning about tradeoffs
- Respect for existing architecture unless change is justified
- Actionable output, not vague suggestions
