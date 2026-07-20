(function() {
  var AD_CLIENT = 'ca-pub-9371167470298440';
  var AD_SLOT = '6814031410';

  var adConfigs = [
    {
      id: 'ad-slot-1-article',
      icon: 'fa-cube',
      title: 'Premium Motion Graphics Assets',
      desc: 'Browse 4000+ professional 4K motion backgrounds, animated templates, and stock footage.',
      cta: 'Browse Collection',
      url: 'https://stock.adobe.com/contributor/211977281/SPurnoAnimation',
    },
    {
      id: 'ad-slot-2-article',
      icon: 'fa-film',
      title: '4K Video Clips & Templates',
      desc: 'Royalty-free motion graphics, lower thirds, and title animations for any project.',
      cta: 'Explore Library',
      url: 'https://www.shutterstock.com/g/SPurnoAnimation',
    },
    {
      id: 'ad-slot-3-article',
      icon: 'fa-layer-group',
      title: 'After Effects Templates',
      desc: 'Professional logo reveals, typography animations, and infographic templates.',
      cta: 'View Collection',
      url: 'https://stock.adobe.com/contributor/211977281/SPurnoAnimation',
    },
    {
      id: 'ad-slot-1',
      icon: 'fa-cube',
      title: 'Premium Motion Graphics',
      desc: '4000+ professional 4K motion backgrounds and templates.',
      cta: 'Browse',
      url: 'https://stock.adobe.com/contributor/211977281/SPurnoAnimation',
    },
    {
      id: 'ad-slot-2',
      icon: 'fa-plug',
      title: 'AE Plugins & Tools',
      desc: 'Powerful After Effects plugins to supercharge your motion design workflow.',
      cta: 'Explore Plugins',
      url: 'https://www.shutterstock.com/g/SPurnoAnimation',
    },
    {
      id: 'ad-slot-3',
      icon: 'fa-film',
      title: 'Video Collections',
      desc: 'Royalty-free motion clips and animated backgrounds for any project.',
      cta: 'Explore',
      url: 'https://www.shutterstock.com/g/SPurnoAnimation',
    },
  ];

  function renderAd(config) {
    var el = document.getElementById(config.id);
    if (!el) return;
    el.innerHTML =
      '<div class="blog-ad-container"><div class="blog-ad-inner">' +
      '<span class="blog-ad-label">Ad</span>' +
      '<div class="blog-ad-content">' +
      '<div class="blog-ad-icon"><i class="fas ' + config.icon + '"></i></div>' +
      '<div class="blog-ad-text">' +
      '<h3>' + config.title + '</h3>' +
      '<p>' + config.desc + '</p>' +
      '<a href="' + config.url + '" class="blog-ad-cta" target="_blank" rel="noopener">' + config.cta + ' <i class="fas fa-arrow-right"></i></a>' +
      '</div></div></div></div>';
  }

  function init() {
    adConfigs.forEach(renderAd);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
