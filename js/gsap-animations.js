(function () {
  'use strict';

  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  var bezier = 'cubic-bezier(0.32, 0.72, 0, 1)';

  function initHeroAnimation() {
    var tl = gsap.timeline({ defaults: { ease: bezier } });
    tl.from('.hero-badge', { y: 40, opacity: 0, duration: 0.7 })
      .from('.hero-title', { y: 60, opacity: 0, duration: 0.9 }, '-=0.35')
      .from('.hero-description', { y: 40, opacity: 0, duration: 0.7 }, '-=0.35')
      .from('.hero-actions', { y: 30, opacity: 0, duration: 0.6 }, '-=0.25')
      .from('.hero-image', { x: 60, opacity: 0, duration: 1, ease: 'power2.out' }, '-=0.55')
      .from('.trust-strip', { y: 30, opacity: 0, duration: 0.6 }, '-=0.25');
  }

  function animateSectionHeaders() {
    gsap.utils.toArray('.section-header').forEach(function (header) {
      gsap.from(header, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: bezier,
        scrollTrigger: { trigger: header, start: 'top 85%', once: true },
      });
    });
  }

  function animateCardGrids() {
    gsap.utils.toArray('.services-grid').forEach(function (grid) {
      var cards = grid.querySelectorAll('.service-card');
      if (cards.length) {
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          duration: 0.7,
          ease: bezier,
          stagger: 0.1,
          scrollTrigger: { trigger: grid, start: 'top 83%', once: true },
        });
      }
    });

    gsap.utils.toArray('.stock-grid').forEach(function (grid) {
      var cards = grid.querySelectorAll('.stock-card');
      if (cards.length) {
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          duration: 0.7,
          ease: bezier,
          stagger: 0.08,
          scrollTrigger: { trigger: grid, start: 'top 83%', once: true },
        });
      }
    });

    gsap.utils.toArray('.product-gallery').forEach(function (grid) {
      var cards = grid.querySelectorAll('.shop-product-card');
      if (cards.length) {
        gsap.from(cards, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          ease: bezier,
          stagger: 0.06,
          scrollTrigger: { trigger: grid, start: 'top 85%', once: true },
        });
      }
    });
  }

  function animateCategoryGroups() {
    gsap.utils.toArray('.category-grid').forEach(function (grid) {
      var groups = grid.querySelectorAll('.category-group');
      if (groups.length) {
        gsap.from(groups, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          ease: bezier,
          stagger: 0.05,
          scrollTrigger: { trigger: grid, start: 'top 85%', once: true },
        });
      }
    });
  }

  function animateCtaSections() {
    gsap.utils.toArray('.cta-section').forEach(function (section) {
      gsap.from(section, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: bezier,
        scrollTrigger: { trigger: section, start: 'top 85%', once: true },
      });
    });
  }

  function animateAboutContent() {
    var aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
      gsap.from(aboutContent, {
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: bezier,
        scrollTrigger: { trigger: aboutContent, start: 'top 83%', once: true },
      });
    }
    var statsWrap = document.querySelector('.about-stats-wrap');
    if (statsWrap) {
      gsap.from(statsWrap, {
        x: 40,
        opacity: 0,
        duration: 0.9,
        ease: bezier,
        scrollTrigger: { trigger: statsWrap, start: 'top 83%', once: true },
      });
    }
  }

  function animateStatCounters() {
    gsap.utils.toArray('.about-stat-card strong').forEach(function (stat) {
      var text = stat.textContent;
      var match = text.match(/[\d,]+/);
      if (!match) return;
      var target = parseFloat(match[0].replace(/,/g, ''));
      var suffix = text.replace(match[0], '');
      var prefix = text.substring(0, text.indexOf(match[0]));

      ScrollTrigger.create({
        trigger: stat,
        start: 'top 90%',
        once: true,
        onEnter: function () {
          var obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2.2,
            ease: 'power2.out',
            onUpdate: function () {
              stat.textContent = prefix + Math.round(obj.val).toLocaleString() + suffix;
            },
          });
        },
      });
    });
  }

  function initNavScrollEffect() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;
    ScrollTrigger.create({
      start: 'top -80px',
      onUpdate: function (self) {
        if (self.progress > 0) {
          navbar.classList.add('nav-scrolled');
        } else {
          navbar.classList.remove('nav-scrolled');
        }
      },
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHeroAnimation();
    animateSectionHeaders();
    animateCardGrids();
    animateCategoryGroups();
    animateCtaSections();
    animateAboutContent();
    animateStatCounters();
    initNavScrollEffect();
  });
})();
