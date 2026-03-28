# 5000 Tomorrow - Project Documentation

## 📋 Project Overview

**5000 Tomorrow** is a Next.js web application providing pre-settlement legal funding for Michigan accident victims.

- **Website**: https://www.5000tomorrow.com
- **Phone**: 1-877-TODAY-5K (1-877-863-2955)
- **Service Area**: Michigan Only
- **CTA**: "Accident Today? Get $5,000 Tomorrow"

## 🛠 Tech Stack

- **Frontend**: Next.js 16.2.1 (React 19) with Turbopack
- **Styling**: Tailwind CSS + PostCSS
- **Forms**: React Hook Form + Zod validation
- **Emails**: Resend 4.3.2 (transactional email service)
- **Database**: MySQL 2 (Hostinger)
- **CAPTCHA**: Cloudflare Turnstile (react-turnstile)
- **Analytics**: Google Analytics 4 (GA4), Google Tag Manager (GTM)
- **Authentication**: Session-based (admin dashboard)
- **Deployment**: Vercel

## 📁 Directory Structure

```
app/
├── api/
│   ├── apply/              # Apply form submission endpoint
│   ├── attorney-referral/  # Attorney referral submission
│   ├── contact/            # Contact form submission
│   ├── admin/              # Admin dashboard API (init, login, submissions)
├── [citySlug]/             # Dynamic city pages (45+ Michigan cities)
├── about/
├── apply/                  # Multi-step apply funnel (5 steps)
├── attorney-portal/
├── blog/                   # Blog posts
├── case-types/             # Case type pages (15 types)
├── contact/
├── faq/
├── how-it-works/
└── layout.tsx              # Root layout with providers

components/
├── forms/
│   ├── ContactForm.tsx     # Contact form with Turnstile
│   ├── AttorneyReferralForm.tsx
│   ├── ApplyFunnel.tsx
│   └── steps/              # Apply funnel steps (1-5)
├── sections/               # Homepage sections
├── cities/                 # City page components
├── ui/                     # Reusable UI components (button, accordion, turnstile)
├── common/                 # Header, Footer, ApplyButton

lib/
├── validations/            # Zod schemas (contact, apply, attorney-referral)
├── email/
│   ├── templates.tsx       # 6 email templates (3 customer + 3 admin)
│   └── send.ts             # Resend email sending logic
├── db/                     # MySQL database operations
├── crm/                    # CRM webhook integration
├── turnstile/              # Cloudflare CAPTCHA verification
├── analytics/              # GA4, GTM, Meta pixel tracking
├── utils/
│   └── sanitizer.ts        # Input sanitization
├── constants/
│   └── business.ts         # Business info (phone, address, etc)
└── seo/                    # SEO utilities (metadata, schema)

types/
└── index.ts                # TypeScript type definitions

hooks/
└── useApplyForm.ts         # Multi-step form state management

public/
├── robots.txt
└── (static assets)
```

## 🔑 Key Features

### Forms (All with Turnstile CAPTCHA)
1. **Contact Form** (`/contact`)
   - Name, email, phone, subject, message
   - Sends to admin at `clients@poloju.dev`

2. **Apply Funnel** (`/apply`)
   - Multi-step (5 steps): Case Type → Injury Details → Attorney Info → Contact Info → Review
   - LocalStorage draft persistence
   - Saved to database

3. **Attorney Referral** (`/attorney-referral`)
   - Attorney info + Client info + Case details
   - Michigan bar number validation

### Emails (6 Templates)
**Customer Confirmation Emails:**
- ApplyConfirmationEmail - What happens next (4-step process)
- ContactConfirmationEmail - Response time promise
- AttorneyReferralConfirmationEmail - Referral review process

**Admin Notification Emails:**
- TeamApplyNotificationEmail - Formatted applicant table
- TeamContactNotificationEmail - Formatted message
- TeamAttorneyReferralNotificationEmail - Formatted referral table

### Database
- MySQL schema with `submissions` table
- Stores: contact, apply, attorney-referral submissions
- Auto-initialization on first API request

### Rate Limiting
- Contact: 10 submissions/hour per IP
- Apply: 5 submissions/hour per IP
- Attorney Referral: 20 submissions/hour per IP

### Security
- Input sanitization for all forms
- Turnstile CAPTCHA verification (client + server)
- Rate limiting by IP address
- Admin dashboard password protection

## ⚙️ Environment Variables

```env
# Site
NEXT_PUBLIC_SITE_URL=https://5000tomorrow.com

# Analytics
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-EFK51BL4HK
NEXT_PUBLIC_GTM_ID=GTM-MBHVLWKC

# Email
RESEND_API_KEY=re_jHY1FYGE_2oJsiHpoii6Y4oyt4X1yUpAR
NOTIFY_EMAIL=clients@poloju.dev
CONFIRM_FROM_EMAIL=no-reply@clients.poloju.dev

# Admin
ADMIN_PASSWORD=5000TomorrowAdmin@2026

# Database
DATABASE_URL=mysql://u758018594_5000admin:5000Tomorrowpassword@auth-db1743.hstgr.io:3306/u758018594_5000tomorrow

# CAPTCHA
CLOUDFLARE_TURNSTILE_SECRET_KEY=0x4AAAAAACxNih2j5PekpgmM5hKUctv9HS4
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=0x4AAAAAACxNinSg_ucYm65y

# Optional: CRM/Webhooks
CRM_WEBHOOK_URL=
CRM_API_KEY=
ATTORNEY_REFERRAL_WEBHOOK_URL=
CONTACT_WEBHOOK_URL=
```

## 📊 SEO & Routing

### Static Routes
- `/` - Homepage
- `/how-it-works` - Process explanation
- `/case-types` - All case types
- `/faq` - FAQ section
- `/about` - About page
- `/contact` - Contact form
- `/apply` - Apply funnel
- `/attorney-portal` - Attorney resources
- `/blog` - Blog
- `/privacy-policy`, `/terms`, `/disclaimer` - Legal

### Dynamic Routes
- `/case-types/[slug]` - 15 individual case type pages
- `/cities/[slug]` - 45+ Michigan city pages (with SEO optimization)
- `/blog/[slug]` - Blog posts

### Sitemap
- Auto-generated at `/sitemap.xml`
- Includes all routes with priorities
- Submit to Google Search Console

### Robots.txt
- Auto-generated to allow search engines

## 🔄 Recent Changes & Current State

### Latest Implemented
✅ Form submission fixed (GET → POST)
✅ All forms submit with Cloudflare Turnstile CAPTCHA
✅ Server-side CAPTCHA verification (Turnstile token validation)
✅ 6 professional email templates (3 customer + 3 admin)
✅ Admin-only email notifications (no customer confirmation emails)
✅ Database integration (MySQL)
✅ Input sanitization
✅ Rate limiting on all endpoints

### Build Status
✅ Production build: Successful
✅ Dev server: Running at http://localhost:3000

### Known Issues
⚠️ Deprecated middleware convention warning (use `proxy` instead)
⚠️ Hydration mismatch warnings from browser extensions (not critical)

## 📝 Admin Dashboard

**URL**: `/admin`
**Password**: `5000TomorrowAdmin@2026`

Features:
- View all form submissions
- Filter by form type (contact, apply, attorney-referral)
- View submission details
- Email preview

## 🚀 Deployment Checklist

### Before Deployment
- [ ] Build passes: `npm run build`
- [ ] No TypeScript errors
- [ ] All forms tested on production
- [ ] CAPTCHA keys configured
- [ ] Database connection verified
- [ ] Email service (Resend) verified

### Google Search Console
- [ ] Submit sitemap: `https://www.5000tomorrow.com/sitemap.xml`
- [ ] Verify site ownership
- [ ] Monitor indexing status
- [ ] Check for crawl errors

### Email Configuration
- [ ] Verify `no-reply@clients.poloju.dev` in Resend
- [ ] Test form submissions send emails
- [ ] Admin notifications working

### Testing
- [ ] All 3 forms work end-to-end
- [ ] Contact form sends admin notification
- [ ] Apply form saves to database
- [ ] Attorney referral saves to database
- [ ] Admin dashboard shows all submissions
- [ ] CAPTCHA blocks spam submissions

### Post-Deployment
- [ ] Monitor error logs
- [ ] Check Google Analytics tracking
- [ ] Monitor database growth
- [ ] Track email delivery

## 🔗 Business Constants

Located in `lib/constants/business.ts`:
```typescript
name: '5000 Tomorrow'
phone: '1-877-TODAY-5K' (1-877-863-2955)
address: '28588 Northwestern Hwy, Southfield, MI 48034'
serviceArea: 'Michigan Only'
```

## 📞 Contact Points

- **Public Phone**: 1-877-TODAY-5K (1-877-863-2955)
- **Admin Email**: clients@poloju.dev
- **Support Email**: no-reply@clients.poloju.dev (Resend)

## 🎨 Design System

**Colors:**
- Navy: #0A1628 (primary)
- Gold: #C9A84C (accent)
- White: #FFFFFF

**Typography:**
- Font: Inter (from next/font/google)
- Sizes: 11px (smallest) to 3xl (largest)

## 🧪 Testing

### Manual Testing Checklist
1. Test all forms on `/contact`, `/apply`, `/attorney-referral`
2. Verify CAPTCHA appears and validates
3. Check email sends to admin
4. Verify data saves to database
5. Test on mobile and desktop

### Common Errors
- "CAPTCHA verification failed" → Check Turnstile keys
- "Failed to save submission" → Check database connection
- "Too many requests" → Check rate limiting

## 📚 Documentation Files

- `CLAUDE.md` - This file
- `/README.md` - Project setup
- `/.env.local` - Environment variables (not committed)

## 💡 Development Tips

### Running Locally
```bash
npm install      # Install dependencies
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Build for production
```

### Debugging
- Check browser console for frontend errors
- Check terminal for server-side logs
- Admin dashboard at `/admin` to view submissions
- Database logs for save operations

### Adding New Pages
1. Create file in `app/` directory
2. Add to sitemap.ts if important
3. Add navigation link if needed

### Adding New Forms
1. Create validation schema in `lib/validations/`
2. Create form component
3. Create API endpoint in `app/api/`
4. Add Turnstile CAPTCHA
5. Add email template if needed

## 🔐 Security Considerations

- ✅ HTTPS enforced
- ✅ Input sanitization
- ✅ CAPTCHA protection
- ✅ Rate limiting
- ✅ Admin password protected
- ✅ No sensitive data in logs
- ✅ Database credentials in .env

## 📈 Analytics

- **GA4 ID**: G-EFK51BL4HK
- **GTM ID**: GTM-MBHVLWKC
- Track form submissions as conversions
- Monitor city page traffic
- Track CTA button clicks

---

**Last Updated**: March 28, 2026
**Maintained By**: Development Team
