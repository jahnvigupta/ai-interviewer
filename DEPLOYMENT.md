# Deployment Guide: AI Interviewer on WordPress

## Overview

This Next.js application cannot run directly on WordPress (they use different runtimes: Node.js vs PHP). However, you can integrate them using one of the methods below.

---

## Option 1: Deploy Next.js Separately + Embed in WordPress (Recommended)

### Step 1: Deploy Next.js Application

#### Deploy to Vercel (Easiest - Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository
   - Add environment variable: `OPENAI_API_KEY` (from your `.env` file)
   - Click "Deploy"
   - Your app will be live at `https://your-app.vercel.app`

#### Alternative: Deploy to Netlify

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `.next` folder, or
   - Connect your GitHub repo
   - Set build command: `npm run build`
   - Set publish directory: `.next`
   - Add environment variable: `OPENAI_API_KEY`
   - Deploy

#### Alternative: Deploy to Your Own Server

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set up Node.js on your server**
   ```bash
   # Install Node.js (if not already installed)
   # Then run:
   npm install -g pm2
   npm run build
   pm2 start npm --name "ai-interviewer" -- start
   pm2 save
   pm2 startup
   ```

3. **Configure Nginx/Apache reverse proxy**
   ```nginx
   # Nginx configuration example
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Step 2: Embed in WordPress

#### Method A: Using iframe (Simple)

1. **In WordPress, create a new page or post**
2. **Add a Custom HTML block** and paste:
   ```html
   <iframe 
     src="https://your-nextjs-app.vercel.app" 
     width="100%" 
     height="800px" 
     frameborder="0"
     style="border: none; min-height: 800px;">
   </iframe>
   ```

#### Method B: Using WordPress Shortcode (Better UX)

1. **Add to your theme's `functions.php`**:
   ```php
   function ai_interviewer_shortcode() {
       return '<iframe 
         src="https://your-nextjs-app.vercel.app" 
         width="100%" 
         height="800px" 
         frameborder="0"
         style="border: none; min-height: 800px;">
       </iframe>';
   }
   add_shortcode('ai_interviewer', 'ai_interviewer_shortcode');
   ```

2. **Use in any page/post**: `[ai_interviewer]`

#### Method C: Link to External Page (Cleanest)

1. **Create a WordPress page** with a button/link
2. **Link to your Next.js app**: `https://your-nextjs-app.vercel.app`
3. **Open in new tab** for better user experience

---

## Option 2: Run Both on Same Server (Subdomain)

If you have server access, you can run both:

1. **WordPress** on main domain: `example.com`
2. **Next.js** on subdomain: `app.example.com` or `interviewer.example.com`

### Setup Steps:

1. **Deploy Next.js** (see Option 1, Step 1)
2. **Configure DNS** to point subdomain to your server
3. **Configure web server** (Nginx/Apache) to route subdomain to Next.js
4. **Link from WordPress** to the subdomain

---

## Option 3: Convert to WordPress Plugin (Advanced - Not Recommended)

This would require:
- Rewriting the entire application in PHP
- Recreating React components in vanilla JavaScript or PHP
- Rebuilding the Monaco Editor integration
- Recreating the API routes in WordPress REST API

**This is not recommended** as it would require significant development time and lose Next.js optimizations.

---

## Environment Variables

Make sure to set these in your deployment platform:

- `OPENAI_API_KEY` - Your OpenAI API key

### For Vercel:
- Go to Project Settings → Environment Variables
- Add `OPENAI_API_KEY` with your key

### For Netlify:
- Go to Site Settings → Environment Variables
- Add `OPENAI_API_KEY` with your key

---

## Recommended Approach

**Best Option**: Deploy Next.js on **Vercel** (free tier available) and embed it in WordPress using an iframe or link.

**Why?**
- ✅ Zero server management
- ✅ Automatic HTTPS
- ✅ Fast global CDN
- ✅ Easy environment variable management
- ✅ Free for personal projects
- ✅ Automatic deployments from GitHub

---

## Troubleshooting

### CORS Issues
If you encounter CORS errors, add to your Next.js `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
};
```

### Iframe Not Loading
- Check if your WordPress site allows iframes (some security plugins block them)
- Ensure your Next.js app allows iframe embedding (check X-Frame-Options headers)

---

## Next Steps

1. Choose your deployment platform (Vercel recommended)
2. Deploy your Next.js app
3. Get the deployment URL
4. Embed in WordPress using one of the methods above
5. Test thoroughly


