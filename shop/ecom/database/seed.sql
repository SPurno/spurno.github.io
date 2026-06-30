-- Seed Data for Ecommerce Database

-- Categories
INSERT OR IGNORE INTO categories (id, name, slug, description, image_url) VALUES
(1, 'Electronics', 'electronics', 'Latest gadgets and electronic devices', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80'),
(2, 'Fashion', 'fashion', 'Trendy clothing and accessories', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80'),
(3, 'Home & Living', 'home-living', 'Beautiful home decor and furniture', 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&q=80'),
(4, 'Sports & Outdoors', 'sports-outdoors', 'Equipment for active lifestyle', 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80'),
(5, 'Books & Media', 'books-media', 'Books, eBooks and media', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80'),
(6, 'Beauty & Health', 'beauty-health', 'Skincare, makeup and wellness', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80'),
(7, 'Videos', 'videos', 'Premium video clips and digital content', 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&q=80');

-- Products
INSERT OR IGNORE INTO products (id, name, slug, description, price, compare_price, image_url, images, category_id, stock, rating, reviews_count, featured) VALUES
(1, 'Wireless Noise-Cancelling Headphones', 'wireless-headphones', 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality. Features memory foam ear cushions and a sleek foldable design.', 299.99, 349.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80","https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80"]', 1, 50, 4.8, 127, 1),

(2, 'Smart Watch Pro Max', 'smart-watch-pro', 'Advanced smartwatch with health monitoring, GPS tracking, 7-day battery life, and a stunning always-on AMOLED display. Water resistant to 50m.', 449.99, 499.99, 'https://images.unsplash.com/photo-1546868871-af0de0ae72b7?w=600&q=80', '["https://images.unsplash.com/photo-1546868871-af0de0ae72b7?w=600&q=80","https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80"]', 1, 35, 4.7, 89, 1),

(3, 'Premium Leather Jacket', 'leather-jacket', 'Handcrafted genuine leather jacket with a modern slim fit design. Features smooth satin lining, YKK zippers, and a timeless style that never goes out of fashion.', 249.99, 299.99, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80', '["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80","https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&q=80"]', 2, 25, 4.6, 64, 1),

(4, 'Minimalist Desk Lamp', 'desk-lamp', 'Elegant LED desk lamp with adjustable color temperature, wireless charging base, and touch controls. Perfect for modern home offices and workspaces.', 89.99, 119.99, 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6bc?w=600&q=80', '["https://images.unsplash.com/photo-1507473885765-e6ed057ab6bc?w=600&q=80","https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80"]', 3, 80, 4.5, 42, 1),

(5, 'Running Shoes Ultra', 'running-shoes', 'Lightweight performance running shoes with responsive cushioning, breathable mesh upper, and carbon fiber plate for maximum energy return.', 179.99, 219.99, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', '["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80","https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80"]', 4, 60, 4.9, 203, 1),

(6, 'Bluetooth Speaker', 'bluetooth-speaker', 'Portable waterproof speaker with 360° sound, 20-hour battery, and built-in microphone. Perfect for outdoor adventures and poolside parties.', 129.99, 159.99, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80', '["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80","https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&q=80"]', 1, 100, 4.4, 156, 0),

(7, 'Organic Skincare Set', 'skincare-set', 'Luxurious organic skincare collection with vitamin C serum, hyaluronic acid moisturizer, and retinol night cream. 100% natural ingredients.', 79.99, 99.99, 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80', '["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80","https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?w=600&q=80"]', 6, 45, 4.3, 38, 0),

(8, 'Cotton Casual Dress', 'casual-dress', 'Comfortable sustainable cotton dress with an elegant A-line cut. Features a subtle floral pattern, side pockets, and breathable fabric for all-day wear.', 69.99, 89.99, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80', '["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80","https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80"]', 2, 70, 4.5, 91, 0),

(9, 'Ergonomic Office Chair', 'office-chair', 'Premium ergonomic mesh chair with lumbar support, adjustable armrests, and breathable headrest. Designed for long hours of comfortable work.', 599.99, 749.99, 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80', '["https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80","https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&q=80"]', 3, 15, 4.7, 73, 1),

(10, 'Yoga Mat Premium', 'yoga-mat', 'Extra thick eco-friendly yoga mat with alignment lines, non-slip surface, and carrying strap. Perfect for yoga, pilates, and stretching routines.', 49.99, 64.99, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80', '["https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80","https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&q=80"]', 4, 120, 4.6, 55, 0),

(11, 'Bestselling Fiction Novel', 'fiction-novel', 'The gripping new thriller that everyone is talking about. A masterfully crafted story of mystery, suspense, and unexpected twists that will keep you turning pages all night.', 24.99, 29.99, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80', '["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80","https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80"]', 5, 200, 4.8, 312, 1),

(12, 'Wireless Earbuds', 'wireless-earbuds', 'Compact true wireless earbuds with active noise cancellation, IPX5 waterproof rating, and 8-hour battery life. Comes with a wireless charging case.', 179.99, 199.99, 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&q=80', '["https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&q=80","https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&q=80"]', 1, 90, 4.6, 178, 0),

-- Video Products
(13, 'Cinematic Nature Reel — 4K', 'cinematic-nature-reel', 'A stunning collection of cinematic nature footage captured in 4K resolution. Features breathtaking landscapes, wildlife encounters, and atmospheric time-lapses from around the world. Perfect for video editing, content creation, or personal enjoyment.', 29.99, 49.99, 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&q=80', '["https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&q=80","https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80"]', 7, 999, 4.9, 45, 1, 'video', 'https://example.com/videos/nature-reel-4k.mp4', 'https://example.com/previews/nature-reel-preview.mp4', 'Watch a 30-second preview of this stunning 4K nature collection. Full reel runs 12 minutes with 20 unique scenes.', 2.4, 720),

(14, 'Urban Time-lapse Compilation', 'urban-timelapse', 'Mesmerizing time-lapse footage of cityscapes from New York, Tokyo, London, and Dubai. Captured over 6 months in stunning 4K HDR. Includes day-to-night transitions, traffic flows, and weather phenomena.', 24.99, 39.99, 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&q=80', '["https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&q=80","https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80"]', 7, 999, 4.7, 32, 0, 'video', 'https://example.com/videos/urban-timelapse.mp4', 'https://example.com/previews/urban-timelapse-preview.mp4', 'Preview this 8-minute urban time-lapse journey across 4 major world cities in breathtaking 4K HDR.', 1.8, 480);

-- Demo user (password: "password123" hashed)
INSERT OR IGNORE INTO users (id, name, email, password, is_admin) VALUES
(1, 'Demo User', 'demo@example.com', '$2b$10$8K1p/a0dL1LXMIgoEDFrwOfMQkfAjkMBcGmFOkQfWXqF0YqYLzqMy', 0);

-- Admin user (password: "admin123" hashed)
INSERT OR IGNORE INTO users (id, name, email, password, is_admin) VALUES
(2, 'Admin', 'admin@shopverse.com', '$2b$10$8K1p/a0dL1LXMIgoEDFrwOfMQkfAjkMBcGmFOkQfWXqF0YqYLzqMy', 1);

-- Sample reviews
INSERT OR IGNORE INTO reviews (id, product_id, author_name, rating, comment) VALUES
(1, 1, 'Alex M.', 5, 'Best headphones I have ever owned! The noise cancellation is incredible and the sound quality is top-notch.'),
(2, 1, 'Sarah K.', 4, 'Great headphones, very comfortable for long listening sessions. Battery life is amazing.'),
(3, 2, 'James R.', 5, 'This watch has completely changed my fitness routine. The health tracking features are incredibly accurate.'),
(4, 5, 'Emma L.', 5, 'These shoes are a game changer for my morning runs. So light and responsive!'),
(5, 9, 'Michael P.', 4, 'Very comfortable chair, my back pain has significantly reduced since switching to this.');

-- Sample coupon
INSERT OR IGNORE INTO coupons (id, code, discount_percent, min_purchase, expires_at) VALUES
(1, 'WELCOME10', 10, 50, '2027-12-31 23:59:59'),
(2, 'SAVE20', 20, 100, '2027-12-31 23:59:59');
