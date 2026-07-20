(function() {
  var article = document.querySelector('.blog-article');
  if (!article) return;

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

  var existingArticleAds = article.querySelectorAll('.ad-inline').length;
  var neededArticleAds = Math.max(0, 6 - existingArticleAds);

  if (neededArticleAds > 0) {
    var candidates = [];
    var children = article.children;
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
      article.insertBefore(wrapper, candidates[p].el);
      pushAd();
      inserted++;
    }
  }

  var sidebar = document.querySelector('.blog-sidebar');
  if (sidebar) {
    var existingSidebarAds = sidebar.querySelectorAll('.sidebar-card .adsbygoogle').length;
    var neededSidebarAds = Math.max(0, 2 - existingSidebarAds);

    if (neededSidebarAds > 0) {
      var sidebarCards = sidebar.querySelectorAll('.sidebar-card');
      var ref = sidebarCards[sidebarCards.length - 1];
      if (!ref) ref = sidebar.querySelector('.sidebar-newsletter');
      if (ref) {
        for (var a = 0; a < neededSidebarAds; a++) {
          var card = document.createElement('div');
          card.className = 'sidebar-card';
          card.appendChild(createAdElement());
          ref.parentNode.insertBefore(card, ref.nextSibling);
          pushAd();
          ref = card;
        }
      }
    }
  }
})();
