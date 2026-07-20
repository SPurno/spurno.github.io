/**
 * SPurno Animation Studio - V2 Video Gallery & Player
 * Handles video gallery rendering, category filters, fullscreen overlay, and hover preview
 */

(function () {
    'use strict';

    /* ======================================================
       VIDEO GALLERY DATA
    ====================================================== */
    const videos = [
        {
            id: 1,
            title: '3D Infographic Vector Art, Icons & Graphics',
            slug: '3d-infographic-vector-art-icons-and-graphics',
            src: 'videos/3d-infographic-vector-art-icons-and-graphics.mp4',
            thumbnail: 'images/3d-infographic-vector-art-icon.jpg',
            category: 'motion',
            categoryLabel: 'Motion',
            adobeStock: 'https://stock.adobe.com/search?k=3d+infographic+vector+art',
            duration: '0:27',
            description: 'Premium 3D infographic vector art, icons, and graphics with animated data visualizations.'
        },
        {
            id: 2,
            title: '3D Infographic Video Template',
            slug: '3d-infographic-video-template',
            src: 'videos/3d-infographic-video-template.mp4',
            thumbnail: 'images/3d-infographic-circle-animated-screen.jpg',
            category: 'infographic',
            categoryLabel: 'Infographic',
            adobeStock: 'https://stock.adobe.com/search?k=3d+infographic+video+template',
            duration: '0:30',
            description: 'Animated 3D infographic template with circle charts and data visualization elements.'
        },
        {
            id: 3,
            title: '3D Infographic Video Template 2',
            slug: '3d-infographic-video-template-2',
            src: 'videos/3d-infographic-video-template2.mp4',
            thumbnail: 'images/3d-infographic-hexagon-animated-screen.jpg',
            category: 'infographic',
            categoryLabel: 'Infographic',
            adobeStock: 'https://stock.adobe.com/search?k=3d+infographic+hexagon',
            duration: '0:25',
            description: 'Hexagonal 3D infographic video template with depth-enhanced charts and motion graphics.'
        },
        {
            id: 4,
            title: 'Animated Background Stock Video - Vol. 5',
            slug: 'animated-background-stock-video-premium-download-5',
            src: 'videos/animated-background-stock-video-for-premium-download-5.mp4',
            thumbnail: 'images/Animated-Background-Stock-Video-Footage-for-Premium-Download-5.jpg',
            category: 'motion',
            categoryLabel: 'Motion',
            adobeStock: 'https://stock.adobe.com/search?k=animated+background+stock+video',
            duration: '0:20',
            description: 'Premium animated background stock video footage with seamless motion loops.'
        },
        {
            id: 5,
            title: 'Animated Background Stock Video - Vol. 6',
            slug: 'animated-background-stock-video-premium-download-6',
            src: 'videos/animated-background-stock-video-for-premium-download-6.mp4',
            thumbnail: 'images/Animated-Background-Stock-Video-Footage-for-Premium-Download.jpg',
            category: 'motion',
            categoryLabel: 'Motion',
            adobeStock: 'https://stock.adobe.com/search?k=animated+background+loop',
            duration: '0:22',
            description: 'Dynamic animated background stock video with abstract motion graphics elements.'
        },
        {
            id: 6,
            title: 'Infographics Video Demo',
            slug: 'infographics-video-demo',
            src: 'videos/infographics-video-demo.mp4',
            thumbnail: 'images/infographics-spurno-animation-studio.jpg',
            category: 'infographic',
            categoryLabel: 'Infographic',
            adobeStock: 'https://stock.adobe.com/search?k=infographics+video+demo',
            duration: '0:35',
            description: 'Animated infographic video demo showcasing data visualization templates and slide designs.'
        },
        {
            id: 7,
            title: 'iPhone Mockup',
            slug: 'iphone-mockup',
            src: 'videos/iphone-mockup.mp4',
            thumbnail: 'images/iphone-mockup.jpg',
            category: 'mockup',
            categoryLabel: 'Mockup',
            adobeStock: 'https://stock.adobe.com/search?k=iphone+mockup+video',
            duration: '0:15',
            description: 'Realistic iPhone mockup video template with animated screen replacement and 3D depth.'
        },
        {
            id: 8,
            title: 'Laptop Product Promotion Template',
            slug: 'laptop-product-promotion-advertising-template',
            src: 'videos/Laptop-product-promotion-advertising-template.mp4',
            thumbnail: 'images/corporate-presentation-background.jpg',
            category: 'mockup',
            categoryLabel: 'Mockup',
            adobeStock: 'https://stock.adobe.com/search?k=laptop+product+promotion+template',
            duration: '0:30',
            description: 'Laptop product promotion and advertising template with animated screen showcase.'
        },
        {
            id: 9,
            title: 'Loading Bar Animation',
            slug: 'loading-bar-animation',
            src: 'videos/loading-bar-100-percent.mp4',
            thumbnail: 'images/loading-bar.jpg',
            category: 'motion',
            categoryLabel: 'Motion',
            adobeStock: 'https://stock.adobe.com/search?k=loading+bar+animation',
            duration: '0:10',
            description: 'Smooth loading bar animation with 100% progress indicator for UI motion design.'
        },
        {
            id: 10,
            title: 'News Background Animation',
            slug: 'news-background-animation',
            src: 'videos/news-background-animation.mp4',
            thumbnail: 'images/news-background-animation.jpg',
            category: 'typography',
            categoryLabel: 'Typography',
            adobeStock: 'https://stock.adobe.com/search?k=news+background+animation',
            duration: '0:20',
            description: 'Professional news background animation for broadcast and digital media production.'
        },
        {
            id: 11,
            title: 'News Background Animation Studio',
            slug: 'news-background-animation-studio',
            src: 'videos/news-background-animation-studio.mp4',
            thumbnail: 'images/news-background-world-globe-studio.png',
            category: 'typography',
            categoryLabel: 'Typography',
            adobeStock: 'https://stock.adobe.com/search?k=news+studio+background',
            duration: '0:18',
            description: 'News studio background animation with world globe and broadcast-quality motion graphics.'
        },
        {
            id: 12,
            title: 'Red Motion Animated Background',
            slug: 'red-motion-animated-background',
            src: 'videos/red-motion-animated-background.mp4',
            thumbnail: 'images/motion-red.jpg',
            category: 'motion',
            categoryLabel: 'Motion',
            adobeStock: 'https://stock.adobe.com/search?k=red+motion+animated+background',
            duration: '0:25',
            description: 'Vibrant red motion animated background with dynamic particle effects and abstract shapes.'
        },
        {
            id: 13,
            title: 'Sale Banner - Shop Now',
            slug: 'sale-banner-shop-now',
            src: 'videos/sale-banner-shop-now-typography.mp4',
            thumbnail: 'images/sale-banner-typography.jpg',
            category: 'typography',
            categoryLabel: 'Typography',
            adobeStock: 'https://stock.adobe.com/search?k=sale+banner+typography',
            duration: '0:12',
            description: 'Animated sale banner with bold typography and Shop Now call-to-action motion graphics.'
        },
        {
            id: 14,
            title: 'SPurno Animation Studio Promo',
            slug: 'spurno-animation-studio-promo-video-animation',
            src: 'videos/SPurno-Animation-Studio-Promo-Video-Animation.mp4',
            thumbnail: 'images/spurno-promo-new-video-animation.jpg',
            category: 'motion',
            categoryLabel: 'Motion',
            adobeStock: 'https://stock.adobe.com/search?k=animation+studio+promo',
            duration: '0:30',
            description: 'SPurno Animation Studio promotional video showcasing motion graphics and stock footage.'
        },
        {
            id: 15,
            title: 'Typography Animation',
            slug: 'typography-animation',
            src: 'videos/typography-animation.mp4',
            thumbnail: 'images/typography-animation.jpg',
            category: 'typography',
            categoryLabel: 'Typography',
            adobeStock: 'https://stock.adobe.com/search?k=typography+animation',
            duration: '0:22',
            description: 'Kinetic typography animation with dynamic text reveals and animated letterforms.'
        }
    ];

    const categoryLabels = {
        all: 'All',
        motion: 'Motion',
        infographic: 'Infographic',
        mockup: 'Mockup',
        typography: 'Typography'
    };


    /* ======================================================
       RENDER VIDEO CARDS
    ====================================================== */
    function renderVideoCards(filteredVideos) {
        const gallery = document.getElementById('videoGallery');
        if (!gallery) return;

        gallery.innerHTML = '';

        filteredVideos.forEach(video => {
            const card = document.createElement('div');
            card.className = 'video-card reveal-up';
            card.setAttribute('data-category', video.category);

            card.innerHTML = `
                <div class="video-card-inner">
                    <div class="video-card-thumb">
                        <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
                        <div class="video-card-overlay">
                            <button class="video-play-btn" aria-label="Play ${video.title}" data-video-id="${video.id}">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <circle cx="24" cy="24" r="23" stroke="white" stroke-width="2" opacity="0.9"/>
                                    <polygon points="20,15 36,24 20,33" fill="white"/>
                                </svg>
                            </button>
                            <span class="video-duration">${video.duration}</span>
                        </div>
                        <div class="video-hover-preview" data-src="${video.src}">
                            <video muted loop preload="none" playsinline></video>
                        </div>
                    </div>
                    <div class="video-card-info">
                        <span class="video-card-category">${video.categoryLabel}</span>
                        <h3 class="video-card-title">${video.title}</h3>
                        <p class="video-card-desc">${video.description}</p>
                        <div class="video-card-actions">
                            <a href="watch/${video.slug}.html" class="video-card-link">Watch Now</a>
                            <a href="${video.adobeStock}" class="video-card-stock-link" target="_blank" rel="noopener noreferrer">Adobe Stock</a>
                        </div>
                    </div>
                </div>
            `;

            gallery.appendChild(card);
        });

        /* Re-attach reveal observers for new cards */
        initRevealObserver();
    }


    /* ======================================================
       CATEGORY FILTER BUTTONS
    ====================================================== */
    function initCategoryFilters() {
        const filterContainer = document.getElementById('galleryFilter');
        if (!filterContainer) return;

        const buttons = filterContainer.querySelectorAll('button');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const cat = btn.getAttribute('data-filter');
                const filtered = cat === 'all'
                    ? videos
                    : videos.filter(v => v.category === cat);

                renderVideoCards(filtered);
            });
        });
    }


    /* ======================================================
       FULLSCREEN VIDEO OVERLAY
    ====================================================== */
    function createVideoOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'video-overlay';
        overlay.id = 'video-overlay';

        overlay.innerHTML = `
            <div class="video-overlay-content">
                <div class="video-overlay-header">
                    <h3 class="video-overlay-title"></h3>
                    <button class="video-overlay-close" aria-label="Close video">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="video-overlay-player">
                    <video id="overlay-video" controls preload="metadata" playsinline></video>
                </div>
                <div class="video-overlay-controls">
                    <div class="video-overlay-info">
                        <span class="video-overlay-category"></span>
                        <span class="video-overlay-time"></span>
                    </div>
                    <div class="video-overlay-actions">
                        <a href="#" class="video-overlay-watch-link" target="_blank" rel="noopener">Watch Page</a>
                        <a href="#" class="video-overlay-stock-link" target="_blank" rel="noopener noreferrer">Adobe Stock</a>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        const closeBtn = overlay.querySelector('.video-overlay-close');
        const videoEl = overlay.querySelector('#overlay-video');

        closeBtn.addEventListener('click', () => {
            closeVideoOverlay();
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeVideoOverlay();
            }
        });

        videoEl.addEventListener('timeupdate', () => {
            const timeDisplay = overlay.querySelector('.video-overlay-time');
            if (timeDisplay && videoEl.duration) {
                const current = formatTime(videoEl.currentTime);
                const total = formatTime(videoEl.duration);
                timeDisplay.textContent = `${current} / ${total}`;
            }
        });
    }

    function openVideoOverlay(videoId) {
        const video = videos.find(v => v.id === videoId);
        if (!video) return;

        const overlay = document.getElementById('video-overlay');
        const videoEl = overlay.querySelector('#overlay-video');
        const titleEl = overlay.querySelector('.video-overlay-title');
        const categoryEl = overlay.querySelector('.video-overlay-category');
        const watchLink = overlay.querySelector('.video-overlay-watch-link');
        const stockLink = overlay.querySelector('.video-overlay-stock-link');

        titleEl.textContent = video.title;
        categoryEl.textContent = video.categoryLabel;
        videoEl.src = video.src;
        watchLink.href = `watch/${video.slug}.html`;
        stockLink.href = video.adobeStock;

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        videoEl.play().catch(() => {});
    }

    function closeVideoOverlay() {
        const overlay = document.getElementById('video-overlay');
        const videoEl = overlay.querySelector('#overlay-video');

        videoEl.pause();
        videoEl.src = '';
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }


    /* ======================================================
       HOVER PREVIEW FUNCTIONALITY
    ====================================================== */
    function initHoverPreview() {
        const gallery = document.getElementById('videoGallery');
        if (!gallery) return;

        let hoverTimeout = null;

        gallery.addEventListener('mouseenter', (e) => {
            const previewContainer = e.target.closest('.video-hover-preview');
            if (!previewContainer) return;

            clearTimeout(hoverTimeout);

            hoverTimeout = setTimeout(() => {
                const videoEl = previewContainer.querySelector('video');
                const src = previewContainer.getAttribute('data-src');

                if (videoEl && src && !videoEl.src) {
                    videoEl.src = src;
                    videoEl.load();
                }

                if (videoEl) {
                    videoEl.play().catch(() => {});
                    previewContainer.classList.add('playing');
                }
            }, 400);
        }, true);

        gallery.addEventListener('mouseleave', (e) => {
            const previewContainer = e.target.closest('.video-hover-preview');
            if (!previewContainer) return;

            clearTimeout(hoverTimeout);

            const videoEl = previewContainer.querySelector('video');
            if (videoEl) {
                videoEl.pause();
                videoEl.currentTime = 0;
                previewContainer.classList.remove('playing');
            }
        }, true);
    }


    /* ======================================================
       REVEAL OBSERVER FOR DYNAMICALLY ADDED CARDS
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
       PLAY BUTTON CLICK HANDLERS
    ====================================================== */
    function initPlayButtons() {
        document.addEventListener('click', (e) => {
            const playBtn = e.target.closest('.video-play-btn');
            if (playBtn) {
                const videoId = parseInt(playBtn.getAttribute('data-video-id'), 10);
                openVideoOverlay(videoId);
            }
        });
    }


    /* ======================================================
       KEYBOARD SHORTCUTS
    ====================================================== */
    function initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeVideoOverlay();
            }

            const overlay = document.getElementById('video-overlay');
            if (overlay && overlay.classList.contains('active')) {
                const videoEl = overlay.querySelector('#overlay-video');
                if (e.key === ' ' || e.key === 'k') {
                    e.preventDefault();
                    if (videoEl.paused) {
                        videoEl.play();
                    } else {
                        videoEl.pause();
                    }
                }
                if (e.key === 'ArrowLeft') {
                    videoEl.currentTime = Math.max(0, videoEl.currentTime - 5);
                }
                if (e.key === 'ArrowRight') {
                    videoEl.currentTime = Math.min(videoEl.duration, videoEl.currentTime + 5);
                }
                if (e.key === 'f') {
                    if (videoEl.requestFullscreen) {
                        videoEl.requestFullscreen();
                    }
                }
            }
        });
    }


    /* ======================================================
       INITIALIZATION
    ====================================================== */
    function init() {
        createVideoOverlay();
        initCategoryFilters();
        renderVideoCards(videos);
        initHoverPreview();
        initPlayButtons();
        initKeyboardShortcuts();
    }

    /* Run when DOM is ready */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
