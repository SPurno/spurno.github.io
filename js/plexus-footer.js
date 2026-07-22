(function() {
  var footer = document.querySelector('.footer');
  if (!footer) return;

  var canvas = document.createElement('canvas');
  canvas.className = 'plexus-canvas';
  canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:0;';
  footer.style.position = 'relative';
  footer.style.overflow = 'hidden';
  footer.insertBefore(canvas, footer.firstChild);

  var ctx = canvas.getContext('2d');
  var particles = [];
  var mouse = { x: -999, y: -999 };
  var w, h;

  var COLORS = [
    'rgba(0,113,227,',
    'rgba(41,151,255,',
    'rgba(0,119,237,'
  ];

  function resize() {
    w = canvas.width = footer.offsetWidth;
    h = canvas.height = footer.offsetHeight;
  }

  function Particle() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.25;
    this.vy = (Math.random() - 0.5) * 0.25;
    this.radius = Math.random() * 1.8 + 1;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.opacity = Math.random() * 0.4 + 0.3;
  }

  var count = 0;
  function init() {
    resize();
    count = Math.min(Math.floor(w * h / 18000), 50);
    count = Math.max(count, 20);
    particles = [];
    for (var i = 0; i < count; i++) particles.push(new Particle());
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (var i = 0; i < count; i++) {
      var p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.opacity + ')';
      ctx.fill();

      var dx = mouse.x - p.x;
      var dy = mouse.y - p.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = p.color + (0.35 * (1 - dist / 180)) + ')';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      for (var j = i + 1; j < count; j++) {
        var q = particles[j];
        var dx2 = p.x - q.x;
        var dy2 = p.y - q.y;
        var dist2 = dx2 * dx2 + dy2 * dy2;

        if (dist2 < 18000) {
          var alpha = (1 - dist2 / 18000) * 0.55;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = p.color + alpha + ')';
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  function onMouse(e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }

  function onLeave() {
    mouse.x = -999;
    mouse.y = -999;
  }

  window.addEventListener('resize', init);
  footer.addEventListener('mousemove', onMouse);
  footer.addEventListener('mouseleave', onLeave);

  init();
  draw();
})();
