/* ============================================
   SPurno Animation Studio v2 - Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ---- Loading Screen ----
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    window.addEventListener('load', function() {
      setTimeout(function() {
        loadingScreen.classList.add('hidden');
      }, 1800);
    });
    // Fallback: hide after 4s regardless
    setTimeout(function() {
      if (!loadingScreen.classList.contains('hidden')) {
        loadingScreen.classList.add('hidden');
      }
    }, 4000);
  }

  // ---- Navbar Scroll Effect ----
  const navbar = document.getElementById('navbar');
  if (navbar) {
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
      const currentScroll = window.scrollY;
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ---- Mobile Hamburger ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close nav on link click (mobile)
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Language Selector ----
  const langBtns = document.querySelectorAll('.lang-btn');
  const langOptions = document.querySelectorAll('.lang-option');
  const langDropdowns = document.querySelectorAll('.lang-dropdown');

  langBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const dropdown = this.parentElement.querySelector('.lang-dropdown');
      if (dropdown) {
        dropdown.classList.toggle('active');
      }
    });
  });

  langOptions.forEach(function(opt) {
    opt.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = opt.getAttribute('data-language');
      const dropdown = opt.closest('.lang-dropdown');
      if (dropdown) dropdown.classList.remove('active');
      if (typeof window.changeLanguage === 'function') {
        window.changeLanguage(lang);
      }
    });
  });

  document.addEventListener('click', function() {
    langDropdowns.forEach(function(dd) {
      dd.classList.remove('active');
    });
  });

  // ---- Intersection Observer (Scroll Reveal) ----
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function(el) {
      observer.observe(el);
    });
  }

  // ---- Scroll to Top Button ----
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Background Particles ----
  const bgCanvas = document.querySelector('.bg-canvas');
  if (bgCanvas) {
    const particlesContainer = bgCanvas.querySelector('.bg-particles');
    if (particlesContainer) {
      for (var i = 0; i < 30; i++) {
        var particle = document.createElement('div');
        particle.className = 'bg-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (3 + Math.random() * 4) + 's';
        particle.style.width = (2 + Math.random() * 3) + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
      }
    }
  }

  // ---- Smooth Scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var offset = 80;
          var targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
      }
    });
  });

  // ── Video protection: prevent download, right-click, IDM ──
  document.querySelectorAll('video').forEach(function(video) {
    video.setAttribute('controlsList', 'nodownload');
    video.setAttribute('disablePictureInPicture', '');
    video.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    });
  });
  document.querySelectorAll('source[data-src]').forEach(function(source) {
    source.setAttribute('src', source.getAttribute('data-src'));
  });

});
