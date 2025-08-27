# 🌐 GitHub Pages Deployment Guide

## Overview

This guide will help you deploy your React portfolio to GitHub Pages. GitHub Pages is perfect for static sites like yours and offers free hosting with automatic deployments.

## 🚀 Quick Setup

### 1. Enable GitHub Pages

1. Go to your repository: [https://github.com/CipherSaber/Portfolio](https://github.com/CipherSaber/Portfolio)
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. Click **Configure** to set up the workflow

### 2. Automatic Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
- Build your portfolio when you push to main branch
- Deploy to GitHub Pages
- Update your site automatically

### 3. Your Portfolio URL

Once deployed, your portfolio will be available at:
```
https://cipherSaber.github.io/Portfolio/
```

## 🔧 Manual Deployment (Optional)

If you want to deploy manually:

```bash
# Install dependencies
npm install

# Deploy to GitHub Pages
npm run deploy
```

## 📁 File Structure

Your portfolio is configured for GitHub Pages with:
- ✅ **Base path**: `/Portfolio/` (matches repository name)
- ✅ **Build output**: `dist/` folder
- ✅ **3D models**: Properly included
- ✅ **Responsive design**: Mobile and desktop ready

## 🎯 Benefits of GitHub Pages

- **Free hosting** for public repositories
- **Automatic deployments** from main branch
- **Global CDN** for fast access worldwide
- **No runtime issues** (unlike Vercel)
- **Perfect for static React apps**
- **Built-in HTTPS** and security

## 🔍 Troubleshooting

### Common Issues

1. **404 Errors**: Make sure base path is `/Portfolio/` in `vite.config.js`
2. **Build Failures**: Check GitHub Actions logs for errors
3. **3D Models Not Loading**: Verify models are in `public/models/` folder

### Check Deployment Status

1. Go to **Actions** tab in your repository
2. Look for the latest workflow run
3. Check if build and deploy steps succeeded

## 🎉 Success!

Once deployed, your portfolio will feature:
- **Interactive 3D models** (Millennium Falcon, Globe)
- **Smooth animations** with Framer Motion
- **Responsive design** for all devices
- **Fast loading** with optimized chunks
- **Professional appearance** ready for showcasing

---

**Ready to deploy?** Just push to main branch and GitHub Actions will handle the rest! 🚀
