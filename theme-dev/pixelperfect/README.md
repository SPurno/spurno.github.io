<div align="center">

# ✨ PixelPerfect — Personal Portfolio Theme

### A premium personal portfolio HTML/CSS/JS theme with immersive 3D experiences

[![Version](https://img.shields.io/badge/version-1.0.0-6c5ce7.svg)](https://wrapbootstrap.com)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-7952B3.svg)](https://getbootstrap.com)
[![Three.js](https://img.shields.io/badge/Three.js-r160-000000.svg)](https://threejs.org)
[![License](https://img.shields.io/badge/license-Proprietary-ff6b6b.svg)](LICENSE)

**[Documentation](documentation/index.html) · [Demo](#) · [WrapBootstrap](https://wrapbootstrap.com)**

<br>

![Hero Preview](https://picsum.photos/seed/pixelperfect-hero/1200/600)

</div>

---

## 📋 Overview

**PixelPerfect** is a modern, premium personal portfolio theme designed for creative professionals, designers, and developers. Built with cutting-edge web technologies, it features an interactive **Three.js 3D particle system** as the hero background, **Swiper.js** touch-enabled carousels, **GSAP** scroll animations, and a sleek dark theme with gradient accents.

Whether you're a freelancer, agency, or creative professional, PixelPerfect provides everything you need to showcase your work and impress potential clients.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🎨 **3D Hero Background** | Interactive Three.js particle system with floating geometries and mouse tracking |
| 📱 **Fully Responsive** | Mobile, tablet, and desktop optimized layouts |
| 🌙 **Dark Theme** | Modern dark UI with customizable gradient accents |
| 🎠 **Swiper Carousels** | Touch-enabled sliders for Services & Featured Projects |
| 📄 **5 Pre-built Pages** | Home, About, Portfolio, Blog, Contact |
| 🏷️ **Enhanced Service Cards** | Badges, feature lists, tech tags, and pricing |
| 🖼️ **6 Project Modals** | Detailed case study modals with results & technologies |
| 🎯 **Portfolio Filter** | Category-based filtering on portfolio page |
| ⚡ **GSAP Animations** | Scroll-triggered parallax and reveal animations |
| ⌨️ **Typed.js Effect** | Typewriter text animation in the hero section |
| 📊 **Animated Counters** | Number counters and skill bar animations |
| 🖱️ **Custom Cursor** | Interactive cursor effects on desktop |
| 🎯 **SEO Optimized** | Semantic HTML, meta tags, Open Graph support |
| 📚 **Documentation** | Comprehensive documentation included |

---

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| [Bootstrap](https://getbootstrap.com) | 5.3.3 | Layout & Responsive Grid |
| [Three.js](https://threejs.org) | r160 | 3D Interactive Background |
| [Swiper.js](https://swiperjs.com) | 11.1.15 | Touch-enabled Carousels |
| [GSAP](https://gsap.com) | 3.12.5 | Advanced Animations |
| [AOS](https://michalsnik.github.io/aos/) | 2.3.1 | Scroll Animations |
| [Typed.js](https://mattboldt.com/demos/typed-js/) | 2.0.12 | Typewriter Effect |
| [Font Awesome](https://fontawesome.com) | 6.5.1 | Icons |
| [jQuery](https://jquery.com) | 3.7.1 | DOM Manipulation |

---

## 📂 File Structure

```
pixelperfect/
├── index.html                   # Homepage
├── about.html                   # About page
├── portfolio.html               # Portfolio page
├── blog.html                    # Blog page
├── contact.html                 # Contact page
├── README.md                    # This file
├── css/
│   ├── style.css                # Main stylesheet (~1,940 lines)
│   ├── responsive.css           # Responsive breakpoints
│   └── docs.css                 # Documentation styles
├── js/
│   ├── main.js                  # All interactions & animations
│   └── three-hero.js            # Three.js 3D scene
├── assets/
│   ├── img/                     # Add your images here
│   └── fonts/                   # Add custom fonts here
├── documentation/
│   └── index.html               # Full theme documentation (open in browser)
└── vendor/                      # Local vendor files (optional)
```

---

## 🚀 Quick Start

### 1. Installation

1. **Unzip** the downloaded theme package
2. **Upload** the entire `pixelperfect` folder to your web server's root directory
3. **Open** `index.html` in your browser to preview the theme
4. **Edit** the HTML files to customize content, images, and text

### 2. Local Development

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve pixelperfect

# Using VS Code: Install "Live Server" extension → Click "Go Live"
```

> **Note:** All libraries are loaded via CDN. Ensure an active internet connection for full functionality. For offline use, download the libraries and update the paths.

---

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `css/style.css`:

```css
:root {
  --color-primary: #6c5ce7;        /* Main purple */
  --color-primary-dark: #5a4bd1;   /* Darker purple */
  --color-primary-light: #a29bfe;  /* Light purple */
  --color-accent: #00cec9;         /* Teal accent */
  --color-secondary: #fd79a8;      /* Pink accent */
}
```

### Pre-made Color Schemes

| Scheme | Primary | Accent | Mood |
|--------|---------|--------|------|
| Default (Purple) | `#6c5ce7` | `#00cec9` | Creative, Modern |
| Ocean Blue | `#0984e3` | `#00b894` | Professional, Calm |
| Sunset | `#e17055` | `#fdcb6e` | Warm, Energetic |
| Forest | `#00b894` | `#55efc4` | Natural, Fresh |
| Midnight | `#2d3436` | `#636e72` | Minimal, Elegant |

### Changing Fonts

Edit the Google Fonts URL in the `<head>` and update the CSS variables:

```css
--font-primary: 'Space Grotesk', sans-serif;
--font-secondary: 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

---

## 📄 Page Guide

### Homepage (`index.html`)
- Three.js 3D interactive hero background
- Services & Expertise section (Swiper carousel with badges, features, tech tags, pricing)
- "How I Work" 4-step process section
- Services CTA card
- Featured Projects (Swiper carousel with 6 project cards)
- Trusted by clients section
- Testimonials carousel
- Latest blog posts
- Contact form

### About (`about.html`)
- Personal introduction with info cards
- Technical skills with animated progress bars
- Work experience timeline
- Fun facts section

### Portfolio (`portfolio.html`)
- Bootstrap grid layout with category filter buttons
- Hover overlay effects on project cards
- Links to detailed project modals (reuse the modals from index.html)

### Blog (`blog.html`)
- Horizontal blog cards with dates and categories
- Sidebar with search, categories, recent posts, tags, and CTA
- Pagination for multiple pages

### Contact (`contact.html`)
- Contact information cards (email, phone, location)
- Social media links
- Full contact form with validation
- Google Maps integration

---

## 🎠 Swiper Carousels

The theme uses **Swiper.js 11** for touch-enabled carousels. Two carousels are on the homepage:

- **Services Carousel** — 6 service cards, 3 visible on desktop
- **Portfolio Carousel** — 6 project cards, 3 visible on desktop

Both feature:
- Left/right navigation buttons
- Clickable dot pagination
- Autoplay with pause-on-hover
- Responsive breakpoints

Configure in `js/main.js` under "Swiper Initialization":

```js
new Swiper('.services-swiper', {
  slidesPerView: 1,
  spaceBetween: 24,
  autoplay: { delay: 5000, disableOnInteraction: true, pauseOnMouseEnter: true },
  pagination: { el: '.services-pagination', clickable: true },
  navigation: { nextEl: '.services-next', prevEl: '.services-prev' },
  breakpoints: { 576: { slidesPerView: 2 }, 992: { slidesPerView: 3 } },
});
```

---

## 🎯 Three.js 3D Background

The hero section features an interactive 3D scene built with Three.js:

- **2,000 particles** in a spherical distribution with gradient colors
- **40 floating wireframe geometries** (icosahedrons, octahedrons, torus, etc.)
- **Mouse tracking** — particles and camera respond to cursor movement

### Customization

Edit `js/three-hero.js`:

```js
const particleCount = 2000;   // Number of particles
const geoCount = 40;          // Number of floating shapes
const color1 = new THREE.Color('#6c5ce7');  // Primary color
const color2 = new THREE.Color('#00cec9');  // Accent color
camera.position.z = 30;       // Camera distance
```

### Disabling the 3D Background

1. Remove `<div id="three-container">` from `index.html`
2. Remove `<script src="js/three-hero.js">` script tag
3. Or remove the Three.js CDN link from `<head>`

---

## ✍️ Customizing Content

### Hero Section (index.html)

Edit the typed strings in `js/main.js`:

```js
new Typed('.typed-text', {
  strings: [
    'Creative Designer',
    'Full-Stack Developer',
    '3D Web Artist',
    // Add your own strings here
  ],
  typeSpeed: 60,
  backSpeed: 30,
  loop: true
});
```

### Navigation

Edit the `<nav>` section in each HTML file. Add `class="active"` on the current page's link.

### Adding Portfolio Projects

Duplicate a `.swiper-slide.portfolio-item` inside `.portfolio-swiper .swiper-wrapper` and create a matching modal with `id="projectModalN"`.

### Contact Form

Replace the simulated AJAX call in `js/main.js` with your backend endpoint:

```js
$.ajax({
  url: 'https://your-api.com/send-message',
  method: 'POST',
  data: $(this).serialize(),
  success: function(response) { /* handle success */ },
  error: function(error) { /* handle error */ }
});
```

---

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Latest 2 versions |
| Firefox | ✅ Latest 2 versions |
| Safari | ✅ Latest 2 versions |
| Edge | ✅ Latest 2 versions |
| Opera | ✅ Latest 2 versions |
| Mobile Safari | ✅ iOS 12+ |
| Chrome Android | ✅ Latest 2 versions |

---

## 🤝 Credits & Resources

PixelPerfect uses the following open-source libraries:

| Resource | Version | License |
|----------|---------|---------|
| Bootstrap | 5.3.3 | MIT |
| Three.js | r160 | MIT |
| Swiper.js | 11.1.15 | MIT |
| GSAP | 3.12.5 | Standard |
| Font Awesome | 6.5.1 | Font Awesome Free |
| jQuery | 3.7.1 | MIT |
| AOS | 2.3.1 | MIT |
| Typed.js | 2.0.12 | MIT |
| Google Fonts | — | Open Font License |
| Picsum Photos | — | Free |

---

## 📝 Changelog

### v1.1.0 (June 16, 2026)
- Added Swiper.js carousels for Services & Featured Projects sections
- Enhanced service cards with badges, feature lists, pricing & tech tags
- Added "How I Work" process section with 4-step workflow
- Added Services CTA section
- Enhanced portfolio cards with tech stacks & client logos showcase
- Added 6 project-specific detail modals with results & technologies
- Added project stats bar
- Updated Three.js from r128 to r160
- Fixed preloader timing and GSAP toggleActions
- Comprehensive documentation update

### v1.0.0 (June 16, 2026)
- Initial release
- 5 HTML pages with full responsive design
- Three.js 3D particle system hero background
- GSAP scroll animations and parallax effects
- Portfolio filter system with 4 categories
- Blog layout with pagination and sidebar
- Contact forms with validation
- Custom cursor effects
- Comprehensive documentation

---

<div align="center">

**Made with ❤️ for [Developers]**

[Documentation](documentation/index.html)

© 2026 PixelPerfect. All rights reserved.

</div>
