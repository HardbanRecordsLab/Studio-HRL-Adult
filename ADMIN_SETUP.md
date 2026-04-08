# Admin Panel Security Configuration

## Overview
The admin panel is now secured with email and password authentication. Only authorized users can access it.

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in the root directory with the following:

```env
ADMIN_PASSWORD=your-secure-admin-password-here
```

**Important:** 
- Security admin email: `hardbanrecordslab.pl@gmail.com` (hardcoded)
- Change the password to something secure and unique
- Never commit `.env.local` to version control
- Store the password in a secure location

### 2. Login to Admin Panel

1. Navigate to `/admin` page
2. You will see a login form
3. Enter email: `hardbanrecordslab.pl@gmail.com`
4. Enter your chosen password
5. Click "Login"

### 3. Session Management

- Admin sessions are stored in browser's localStorage
- Token is automatically verified on page load
- Sessions expire after 24 hours
- Click "Logout" button to end session immediately

## Features

### Dashboard Features Included:
- ✅ **Dashboard** - Analytics and KPIs
- ✅ **Profiles** - Create and manage creator profiles
- ✅ **Unified Manager** - Manage all platforms from one dashboard
- ✅ **Finance** - Revenue tracking and payouts
- ✅ **Content Management** - Article and guide management
- ✅ **Portfolio** - Gallery view of creator profiles
- ✅ **Media Management** - Upload media from Cloudinary
- ✅ **Casting Applications** - Review and approve casting applications
- ✅ **Security & Compliance** - Audit logs and compliance dashboard
- ✅ **Settings** - System configuration and API integrations

### Profile Management Features:
- Create new creator profiles with custom templates
- Choose from 3 profile templates: Elegant, Luxury, Modern
- View all active profiles with edit/delete options
- Manage profile information and templates

### Platform Management:
- Monitor 25+ streaming and social platforms
- Track followers, posts, and features for each platform
- Sync data with platforms
- Curated list of:
  - 🎥 Live cam platforms (Chaturbate, MyFreeCams, LiveJasmin, etc.)
  - 💳 Subscription platforms (OnlyFans, Fansly, ManyVids, etc.)
  - 📺 Tube platforms (Pornhub, xHamster, xVideos, etc.)
  - 📣 Marketing platforms (Twitter, Reddit, Telegram, TikTok, Instagram)

### Finance Management:
- Revenue tracking by platform
- Payout scheduling and management
- Transaction history
- Revenue projections and analytics

### Security Features:
- Token-based authentication
- Email-based authorization (only specific email allowed)
- Secure logout functionality
- Compliance dashboard
- Age verification tracking
- Content moderation stats
- Audit logs

## API Endpoints

### Authentication Endpoints:
- `POST /api/admin/login` - Login with credentials
- `GET/POST /api/admin/verify` - Verify existing token

### Admin Endpoints:
- `GET /api/admin/dashboard` - Dashboard data
- `GET /api/admin/settings` - Get system settings
- `POST /api/admin/settings` - Update settings
- And more...

## Security Best Practices

1. **Password Management:**
   - Use a strong, unique password
   - Change password regularly
   - Never share your credentials

2. **Session Management:**
   - Always logout when finished
   - Clear browser data if using shared computer
   - Sessions auto-expire after 24 hours

3. **Data Protection:**
   - All API calls are logged
   - Suspicious activities are tracked
   - All changes are audit logged

4. **Deployment:**
   - Always set `ADMIN_PASSWORD` in production
   - Use HTTPS for all connections
   - Keep admin panel URL secure and change path if needed

## Troubleshooting

### "Invalid email or password" error
- Check that email is exactly: `hardbanrecordslab.pl@gmail.com`
- Verify password matches your `.env.local` configuration
- Ensure `ADMIN_PASSWORD` environment variable is set

### Session expired
- Login again
- Tokens expire after 24 hours for security
- Click the Logout button before closing browser

### Page not loading
- Check browser console for errors (F12)
- Verify you are logged in
- Clear browser cache and reload

## Future Enhancements

Potential improvements:
- Two-factor authentication (2FA)
- Email verification on login
- IP whitelist for additional security
- Session timeout warnings
- Password change functionality
- Login history and alerts
- Role-based access control (RBAC)

## Support

For security issues or concerns, contact:
- Email: hardbanrecordslab.pl@gmail.com
- Keep all admin activities confidential
