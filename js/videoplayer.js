(function () {
    'use strict';

    const PAGE_SIZE = 6;
    let currentPage = 1;
    let currentFilter = 'all';
    let currentFilteredProducts = window.products || [];

    const pixabanimationBase = 'https://pixabanimation.github.io';

    /* ======================================================
       CATEGORY LABELS
    ====================================================== */
    function getCategories(products) {
        const cats = new Set();
        products.forEach(p => cats.add(p.category_name));
        return ['all', ...Array.from(cats)];
    }

    function normalizeCat(cat) {
        return cat.toLowerCase().replace(/\s+/g, '-');
    }

    /* ======================================================
       RENDER PRODUCT CARDS
    ====================================================== */
    function renderProductCards(filteredProducts, page) {
        const gallery = document.getElementById('videoGallery');
        if (!gallery) return;

        const pageToUse = page || currentPage;
        const end = pageToUse * PAGE_SIZE;
        const visibleProducts = filteredProducts.slice(0, end);

        gallery.innerHTML = '';

        visibleProducts.forEach(product => {
            const hasDiscount = product.compare_price && product.compare_price > product.price;
            const discountPercent = hasDiscount
                ? Math.round((1 - product.price / product.compare_price) * 100)
                : 0;

            const card = document.createElement('div');
            card.className = 'shop-product-card reveal-up';
            card.setAttribute('data-category', normalizeCat(product.category_name));

            const productUrl = `${pixabanimationBase}/#/product/${product.slug}`;
            const starsFull = Math.round(product.rating || 0);
            const starsEmpty = 5 - starsFull;

            card.innerHTML = `
                <div class="shop-product-card-inner">
                    <a href="${productUrl}" target="_blank" rel="noopener" class="shop-product-card-image">
                        <img src="${product.image_url}" alt="${product.name}" loading="lazy">
                        <div class="shop-product-card-badges">
                            ${product.featured ? '<span class="shop-product-badge badge-featured">Featured</span>' : ''}
                            ${hasDiscount ? `<span class="shop-product-badge badge-sale">-${discountPercent}%</span>` : ''}
                        </div>
                    </a>
                    <div class="shop-product-card-body">
                        <span class="shop-product-card-category">${product.category_name}</span>
                        <h3 class="shop-product-card-title">${product.name}</h3>
                        <div class="shop-product-card-rating">
                            <span class="stars">${'★'.repeat(starsFull)}${'☆'.repeat(starsEmpty)}</span>
                            <span class="rating-count">(${product.reviews_count})</span>
                        </div>
                        <p class="shop-product-card-desc">${product.description}</p>
                        <div class="shop-product-card-price">
                            <span class="current-price">$${product.price.toFixed(2)}</span>
                            ${hasDiscount ? `<span class="compare-price">$${product.compare_price.toFixed(2)}</span>` : ''}
                        </div>
                        <a href="${productUrl}" target="_blank" rel="noopener" class="shop-product-card-btn">
                            View on PixabAnimation <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            `;

            gallery.appendChild(card);
        });

        initRevealObserver();
        updateLoadMoreButton(filteredProducts, pageToUse);
    }

    /* ======================================================
       CATEGORY FILTER BUTTONS
    ====================================================== */
    function initCategoryFilters() {
        const filterContainer = document.getElementById('galleryFilter');
        if (!filterContainer) return;

        const products = window.products || [];
        const categories = getCategories(products);

        filterContainer.innerHTML = categories.map(cat => {
            const label = cat === 'all' ? 'All' : cat;
            const catSlug = normalizeCat(cat);
            return `<button class="${cat === 'all' ? 'active' : ''}" data-filter="${catSlug}">${label}</button>`;
        }).join('');

        const buttons = filterContainer.querySelectorAll('button');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                currentFilter = btn.getAttribute('data-filter');
                currentPage = 1;

                if (currentFilter === 'all') {
                    currentFilteredProducts = products;
                } else {
                    currentFilteredProducts = products.filter(p =>
                        normalizeCat(p.category_name) === currentFilter
                    );
                }

                renderProductCards(currentFilteredProducts, currentPage);
            });
        });
    }

    /* ======================================================
       LOAD MORE BUTTON
    ====================================================== */
    function createLoadMoreButton() {
        const container = document.getElementById('loadMoreContainer');
        if (!container) return;

        container.innerHTML = '<button id="loadMoreBtn" class="load-more-btn"><i class="fas fa-gear"></i> Load More</button>';

        document.getElementById('loadMoreBtn').addEventListener('click', () => {
            const btn = document.getElementById('loadMoreBtn');
            if (btn.classList.contains('loading')) return;
            btn.classList.add('loading');
            currentPage++;
            renderProductCards(currentFilteredProducts, currentPage);
            requestAnimationFrame(() => btn.classList.remove('loading'));
        });
    }

    function updateLoadMoreButton(filteredProducts, page) {
        const container = document.getElementById('loadMoreContainer');
        if (!container) return;

        const end = page * PAGE_SIZE;
        const btn = document.getElementById('loadMoreBtn');
        if (end >= filteredProducts.length) {
            if (btn) btn.style.display = 'none';
        } else {
            if (btn) btn.style.display = 'inline-flex';
        }
    }

    /* ======================================================
       REVEAL OBSERVER
    ====================================================== */
    function initRevealObserver() {
        const elements = document.querySelectorAll('.reveal-up:not(.revealed)');
        if (!('IntersectionObserver' in window) || !elements.length) {
            elements.forEach(el => el.classList.add('revealed'));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        elements.forEach(el => observer.observe(el));
    }

    /* ======================================================
       INITIALIZATION
    ====================================================== */
    async function init() {
        if ((!window.products || window.products.length === 0) && window.productsReady) {
            try { await window.productsReady; } catch (_) {}
        }
        const products = window.products || [];
        currentFilteredProducts = products;
        currentPage = 1;
        initCategoryFilters();
        createLoadMoreButton();
        renderProductCards(currentFilteredProducts, currentPage);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
