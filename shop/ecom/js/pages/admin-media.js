// ============================================
// ShopVerse — Admin Media Manager
// Uploads via Cloudinary unsigned upload
// Auto-configured with cloud.txt credentials
// ============================================

const AdminMedia = {
  currentFilter: 'all',
  uploadQueue: [],

  async render() {
    const container = document.getElementById('adminContent');
    container.innerHTML = `
      <div class="media-manager page-enter">
        <!-- Toolbar -->
        <div class="media-toolbar">
          <div style="display:flex;align-items:center;gap:12px">
            <h3 style="font-size:1rem;font-weight:600">Media Library</h3>
            <span class="media-count" id="mediaCount" style="font-size:0.85rem;color:var(--text-muted)">0 files</span>
          </div>
          <div style="display:flex;gap:8px;align-items:center">
            <div class="media-filter-group">
              <button class="media-filter-btn active" data-filter="all" onclick="AdminMedia.setFilter('all')">All</button>
              <button class="media-filter-btn" data-filter="image" onclick="AdminMedia.setFilter('image')">
                <i class="fas fa-image"></i> Images
              </button>
              <button class="media-filter-btn" data-filter="video" onclick="AdminMedia.setFilter('video')">
                <i class="fas fa-video"></i> Videos
              </button>
            </div>
            <button class="btn btn-primary btn-sm" onclick="AdminMedia.openUploader()">
              <i class="fas fa-cloud-upload-alt"></i> Upload
            </button>
          </div>
        </div>

        <!-- Upload progress area -->
        <div class="media-upload-area" id="mediaUploadArea" style="display:none">
          <div class="media-upload-dropzone" id="mediaDropzone">
            <div class="media-upload-icon">
              <i class="fas fa-cloud-upload-alt"></i>
            </div>
            <div style="font-weight:600;font-size:1rem">Drop files here or click to browse</div>
            <div style="font-size:0.85rem;color:var(--text-muted);margin-top:4px">
              Supports images (JPG, PNG, WebP) and videos (MP4, WebM)
            </div>
            <input type="file" id="mediaFileInput" accept="image/*,video/*" multiple style="display:none">
            <button class="btn btn-secondary btn-sm" style="margin-top:12px" onclick="document.getElementById('mediaFileInput').click()">
              <i class="fas fa-folder-open"></i> Browse Files
            </button>
          </div>
          <div class="media-upload-progress" id="mediaUploadProgress"></div>
        </div>

        <!-- Media grid -->
        <div class="media-grid" id="mediaGrid">
          <div style="text-align:center;padding:60px;color:var(--text-muted)">
            <div class="loader-spinner" style="margin:0 auto 12px"></div>
            Loading media...
          </div>
        </div>
      </div>
    `;

    // Auto-configure Cloudinary and enable uploads
    this.autoConfigureCloudinary();
    await this.loadMedia();
    this.setupUploadHandlers();
  },

  autoConfigureCloudinary() {
    // Save the Cloudinary config directly from cloud.txt — no form needed
    localStorage.setItem('shop_cloudinary_config', JSON.stringify({
      cloudName: 'pzyegeqn',
      apiKey: '799412167264845',
      uploadPreset: 'animation_studio'
    }));

    // Always enable the dropzone
    const dropzone = document.getElementById('mediaDropzone');
    if (dropzone) dropzone.style.pointerEvents = 'all';

    // Hide the config prompt if it exists
    const prompt = document.getElementById('mediaConfigPrompt');
    if (prompt) prompt.style.display = 'none';
  },

  getCloudinaryConfig() {
    const config = localStorage.getItem('shop_cloudinary_config');
    if (!config) return null;
    try {
      const parsed = JSON.parse(config);
      if (parsed.cloudName && parsed.uploadPreset) return parsed;
      return null;
    } catch (e) {
      return null;
    }
  },

  setupUploadHandlers() {
    const dropzone = document.getElementById('mediaDropzone');
    const fileInput = document.getElementById('mediaFileInput');
    if (!dropzone || !fileInput) return;

    dropzone.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') {
        fileInput.click();
      }
    });

    fileInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        this.uploadFiles(files);
      }
      fileInput.value = '';
    });

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      const files = Array.from(e.dataTransfer.files).filter(f =>
        f.type.startsWith('image/') || f.type.startsWith('video/')
      );
      if (files.length > 0) {
        this.uploadFiles(files);
      } else {
        Components.toast('Please drop image or video files only', 'warning');
      }
    });
  },

  setFilter(filter) {
    this.currentFilter = filter;
    document.querySelectorAll('.media-filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    this.renderMediaGrid();
  },

  async loadMedia() {
    try {
      const media = await DB.getMedia({});
      this.allMedia = media;
      this.renderMediaGrid();
      const count = document.getElementById('mediaCount');
      if (count) count.textContent = `${media.length} files`;
    } catch (error) {
      console.error('Load media error:', error);
      const grid = document.getElementById('mediaGrid');
      if (grid) {
        grid.innerHTML = Components.emptyState('😔', 'Failed to load media', error.message);
      }
    }
  },

  renderMediaGrid() {
    const grid = document.getElementById('mediaGrid');
    if (!grid) return;

    let filtered = this.allMedia || [];
    if (this.currentFilter !== 'all') {
      filtered = filtered.filter(m => m.media_type === this.currentFilter);
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="media-empty">
          <div style="font-size:3rem;margin-bottom:16px;opacity:0.3">
            <i class="fas fa-${this.currentFilter === 'video' ? 'video' : 'image'}"></i>
          </div>
          <h3 style="margin-bottom:8px">
            ${this.allMedia && this.allMedia.length > 0 ? 'No matching files' : 'No media uploaded yet'}
          </h3>
          <p style="color:var(--text-muted);font-size:0.9rem">
            ${this.allMedia && this.allMedia.length > 0 ? 'Try a different filter.' : 'Upload images and videos to use in your products.'}
          </p>
          ${this.allMedia && this.allMedia.length === 0 ? `
          <button class="btn btn-primary" style="margin-top:16px" onclick="document.getElementById('mediaFileInput')?.click()">
            <i class="fas fa-cloud-upload-alt"></i> Upload Your First File
          </button>` : ''}
        </div>
      `;
      return;
    }

    grid.innerHTML = `
      <div class="media-grid-items">
        ${filtered.map(m => this.mediaCard(m)).join('')}
      </div>
    `;
  },

  mediaCard(media) {
    const isVideo = media.media_type === 'video';
    const sizeStr = media.size ? this.formatFileSize(media.size) : '';
    const dateStr = media.created_at ? new Date(media.created_at).toLocaleDateString() : '';

    return `
      <div class="media-item" data-media-id="${media.id}" data-media-type="${media.media_type}">
        <div class="media-item-preview">
          ${isVideo ? `
            <div class="media-item-video-thumb">
              ${media.thumbnail_url ? `<img src="${media.thumbnail_url}" alt="${media.original_name}" loading="lazy">` :
                `<div style="display:flex;align-items:center;justify-content:center;height:100%;background:var(--bg-input);font-size:2rem;color:var(--text-muted)"><i class="fas fa-video"></i></div>`}
              <div class="media-item-video-icon"><i class="fas fa-play"></i></div>
            </div>
          ` : `
            <img src="${media.secure_url || media.url}" alt="${media.original_name || media.filename}" loading="lazy">
          `}
        </div>
        <div class="media-item-info">
          <div class="media-item-name" title="${media.original_name}">${media.original_name}</div>
          <div class="media-item-meta">
            <span>${media.format?.toUpperCase() || ''}</span>
            ${sizeStr ? `<span>${sizeStr}</span>` : ''}
            ${dateStr ? `<span>${dateStr}</span>` : ''}
          </div>
        </div>
        <div class="media-item-actions">
          <button class="media-action-btn" onclick="AdminMedia.copyUrl(${media.id})" title="Copy URL">
            <i class="fas fa-link"></i>
          </button>
          ${isVideo ? `
          <button class="media-action-btn" onclick="AdminMedia.insertVideoUrl(${media.id})" title="Use in Product">
            <i class="fas fa-tag"></i>
          </button>` : `
          <button class="media-action-btn" onclick="AdminMedia.insertImageUrl(${media.id})" title="Use as Image">
            <i class="fas fa-tag"></i>
          </button>`}
          <button class="media-action-btn delete" onclick="AdminMedia.confirmDelete(${media.id})" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  },

  formatFileSize(bytes) {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  },

  openUploader() {
    const area = document.getElementById('mediaUploadArea');
    if (area) {
      area.style.display = area.style.display === 'none' ? 'block' : 'none';
      if (area.style.display === 'block') {
        area.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  },

  async uploadFiles(files) {
    const config = this.getCloudinaryConfig();
    if (!config) {
      Components.toast('Cloudinary not configured. Please check the console.', 'error');
      return;
    }

    const area = document.getElementById('mediaUploadArea');
    if (area) area.style.display = 'block';

    const progressContainer = document.getElementById('mediaUploadProgress');

    for (const file of files) {
      if (file.size > 100 * 1024 * 1024) {
        Components.toast(`"${file.name}" is too large (max 100MB)`, 'error');
        continue;
      }

      const uploadId = 'upload_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
      const isVideo = file.type.startsWith('video/');

      const progressItem = document.createElement('div');
      progressItem.className = 'media-upload-item';
      progressItem.id = uploadId;
      progressItem.innerHTML = `
        <div class="media-upload-item-info">
          <div class="media-upload-item-name">${file.name}</div>
          <div class="media-upload-item-size">${this.formatFileSize(file.size)}</div>
        </div>
        <div class="media-upload-item-bar">
          <div class="media-upload-item-fill" style="width:0%"></div>
        </div>
        <div class="media-upload-item-status" style="color:var(--text-muted);font-size:0.75rem">Preparing...</div>
      `;
      progressContainer.appendChild(progressItem);

      try {
        const updateProgress = (pct) => {
          const fill = progressItem.querySelector('.media-upload-item-fill');
          const status = progressItem.querySelector('.media-upload-item-status');
          if (fill) fill.style.width = `${pct}%`;
          if (status) status.textContent = `${Math.round(pct)}%`;
        };

        updateProgress(5);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', config.uploadPreset);
        if (config.apiKey) {
          formData.append('api_key', config.apiKey);
        }
        if (isVideo) {
          formData.append('resource_type', 'video');
        }

        updateProgress(10);

        const resourceType = isVideo ? 'video' : 'image';
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const pct = 10 + (e.loaded / e.total) * 80;
            updateProgress(pct);
          }
        };

        const result = await new Promise((resolve, reject) => {
          xhr.open('POST', `https://api.cloudinary.com/v1_1/${config.cloudName}/${resourceType}/upload`);
          xhr.onload = () => {
            if (xhr.status === 200) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              try {
                const err = JSON.parse(xhr.responseText);
                reject(new Error(err.error?.message || 'Upload failed'));
              } catch {
                reject(new Error(`Upload failed (${xhr.status})`));
              }
            }
          };
          xhr.onerror = () => reject(new Error('Network error'));
          xhr.send(formData);
        });

        updateProgress(95);

        await DB.addMedia({
          filename: result.public_id + '.' + result.format,
          original_name: file.name,
          url: result.url,
          secure_url: result.secure_url,
          public_id: result.public_id,
          media_type: isVideo ? 'video' : 'image',
          format: result.format,
          size: result.bytes,
          width: result.width || null,
          height: result.height || null,
          duration: result.duration || null,
          thumbnail_url: isVideo ? (result.secure_url?.replace('/upload/', '/upload/w_400,h_225,c_fill/') || null) : null
        });

        updateProgress(100);
        const status = progressItem.querySelector('.media-upload-item-status');
        if (status) {
          status.innerHTML = '<i class="fas fa-check" style="color:var(--success)"></i> Uploaded';
        }

        Components.toast(`"${file.name}" uploaded successfully`, 'success');
      } catch (error) {
        console.error('Upload error:', error);
        const fill = progressItem.querySelector('.media-upload-item-fill');
        const status = progressItem.querySelector('.media-upload-item-status');
        if (fill) fill.style.background = 'var(--error)';
        if (status) {
          status.innerHTML = `<i class="fas fa-times" style="color:var(--error)"></i> ${error.message}`;
        }
        Components.toast(`Failed to upload "${file.name}": ${error.message}`, 'error');
      }
    }

    setTimeout(() => this.loadMedia(), 1000);
  },

  async copyUrl(mediaId) {
    try {
      const media = await DB.getMediaById(mediaId);
      if (media) {
        await navigator.clipboard.writeText(media.secure_url || media.url);
        Components.toast('URL copied to clipboard!', 'success');
      }
    } catch (error) {
      Components.toast('Failed to copy URL', 'error');
    }
  },

  async insertImageUrl(mediaId) {
    try {
      const media = await DB.getMediaById(mediaId);
      if (media) {
        await navigator.clipboard.writeText(media.secure_url || media.url);
        Components.toast('Image URL copied! Paste it in the product form.', 'success');
        AdminPage.switchTab('products');
      }
    } catch (error) {
      Components.toast('Failed to copy URL', 'error');
    }
  },

  async insertVideoUrl(mediaId) {
    try {
      const media = await DB.getMediaById(mediaId);
      if (media) {
        const url = media.secure_url || media.url;
        sessionStorage.setItem('shop_pending_media_url', url);
        sessionStorage.setItem('shop_pending_media_type', 'video');
        await navigator.clipboard.writeText(url);
        Components.toast('Video URL copied! Creating a video product...', 'success');
        AdminPage.switchTab('products');
        setTimeout(async () => {
          const categories = await DB.getCategories();
          AdminPage.showProductForm(null, categories);
          setTimeout(() => {
            const mt = document.getElementById('pf_media_type');
            if (mt) mt.value = 'video';
            AdminPage.toggleMediaTypeFields();
            const vu = document.getElementById('pf_video_url');
            if (vu) vu.value = url;
          }, 100);
        }, 300);
      }
    } catch (error) {
      Components.toast('Failed to copy URL', 'error');
    }
  },

  async confirmDelete(mediaId) {
    try {
      const media = await DB.getMediaById(mediaId);
      if (!media) return;

      Components.showModal('Delete Media', `
        <p style="color:var(--text-secondary);margin-bottom:20px">
          Are you sure you want to delete <strong>${media.original_name}</strong>? This action cannot be undone.
        </p>
        <div style="display:flex;gap:12px">
          <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
          <button class="btn btn-primary" style="background:var(--error)" onclick="AdminMedia.deleteMedia(${mediaId})">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      `);
    } catch (error) {
      Components.toast('Failed to load media details', 'error');
    }
  },

  async deleteMedia(mediaId) {
    try {
      await DB.deleteMedia(mediaId);
      Components.toast('Media deleted', 'success');
      document.querySelector('.modal-overlay')?.remove();
      this.loadMedia();
    } catch (error) {
      Components.toast('Failed to delete', 'error');
    }
  }
};
