// ============================================
// SPurno Animation Studio — Custom Video Player
// With persistent watermark overlay
// ============================================

const VideoPlayer = {
  /**
   * Create a watermarked video player
   * @param {Object} options
   * @param {string} options.src - Video source URL
   * @param {string} options.poster - Poster image URL
   * @param {number} options.width - Player width
   * @param {number} options.height - Player height
   * @param {boolean} options.controls - Show custom controls (default: true)
   * @param {boolean} options.autoplay - Autoplay (default: false)
   * @param {boolean} options.loop - Loop (default: false)
   * @param {string} options.className - Additional CSS class
   * @returns {string} HTML string
   */
  render(options = {}) {
    const {
      src,
      poster = '',
      width = '100%',
      height = 'auto',
      controls = true,
      autoplay = false,
      loop = false,
      className = ''
    } = options;

    return `
      <div class="spurno-player ${className}" style="width:${width};height:${height};max-width:100%;position:relative;background:#000;border-radius:var(--radius-md);overflow:hidden;cursor:pointer" data-src="${this.escapeAttr(src)}" data-poster="${this.escapeAttr(poster)}">
        <!-- Poster / Thumbnail -->
        <div class="spurno-poster" style="position:absolute;inset:0;z-index:1;background:#000;display:flex;align-items:center;justify-content:center;transition:opacity 0.4s ease">
          ${poster ? `<img src="${poster}" alt="Video thumbnail" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0">` : ''}
          <div class="spurno-play-btn">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="white">
              <path d="M8 5v14l11-7z" opacity="0.9"/>
            </svg>
          </div>
          ${poster ? '' : '<div style="position:absolute;bottom:16px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,0.5);font-size:0.75rem;letter-spacing:1px;text-transform:uppercase">Click to play</div>'}
          <!-- Watermark on poster -->
          <div class="spurno-watermark" style="position:absolute;bottom:16px;right:16px;color:rgba(255,255,255,0.5);font-size:0.7rem;font-weight:500;letter-spacing:0.5px;text-shadow:0 1px 3px rgba(0,0,0,0.5);pointer-events:none;z-index:3;display:flex;align-items:center;gap:4px">
            <span style="font-size:0.6rem">©</span> SPurno Animation Studio
          </div>
        </div>

        <!-- Video element (hidden until play) -->
        <video class="spurno-video" preload="metadata" playsinline
               style="width:100%;height:100%;display:block;object-fit:contain;position:absolute;inset:0;z-index:0"
               ${autoplay ? 'autoplay' : ''} ${loop ? 'loop' : ''}
               ${poster ? `poster="${poster}"` : ''}>
          <source src="${src}" type="video/mp4">
          Your browser does not support the video tag.
        </video>

        <!-- Watermark overlay on video -->
        <div class="spurno-watermark-overlay" style="position:absolute;inset:0;z-index:2;pointer-events:none;display:none">
          <div class="spurno-watermark" style="position:absolute;bottom:16px;right:16px;color:rgba(255,255,255,0.35);font-size:0.75rem;font-weight:500;letter-spacing:0.5px;text-shadow:0 1px 3px rgba(0,0,0,0.5);pointer-events:none;display:flex;align-items:center;gap:4px;background:rgba(0,0,0,0.3);padding:4px 10px;border-radius:4px;backdrop-filter:blur(2px)">
            <span style="font-size:0.65rem;font-weight:700">©</span> 
            <span style="font-weight:600">SPurno Animation Studio</span>
          </div>
        </div>

        ${controls ? `
        <!-- Custom Controls -->
        <div class="spurno-controls" style="position:absolute;bottom:0;left:0;right:0;z-index:5;background:linear-gradient(to top,rgba(0,0,0,0.85),transparent);padding:40px 16px 12px;opacity:0;transition:opacity 0.3s ease;pointer-events:none;display:none">
          <!-- Progress bar -->
          <div class="spurno-progress" style="width:100%;height:4px;background:rgba(255,255,255,0.2);border-radius:2px;cursor:pointer;margin-bottom:10px;position:relative">
            <div class="spurno-progress-filled" style="width:0%;height:100%;background:linear-gradient(90deg,#6c63ff,#e040fb);border-radius:2px;transition:width 0.1s linear"></div>
            <div class="spurno-progress-thumb" style="position:absolute;top:50%;transform:translate(-50%,-50%);width:12px;height:12px;border-radius:50%;background:#6c63ff;left:0%;opacity:0;transition:opacity 0.2s;box-shadow:0 0 6px rgba(108,99,255,0.5)"></div>
          </div>
          <!-- Controls row -->
          <div style="display:flex;align-items:center;gap:12px">
            <button class="spurno-btn spurno-play-pause" style="background:none;border:none;color:white;cursor:pointer;padding:4px;font-size:1.1rem;display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;transition:background 0.2s" title="Play/Pause">
              <i class="fas fa-play"></i>
            </button>
            <div style="display:flex;align-items:center;gap:6px;flex:1">
              <span class="spurno-time-current" style="font-size:0.75rem;color:rgba(255,255,255,0.8);font-variant-numeric:tabular-nums;min-width:36px">0:00</span>
              <span style="font-size:0.75rem;color:rgba(255,255,255,0.4)">/</span>
              <span class="spurno-time-total" style="font-size:0.75rem;color:rgba(255,255,255,0.6);font-variant-numeric:tabular-nums;min-width:36px">0:00</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              <button class="spurno-btn spurno-volume" style="background:none;border:none;color:white;cursor:pointer;padding:4px;font-size:0.95rem;display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;transition:background 0.2s" title="Mute/Unmute">
                <i class="fas fa-volume-up"></i>
              </button>
              <button class="spurno-btn spurno-fullscreen" style="background:none;border:none;color:white;cursor:pointer;padding:4px;font-size:0.9rem;display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;transition:background 0.2s" title="Fullscreen">
                <i class="fas fa-expand"></i>
              </button>
            </div>
          </div>
        </div>
        ` : ''}
      </div>
    `;
  },

  escapeAttr(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  },

  /**
   * Initialize all video players on the page
   */
  init() {
    document.querySelectorAll('.spurno-player').forEach(player => {
      this.setupPlayer(player);
    });
  },

  /**
   * Initialize a single player by its element
   */
  setupPlayer(playerEl) {
    if (playerEl.dataset.spurnoInitialized) return;
    playerEl.dataset.spurnoInitialized = 'true';

    const video = playerEl.querySelector('.spurno-video');
    const poster = playerEl.querySelector('.spurno-poster');
    const controls = playerEl.querySelector('.spurno-controls');
    const watermarkOverlay = playerEl.querySelector('.spurno-watermark-overlay');
    const playBtn = playerEl.querySelector('.spurno-play-btn');
    const playPauseBtn = controls?.querySelector('.spurno-play-pause');
    const progressFilled = controls?.querySelector('.spurno-progress-filled');
    const progressThumb = controls?.querySelector('.spurno-progress-thumb');
    const progressBar = controls?.querySelector('.spurno-progress');
    const timeCurrent = controls?.querySelector('.spurno-time-current');
    const timeTotal = controls?.querySelector('.spurno-time-total');
    const volumeBtn = controls?.querySelector('.spurno-volume');
    const fullscreenBtn = controls?.querySelector('.spurno-fullscreen');

    if (!video) return;

    let isPlaying = false;
    let controlsTimeout = null;
    let isDragging = false;

    // Format time
    const formatTime = (s) => {
      if (isNaN(s) || !isFinite(s)) return '0:00';
      const m = Math.floor(s / 60);
      const sec = Math.floor(s % 60);
      return `${m}:${sec.toString().padStart(2, '0')}`;
    };

    // Show controls
    const showControls = () => {
      if (controls) {
        controls.style.opacity = '1';
        controls.style.pointerEvents = 'all';
        controls.style.display = 'block';
      }
      clearTimeout(controlsTimeout);
      if (isPlaying) {
        controlsTimeout = setTimeout(() => {
          if (controls && !isDragging) {
            controls.style.opacity = '0';
            controls.style.pointerEvents = 'none';
          }
        }, 3000);
      }
    };

    // Hide controls
    const hideControls = () => {
      if (!isPlaying) return;
      clearTimeout(controlsTimeout);
      if (controls && !isDragging) {
        controls.style.opacity = '0';
        controls.style.pointerEvents = 'none';
      }
    };

    // Update progress
    const updateProgress = () => {
      if (!video.duration) return;
      const pct = (video.currentTime / video.duration) * 100;
      if (progressFilled) progressFilled.style.width = `${pct}%`;
      if (progressThumb) progressThumb.style.left = `${pct}%`;
      if (timeCurrent) timeCurrent.textContent = formatTime(video.currentTime);
    };

    // Play
    const play = () => {
      video.play().then(() => {
        isPlaying = true;
        if (poster) poster.style.opacity = '0';
        if (poster) setTimeout(() => { poster.style.display = 'none'; }, 400);
        if (watermarkOverlay) watermarkOverlay.style.display = 'block';
        if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        if (controls) {
          controls.style.display = 'block';
          showControls();
        }
      }).catch(e => {
        // Autoplay blocked - keep poster visible
        console.log('Play prevented:', e.message);
      });
    };

    // Pause
    const pause = () => {
      video.pause();
      isPlaying = false;
      if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      if (controls) {
        controls.style.opacity = '1';
        controls.style.pointerEvents = 'all';
        controls.style.display = 'block';
        clearTimeout(controlsTimeout);
      }
    };

    // Toggle play/pause
    const togglePlay = () => {
      if (video.paused) {
        play();
      } else {
        pause();
      }
    };

    // Click on player to toggle
    playerEl.addEventListener('click', (e) => {
      // Don't toggle if clicking controls or progress
      if (e.target.closest('.spurno-controls') || e.target.closest('.spurno-watermark')) return;
      togglePlay();
    });

    // Double-click for fullscreen
    playerEl.addEventListener('dblclick', () => {
      toggleFullscreen();
    });

    // Play button click
    playBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      play();
    });

    // Play/pause button
    playPauseBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlay();
    });

    // Progress bar
    if (progressBar) {
      progressBar.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        isDragging = true;
        seekFromEvent(e);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });

      progressBar.addEventListener('click', (e) => {
        e.stopPropagation();
        seekFromEvent(e);
      });

      const onMouseMove = (e) => {
        seekFromEvent(e);
      };

      const onMouseUp = () => {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        showControls();
      };

      const seekFromEvent = (e) => {
        const rect = progressBar.getBoundingClientRect();
        const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        if (video.duration) {
          video.currentTime = pct * video.duration;
          updateProgress();
        }
      };

      // Touch support
      progressBar.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        isDragging = true;
        const touch = e.touches[0];
        seekFromTouch(touch);
      }, { passive: true });

      progressBar.addEventListener('touchmove', (e) => {
        e.stopPropagation();
        const touch = e.touches[0];
        seekFromTouch(touch);
      }, { passive: true });

      progressBar.addEventListener('touchend', () => {
        isDragging = false;
      });

      const seekFromTouch = (touch) => {
        const rect = progressBar.getBoundingClientRect();
        const pct = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
        if (video.duration) {
          video.currentTime = pct * video.duration;
          updateProgress();
        }
      };
    }

    // Mouse move on player - show controls
    playerEl.addEventListener('mousemove', showControls);
    playerEl.addEventListener('mouseleave', hideControls);

    // Touch on player
    let touchTimeout = null;
    playerEl.addEventListener('touchstart', () => {
      showControls();
      clearTimeout(touchTimeout);
      touchTimeout = setTimeout(() => {
        if (isPlaying) hideControls();
      }, 3000);
    }, { passive: true });

    // Video events
    video.addEventListener('timeupdate', updateProgress);

    video.addEventListener('loadedmetadata', () => {
      if (timeTotal) timeTotal.textContent = formatTime(video.duration);
    });

    video.addEventListener('ended', () => {
      isPlaying = false;
      if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-redo"></i>';
      if (controls) {
        controls.style.opacity = '1';
        controls.style.pointerEvents = 'all';
      }
      clearTimeout(controlsTimeout);
    });

    // Volume toggle
    volumeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      volumeBtn.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    });

    // Fullscreen
    const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
        if (playerEl.requestFullscreen) {
          playerEl.requestFullscreen();
        } else if (playerEl.webkitRequestFullscreen) {
          playerEl.webkitRequestFullscreen();
        } else if (playerEl.msRequestFullscreen) {
          playerEl.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    };

    fullscreenBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFullscreen();
    });

    document.addEventListener('fullscreenchange', () => {
      if (fullscreenBtn) {
        fullscreenBtn.innerHTML = document.fullscreenElement 
          ? '<i class="fas fa-compress"></i>' 
          : '<i class="fas fa-expand"></i>';
      }
    });

    // Keyboard shortcuts
    playerEl.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Space') {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
      if (e.key === 'm' || e.key === 'M') {
        video.muted = !video.muted;
        if (volumeBtn) {
          volumeBtn.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
        }
      }
    });

    // Make player focusable
    playerEl.setAttribute('tabindex', '0');
  }
};
