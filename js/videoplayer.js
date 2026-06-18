        // ===== VIDEO GALLERY =====
        (function() {
            var videos = [
                { id: 'spurno-promo', title: 'SPurno Animation Studio Promo', cat: 'motion', file: 'SPurno-Animation-Studio-Promo-Video-Animation.mp4', thumb: 'images/spurno-promo-new-video-animation.jpg', shop: 'https://stock.adobe.com/contributor/211977281/SPurnoAnimation', watch: 'watch/spurno-animation-studio-promo-video-animation.html' },
                { id: 'bg-5', title: 'Animated Background Stock Video 5', cat: 'motion', file: 'red-motion-animated-background.mp4', thumb: 'images/motion-red.jpg', shop: 'https://stock.adobe.com/contributor/211977281/SPurnoAnimation', watch: 'watch/animated-background-stock-video-premium-download-5.html' },
                { id: 'bg-6', title: 'Animated Background Stock Video 6', cat: 'motion', file: 'animated-background-stock-video-for-premium-download-6.mp4', thumb: 'images/Animated-Background-Stock-Video-Footage-for-Premium-Download-7.jpg', shop: 'https://stock.adobe.com/contributor/211977281/SPurnoAnimation', watch: 'watch/animated-background-stock-video-premium-download-6.html' },
                { id: '3d-infographic-1', title: '3D Infographic Video Template', cat: 'infographic', file: '3d-infographic-video-template.mp4', thumb: 'images/infographics-template-thumb.jpg', shop: 'https://stock.adobe.com/contributor/211977281/SPurnoAnimation', watch: 'watch/3d-infographic-video-template.html' },
                { id: '3d-infographic-2', title: '3D Infographic Video Template 2', cat: 'infographic', file: '3d-infographic-video-template2.mp4', thumb: 'images/infographics-template-thumb2.jpg', shop: 'https://stock.adobe.com/contributor/211977281/SPurnoAnimation', watch: 'watch/3d-infographic-video-template-2.html' },
                { id: 'infographic-demo', title: 'Infographics Video Demo', cat: 'infographic', file: 'infographics-video-demo.mp4', thumb: 'images/3d-infographic-hexagon-animated-screen.jpg', shop: 'https://stock.adobe.com/contributor/211977281/SPurnoAnimation', watch: 'watch/infographics-video-demo.html' },
                { id: 'laptop-mockup', title: 'Laptop Product Promo Template', cat: 'mockup', file: 'Laptop-product-promotion-advertising-template.mp4', thumb: 'images/device-mockup.jpg', shop: 'https://stock.adobe.com/contributor/211977281/SPurnoAnimation', watch: 'watch/laptop-product-promotion-advertising-template.html' },
                { id: 'iphone-mockup', title: 'iPhone Mockup Animation', cat: 'mockup', file: 'iphone-mockup.mp4', thumb: 'images/iphone-mockup.jpg', shop: 'https://stock.adobe.com/contributor/211977281/SPurnoAnimation', watch: 'index.html' },
                { id: 'loading-bar', title: 'Loading Bar 100% Animation', cat: 'motion', file: 'loading-bar-100-percent.mp4', thumb: 'images/loading-bar.jpg', shop: 'https://stock.adobe.com/contributor/211977281/SPurnoAnimation', watch: 'blog/loading-bar-animation.html' },
                { id: 'news-bg', title: 'News Background Animation', cat: 'motion', file: 'news-background-animation.mp4', thumb: 'images/news-background-animation.jpg', shop: 'https://stock.adobe.com/contributor/211977281/SPurnoAnimation', watch: 'watch/news-background-animation.html' },
                { id: 'news-bg-studio', title: 'News Background Animation Studio', cat: 'motion', file: 'news-background-animation-studio.mp4', thumb: 'images/news-background-world-globe-studio.png', shop: 'https://stock.adobe.com/contributor/211977281/SPurnoAnimation', watch: 'blog/news-background-animation.html' },
                { id: 'typography', title: 'Typography Animation Video', cat: 'typography', file: 'typography-animation.mp4', thumb: 'images/typography-animation.jpg', shop: 'https://stock.adobe.com/contributor/211977281/SPurnoAnimation', watch: 'watch/typography-animation.html' }
            ];

            var gallery = document.getElementById('videoGallery');
            if (!gallery) return;

            function renderGallery(filter) {
                var filtered = filter === 'all' ? videos : videos.filter(function(v) { return v.cat === filter; });
                var html = '';
                for (var i = 0; i < filtered.length; i++) {
                    var v = filtered[i];
                    html += '<div class="video-card" data-id="' + v.id + '" data-cat="' + v.cat + '">';
                    html += '  <div class="video-watermark"><img src="images/spurno-logo.png" alt="SPurno" loading="lazy"><span>SPurno</span></div>';
                    html += '  <video preload="metadata" muted loop playsinline poster="' + v.thumb + '"><source src="videos/' + v.file + '" type="video/mp4"></video>';
                    html += '  <div class="video-card-overlay"><div class="video-title">' + v.title + '</div><div class="video-subtitle">' + v.cat.charAt(0).toUpperCase() + v.cat.slice(1) + ' Graphics</div></div>';
                    html += '  <div class="video-card-actions">';
                    html += '    <button class="preview-btn" onclick="event.stopPropagation(); togglePlay(\'' + v.id + '\')" title="Preview">▶</button>';
                    html += '    <a href="' + v.shop + '" target="_blank" class="shop-btn" onclick="event.stopPropagation();">🛒 Shop Now</a>';
                    html += '  </div>';
                    html += '  <div class="video-card-controls">';
                    html += '    <button class="ctrl-play" onclick="event.stopPropagation(); togglePlay(\'' + v.id + '\')">⏸</button>';
                    html += '    <div class="ctrl-vol"><span class="ctrl-vol-icon">🔊</span><input type="range" min="0" max="1" step="0.05" value="0.5" oninput="event.stopPropagation(); setVolume(\'' + v.id + '\', this.value)" ontouchstart="event.stopPropagation()"></div>';
                    html += '    <span class="ctrl-time">0:00</span>';
                    html += '    <button class="ctrl-fullscreen" onclick="event.stopPropagation(); openFullscreen(\'' + v.id + '\')" title="Fullscreen">⛶</button>';
                    html += '  </div>';
                    html += '</div>';
                }
                gallery.innerHTML = html;

                var cards = gallery.querySelectorAll('.video-card');
                for (var j = 0; j < cards.length; j++) {
                    (function(card) {
                        card.addEventListener('click', function(e) {
                            if (e.target.closest('.video-card-actions') || e.target.closest('.video-card-controls')) return;
                            var id = card.getAttribute('data-id');
                            togglePlay(id);
                        });
                    })(cards[j]);
                }
            }

            window.togglePlay = function(id) {
                var card = document.querySelector('.video-card[data-id="' + id + '"]');
                if (!card) return;
                var video = card.querySelector('video');
                if (!video) return;

                if (card.classList.contains('playing')) {
                    video.pause();
                    card.classList.remove('playing');
                } else {
                    var allCards = document.querySelectorAll('.video-card.playing');
                    for (var i = 0; i < allCards.length; i++) {
                        var v = allCards[i].querySelector('video');
                        if (v) { v.pause(); v.currentTime = 0; }
                        allCards[i].classList.remove('playing');
                    }
                    video.muted = false;
                    video.play().catch(function() {});
                    card.classList.add('playing');

                    video.addEventListener('timeupdate', function updateTime() {
                        var ctrlTime = card.querySelector('.ctrl-time');
                        if (ctrlTime) {
                            var min = Math.floor(video.currentTime / 60);
                            var sec = Math.floor(video.currentTime % 60);
                            ctrlTime.textContent = min + ':' + (sec < 10 ? '0' : '') + sec;
                        }
                    });

                    video.addEventListener('ended', function() {
                        card.classList.remove('playing');
                    }, { once: true });
                }
            };

            window.setVolume = function(id, vol) {
                var card = document.querySelector('.video-card[data-id="' + id + '"]');
                if (!card) return;
                var video = card.querySelector('video');
                if (video) video.volume = parseFloat(vol);
            };

            var filterBtns = document.querySelectorAll('#galleryFilter button');
            for (var k = 0; k < filterBtns.length; k++) {
                (function(btn) {
                    btn.addEventListener('click', function() {
                        var playing = document.querySelectorAll('.video-card.playing');
                        for (var i = 0; i < playing.length; i++) {
                            var v = playing[i].querySelector('video');
                            if (v) { v.pause(); v.currentTime = 0; }
                            playing[i].classList.remove('playing');
                        }
                        for (var j = 0; j < filterBtns.length; j++) filterBtns[j].classList.remove('active');
                        btn.classList.add('active');
                        renderGallery(btn.getAttribute('data-filter'));
                    });
                })(filterBtns[k]);
            }

            renderGallery('all');
        })();

        // ===== FULLSCREEN MODAL =====
        var fsOverlay = document.getElementById('fsOverlay');
        var fsVideo = document.getElementById('fsVideo');
        var fsPlay = document.getElementById('fsPlay');
        var fsClose = document.getElementById('fsClose');
        var fsVolume = document.getElementById('fsVolume');
        var fsTime = document.getElementById('fsTime');
        var fsTitle = document.getElementById('fsTitle');
        var fsShop = document.getElementById('fsShop');

        var fsTimeHandler = null;
        var fsEndedHandler = null;

        window.openFullscreen = function(id) {
            var card = document.querySelector('.video-card[data-id="' + id + '"]');
            if (!card) return;

            var srcEl = card.querySelector('video source');
            var titleEl = card.querySelector('.video-title');
            var shopEl = card.querySelector('.shop-btn');
            if (!srcEl || !titleEl || !shopEl) return;

            var src = srcEl.getAttribute('src');
            var title = titleEl.textContent;
            var shop = shopEl.getAttribute('href');

            var playing = document.querySelectorAll('.video-card.playing');
            for (var i = 0; i < playing.length; i++) {
                var pv = playing[i].querySelector('video');
                if (pv) { pv.pause(); pv.currentTime = 0; }
                playing[i].classList.remove('playing');
            }

            if (fsTimeHandler) { fsVideo.removeEventListener('timeupdate', fsTimeHandler); }
            if (fsEndedHandler) { fsVideo.removeEventListener('ended', fsEndedHandler); }

            fsVideo.src = src;
            fsTitle.textContent = title;
            fsShop.href = shop;
            fsVideo.volume = parseFloat(fsVolume.value);
            fsVideo.play().catch(function() {});
            fsPlay.textContent = '⏸';
            fsTime.textContent = '0:00';

            fsOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';

            fsTimeHandler = function() {
                var min = Math.floor(fsVideo.currentTime / 60);
                var sec = Math.floor(fsVideo.currentTime % 60);
                fsTime.textContent = min + ':' + (sec < 10 ? '0' : '') + sec;
            };
            fsVideo.addEventListener('timeupdate', fsTimeHandler);

            fsEndedHandler = function() {
                fsPlay.textContent = '▶';
            };
            fsVideo.addEventListener('ended', fsEndedHandler);
        };

        function closeFullscreen() {
            fsVideo.pause();
            fsVideo.src = '';
            fsOverlay.classList.remove('active');
            document.body.style.overflow = '';
            if (fsTimeHandler) { fsVideo.removeEventListener('timeupdate', fsTimeHandler); fsTimeHandler = null; }
            if (fsEndedHandler) { fsVideo.removeEventListener('ended', fsEndedHandler); fsEndedHandler = null; }
        }

        fsPlay.addEventListener('click', function() {
            if (fsVideo.paused) {
                fsVideo.play();
                fsPlay.textContent = '⏸';
            } else {
                fsVideo.pause();
                fsPlay.textContent = '▶';
            }
        });

        fsClose.addEventListener('click', closeFullscreen);
        fsOverlay.addEventListener('click', function(e) {
            if (e.target === fsOverlay) closeFullscreen();
        });

        fsVolume.addEventListener('input', function() {
            fsVideo.volume = parseFloat(this.value);
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && fsOverlay.classList.contains('active')) {
                closeFullscreen();
            }
        });