ecommerce-project/
│
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── robots.txt
│   │   └── images/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   ├── fonts/
│   │   │   └── videos/
│   │   │
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Navbar/
│   │   │   ├── ProductCard/
│   │   │   ├── ProductGrid/
│   │   │   ├── SearchBar/
│   │   │   ├── CartItem/
│   │   │   ├── Checkout/
│   │   │   ├── Loader/
│   │   │   ├── Pagination/
│   │   │   └── Modal/
│   │   │
│   │   ├── layouts/
│   │   │   ├── MainLayout.js
│   │   │   └── AdminLayout.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Shop/
│   │   │   ├── Product/
│   │   │   ├── Category/
│   │   │   ├── Cart/
│   │   │   ├── Checkout/
│   │   │   ├── Login/
│   │   │   ├── Register/
│   │   │   ├── Profile/
│   │   │   ├── Wishlist/
│   │   │   ├── Orders/
│   │   │   ├── Contact/
│   │   │   ├── About/
│   │   │   └── NotFound/
│   │   │
│   │   ├── routes/
│   │   │   └── router.js
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── auth.js
│   │   │   ├── products.js
│   │   │   ├── orders.js
│   │   │   └── payment.js
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   ├── CartContext.js
│   │   │   └── ThemeContext.js
│   │   │
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   │
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   ├── jwt.js
│   │   ├── mail.js
│   │   └── cloud.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── categoryController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   ├── userController.js
│   │   └── reviewController.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── admin.js
│   │   ├── upload.js
│   │   ├── logger.js
│   │   └── errorHandler.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── Order.js
│   │   ├── Cart.js
│   │   ├── Review.js
│   │   ├── Coupon.js
│   │   └── Payment.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   ├── payments.js
│   │   └── reviews.js
│   │
│   ├── services/
│   │   ├── paymentService.js
│   │   ├── emailService.js
│   │   ├── storageService.js
│   │   └── notificationService.js
│   │
│   ├── utils/
│   │   ├── validator.js
│   │   ├── helpers.js
│   │   └── constants.js
│   │
│   ├── uploads/
│   │
│   ├── .env
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── README.md
│
├── database/
│   ├── schema.sql
│   ├── seed.sql
│   └── migrations/
│
├── docs/
│   ├── API.md
│   ├── Database.md
│   └── Deployment.md
│
├── docker/
│
├── .gitignore
├── docker-compose.yml
├── LICENSE
└── README.md