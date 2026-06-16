/* ============================================================
   PixelPerfect - Main JavaScript
   Version: 1.0.0
   ============================================================ */

(function($) {
    'use strict';

    /* ===== PRELOADER (outside DOM ready for reliable load event) ===== */
    $(window).on('load', function() {
        setTimeout(function() {
            $('#preloader').addClass('hidden');
        }, 800);
    });

    /* ===== DOM READY ===== */
    $(document).ready(function() {

        // ===== INIT AOS =====
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80
        });

        // ===== TYPED.JS =====
        if (document.querySelector('.typed-text')) {
            new Typed('.typed-text', {
                strings: [
                    'Creative Designer',
                    'Full-Stack Developer',
                    '3D Web Artist',
                    'UI/UX Specialist',
                    'Digital Problem Solver'
                ],
                typeSpeed: 60,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                showCursor: false
            });
        }

        // ===== NAVBAR SCROLL EFFECT =====
        const navbar = document.getElementById('mainNav');
        let lastScroll = 0;

        $(window).on('scroll', function() {
            const currentScroll = $(this).scrollTop();

            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Navbar hide/show on scroll
            if (currentScroll > lastScroll && currentScroll > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        });

        // ===== BACK TO TOP =====
        const backToTop = document.getElementById('backToTop');

        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        $(backToTop).on('click', function() {
            $('html, body').animate({ scrollTop: 0 }, 600);
        });

        // ===== CUSTOM CURSOR =====
        const cursorDot = document.getElementById('cursorDot');
        const cursorOutline = document.getElementById('cursorOutline');

        if (cursorDot && cursorOutline && window.innerWidth > 991) {
            $(document).on('mousemove', function(e) {
                const posX = e.clientX;
                const posY = e.clientY;

                cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;

                // Outline follows with slight delay
                setTimeout(() => {
                    cursorOutline.style.transform = `translate(${posX}px, ${posY}px)`;
                }, 80);
            });

            // Hover effect on interactive elements
            $('a, button, .service-card, .portfolio-card, .blog-card, .swiper-button-prev, .swiper-button-next').on('mouseenter', function() {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.borderColor = '#a29bfe';
                cursorOutline.style.background = 'rgba(108, 92, 231, 0.05)';
            });

            $('a, button, .service-card, .portfolio-card, .blog-card, .swiper-button-prev, .swiper-button-next').on('mouseleave', function() {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.borderColor = '#a29bfe';
                cursorOutline.style.background = 'transparent';
            });
        }

        // ===== COUNTER ANIMATION =====
        function animateCounters() {
            $('.stat-number[data-count]').each(function() {
                const $this = $(this);
                const target = parseInt($this.data('count'));
                const current = parseInt($this.text());
                
                if (current === 0 && isElementInViewport($this[0])) {
                    $({ count: 0 }).animate({ count: target }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.count));
                        },
                        complete: function() {
                            $this.text(target + '+');
                        }
                    });
                }
            });
        }

        // Check if element is in viewport
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        }            // Run counter animation on scroll and initial load
            $(window).on('scroll', function() {
                animateCounters();
            });

            // Initial check
            setTimeout(animateCounters, 500);

        // ===== SKILL BAR ANIMATION =====
        function animateSkillBars() {
            $('.skill-progress').each(function() {
                const $this = $(this);
                if (isElementInViewport($this[0]) && $this.css('width') === '0px') {
                    const progress = $this.data('progress');
                    $this.css('width', progress + '%');
                }
            });
        }

        $(window).on('scroll', animateSkillBars);
        setTimeout(animateSkillBars, 500);

        // ===== PORTFOLIO FILTER (works on portfolio.html page) =====
        // Only initializes if filter buttons exist on the page
        if ($('.filter-btn').length) {
            $('.filter-btn').on('click', function() {
                const filterValue = $(this).data('filter');
                $('.filter-btn').removeClass('active');
                $(this).addClass('active');
                if (filterValue === 'all') {
                    $('.portfolio-item').fadeIn(400);
                } else {
                    $('.portfolio-item').each(function() {
                        $(this).data('category') === filterValue ? $(this).fadeIn(400) : $(this).hide();
                    });
                }
            });
        }

        // ===== FORM HANDLING =====
        $('#contactForm, #contactFormMain').on('submit', function(e) {
            e.preventDefault();
            
            const $form = $(this);
            const $button = $form.find('button[type="submit"]');
            const originalText = $button.html();
            
            // Simple validation
            let valid = true;
            $form.find('[required]').each(function() {
                if (!$(this).val().trim()) {
                    $(this).addClass('is-invalid');
                    valid = false;
                } else {
                    $(this).removeClass('is-invalid');
                }
            });
            
            if (!valid) return;
            
            // Show loading state
            $button.html('<span class="spinner-border spinner-border-sm me-2" role="status"></span>Sending...');
            $button.prop('disabled', true);
            
            // Simulate sending (in production, replace with actual AJAX call)
            setTimeout(function() {
                $button.html('<span><i class="fas fa-check me-2"></i>Message Sent!</span>');
                
                setTimeout(function() {
                    $button.html(originalText);
                    $button.prop('disabled', false);
                    $form[0].reset();
                }, 3000);
            }, 2000);
        });

        // Remove validation styles on input
        $('.form-control, .modern-input').on('input', function() {
            $(this).removeClass('is-invalid');
        });

        // ===== NEWSLETTER FORM =====
        $('.newsletter-form').on('submit', function(e) {
            e.preventDefault();
            const $form = $(this);
            const $input = $form.find('input[type="email"]');
            
            if ($input.val().trim()) {
                $input.val('');
                alert('Thank you for subscribing!');
            }
        });

        // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
        $('a[href^="#"]').not('[href="#"]').not('[data-bs-toggle]').on('click', function(e) {
            e.preventDefault();
            const target = $($(this).attr('href'));
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 600);
            }
        });

        // ===== GSAP SCROLL TRIGGER ANIMATIONS =====
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            // Parallax effect on hero stats
            gsap.to('.hero-stats-grid', {
                scrollTrigger: {
                    trigger: '#hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                },
                y: 100,
                opacity: 0.3,
                ease: 'none'
            });
        }

        // ===== TYPED.JS ON BLOG PAGE =====
        // No additional typed instances needed on inner pages

        // ===== ACTIVE NAV LINK ON SCROLL =====
        function updateActiveNavLink() {
            const sections = $('section[id]');
            const scrollPos = $(window).scrollTop() + 150;

            sections.each(function() {
                const section = $(this);
                const sectionTop = section.offset().top;
                const sectionBottom = sectionTop + section.outerHeight();
                const sectionId = section.attr('id');
                const navLink = $(`.nav-link[href="#${sectionId}"]`);

                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    $('.nav-link').removeClass('active');
                    navLink.addClass('active');
                }
            });
        }

        // Only run on homepage
        if ($('#hero').length) {
            $(window).on('scroll', updateActiveNavLink);
        }

        // ===== LAZY LOADING FOR IMAGES =====
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading supported, already added in HTML
        } else {
            // Fallback for older browsers
            $('img[loading="lazy"]').each(function() {
                const $img = $(this);
                const src = $img.attr('src');
                $img.attr('src', '');
                $img.attr('data-src', src);
                
                const observer = new IntersectionObserver(function(entries) {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            $img.attr('src', $img.data('src'));
                            observer.unobserve(entry.target);
                        }
                    });
                });
                observer.observe(this);
            });
        }

        // ===== BLOG CARD HOVER EFFECT =====
        $('.blog-card-horizontal').on('mouseenter', function() {
            $(this).find('.blog-thumb img').css('transform', 'scale(1.05)');
        }).on('mouseleave', function() {
            $(this).find('.blog-thumb img').css('transform', 'scale(1)');
        });

        // ===== SWIPER INITIALIZATION =====
        if (typeof Swiper !== 'undefined') {
            // Services Swiper
            new Swiper('.services-swiper', {
                slidesPerView: 1,
                spaceBetween: 24,
                loop: false,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true,
                },
                pagination: {
                    el: '.services-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.services-next',
                    prevEl: '.services-prev',
                },
                breakpoints: {
                    576: { slidesPerView: 2 },
                    992: { slidesPerView: 3 },
                },
            });

            // Featured Projects Swiper
            new Swiper('.portfolio-swiper', {
                slidesPerView: 1,
                spaceBetween: 24,
                loop: false,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true,
                },
                pagination: {
                    el: '.portfolio-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.portfolio-next',
                    prevEl: '.portfolio-prev',
                },
                breakpoints: {
                    576: { slidesPerView: 2 },
                    992: { slidesPerView: 3 },
                    1200: { slidesPerView: 3 },
                },
            });
        }

        console.log('%c PixelPerfect v1.0.0 ', 'background: #6c5ce7; color: #fff; padding: 4px 8px; border-radius: 4px; font-family: monospace; font-size: 12px;');
        console.log('%c 🚀 Built with Three.js, GSAP, Bootstrap 5 ', 'color: #a29bfe; font-size: 11px;');

    }); // End DOM ready

})(jQuery);
