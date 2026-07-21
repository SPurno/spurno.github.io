<div align="center">
  <img src="https://spurno.github.io/images/spurno-logo.svg" alt="SPurno Animation Studio Logo" width="140" style="border-radius: 16px;" />
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

**SPurno Animation Studio** is the official portfolio and marketplace hub for premium motion background videos, animated templates, stock footage, and design assets. Built as a static GitHub Pages site, it showcases over **4,000+ assets** available on leading stock platforms including Adobe Stock, Shutterstock, Pond5, and Freepik.

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
- **User Authentication** – Full registration, login, password reset with JWT tokens
- **User Dashboard** – Profile management, favorites, download history, and account settings
- **Custom Orders (Quote Requests)** – Users can submit animation project requests with details like animation type, duration, budget, deadline, and payment method
- **Admin Panel** – Secure admin dashboard to manage all orders, update status, set quoted prices, and respond to customers
- **Internationalization (i18n)** – Multi-language support with 8 languages (English, Spanish, French, German, Portuguese, Japanese, Russian, Chinese)

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
| **[Cloudflare Workers](https://workers.cloudflare.com/)** | Serverless API (auth, orders, dashboard) |
| **[Turso (libSQL)](https://turso.tech/)** | Edge database for user data & orders |
| **[JWT (jose)](https://github.com/panva/jose)** | Token-based authentication |
| **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** | Password hashing |

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
├── admin.html                  # Admin panel (order management)
├── login.html                  # User login page
├── register.html               # User registration page
├── forgot-password.html        # Password reset request
├── reset-password.html         # Password reset form
├── account.html                # User dashboard (profile, favorites, orders)
│
├── workers/
│   └── auth/                   # Cloudflare Worker (auth API)
│       ├── src/
│       │   ├── index.js        # Request router
│       │   ├── auth.js         # Register, login, password reset handlers
│       │   ├── dashboard.js    # Favorites, downloads, account, orders handlers
│       │   ├── admin.js        # Admin order management handlers
│       │   └── db.js           # Turso database schema & CRUD operations
│       ├── scripts/
│       │   ├── setup-db.js     # Database setup script (CommonJS)
│       │   └── setup-db.mjs    # Database setup script (ESM, with --reset)
│       ├── wrangler.toml       # Cloudflare Workers configuration
│       └── package.json        # Worker dependencies
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
# Site dependencies
npm install

# Auth worker dependencies
cd workers/auth
npm install
```

Currently the site requires [Three.js](https://threejs.org/) `^0.169.0` for the 3D background scene. The auth worker requires additional packages (see `workers/auth/package.json`).

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
