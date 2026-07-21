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

  function createCelebration() {
    var existing = document.querySelector('.celebration-container');
    if (existing) return;

    var container = document.createElement('div');
    container.className = 'celebration-container';
    document.body.appendChild(container);

    var colors = ['#ff0055', '#00ff87', '#006eff', '#a855f7', '#ffcc00', '#ff6b00'];
    var balloons = [];
    var cards = [];

    for (var i = 0; i < 18; i++) {
      var balloon = document.createElement('div');
      balloon.className = 'celebration-balloon';
      var color = colors[i % colors.length];
      balloon.innerHTML = '<div class="celebration-balloon-body" style="background:' + color + '"></div><div class="celebration-balloon-string"></div>';
      balloon.style.left = (2 + Math.random() * 88) + '%';
      balloon.style.transform = 'rotate(' + (Math.random() - 0.5) * 20 + 'deg)';
      balloon.style.opacity = '0';
      container.appendChild(balloon);
      balloons.push(balloon);
    }

    for (var j = 0; j < 12; j++) {
      var card = document.createElement('div');
      card.className = 'celebration-card';
      var cc = colors[(j + 3) % colors.length];
      card.style.background = 'linear-gradient(135deg, ' + cc + ', ' + (j % 2 === 0 ? '#fff' : cc) + ')';
      if (j % 2 === 0) {
        card.style.background = cc;
        card.style.opacity = '0.85';
      }
      card.style.left = (3 + Math.random() * 90) + '%';
      card.style.transform = 'rotate(' + (Math.random() - 0.5) * 30 + 'deg)';
      card.style.opacity = '0';
      container.appendChild(card);
      cards.push(card);
    }

    var tl = gsap.timeline({
      onComplete: function() {
        gsap.to(container, {
          opacity: 0,
          duration: 0.8,
          delay: 2,
          ease: 'power2.in',
          onComplete: function() {
            if (container.parentNode) container.parentNode.removeChild(container);
          }
        });
      }
    });

    balloons.forEach(function(b, i) {
      var driftX = (Math.random() - 0.5) * 120;
      var rise = 300 + Math.random() * 400;
      var sway = (Math.random() - 0.5) * 150;

      tl.to(b, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      }, i * 0.04)
      .to(b, {
        y: -rise,
        x: driftX + sway,
        rotation: (Math.random() - 0.5) * 30,
        duration: 3 + Math.random() * 2,
        ease: 'power1.out'
      }, i * 0.04 + 0.3);
    });

    cards.forEach(function(c, i) {
      var rise = 200 + Math.random() * 350;
      var driftX = (Math.random() - 0.5) * 200;
      var rot = (Math.random() - 0.5) * 90;

      tl.to(c, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
        ease: 'back.out(2)'
      }, 0.5 + i * 0.05)
      .to(c, {
        y: -rise,
        x: driftX,
        rotation: rot,
        duration: 3.5 + Math.random() * 2,
        ease: 'power1.out'
      }, 0.5 + i * 0.05 + 0.2);
    });
  }

  function animateMarketplaceCta() {
    var cta = document.querySelector('.marketplace-cta');
    if (!cta) return;

    var colors = ['#ff0055', '#00ff87', '#006eff', '#a855f7', '#ff6b00'];
    var blobs = [];

    colors.forEach(function(color, i) {
      var blob = document.createElement('div');
      blob.className = 'marketplace-cta-blob';
      var size = 180 + Math.random() * 160;
      blob.style.width = size + 'px';
      blob.style.height = size + 'px';
      blob.style.background = 'radial-gradient(circle at 30% 30%, ' + color + ', transparent 70%)';
      blob.style.left = (5 + Math.random() * 75) + '%';
      blob.style.top = (5 + Math.random() * 75) + '%';
      blob.style.opacity = '0';
      cta.appendChild(blob);
      blobs.push(blob);
    });

    gsap.to(cta, {
      backgroundPosition: '100% 50%',
      duration: 6,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });

    blobs.forEach(function(blob, i) {
      gsap.set(blob, {
        scale: 0.4 + Math.random() * 0.3,
        opacity: 0
      });

      gsap.to(blob, {
        opacity: 0.5,
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.2 + i * 0.15,
        onComplete: function() {
          var driftX = (Math.random() - 0.5) * 180;
          var driftY = (Math.random() - 0.5) * 140;
          var dur = 4 + Math.random() * 3;
          gsap.to(blob, {
            x: driftX,
            y: driftY,
            scale: 0.5 + Math.random() * 0.7,
            duration: dur,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
          });
          gsap.to(blob, {
            opacity: 0.25 + Math.random() * 0.25,
            duration: dur * 0.6,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
          });
        }
      });
    });

    ScrollTrigger.create({
      trigger: cta,
      start: 'top 80%',
      once: true,
      onEnter: createCelebration
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
    animateMarketplaceCta();
    animateAboutContent();
    animateStatCounters();
  });

})();
