/* ============================================
   SPurno Animation Studio v2 - i18n Translation
   8 languages: EN, ES, FR, DE, PT, JA, ZH-CN, BN
   ============================================ */
(function() {
  'use strict';

  var LANG_LIST = {
    en: { short: 'EN', label: 'English' },
    es: { short: 'ES', label: 'Espa\u00F1ol' },
    fr: { short: 'FR', label: 'Fran\u00E7ais' },
    de: { short: 'DE', label: 'Deutsch' },
    pt: { short: 'PT', label: 'Portugu\u00EAs' },
    ja: { short: '\u65E5', label: '\u65E5\u672C\u8A9E' },
    'zh-CN': { short: '\u4E2D', label: '\u7B80\u4F53\u4E2D\u6587' },
    bn: { short: '\u09AC\u09BE', label: '\u09AC\u09BE\u0982\u09B2\u09BE' }
  };

  var SUPPORTED = ['en','es','fr','de','pt','ja','zh-CN','bn'];
  var currentLang = 'en';

  function getCookie(name) {
    var m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return m ? decodeURIComponent(m[2]) : null;
  }

  function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 86400000);
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + d.toUTCString() + '; path=/';
  }

  function detectLanguage() {
    var gt = getCookie('googtrans');
    if (gt) {
      var parts = gt.split('/');
      if (parts.length >= 3 && SUPPORTED.indexOf(parts[2]) !== -1) {
        return parts[2];
      }
    }
    var ls = localStorage.getItem('v2Lang');
    if (ls && SUPPORTED.indexOf(ls) !== -1) return ls;
    return 'en';
  }

  function updateUI() {
    var info = LANG_LIST[currentLang] || LANG_LIST.en;
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
      btn.textContent = info.short;
      btn.setAttribute('data-lang', currentLang);
    });
    document.querySelectorAll('.lang-option').forEach(function(opt) {
      var lang = opt.getAttribute('data-language');
      if (lang === currentLang) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });
  }

  window.changeLanguage = function(lang) {
    if (!lang || SUPPORTED.indexOf(lang) === -1) return;
    currentLang = lang;
    setCookie('googtrans', '/en/' + lang, 365);
    localStorage.setItem('v2Lang', lang);
    updateUI();
    location.reload();
  };

  document.addEventListener('DOMContentLoaded', function() {
    currentLang = detectLanguage();

    var meta = document.createElement('meta');
    meta.name = 'google-translate-customization';
    document.head.appendChild(meta);

    var gtDiv = document.createElement('div');
    gtDiv.id = 'google_translate_element';
    gtDiv.style.display = 'none';
    document.body.appendChild(gtDiv);

    window.googleTranslateElementInit = function() {
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: SUPPORTED.join(','),
        autoDisplay: false
      }, 'google_translate_element');
    };

    var s = document.createElement('script');
    s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(s);

    updateUI();
  });

})();
