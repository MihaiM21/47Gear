# 47Gear - Production E-Commerce Store

A high-performance Next.js 15 e-commerce store integrated with Shopify, built for production deployment.

## 🚀 Features

- **Next.js 15** with App Router and React Server Components
- **Shopify Storefront API** integration with automatic revalidation
- **Auto-Refresh Data** - Products update every 3 minutes, no manual refresh needed
- **Webhook Support** - Instant updates when you change products in Shopify
- **TypeScript** for type safety
- **Tailwind CSS** for responsive styling
- **Optimized Images** with next/image (AVIF, WebP)
- **SEO Optimized** with dynamic metadata and sitemaps
- **Production Ready** with security headers, rate limiting, and Docker support

## 📋 Prerequisites

- Node.js 18+ (22+ recommended for production)
- npm or yarn
- Shopify store with Storefront API access
- Docker (optional, for containerized deployment)

## 🛠️ Environment Setup

1. **Copy environment variables:**
   ```bash
   cp .env.example .env
   ```

2. **Configure required variables in `.env`:**

   **Shopify (Required):**
   - `SHOPIFY_STORE_DOMAIN` - Your Shopify store domain
   - `SHOPIFY_STOREFRONT_ACCESS_TOKEN` - Storefront API access token
   - `SHOPIFY_REVALIDATION_SECRET` - Webhook secret (generate with: `openssl rand -base64 32`)

   **Site Configuration:**
   - `COMPANY_NAME` - Your company name
   - `SITE_NAME` - Site title for SEO
   - `TWITTER_CREATOR` / `TWITTER_SITE` - Twitter handles for SEO

   **Email (Optional):**
   - Configure SMTP settings if you want contact form functionality
   - Leave empty to disable email features

## 🔧 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🐳 Docker Deployment

### Build and Run

```bash
# Build the Docker image
docker build -t 47gear-store .

# Run the container
docker run -p 3000:3000 --env-file .env 47gear-store
```

### Docker Compose (Recommended)

Create a `docker-compose.yml`:

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

Run with:
```bash
docker-compose up -d
```

## 🔒 Security Features

### Built-in Security Headers

The application includes comprehensive security headers via middleware:

- **CSP (Content Security Policy)** - Prevents XSS attacks
- **X-Frame-Options** - Prevents clickjacking
- **HSTS** - Forces HTTPS connections
- **X-Content-Type-Options** - Prevents MIME sniffing
- **X-XSS-Protection** - Browser XSS protection

### Rate Limiting

- **General Routes:** 60 requests per minute per IP
- **API Routes:** 20 requests per minute per IP

For production with multiple servers, consider using Redis for distributed rate limiting.

## 🔄 Automatic Data Updates

The site automatically keeps Shopify data fresh:

### Time-Based Revalidation (ISR)
- **Products**: Auto-refresh every 3 minutes
- **Collections**: Auto-refresh every 5 minutes
- **Pages**: Auto-refresh every 10 minutes
- **Menu**: Auto-refresh every 10 minutes

### Webhook Integration (Instant Updates)

For real-time updates, configure Shopify webhooks:

1. Go to **Shopify Admin** → **Settings** → **Notifications** → **Webhooks**
2. Add webhooks for these events pointing to `https://yourdomain.com/api/revalidate?secret=YOUR_SECRET`:
   - `products/create`
   - `products/update`
   - `products/delete`
   - `collections/create`
   - `collections/update`
   - `collections/delete`

**Benefits:**
- No manual refresh needed
- Changes in Shopify appear on site within minutes (or instantly with webhooks)
- Better user experience with always-fresh data

📖 **See [SHOPIFY_REVALIDATION.md](./SHOPIFY_REVALIDATION.md) for detailed setup guide**

## 📊 Monitoring

### Health Check Endpoint

Monitor application health at: `https://yourdomain.com/api/health`

Response includes:
- Application status
- Uptime
- Environment info
- Shopify connection status
- Email configuration status

### Recommended Monitoring Setup

1. **Application Monitoring:**
   - Set up [Sentry](https://sentry.io) for error tracking
   - Use [Vercel Analytics](https://vercel.com/analytics) if deploying to Vercel
   - Configure [Google Analytics 4](https://analytics.google.com) for user analytics

2. **Uptime Monitoring:**
   - Use services like [UptimeRobot](https://uptimerobot.com) or [Pingdom](https://www.pingdom.com)
   - Monitor the `/api/health` endpoint

3. **Performance Monitoring:**
   - Enable [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) in your pipeline
   - Monitor Core Web Vitals via Google Search Console

## 🚀 Deployment Platforms

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Configure environment variables in Vercel dashboard.

### AWS / GCP / Azure

Use the Docker image with:
- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances

### Traditional VPS

1. SSH into your server
2. Clone the repository
3. Set up environment variables
4. Use PM2 for process management:

```bash
npm install -g pm2
npm run build
pm2 start npm --name "47gear" -- start
pm2 save
pm2 startup
```

## ⚡ Performance Optimization

### Implemented Optimizations

- ✅ Next.js standalone output for minimal Docker image size
- ✅ Image optimization with AVIF/WebP formats
- ✅ Automatic code splitting
- ✅ SWC minification
- ✅ Gzip compression
- ✅ React strict mode for better error detection
- ✅ Optimized package imports

### CDN Configuration

For best performance, configure a CDN:

1. **Cloudflare** (Recommended - Free tier available)
   - Automatic caching
   - DDoS protection
   - SSL/TLS encryption
   - Global edge network

2. **AWS CloudFront** or **Azure CDN**
   - Enterprise-grade performance
   - Custom caching rules

## 🔐 Security Best Practices

### Before Production Deployment

- [ ] Review and test all environment variables
- [ ] Enable HTTPS (required for production)
- [ ] Configure proper DNS records
- [ ] Set up SSL/TLS certificates (use Let's Encrypt or Cloudflare)
- [ ] Review CSP headers and adjust for your domain
- [ ] Enable firewall rules on your hosting provider
- [ ] Set up automated backups
- [ ] Configure monitoring and alerting
- [ ] Test rate limiting functionality
- [ ] Review Shopify webhook security

### Regular Maintenance

- Keep dependencies updated: `npm audit` and `npm update`
- Monitor security advisories
- Review logs regularly
- Test disaster recovery procedures
- Keep Node.js runtime updated

## 📝 Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `SHOPIFY_STORE_DOMAIN` | Yes | Shopify store domain | `mystore.myshopify.com` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Yes | Storefront API token | `abc123...` |
| `SHOPIFY_REVALIDATION_SECRET` | Yes | Webhook secret | Random string |
| `COMPANY_NAME` | Yes | Company name | `47Gear` |
| `SITE_NAME` | Yes | Site title | `47Gear - Gaming` |
| `SITE_THEME` | No | Theme variant | `default` or `christmas` |
| `EMAIL_HOST` | No | SMTP host | `smtp.gmail.com` |
| `EMAIL_PORT` | No | SMTP port | `587` |
| `EMAIL_USER` | No | SMTP username | `user@example.com` |
| `EMAIL_PASS` | No | SMTP password | `password` |
| `EMAIL_FROM` | No | From email | `noreply@example.com` |
| `EMAIL_TO` | No | Contact recipient | `contact@example.com` |
| `NODE_ENV` | Yes | Environment | `production` |

## 🐛 Troubleshooting

### Build Errors

**Issue:** TypeScript errors during build
- **Solution:** Fix all TypeScript errors. The `ignoreBuildErrors` flag has been removed for safety.

### Docker Issues

**Issue:** Node vulnerabilities in Docker image
- **Solution:** The Dockerfile uses the latest stable Node.js Alpine image with minimal vulnerabilities.

### Performance Issues

**Issue:** Slow page loads
- **Solution:** 
  - Enable CDN caching
  - Check Shopify API response times
  - Monitor with the `/api/health` endpoint

### Rate Limiting Issues

**Issue:** Getting 429 Too Many Requests
- **Solution:** 
  - Adjust rate limits in `src/middleware.ts`
  - Implement Redis-based rate limiting for distributed systems

## 📞 Support

For issues or questions:
- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [Shopify Storefront API docs](https://shopify.dev/docs/api/storefront)
- Open an issue in the repository

## 📄 License

See LICENSE file for details.

---

Built with ❤️ using Next.js and Shopify