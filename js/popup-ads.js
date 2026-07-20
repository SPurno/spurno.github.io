(function() {
  var POPUP_SHOWN_KEY = 'spurno_popup_shown';
  var container = document.getElementById('popupAdContainer');
  if (!container) return;

  var alreadyShown = false;
  try { alreadyShown = localStorage.getItem(POPUP_SHOWN_KEY) === 'true'; } catch(e) {}

  if (alreadyShown) return;

  function getScrollPercent() {
    var docEl = document.documentElement;
    var scrollTop = window.scrollY || document.body.scrollTop || 0;
    var scrollHeight = Math.max(
      document.body.scrollHeight, docEl.scrollHeight,
      document.body.offsetHeight, docEl.offsetHeight,
      document.body.clientHeight, docEl.clientHeight
    );
    return (scrollTop / (scrollHeight - window.innerHeight)) * 100;
  }

  var popupShown = false;

  function showPopup() {
    if (popupShown) return;
    popupShown = true;

    container.innerHTML =
      '<div style="background:#fff;border-radius:18px;padding:36px 32px;max-width:420px;width:100%;position:relative;text-align:center;">' +
      '<button onclick="document.getElementById(\'popupAdContainer\').classList.remove(\'show\')" style="position:absolute;top:12px;right:16px;background:none;border:none;font-size:1.5rem;cursor:pointer;color:#86868b;line-height:1;">&times;</button>' +
      '<div style="width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,#0071e3,#2997ff);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">' +
      '<i class="fas fa-star" style="font-size:1.5rem;color:#fff;"></i></div>' +
      '<h3 style="font-size:1.2rem;font-weight:700;color:#1d1d1f;margin-bottom:8px;">Get 20% Off Premium Assets</h3>' +
      '<p style="font-size:.85rem;color:#86868b;line-height:1.5;margin-bottom:20px;">Subscribe to our newsletter and get exclusive access to premium motion graphics templates and stock footage.</p>' +
      '<a href="https://stock.adobe.com/contributor/211977281/SPurnoAnimation" target="_blank" rel="noopener" class="btn btn-primary" style="display:inline-block;width:100%;">Browse Collection</a>' +
      '<p style="font-size:.7rem;color:#86868b;margin-top:12px;">No spam. Unsubscribe anytime.</p>' +
      '</div>';

    container.classList.add('show');

    container.addEventListener('click', function(e) {
      if (e.target === container) container.classList.remove('show');
    });

    try { localStorage.setItem(POPUP_SHOWN_KEY, 'true'); } catch(e) {}
  }

  function onScroll() {
    if (getScrollPercent() >= 50) {
      window.removeEventListener('scroll', onScroll);
      setTimeout(showPopup, 1000);
    }
  }

  setTimeout(function() {
    window.addEventListener('scroll', onScroll, { passive: true });
  }, 5000);

  // Escape key closes popup
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') container.classList.remove('show');
  });
})();
