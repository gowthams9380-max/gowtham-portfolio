# Gowtham S — Premium Personal Portfolio & Interactive Certifications Deck

An agency-grade, luxury editorial personal portfolio website engineered for **Gowtham S**, a Computer Science and Engineering student at **Nagarjuna College of Engineering and Technology, Bengaluru**, actively seeking **Software Engineering Internship** opportunities.

Built with **React 19**, **Vite**, **GSAP**, **Lucide Icons**, and custom **Luxury Editorial CSS**.

---

## 🌟 Visual Highlights & Experience

- **Minimalist Luxury Editorial Palette**: Warm cream canvas (`#f7f5f0`) paired with ink-black typography (`#121212`) and warm golden-yellow accents (`#e59b10`).
- **High-End Typography**: Display serifs (`Playfair Display`, `Bodoni Moda`), modern clean sans-serif (`Plus Jakarta Sans`), and monospace accents (`Space Grotesk`).
- **Interactive Certifications Deck (Pinterest-Inspired)**:
  - **Initial State**: 3D layered physical card deck with a breathing float animation and an orbital **Badge Cluster** displaying official issuer logos.
  - **Signature FLIP Motion**: Tapping the deck smoothly disperses the cards into a responsive 1–4 column gallery grid while **each issuer logo lifts off and arcs through 2D space to land with an elastic bounce on its card's top-right corner**.
  - **"What I Learned" Staggered Points**: Fade and slide into view once cards settle.
  - **Reverse "Stack Them Back"**: Collects cards back into the physical deck with a single click.
  - **Full-Screen Lightbox**: Zoom-in modal for high-resolution certificate inspection and verification links (Credly, Wingspan).
- **Two-Column Hero Section**: Oversized translucent watermark, navy-blue suit portrait, resume PDF download button, and social links.
- **Dark Architectural Statistics Strip**: `SINCE 2024` • `4+ Projects` • `8.2/10 CGPA` • `9 Certifications` • `2028 Graduation`.

---

## 🚀 GitHub Pages 1-Click Deployment

This project is pre-configured for GitHub Pages:
- `vite.config.js` sets `base: './'` so that all CSS, JS, images, and fonts load correctly on repository subpaths (e.g. `https://gowthams9380-max.github.io/PortFolio/`).
- Automated CI/CD pipeline included at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### To Publish to GitHub:
1. Initialize and push your code to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Build luxury portfolio with interactive certifications deck"
   git branch -M main
   git remote add origin https://github.com/gowthams9380-max/PortFolio.git
   git push -u origin main
   ```
2. In your GitHub repository settings:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
   - Your site will automatically build and publish!

---

## 🛠️ Local Development & Build Commands

```bash
# Run local dev server (default port 5173)
npm run dev

# Run Oxlint code health check (0 warnings, 0 errors)
npm run lint

# Build production bundle into /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Key File Structure

```
PortFolio/
├── .github/workflows/
│   └── deploy.yml                   # Automated GitHub Pages CI/CD workflow
├── public/
│   ├── assets/certifications/        # Web-optimized certificate PNG images
│   ├── favicon.svg                  # Custom GS gold monogram favicon
│   ├── user_portrait.jpg            # Professional navy-blue suit portrait
│   ├── Gowtham_Intern_Resume.pdf    # Source-of-truth resume PDF
│   └── thumb1.jpg - thumb4.jpg      # Project thumbnail previews
├── src/
│   ├── data/
│   │   └── certifications.json      # Single source of truth for all certificates
│   ├── components/
│   │   └── IssuerLogo.jsx           # Official SVG issuer logos and badge generator
│   ├── pages/
│   │   └── CertificationsPage.jsx   # Interactive deck, GSAP flight, gallery grid & lightbox
│   ├── styles/
│   │   └── CertificationsPage.css   # Pinterest gallery & deck 3D styling
│   ├── App.jsx                      # Main portfolio application & hash view router
│   ├── App.css                      # Editorial luxury styling
│   └── main.jsx                     # Application entrypoint
├── index.html                       # HTML shell with Google Fonts & SEO meta tags
└── vite.config.js                   # Vite config with relative base for GitHub Pages
```

---

## 📝 How to Add or Edit Certifications

You never need to edit the UI code to manage your credentials:
1. Place the new certificate image in `public/assets/certifications/` (e.g. `aws-cloud-practitioner.png`).
2. Add a new JSON object to [`src/data/certifications.json`](src/data/certifications.json):

```json
{
  "id": "aws-cloud-practitioner",
  "title": "AWS Certified Cloud Practitioner",
  "issuer": "Amazon Web Services",
  "issuerShort": "AWS",
  "issuerInitials": "AWS",
  "category": "Cloud Computing",
  "year": "2026",
  "image": "./assets/certifications/aws-cloud-practitioner.png",
  "verificationUrl": "https://www.credly.com/your-badge-link",
  "certId": "AWS-CCP-12345",
  "badgeColor": "#FF9900",
  "logoType": "aws",
  "learned": [
    "Core AWS cloud infrastructure, global regions, and availability zones",
    "Fundamental compute (EC2, Lambda), storage (S3), and database (RDS) services",
    "Cloud security best practices, Identity and Access Management (IAM), and encryption",
    "Cloud economics, AWS pricing models, and billing management"
  ]
}
```
The application will automatically include it in the initial deck cluster, animate its logo flight, place it in the responsive gallery grid, and connect it to the lightbox viewer.
