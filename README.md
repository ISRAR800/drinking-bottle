# Purely — Premium Drinking Water

Welcome to the **Purely** website repository. This is a modern, optimized static site built with HTML, CSS, and vanilla JavaScript.

## 🌐 Live Site
- **URL:** https://drinking-bottle-five.netlify.app
- **Deploy:** Netlify (auto-deployed on push to main)

## 📂 Repository Structure
```
.
├── index.html              # Main site markup (1029 lines, 59.5 KB)
├── style.css              # All styling & responsive design (2251 lines, 51.7 KB)
├── jascripts.js           # Vanilla JavaScript interactions (994 lines, 36.9 KB)
├── favicon.svg            # Brand favicon (SVG)
├── apple-touch-icon.svg   # iOS home screen icon (SVG)
├── site.webmanifest       # PWA manifest
├── sitemap.xml            # SEO sitemap for search engines
├── robots.txt             # Search engine directives
├── OPTIMIZATION.md        # Detailed optimization guide & status
├── images/                # Product & brand images (AVIF optimized)
└── scripts/               # Utility scripts for optimization
    ├── convert-images.ps1 # PowerShell: Convert AVIF → WebP/JPEG variants
    └── favicon-generator.js # Node.js: Generate PNG favicon variants
```

## ✨ Key Features

### 🎨 Design
- **Brand:** Purely — premium positioning with clean, modern aesthetic
- **Colors:** Ocean blue (#0057B8), bright cyan (#00C2FF), fresh mint (#00D4A6)
- **Typography:** Montserrat font family (Google Fonts with preconnect)
- **Responsive:** Mobile, tablet, desktop layouts
- **No pricing:** Informational CTAs only (clean, premium feel)

### ⚡ Performance
- **Responsive Images:** `<picture>` with AVIF + SVG fallbacks
- **Image Optimization:** Preload LCP image, lazy-load below-fold images
- **No Layout Shift:** All images have explicit width/height attributes
- **Font Optimization:** Preconnect to Google Fonts
- **Minimal Code:** ~148 KB total (HTML + CSS + JS)

### 🔍 SEO & Accessibility
- ✅ Meta description, OG/Twitter tags, canonical URL
- ✅ JSON-LD Organization schema
- ✅ Sitemap.xml and robots.txt
- ✅ Semantic HTML with `<main>` landmark
- ✅ Skip-to-main link for keyboard users
- ✅ Visible focus outlines on interactive elements
- ✅ Proper alt text on all images

### 📱 PWA Ready
- ✅ SVG and manifest assets
- ✅ Responsive design
- ✅ Fast load times

## 🚀 Getting Started

### For Local Development
```bash
# Clone the repository
git clone https://github.com/ISRAR800/drinking-bottle.git
cd drinking-bottle

# Start a local server (Python 3)
python -m http.server 8000

# Open in browser
# http://localhost:8000
```

### For Editing
- **HTML:** Edit `index.html` for content and structure
- **CSS:** Edit `style.css` for styling and responsive design
- **JS:** Edit `jascripts.js` for interactivity
- **Images:** Add optimized AVIF images to `images/` folder

### Deploy Changes
```bash
git add .
git commit -m "Your change description"
git push origin main
# Netlify auto-deploys!
```

---

## 🔧 Optional Optimizations

### 1. Generate PNG Favicon Variants
**Current:** SVG favicon (modern browsers only)
**Enhanced:** PNG variants for maximum compatibility

```bash
npm install sharp
node scripts/favicon-generator.js
git add favicon-*.png apple-touch-icon-180.png
git commit -m "Add PNG favicon variants"
git push origin main
```

### 2. Generate Responsive Image Variants
**Current:** AVIF only
**Enhanced:** WebP + JPEG fallbacks at multiple sizes

```bash
# Install ffmpeg first:
# Windows: winget install --id=Gyan.FFmpeg -e
# Or: choco install ffmpeg

# Then run the conversion script:
powershell -ExecutionPolicy Bypass -File .\scripts\convert-images.ps1

# Commit the new files:
git add images/*.webp images/*.jpg
git commit -m "Add WebP/JPEG image variants"
git push origin main
```

### 3. Run Lighthouse Audit
```bash
npx lighthouse https://drinking-bottle-five.netlify.app --view
```

---

## 📊 Performance Metrics (Estimated)

| Metric | Status |
|--------|--------|
| First Contentful Paint (FCP) | <1.5s ✅ |
| Largest Contentful Paint (LCP) | <2.5s ✅ |
| Cumulative Layout Shift (CLS) | ~0.0 ✅ |
| Time to Interactive (TTI) | <3.0s ✅ |
| Total Page Size | ~150 KB |
| SEO Score | ✅ Optimized |
| Accessibility | ✅ WCAG 2.1 AA |

---

## 📝 Recent Updates

**Latest Commit:** Width/height on all images (prevents CLS)
**Previous:** Responsive `<picture>` elements with AVIF + SVG fallbacks
**Earlier:** SEO tags, color palette refresh, Montserrat typography

See `OPTIMIZATION.md` for detailed status and roadmap.

---

## 🔗 Useful Resources

- **GitHub:** https://github.com/ISRAR800/drinking-bottle
- **Netlify Dashboard:** https://app.netlify.com/ (login required)
- **Google Fonts:** https://fonts.google.com/
- **MDN Web Docs:** https://developer.mozilla.org/
- **Schema.org:** https://schema.org/

---

## 📄 License

This project is private. Contact the team for permissions.

---

## 💬 Questions?

Refer to `OPTIMIZATION.md` for detailed technical information, or create an issue on GitHub.

---

**Status:** Production Ready ✅  
**Last Updated:** Latest commits pushed  
**Maintenance:** Ongoing optimization opportunities available
