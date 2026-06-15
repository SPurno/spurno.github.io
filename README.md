<div align="center">
  <img src="https://spurno.github.io/images/spurno-logo.png" alt="SPurno Animation Studio Logo" width="100" height="100" style="border-radius: 16px;" />
  <br/>
  <h1 align="center" style="margin: 0;">SPurno Animation Studio</h1>
  <p align="center">
    <strong>Motion Graphics · Stock Footage · Animation Studio</strong>
  </p>
  <p align="center">
    <a href="https://spurno.github.io">🌐 Website</a> ·
    <a href="https://stock.adobe.com/contributor/211977281/SPurnoAnimation">Adobe Stock</a> ·
    <a href="https://www.shutterstock.com/g/SPurnoAnimation">Shutterstock</a> ·
    <a href="https://www.pond5.com/artist/spurnoanimation">Pond5</a>
  </p>
</div>

---

## 📖 Overview

**SPurno Animation Studio** is the official portfolio and marketplace hub for premium motion background videos, animated templates, stock footage, and design assets. Built as a static GitHub Pages site, it showcases over **2,000+ assets** available on leading stock platforms including Adobe Stock, Shutterstock, Pond5, and Freepik.

Created by **Faruk Ahmed** — a Web Developer, Motion Graphics Designer, and Animation Creator based in Dhaka, Bangladesh.

## ✨ Features

- **Immersive 3D Background** – Interactive Three.js-powered scene with orbiting particle rings, geodesic wireframe spheres, and a deep starfield
- **Glassmorphism UI** – Modern frosted-glass design language with smooth hover states and transitions
- **Responsive Design** – Fully mobile-optimized with hamburger navigation and adaptive layouts
- **Scroll Reveal Animations** – Elements fade and animate into view as you scroll
- **SEO Optimized** – Structured data (JSON-LD), meta tags, Open Graph, Twitter Cards, XML sitemap
- **Google AdSense** – Monetized with contextual ad placements
- **3D Loading Screen** – Animated CSS 3D cube spinner with progress bar
- **Category Browser** – Organized navigation through Motion Graphics, After Effects, Mockups, Infographics, Presentations, and more

## 🛠 Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| **HTML5** | Structure & semantic markup |
| **CSS3** | Styling, glassmorphism effects, animations |
| **JavaScript (Vanilla ES6)** | Interactivity & DOM manipulation |
| **[Three.js](https://threejs.org/) (r169)** | 3D background scene with WebGL |
| **[GSAP](https://gsap.com/)** | SVG animations (`svg/` directory) |
| **Google Fonts (Jost)** | Typography |
| **Google AdSense** | Advertising monetization |
| **Fancybox** | Lightbox media viewer |
| **Dzsparallaxer** | Parallax scrolling effects |
| **Bootstrap (offcanvas)** | Mobile navigation component |

## 📁 Project Structure

```
spurno.github.io/
├── index.html                  # Main landing page
├── about-us.html               # About page
├── contact-us.html             # Contact page
├── privacy-policy.html         # Privacy Policy
├── terms-of-use.html           # Terms of Use
├── stock-portfolio.html        # Stock portfolio showcase
│
├── *.html                      # Category & product pages
│   (motion-graphics, infographics, mockups, templates, etc.)
│
├── assets/
│   ├── css/                    # Stylesheets
│   │   ├── spurno3d.css        # Main 3D site styles
│   │   ├── spurno.css          # Additional site styles
│   │   └── ...                 # Unify framework styles    │   └── vendor/                 # Third-party libraries
    │       ├── fancybox/           # Lightbox
    │       ├── dzsparallaxer/      # Parallax
    │       └── ...
│
├── js/
│   ├── spurno3d.js             # Three.js scene & scroll logic
│   └── lib/three.module.js     # Three.js module
│
├── images/                     # Image assets (69 files)
├── videos/                     # Video demos
├── watch/                      # Video showcase pages
├── svg/                        # GSAP SVG animations
├── rev/                        # Revolution slider assets
├── favicon/                    # Favicon & PWA icons
│
├── package.json                # Node.js dependencies (Three.js)
├── robots.txt                  # Crawler directives
├── sitemap.xml                 # SEO sitemap
└── LICENSE                     # GNU GPL v3
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- (Optional) [Node.js](https://nodejs.org/) for local development

### Local Development

This is a static site — no build step required. Simply serve it with any HTTP server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Dependencies

```bash
npm install
```

Currently the only npm dependency is [Three.js](https://threejs.org/) `^0.169.0` for the 3D background scene.

## 🌐 Deployment

The site is designed to be deployed on **GitHub Pages**:

1. Push to the `main` branch of `SPurno/spurno.github.io`
2. GitHub Pages automatically serves from `https://spurno.github.io/`

You can also deploy to any static hosting provider (Netlify, Vercel, Cloudflare Pages, etc.).

## 📄 License

This project is licensed under the **GNU General Public License v3.0**. See the [LICENSE](./LICENSE) file for details.

## 🤝 Connect

| Platform | Link |
| -------- | ---- |
| **Website** | [spurno.github.io](https://spurno.github.io) |
| **Email** | [spurno@icloud.com](mailto:spurno@icloud.com) |
| **GitHub** | [@SPurno](https://github.com/SPurno) |
| **LinkedIn** | [@spurno](https://www.linkedin.com/in/spurno) |
| **Facebook** | [@iSPurno](https://facebook.com/iSPurno) |
| **X (Twitter)** | [@iSPurno](https://x.com/iSPurno) |

### Stock Marketplaces

- [Adobe Stock](https://stock.adobe.com/contributor/211977281/SPurnoAnimation)
- [Shutterstock](https://www.shutterstock.com/g/SPurnoAnimation)
- [Pond5](https://www.pond5.com/artist/spurnoanimation)
- [Freepik](https://www.freepik.com/author/pixellvector)

---

<div align="center">
  <sub>Built with ❤️ by Faruk Ahmed &nbsp;·&nbsp; © 2026 SPurno Animation Studio</sub>
</div>
