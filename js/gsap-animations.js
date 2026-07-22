(function() {
  'use strict';

  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  function initHeroAnimation() {
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero-badge', { y: 30, opacity: 0, duration: 0.6 })
      .from('.hero-title', { y: 40, opacity: 0, duration: 0.7 }, '-=0.3')
      .from('.hero-description', { y: 30, opacity: 0, duration: 0.6 }, '-=0.3')
      .from('.hero-actions', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
      .from('.hero-image', { x: 40, opacity: 0, duration: 0.9, ease: 'power2.out' }, '-=0.5')
      .from('.trust-strip', { y: 20, opacity: 0, duration: 0.5 }, '-=0.2');
  }

  function animateSectionHeaders() {
    gsap.utils.toArray('.section-header').forEach(function(header) {
      gsap.from(header, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          once: true
        }
      });
    });
  }

  function animateCardGrids() {
    gsap.utils.toArray('.services-grid').forEach(function(grid) {
      var cards = grid.querySelectorAll('.service-card');
      if (cards.length) {
        gsap.from(cards, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            once: true
          }
        });
      }
    });

    gsap.utils.toArray('.stock-grid').forEach(function(grid) {
      var cards = grid.querySelectorAll('.stock-card');
      if (cards.length) {
        gsap.from(cards, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            once: true
          }
        });
      }
    });
  }

  function animateCategoryGroups() {
    gsap.utils.toArray('.category-grid').forEach(function(grid) {
      var groups = grid.querySelectorAll('.category-group');
      if (groups.length) {
        gsap.from(groups, {
          y: 40,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.06,
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            once: true
          }
        });
      }
    });
  }

  function animateCtaSections() {
    gsap.utils.toArray('.cta-section').forEach(function(section) {
      gsap.from(section, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          once: true
        }
      });
    });
  }

  function animateAboutContent() {
    var aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
      gsap.from(aboutContent, {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aboutContent,
          start: 'top 85%',
          once: true
        }
      });
    }
    var statsWrap = document.querySelector('.about-stats-wrap');
    if (statsWrap) {
      gsap.from(statsWrap, {
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statsWrap,
          start: 'top 85%',
          once: true
        }
      });
    }
  }

  function animateStatCounters() {
    gsap.utils.toArray('.about-stat-card strong').forEach(function(stat) {
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
        onEnter: function() {
          var obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function() {
              stat.textContent = prefix + Math.round(obj.val).toLocaleString() + suffix;
            }
          });
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    initHeroAnimation();
    animateSectionHeaders();
    animateCardGrids();
    animateCategoryGroups();
    animateCtaSections();
    animateAboutContent();
    animateStatCounters();
  });

})();
