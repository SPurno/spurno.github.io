# ShopVerse — Premium Ecommerce Experience

A modern, full-stack ecommerce website built with vanilla JavaScript and Turso (libSQL) database, designed for GitHub Pages deployment.

## ✨ Features

- **Modern UI/UX** — Glassmorphism design, dark/light themes, smooth animations, responsive layout
- **Complete Ecommerce** — Product catalog, shopping cart, wishlist, checkout, user authentication
- **Turso Database** — Serverless SQLite database via libSQL with real-time queries from the browser
- **SPA Architecture** — Hash-based routing for seamless GitHub Pages deployment
- **Dark & Light Themes** — System-aware theme with manual toggle
- **Product Management** — Categories, search, filtering, sorting, reviews
- **Order Processing** — Full checkout flow with order history
- **Responsive Design** — Mobile-first, works on all screen sizes

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure & SEO |
| CSS3 | Design system, glassmorphism, animations |
| JavaScript (ES6+) | SPA architecture, dynamic rendering |
| Turso / libSQL | Serverless SQLite database |
| Font Awesome | Icons |
| Google Fonts | Inter & Playfair Display |

## 📁 Project Structure

```
ecommerce-project/
├── index.html              # SPA entry point
├── 404.html                # GitHub Pages SPA fallback
├── css/
│   └── style.css           # Complete design system
├── js/
│   ├── app.js              # Application controller
│   ├── db.js               # Turso database wrapper
│   ├── router.js           # SPA hash router
│   ├── components.js       # Reusable UI components
│   └── pages/
│       ├── home.js         # Home page
│       ├── shop.js         # Shop / product listing
│       ├── product.js      # Product detail
│       ├── cart.js         # Shopping cart
│       ├── checkout.js     # Checkout flow
│       ├── auth.js         # Login & register
│       ├── profile.js      # User profile & orders
│       ├── wishlist.js     # Saved items
│       ├── contact.js      # Contact form
│       └── about.js        # About page
├── database/
│   ├── schema.sql          # Database schema
│   ├── seed.sql            # Sample data
│   └── init.mjs            # Init script
└── README.md
```

## 🚀 Quick Start

### 1. Clone & Open

```bash
git clone <your-repo-url>
cd ecommerce-project
```

### 2. Database Setup

The database is pre-configured with Turso. To initialize:

```bash
cd database
npm install
node init.mjs
```

### 3. Local Development

Since this is a static SPA, you can serve it with any HTTP server:

```bash
# Using Python
python -m http.server 3000

# Using Node.js
npx serve .
```

Then open `http://localhost:3000` in your browser.

### 4. Deploy to GitHub Pages

1. Push the repository to GitHub
2. Go to **Settings → Pages**
3. Select **Deploy from a branch** → `main` → `/ (root)`
4. Save — your site will be live at `https://<username>.github.io/<repo>/`

## 🎨 Design System

### Theme
- **Dark mode** (default) — Deep navy backgrounds with purple/blue accents
- **Light mode** — Clean white backgrounds with same accent colors
- CSS variables for easy customization

### Key Design Elements
- **Glassmorphism** — Frosted glass cards and navigation
- **Gradient accents** — Purple to magenta gradient as primary accent
- **Micro-interactions** — Smooth hover states, transitions, animations
- **Typography** — Playfair Display for headings, Inter for body text
- **Responsive** — Mobile-first with breakpoints at 768px and 480px

## 🔐 Demo Account

- **Email:** demo@example.com
- **Password:** password123

## 🗄️ API Reference

The application uses the Turso libSQL client directly from the browser. All database operations go through the `DB` object in `js/db.js`.

### Key Database Operations

```javascript
// Products
DB.getProducts({ category: 'electronics', sort: 'price-asc' })
DB.getProduct('wireless-headphones')
DB.getFeaturedProducts()

// Cart
DB.getCart()
DB.addToCart(productId, quantity)
DB.removeFromCart(itemId)

// Wishlist
DB.toggleWishlist(productId)
DB.getWishlistCount()

// Orders
DB.createOrder(orderData)
DB.getOrders()
```

## 📄 License

MIT — free for personal and commercial use.

---

Built with ❤️ using Vanilla JS & Turso
