/**
 * watch-page.js — Adds "Save to Favorites" functionality to individual video watch pages.
 * Include on any watch page with data attributes on <main class="watch-main">
 *   data-item-id   — Unique identifier (e.g., "watch-3d-infographic-video-template")
 *   data-item-title— Display title of the video
 *   data-item-type — "video" (default) or "infographic"
 *
 * Requires: AuthClient (js/auth-client.js)
 */
(function () {
  'use strict';

  var main = document.querySelector('.watch-main');
  if (!main) return;

  var ITEM_ID   = main.getAttribute('data-item-id');
  var ITEM_TITLE = main.getAttribute('data-item-title') || document.title;
  var ITEM_TYPE  = main.getAttribute('data-item-type') || 'video';
  var PAGE_URL   = window.location.pathname;

  if (!ITEM_ID) return;

  // ── Toast notification ──────────────────────────────
  function showToast(message, type) {
    var existing = document.querySelector('.watch-toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'watch-toast watch-toast--' + (type || 'success');
    toast.textContent = message;
    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(function () {
      toast.classList.add('watch-toast--visible');
    });

    // Auto remove after 3s
    setTimeout(function () {
      toast.classList.remove('watch-toast--visible');
      setTimeout(function () { toast.remove(); }, 300);
    }, 3000);
  }

  // ── Create the favorite button bar ──────────────────
  function createFavBar() {
    var bar = document.createElement('div');
    bar.className = 'watch-fav-bar';

    var heart = document.createElement('button');
    heart.className = 'watch-fav-btn';
    heart.setAttribute('aria-label', 'Save to favorites');
    heart.setAttribute('title', 'Save to favorites');
    heart.innerHTML = '<svg class="watch-fav-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
    heart.innerHTML += '<span class="watch-fav-text">Save to Favorites</span>';

    // Loading state
    heart.setAttribute('disabled', 'disabled');

    bar.appendChild(heart);

    // Insert bar after the video player
    var player = document.querySelector('.watch-player');
    if (player && player.parentNode) {
      player.parentNode.insertBefore(bar, player.nextSibling);
    }

    return { bar: bar, heart: heart };
  }

  var favEls = createFavBar();
  var favBtn = favEls.heart;
  var favText = favBtn.querySelector('.watch-fav-text');
  var favIcon = favBtn.querySelector('.watch-fav-icon');

  // ── Update button appearance ────────────────────────
  function setFavState(favorited) {
    favBtn.classList.toggle('watch-fav-btn--active', favorited);
    favText.textContent = favorited ? 'Saved to Favorites' : 'Save to Favorites';
    favBtn.setAttribute('aria-label', favorited ? 'Remove from favorites' : 'Save to favorites');
    favBtn.setAttribute('title', favorited ? 'Remove from favorites' : 'Save to favorites');
    favBtn.removeAttribute('disabled');
  }

  function setFavLoading(loading) {
    favBtn.classList.toggle('watch-fav-btn--loading', loading);
    if (loading) {
      favBtn.setAttribute('disabled', 'disabled');
    }
  }

  // ── Toggle favorite ─────────────────────────────────
  function toggleFav() {
    if (!AuthClient.isAuthenticated()) {
      showToast('Please sign in to save favorites', 'error');
      return;
    }

    var isActive = favBtn.classList.contains('watch-fav-btn--active');
    setFavLoading(true);

    if (isActive) {
      AuthClient.removeFavorite(ITEM_ID)
        .then(function () {
          setFavState(false);
          showToast('Removed from favorites');
        })
        .catch(function (err) {
          showToast(err.message || 'Failed to remove', 'error');
          setFavLoading(false);
        });
    } else {
      AuthClient.addFavorite({
        item_id: ITEM_ID,
        item_type: ITEM_TYPE,
        title: ITEM_TITLE,
        url: PAGE_URL,
      })
        .then(function () {
          setFavState(true);
          showToast('Saved to favorites!');
        })
        .catch(function (err) {
          showToast(err.message || 'Failed to save', 'error');
          setFavLoading(false);
        });
    }
  }

  favBtn.addEventListener('click', function (e) {
    e.preventDefault();
    toggleFav();
  });

  // ── Initialize: check auth & favorite status ────────
  function init() {
    if (AuthClient.isAuthenticated()) {
      AuthClient.isFavorite(ITEM_ID)
        .then(function (data) {
          setFavState(data.favorited === true);
        })
        .catch(function () {
          setFavState(false);
        });
    } else {
      setFavState(false);
    }
  }

  // Wait for AuthClient to be loaded
  if (typeof AuthClient !== 'undefined') {
    init();
  } else {
    // AuthClient might load after this script — wait a bit
    var checkInterval = setInterval(function () {
      if (typeof AuthClient !== 'undefined') {
        clearInterval(checkInterval);
        init();
      }
    }, 50);
    // Timeout after 5 seconds
    setTimeout(function () {
      clearInterval(checkInterval);
      if (typeof AuthClient === 'undefined') {
        setFavState(false);
      }
    }, 5000);
  }
})();
