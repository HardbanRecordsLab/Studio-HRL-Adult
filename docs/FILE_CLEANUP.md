# File Cleanup Plan

## Files to Remove (After Confirmation)

### Redundant Documentation
- `DEPLOYMENT.md` (root) - Duplicate of `docs/DEPLOYMENT.md`

### Legacy Pages Router Files (Consider for Removal)
- `src/pages/academy.tsx` - Large file (48KB), may have duplicate content
- `src/pages/casting.tsx` - Large file (39KB), may have duplicate content
- `src/pages/portfolio.tsx` - May duplicate app router functionality
- `src/pages/admin/` directory - Contains old admin pages
- `src/pages/api/admin/` directory - Contains old API routes

### Potentially Unused Components
- `src/pages/profile/` directory - Profile functionality
- Large static pages that may be better as dynamic content

## Files to Keep

### Current Documentation
- `README.md` - Updated comprehensive documentation
- `docs/ARCHITECTURE.md` - Architecture documentation
- `docs/DEVELOPMENT.md` - Development guide
- `docs/DEPLOYMENT.md` - Deployment guide
- `BLOG_SETUP.md` - Blog setup instructions
- `ARTICLES_IMPLEMENTATION.md` - Articles implementation
- `PORTFOLIO_MANAGEMENT.md` - Portfolio management guide

### Core Application Files
- `src/app/` - Next.js 14 app router structure
- `src/components/` - Reusable components
- `src/lib/` - Utilities and helpers
- `src/utils/` - Constants and utilities
- `prisma/` - Database schema and migrations

## Cleanup Process

1. **Backup Important Data**
   - Export any unique content from legacy pages
   - Document any custom functionality

2. **Remove Redundant Files**
   - Delete duplicate documentation
   - Remove unused legacy pages

3. **Update References**
   - Update any imports/links to removed files
   - Update navigation and routing

4. **Test Functionality**
   - Ensure all features still work
   - Verify no broken links

## Migration Strategy

### Pages Router to App Router
- Migrate critical pages from `src/pages/` to `src/app/`
- Update API routes structure
- Maintain backward compatibility where needed

### Content Management
- Move static content to database
- Implement dynamic content loading
- Create admin interfaces for content management

## Recommendations

### Immediate Actions
1. Remove `DEPLOYMENT.md` (duplicate)
2. Audit large pages for duplicate content
3. Identify truly unused files

### Future Actions
1. Complete migration to app router
2. Implement content management system
3. Optimize file structure

## Risk Assessment

### Low Risk
- Removing duplicate documentation
- Removing clearly unused files

### Medium Risk
- Removing legacy pages (may have unique content)
- Restructuring API routes

### High Risk
- Removing files that might be referenced elsewhere
- Breaking existing functionality

## Implementation Plan

1. **Phase 1**: Safe cleanup (duplicates only)
2. **Phase 2**: Content audit and migration
3. **Phase 3**: Structural optimization
4. **Phase 4**: Final testing and verification

Each phase should be tested thoroughly before proceeding to the next.
