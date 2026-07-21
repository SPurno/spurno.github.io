(function() {
  var content = document.querySelector('article .blog-content');
  if (!content) return;

  var AD_CLIENT = 'ca-pub-9371167470298440';
  var AD_SLOT = '6814031410';

  function createAdElement() {
    var ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.cssText = 'display:block; width:100%;';
    ins.setAttribute('data-ad-client', AD_CLIENT);
    ins.setAttribute('data-ad-slot', AD_SLOT);
    ins.setAttribute('data-ad-format', 'auto');
    ins.setAttribute('data-full-width-responsive', 'true');
    return ins;
  }

  function pushAd() {
    try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
  }

  function getIndex(el) {
    var i = 0;
    while (el) { i++; el = el.previousElementSibling; }
    return i;
  }

  // ── Insert up to 4 inline ads in .blog-content ──
  var existingArticleAds = content.querySelectorAll('.ad-inline').length;
  var neededArticleAds = Math.max(0, 4 - existingArticleAds);

  if (neededArticleAds > 0) {
    var candidates = [];
    var children = content.children;
    for (var i = 0; i < children.length; i++) {
      var tag = children[i].tagName;
      if ((tag === 'H2' || tag === 'H3' || tag === 'P') && !children[i].closest('.ad-inline')) {
        candidates.push({ el: children[i], idx: getIndex(children[i]) });
      }
    }

    var step = Math.max(1, Math.floor(candidates.length / (neededArticleAds + 1)));
    var inserted = 0;
    for (var p = step; p < candidates.length && inserted < neededArticleAds; p += step) {
      var wrapper = document.createElement('div');
      wrapper.className = 'ad-inline';
      wrapper.appendChild(createAdElement());
      content.insertBefore(wrapper, candidates[p].el);
      pushAd();
      inserted++;
    }
  }

  // ── Insert up to 2 sidebar ads in aside.sidebar ──
  var sidebar = document.querySelector('aside.sidebar');
  if (sidebar) {
    var existingSidebarAds = sidebar.querySelectorAll('.sidebar-section .adsbygoogle').length;
    var neededSidebarAds = Math.max(0, 2 - existingSidebarAds);

    if (neededSidebarAds > 0) {
      var sidebarSections = sidebar.querySelectorAll('.sidebar-section');
      var ref = sidebarSections[sidebarSections.length - 1];
      if (ref) {
        for (var a = 0; a < neededSidebarAds; a++) {
          var section = document.createElement('div');
          section.className = 'sidebar-section sidebar-ad-section';
          section.appendChild(createAdElement());
          ref.parentNode.insertBefore(section, ref.nextSibling);
          pushAd();
          ref = section;
        }
      }
    }
  }
})();
