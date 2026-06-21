import * as THREE from 'three';

// ============================================
// LIGHT PARTICLE BACKGROUND
// ============================================

let sceneReady = false;
const loadingScreen = document.getElementById('loading-screen');
const canvas = document.getElementById('three-canvas');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 0.5, 12);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;  renderer.toneMappingExposure = 0.6;
canvas.appendChild(renderer.domElement);

// ============================================
// 1. LIGHT PARTICLES
// ============================================
// Floating light particles that drift and glow around the scene
const particleCount = 600;
const lightParticles = new THREE.BufferGeometry();
const lpPos = new Float32Array(particleCount * 3);
const lpCol = new Float32Array(particleCount * 3);
const lpSiz = new Float32Array(particleCount);
const lpVel = new Float32Array(particleCount * 3);
const lpPhase = new Float32Array(particleCount);
const lpDrift = new Float32Array(particleCount);

const palettes = [
  [1.0, 0.85, 0.5],  // warm gold
  [1.0, 0.7, 0.8],   // soft pink
  [0.5, 0.8, 1.0],   // sky blue
  [1.0, 1.0, 1.0],   // white
  [0.6, 1.0, 0.9],   // mint
  [0.9, 0.6, 1.0],   // lavender
  [1.0, 0.9, 0.6],   // peach
  [0.7, 0.9, 1.0],   // ice blue
];

for (let i = 0; i < particleCount; i++) {
  // Spread particles in a wide area around the scene
  const range = 15, heightRange = 8, depthRange = 16;
  lpPos[i*3] = (Math.random() - 0.5) * range;
  lpPos[i*3+1] = Math.random() * heightRange - 1;
  lpPos[i*3+2] = (Math.random() - 0.5) * depthRange - 3;
  
  // Pick a color from the palette
  const pal = palettes[Math.floor(Math.random() * palettes.length)];
  const bright = 0.5 + Math.random() * 0.5;
  lpCol[i*3] = pal[0] * bright;
  lpCol[i*3+1] = pal[1] * bright;
  lpCol[i*3+2] = pal[2] * bright;
  
  // Size varies from small sparkles to larger glows
  lpSiz[i] = 0.04 + Math.random() * 0.2;
  
  // Slow drifting velocity
  lpVel[i*3] = (Math.random() - 0.5) * 0.004;
  lpVel[i*3+1] = (Math.random() - 0.5) * 0.003;
  lpVel[i*3+2] = (Math.random() - 0.5) * 0.002;
  
  lpPhase[i] = Math.random() * Math.PI * 2;
  lpDrift[i] = 0.3 + Math.random() * 0.7;
}

lightParticles.setAttribute('position', new THREE.BufferAttribute(lpPos, 3));
lightParticles.setAttribute('color', new THREE.BufferAttribute(lpCol, 3));
lightParticles.setAttribute('size', new THREE.BufferAttribute(lpSiz, 1));

const lpMaterial = new THREE.PointsMaterial({
  size: 0.08,
  vertexColors: true,
  transparent: true,
  opacity: 0.7,
  blending: THREE.AdditiveBlending,
  sizeAttenuation: true,
  depthWrite: false,
});
const particles = new THREE.Points(lightParticles, lpMaterial);
scene.add(particles);

// ============================================
// 2. STARS
// ============================================
const starCount = 2500;
const sGeo = new THREE.BufferGeometry();
const sPos = new Float32Array(starCount * 3);
const sCol = new Float32Array(starCount * 3);
const sSiz = new Float32Array(starCount);
const sTwinkle = new Float32Array(starCount);
const sSpeed = new Float32Array(starCount);
for (let i = 0; i < starCount; i++) {
  const theta = Math.random() * Math.PI * 2, phi = Math.acos(2 * Math.random() - 1), r = 20 + Math.random() * 60;
  sPos[i*3] = Math.sin(phi)*Math.cos(theta)*r;
  sPos[i*3+1] = Math.sin(phi)*Math.sin(theta)*r*0.5 + 2;
  sPos[i*3+2] = Math.cos(phi)*r - 5;
  const rn = Math.random();
  if (rn < 0.2) {
    sCol[i*3]=1; sCol[i*3+1]=0.88+Math.random()*0.12; sCol[i*3+2]=0.5+Math.random()*0.3;
  } else if (rn < 0.4) {
    sCol[i*3]=0.6+Math.random()*0.2; sCol[i*3+1]=0.7+Math.random()*0.2; sCol[i*3+2]=1;
  } else {
    const w = 0.8+Math.random()*0.2; sCol[i*3]=w; sCol[i*3+1]=w; sCol[i*3+2]=w;
  }
  sSiz[i] = 0.06 + Math.random() * 0.18;
  sTwinkle[i] = Math.random() * Math.PI * 2;
  sSpeed[i] = 0.2 + Math.random() * 0.6;
}
sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
sGeo.setAttribute('color', new THREE.BufferAttribute(sCol, 3));
sGeo.setAttribute('size', new THREE.BufferAttribute(sSiz, 1));
const stars = new THREE.Points(sGeo, new THREE.PointsMaterial({
  size: 0.06, vertexColors: true, transparent: true, opacity: 0.8,
  blending: THREE.AdditiveBlending, sizeAttenuation: true, depthWrite: false,
}));
scene.add(stars);



// ============================================
// MOUSE
// ============================================
let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0, curX = 0, curY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});
window.addEventListener('deviceorientation', (e) => {
  if (e.gamma !== null && e.beta !== null) {
    mouseX = Math.max(-1, Math.min(1, e.gamma / 45));
    mouseY = Math.max(-1, Math.min(1, (e.beta - 45) / 45));
  }
});

// ============================================
// LOADING
// ============================================
const loadStart = performance.now();
const MIN_LOAD = 2000;
let fontsReady = false, sceneRendered = false;
if (window.__fontsPromise) window.__fontsPromise.then(() => { fontsReady = true; check(); });
else fontsReady = true;
function hide() { if (!sceneReady) { sceneReady = true; loadingScreen.classList.add('hidden'); } }
function check() {
  if (!fontsReady || !sceneRendered) return;
  const el = performance.now() - loadStart;
  if (el >= MIN_LOAD) hide();
  else setTimeout(check, MIN_LOAD - el);
}
setTimeout(hide, 6000);

// ============================================
// ANIMATION
// ============================================
const clock = new THREE.Clock();
let frames = 0;

function animate() {
  clock.getDelta();
  frames++;
  if (!sceneRendered && frames >= 3) { sceneRendered = true; check(); }

  targetX = mouseX * 2; targetY = mouseY * 1.2;
  curX += (targetX - curX) * 0.03; curY += (targetY - curY) * 0.03;
  camera.position.x = curX * 0.6; camera.position.y = 0.5 + curY * 0.3;
  camera.lookAt(0, 1.5, -3);

  const t = clock.elapsedTime;

  // --- Light Particles ---
  const pp = lightParticles.attributes.position.array;
  const ps = lightParticles.attributes.size.array;
  for (let i = 0; i < particleCount; i++) {
    // Drift with organic sine-wave motion
    pp[i*3] += lpVel[i*3] + Math.sin(t * 0.08 + lpPhase[i]) * 0.002 * lpDrift[i];
    pp[i*3+1] += lpVel[i*3+1] + Math.sin(t * 0.06 + lpPhase[i] * 1.3) * 0.002 * lpDrift[i];
    pp[i*3+2] += lpVel[i*3+2] + Math.sin(t * 0.04 + lpPhase[i] * 0.7) * 0.001 * lpDrift[i];
    // Wrap around edges for infinite flow
    if (pp[i*3] > 8) pp[i*3] = -8; if (pp[i*3] < -8) pp[i*3] = 8;
    if (pp[i*3+1] > 7) pp[i*3+1] = -1; if (pp[i*3+1] < -1) pp[i*3+1] = 7;
    if (pp[i*3+2] > 5) pp[i*3+2] = -12; if (pp[i*3+2] < -12) pp[i*3+2] = 5;
    // Pulse size for a gentle breathing glow effect
    const breathe = 0.6 + 0.4 * Math.sin(t * 0.5 + lpPhase[i] * 1.5);
    ps[i] = lpSiz[i] * breathe;
  }
  lightParticles.attributes.position.needsUpdate = true;
  lightParticles.attributes.size.needsUpdate = true;
  // Gentle overall opacity pulse
  lpMaterial.opacity = 0.55 + 0.15 * Math.sin(t * 0.08);

  // --- Stars twinkle ---
  const szAttr = stars.geometry.attributes.size;
  for (let i = 0; i < starCount; i++) {
    const tw = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * sSpeed[i] * 0.5 + sTwinkle[i]));
    szAttr.array[i] = sSiz[i] * tw;
  }
  szAttr.needsUpdate = true;
  stars.material.opacity = 0.6 + 0.2 * Math.sin(t * 0.05);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ===== SCROLL TO TOP BUTTON =====
const scrollBtn = document.getElementById('scrollTopBtn');
if (scrollBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================
// SCROLL REVEAL
// ============================================
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));

const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 80); });

const nt = document.getElementById('navToggle'), nl = document.getElementById('navLinks');
nt.addEventListener('click', () => nl.classList.toggle('open'));
nl.querySelectorAll('a').forEach((l) => l.addEventListener('click', () => nl.classList.remove('open')));

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  if (a.hasAttribute('data-language')) return;
  a.addEventListener('click', (e) => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
