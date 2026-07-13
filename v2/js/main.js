/* ============================================================
   SPurno Animation Studio — Premium Dynamic Engine
   ============================================================ */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = window.innerWidth < 768;
  var docEl = document.documentElement;

  /* ── THEME INIT ──────────────────────────────────────────── */
  function initTheme() {
    var savedTheme = localStorage.getItem('spurno-theme');
    var savedAccent = localStorage.getItem('spurno-accent');
    if (savedTheme) docEl.setAttribute('data-theme', savedTheme);
    if (savedAccent) docEl.setAttribute('data-accent', savedAccent);
  }
  initTheme();

  /* ── LOADING SCREEN ─────────────────────────────────────── */
  var loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    window.addEventListener('load', function () {
      setTimeout(function () { loadingScreen.classList.add('hidden'); }, 500);
    });
    setTimeout(function () { if (loadingScreen) loadingScreen.classList.add('hidden'); }, 3500);
  }

  /* ── CUSTOM CURSOR ──────────────────────────────────────── */
  if (!isMobile && !prefersReducedMotion) {
    var cursor = document.getElementById('customCursor');
    var cursorDot = document.getElementById('customCursorDot');
    if (cursor && cursorDot) {
      var cursorX = 0, cursorY = 0, dotX = 0, dotY = 0;
      document.addEventListener('mousemove', function (e) {
        cursorX = e.clientX; cursorY = e.clientY;
        cursor.style.opacity = '1'; cursorDot.style.opacity = '1';
      });
      document.addEventListener('mouseleave', function () { cursor.style.opacity = '0'; cursorDot.style.opacity = '0'; });
      function animateCursor() {
        dotX += (cursorX - dotX) * 0.12;
        dotY += (cursorY - dotY) * 0.12;
        cursor.style.transform = 'translate(' + cursorX + 'px, ' + cursorY + 'px) translate(-50%, -50%)';
        cursorDot.style.transform = 'translate(' + dotX + 'px, ' + dotY + 'px) translate(-50%, -50%)';
        requestAnimationFrame(animateCursor);
      }
      animateCursor();
      document.querySelectorAll('a, button, .btn, .video-card, .portfolio-item, .platform-card, .dark-card, .theme-btn, .filter-btn, .nav-toggle').forEach(function (el) {
        el.addEventListener('mouseenter', function () { cursor.classList.add('active'); cursorDot.classList.add('active'); });
        el.addEventListener('mouseleave', function () { cursor.classList.remove('active'); cursorDot.classList.remove('active'); });
      });
    }
  }

  /* ── MOBILE NAV ─────────────────────────────────────────── */
  var navToggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  var mobileNavClose = document.getElementById('mobileNavClose');
  function openMobileNav() {
    if (mobileNav) { mobileNav.classList.add('active'); mobileNav.setAttribute('aria-hidden', 'false'); }
    if (navToggle) navToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNav() {
    if (mobileNav) { mobileNav.classList.remove('active'); mobileNav.setAttribute('aria-hidden', 'true'); }
    if (navToggle) navToggle.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (navToggle) navToggle.addEventListener('click', openMobileNav);
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
  if (mobileNav) mobileNav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMobileNav); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMobileNav(); });

  /* ── SMOOTH SCROLL ──────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
      }
    });
  });

  /* ── SCROLL PROGRESS BAR ────────────────────────────────── */
  var progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.transform = 'scaleX(' + Math.min(scrollY / docHeight, 1) + ')';
    }, { passive: true });
  }

  /* ── NAV COLOR SHIFT ────────────────────────────────────── */
  var globalNav = document.getElementById('globalNav');
  var darkSections = document.querySelectorAll('.tile--dark, .tile--dark-2, .tile--black, .hero');
  if (globalNav && darkSections.length > 0) {
    window.addEventListener('scroll', function () {
      var navBottom = globalNav.getBoundingClientRect().bottom;
      var isOnDark = false;
      darkSections.forEach(function (sec) {
        var rect = sec.getBoundingClientRect();
        if (rect.top <= navBottom && rect.bottom >= navBottom) isOnDark = true;
      });
      if (isOnDark) { globalNav.classList.add('global-nav-dark'); globalNav.classList.remove('scrolled'); }
      else { globalNav.classList.remove('global-nav-dark'); globalNav.classList.toggle('scrolled', window.scrollY > 50); }
    }, { passive: true });
  }

  /* ── SCROLL REVEALS ─────────────────────────────────────── */
  var revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children, .reveal-blur');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else { revealEls.forEach(function (el) { el.classList.add('visible'); }); }

  /* ── ANIMATED COUNTERS ──────────────────────────────────── */
  var counters = document.querySelectorAll('[data-count]');
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / 2000, 1);
      var eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(eased * target).toLocaleString() + (target >= 100 ? '+' : '');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString() + '+';
    }
    requestAnimationFrame(step);
  }
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) { animateCounter(entry.target); counterObserver.unobserve(entry.target); } });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  /* ── PORTFOLIO FILTER ───────────────────────────────────── */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var portfolioItems = document.querySelectorAll('.portfolio-item');
  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = this.getAttribute('data-filter');
        filterBtns.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
        this.classList.add('active'); this.setAttribute('aria-selected', 'true');
        portfolioItems.forEach(function (item, index) {
          var category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = '';
            item.style.opacity = '0'; item.style.transform = 'translateY(16px) scale(0.97)';
            setTimeout(function () {
              item.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
              item.style.opacity = '1'; item.style.transform = 'translateY(0) scale(1)';
            }, index * 60);
          } else {
            item.style.transition = 'all 0.25s ease';
            item.style.opacity = '0'; item.style.transform = 'scale(0.95)';
            setTimeout(function () { item.style.display = 'none'; }, 250);
          }
        });
      });
    });
  }

  /* ── PORTFOLIO DRAG SCROLL ──────────────────────────────── */
  var portfolioGrid = document.querySelector('.portfolio-grid');
  if (portfolioGrid && !isMobile) {
    var isDragging = false, startX, scrollLeft;
    portfolioGrid.addEventListener('mousedown', function (e) { isDragging = true; portfolioGrid.classList.add('dragging'); startX = e.pageX - portfolioGrid.offsetLeft; scrollLeft = portfolioGrid.scrollLeft; });
    portfolioGrid.addEventListener('mouseleave', function () { isDragging = false; portfolioGrid.classList.remove('dragging'); });
    portfolioGrid.addEventListener('mouseup', function () { isDragging = false; portfolioGrid.classList.remove('dragging'); });
    portfolioGrid.addEventListener('mousemove', function (e) { if (!isDragging) return; e.preventDefault(); var x = e.pageX - portfolioGrid.offsetLeft; portfolioGrid.scrollLeft = scrollLeft - (x - startX) * 1.5; });
  }

  /* ── LIGHTBOX ───────────────────────────────────────────── */
  var lightbox = document.getElementById('lightbox');
  var lightboxMedia = document.getElementById('lightboxMedia');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');
  var lightboxPrev = document.getElementById('lightboxPrev');
  var lightboxNext = document.getElementById('lightboxNext');
  if (lightbox) {
    var lbItems = [], lbIndex = 0;
    document.querySelectorAll('.portfolio-item, .video-card-thumb').forEach(function (el, i) {
      el.addEventListener('click', function (e) {
        if (e.target.closest('.video-card-cta') || e.target.closest('a')) return;
        var img = this.querySelector('img');
        var vid = this.querySelector('video');
        var title = '';
        var titleEl = this.querySelector('.portfolio-overlay h4') || this.querySelector('.video-card-title');
        if (titleEl) title = titleEl.textContent;
        lbItems = [];
        document.querySelectorAll('.portfolio-item, .video-card-thumb').forEach(function (item) {
          var itemVid = item.querySelector('video');
          var itemImg = item.querySelector('img');
          if (itemVid) lbItems.push({ type: 'video', src: itemVid.querySelector('source') ? itemVid.querySelector('source').getAttribute('src') : itemVid.getAttribute('src') });
          else if (itemImg) lbItems.push({ type: 'image', src: itemImg.getAttribute('src') });
        });
        lbIndex = i;
        openLightbox(i);
      });
    });
    function openLightbox(index) {
      var item = lbItems[index];
      if (!item) return;
      lightboxMedia.innerHTML = '';
      if (item.type === 'image') {
        var img = document.createElement('img');
        img.setAttribute('src', item.src); img.setAttribute('alt', '');
        lightboxMedia.appendChild(img);
      } else if (item.type === 'video') {
        var vid = document.createElement('video');
        vid.setAttribute('src', item.src); vid.setAttribute('controls', '');
        vid.setAttribute('autoplay', ''); vid.setAttribute('playsinline', '');
        lightboxMedia.appendChild(vid);
      }
      lightboxCaption.textContent = 'Item ' + (index + 1) + ' of ' + lbItems.length;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() { lightbox.classList.remove('active'); document.body.style.overflow = ''; var vid = lightboxMedia.querySelector('video'); if (vid) vid.pause(); }
    function navigateLightbox(dir) { lbIndex = (lbIndex + dir + lbItems.length) % lbItems.length; openLightbox(lbIndex); }
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', function () { navigateLightbox(-1); });
    if (lightboxNext) lightboxNext.addEventListener('click', function () { navigateLightbox(1); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function (e) { if (!lightbox.classList.contains('active')) return; if (e.key === 'Escape') closeLightbox(); if (e.key === 'ArrowLeft') navigateLightbox(-1); if (e.key === 'ArrowRight') navigateLightbox(1); });
  }

  /* ── THEME SWITCHER ─────────────────────────────────────── */
  var themeToggle = document.getElementById('themeToggle');
  var accentToggle = document.getElementById('accentToggle');
  var accentPanel = document.getElementById('accentPanel');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = docEl.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      docEl.setAttribute('data-theme', next);
      localStorage.setItem('spurno-theme', next);
      var sun = this.querySelector('.icon-sun');
      var moon = this.querySelector('.icon-moon');
      if (sun && moon) { sun.style.display = next === 'dark' ? 'none' : ''; moon.style.display = next === 'dark' ? '' : 'none'; }
      if (accentPanel) accentPanel.classList.remove('active');
    });
  }
  if (accentToggle && accentPanel) {
    accentToggle.addEventListener('click', function (e) { e.stopPropagation(); accentPanel.classList.toggle('active'); });
    document.addEventListener('click', function () { if (accentPanel) accentPanel.classList.remove('active'); });
    accentPanel.addEventListener('click', function (e) { e.stopPropagation(); });
    accentPanel.querySelectorAll('[data-accent]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var accent = this.getAttribute('data-accent');
        accentPanel.querySelectorAll('[data-accent]').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        if (accent === 'default') { docEl.removeAttribute('data-accent'); localStorage.removeItem('spurno-accent'); }
        else { docEl.setAttribute('data-accent', accent); localStorage.setItem('spurno-accent', accent); }
      });
    });
    accentPanel.querySelectorAll('[data-theme-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var theme = this.getAttribute('data-theme-btn');
        docEl.setAttribute('data-theme', theme);
        localStorage.setItem('spurno-theme', theme);
        if (themeToggle) {
          var sun = themeToggle.querySelector('.icon-sun');
          var moon = themeToggle.querySelector('.icon-moon');
          if (sun && moon) { sun.style.display = theme === 'dark' ? 'none' : ''; moon.style.display = theme === 'dark' ? '' : 'none'; }
        }
        if (accentPanel) accentPanel.classList.remove('active');
      });
    });
  }

  /* ── LANGUAGE SELECTOR ──────────────────────────────────── */
  var langSelector = document.getElementById('langSelector');
  var langDropdown = document.getElementById('langDropdown');
  if (langSelector && langDropdown) {
    langSelector.addEventListener('click', function (e) { e.stopPropagation(); langDropdown.classList.toggle('active'); });
    document.addEventListener('click', function () { langDropdown.classList.remove('active'); });
    langDropdown.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var lang = this.getAttribute('data-lang');
        langSelector.querySelector('span').textContent = this.textContent.trim().substring(0, 2).toUpperCase();
        langDropdown.classList.remove('active');
        localStorage.setItem('spurno-lang', lang);
      });
    });
    var savedLang = localStorage.getItem('spurno-lang');
    if (savedLang) langSelector.querySelector('span').textContent = savedLang.toUpperCase();
  }

  /* ── PAGE TRANSITIONS ───────────────────────────────────── */
  var pageTrans = document.getElementById('pageTransition');
  if (pageTrans) {
    document.querySelectorAll('a:not([href^="#"]):not([href*="://"]):not(.nav-cta):not(.video-card-cta)').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (!href || href === '' || href === '#' || href.startsWith('javascript') || this.target === '_blank') return;
        e.preventDefault();
        pageTrans.classList.add('active');
        setTimeout(function () { window.location.href = href; }, 400);
      });
    });
  }

  /* ── FAQ ACCORDION ──────────────────────────────────────── */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    if (btn && answer) {
      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(function (other) {
          if (other !== item) { other.classList.remove('active'); var ob = other.querySelector('.faq-question'); if (ob) ob.setAttribute('aria-expanded', 'false'); var oa = other.querySelector('.faq-answer'); if (oa) oa.style.maxHeight = '0'; }
        });
        if (isOpen) { item.classList.remove('active'); btn.setAttribute('aria-expanded', 'false'); answer.style.maxHeight = '0'; }
        else { item.classList.add('active'); btn.setAttribute('aria-expanded', 'true'); answer.style.maxHeight = answer.scrollHeight + 'px'; }
      });
    }
  });

  /* ── CONTACT FORM VALIDATION ────────────────────────────── */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      contactForm.querySelectorAll('.form-group').forEach(function (g) { g.classList.remove('error'); });
      contactForm.querySelectorAll('[required]').forEach(function (field) {
        var group = field.closest('.form-group');
        if (!field.value.trim()) { if (group) group.classList.add('error'); valid = false; }
      });
      var email = contactForm.querySelector('[type="email"]');
      if (email && email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { var group = email.closest('.form-group'); if (group) group.classList.add('error'); valid = false; }
      if (valid) {
        var btn = contactForm.querySelector('button[type="submit"]');
        if (btn) { btn.innerHTML = 'Message Sent! \u2713'; btn.style.background = '#16a34a'; btn.disabled = true; }
      }
    });
    contactForm.querySelectorAll('input, textarea, select').forEach(function (f) { f.addEventListener('input', function () { var g = this.closest('.form-group'); if (g) g.classList.remove('error'); }); });
  }

  /* ── SCROLL TO TOP ──────────────────────────────────────── */
  var scrollTopBtn = document.getElementById('scrollTopBtn');
  var scrollProgressCircle = scrollTopBtn ? scrollTopBtn.querySelector('.scroll-progress circle') : null;
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = Math.min(scrollY / docHeight, 1);
      scrollTopBtn.classList.toggle('visible', scrollY > 400);
      if (scrollProgressCircle) scrollProgressCircle.style.strokeDashoffset = 151 - (progress * 151);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ── ACTIVE NAV LINK ────────────────────────────────────── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY + 120;
      var currentSection = '';
      sections.forEach(function (section) { if (scrollY >= section.offsetTop) currentSection = section.getAttribute('id'); });
      navLinks.forEach(function (link) { link.classList.remove('active'); var href = link.getAttribute('href'); if (href && href.indexOf('#' + currentSection) !== -1) link.classList.add('active'); });
    }, { passive: true });
  }

  /* ── COOKIE BANNER ──────────────────────────────────────── */
  var cookieBanner = document.getElementById('cookieBanner');
  if (cookieBanner && !localStorage.getItem('spurno-cookie-consent')) {
    setTimeout(function () { cookieBanner.classList.add('active'); }, 2500);
    cookieBanner.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () { localStorage.setItem('spurno-cookie-consent', 'true'); });
    });
  }

  /* ── PARALLAX ON SCROLL ─────────────────────────────────── */
  if (!isMobile && !prefersReducedMotion) {
    window.addEventListener('scroll', function () {
      document.querySelectorAll('.parallax-bg').forEach(function (bg) {
        var speed = parseFloat(bg.getAttribute('data-speed')) || 0.3;
        var rect = bg.parentElement.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          var yOffset = (rect.top * speed) * -1;
          bg.style.transform = 'translate3d(0, ' + yOffset + 'px, 0)';
        }
      });
    }, { passive: true });
  }

  /* ── VIDEO SHOWCASE ─────────────────────────────────────── */
  (function initVideoShowcase() {
    var mainPlayer = document.getElementById('mainPlayer');
    var mainOverlay = document.getElementById('mainPlayerOverlay');
    var mainPlayBtn = document.getElementById('mainPlayBtn');
    var mainPlayPauseBtn = document.getElementById('mainPlayPauseBtn');
    var mainProgress = document.getElementById('mainProgress');
    var mainProgressFill = document.getElementById('mainProgressFill');
    var mainTime = document.getElementById('mainTime');
    var mainMuteBtn = document.getElementById('mainMuteBtn');
    var mainFullscreenBtn = document.getElementById('mainFullscreenBtn');
    var mainControls = document.getElementById('mainControls');
    var videoGrid = document.getElementById('videoGrid');
    function formatTime(s) { var m = Math.floor(s / 60); var sec = Math.floor(s % 60); return m + ':' + (sec < 10 ? '0' : '') + sec; }
    if (mainPlayer) {
      function toggleMainPlay() {
        if (mainPlayer.paused) {
          mainPlayer.play();
          if (mainOverlay) mainOverlay.classList.add('hidden');
          var ip = mainPlayPauseBtn ? mainPlayPauseBtn.querySelector('.icon-play') : null;
          var ip2 = mainPlayPauseBtn ? mainPlayPauseBtn.querySelector('.icon-pause') : null;
          if (ip) ip.style.display = 'none'; if (ip2) ip2.style.display = '';
        } else {
          mainPlayer.pause();
          var ip3 = mainPlayPauseBtn ? mainPlayPauseBtn.querySelector('.icon-play') : null;
          var ip4 = mainPlayPauseBtn ? mainPlayPauseBtn.querySelector('.icon-pause') : null;
          if (ip3) ip3.style.display = ''; if (ip4) ip4.style.display = 'none';
        }
      }
      if (mainOverlay) mainOverlay.addEventListener('click', toggleMainPlay);
      if (mainPlayBtn) mainPlayBtn.addEventListener('click', function (e) { e.stopPropagation(); toggleMainPlay(); });
      if (mainPlayPauseBtn) mainPlayPauseBtn.addEventListener('click', toggleMainPlay);
      mainPlayer.addEventListener('timeupdate', function () {
        if (mainPlayer.duration) { var pct = (mainPlayer.currentTime / mainPlayer.duration) * 100; if (mainProgressFill) mainProgressFill.style.width = pct + '%'; if (mainTime) mainTime.textContent = formatTime(mainPlayer.currentTime); }
      });
      mainPlayer.addEventListener('ended', function () { if (mainOverlay) mainOverlay.classList.remove('hidden'); var ip5 = mainPlayPauseBtn ? mainPlayPauseBtn.querySelector('.icon-play') : null; var ip6 = mainPlayPauseBtn ? mainPlayPauseBtn.querySelector('.icon-pause') : null; if (ip5) ip5.style.display = ''; if (ip6) ip6.style.display = 'none'; });
      if (mainProgress) { mainProgress.addEventListener('click', function (e) { var rect = mainProgress.getBoundingClientRect(); var pct = (e.clientX - rect.left) / rect.width; if (mainPlayer.duration) mainPlayer.currentTime = pct * mainPlayer.duration; }); }
      if (mainMuteBtn) { mainMuteBtn.addEventListener('click', function () { mainPlayer.muted = !mainPlayer.muted; this.style.opacity = mainPlayer.muted ? '0.5' : '1'; }); }
      if (mainFullscreenBtn) { mainFullscreenBtn.addEventListener('click', function () { var w = mainPlayer.closest('.featured-video-wrapper'); if (w.requestFullscreen) w.requestFullscreen(); else if (w.webkitRequestFullscreen) w.webkitRequestFullscreen(); }); }
      if (mainControls) {
        var ct; var w2 = mainPlayer.closest('.featured-video-wrapper');
        if (w2) {
          w2.addEventListener('mousemove', function () { mainControls.classList.add('active'); clearTimeout(ct); ct = setTimeout(function () { mainControls.classList.remove('active'); }, 3000); });
          w2.addEventListener('mouseleave', function () { if (!mainPlayer.paused) { clearTimeout(ct); ct = setTimeout(function () { mainControls.classList.remove('active'); }, 1000); } });
        }
      }
    }
    if (videoGrid) {
      videoGrid.querySelectorAll('.video-card').forEach(function (card) {
        var tv = card.querySelector('.video-card-thumb video');
        if (!tv) return;
        card.addEventListener('mouseenter', function () { tv.play().catch(function () {}); });
        card.addEventListener('mouseleave', function () { tv.pause(); tv.currentTime = 0; });
      });
    }
    var vfBtns = document.querySelectorAll('[data-vfilter]');
    var vCards = document.querySelectorAll('.video-card');
    if (vfBtns.length > 0 && vCards.length > 0) {
      vfBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var filter = this.getAttribute('data-vfilter');
          vfBtns.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
          this.classList.add('active'); this.setAttribute('aria-selected', 'true');
          vCards.forEach(function (card) {
            var cat = card.getAttribute('data-vcat');
            if (filter === 'all' || cat === filter) {
              card.classList.remove('hidden'); card.style.opacity = '0'; card.style.transform = 'translateY(12px)';
              setTimeout(function () { card.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'; card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
            } else {
              card.style.transition = 'all 0.2s ease'; card.style.opacity = '0'; card.style.transform = 'scale(0.95)';
              setTimeout(function () { card.classList.add('hidden'); }, 200);
            }
          });
        });
      });
    }
  })();

  /* ── HERO PARTICLE CANVAS ───────────────────────────────── */
  var heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas && heroCanvas.getContext && !prefersReducedMotion) {
    var ctx = heroCanvas.getContext('2d');
    var particles = [];
    var particleCount = isMobile ? 25 : 50;
    function resizeCanvas() { heroCanvas.width = heroCanvas.parentElement.offsetWidth; heroCanvas.height = heroCanvas.parentElement.offsetHeight; }
    function createParticle() { return { x: Math.random() * heroCanvas.width, y: Math.random() * heroCanvas.height, size: Math.random() * 1.5 + 0.5, speedX: (Math.random() - 0.5) * 0.4, speedY: (Math.random() - 0.5) * 0.4, opacity: Math.random() * 0.3 + 0.05 }; }
    function initParticles() { particles = []; for (var i = 0; i < particleCount; i++) particles.push(createParticle()); }
    function drawParticles() {
      ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
      particles.forEach(function (p) { ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255, 255, 255, ' + p.opacity + ')'; ctx.fill(); p.x += p.speedX; p.y += p.speedY; if (p.x < 0 || p.x > heroCanvas.width) p.speedX *= -1; if (p.y < 0 || p.y > heroCanvas.height) p.speedY *= -1; });
      for (var i = 0; i < particles.length; i++) { for (var j = i + 1; j < particles.length; j++) { var dx = particles[i].x - particles[j].x; var dy = particles[i].y - particles[j].y; var dist = Math.sqrt(dx * dx + dy * dy); if (dist < 100) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = 'rgba(255, 255, 255, ' + (0.04 * (1 - dist / 100)) + ')'; ctx.lineWidth = 0.5; ctx.stroke(); } } }
      requestAnimationFrame(drawParticles);
    }
    resizeCanvas(); initParticles(); drawParticles();
    window.addEventListener('resize', function () { resizeCanvas(); initParticles(); });
  } else if (heroCanvas) { heroCanvas.style.display = 'none'; }

  /* ── TYPEWRITER ─────────────────────────────────────────── */
  var heroTitle = document.querySelector('.hero-display[data-typewriter]');
  if (heroTitle && !prefersReducedMotion) {
    var text = heroTitle.getAttribute('data-typewriter') || heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid rgba(255,255,255,0.6)';
    var ci = 0;
    function typeHero() { if (ci < text.length) { heroTitle.textContent += text.charAt(ci); ci++; setTimeout(typeHero, 55 + Math.random() * 35); } else { setTimeout(function () { heroTitle.style.borderRight = 'none'; }, 800); } }
    setTimeout(typeHero, 1000);
  }

  /* ── PRELOAD FONTS ──────────────────────────────────────── */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { document.body.classList.add('fonts-loaded'); });
  }

})();
