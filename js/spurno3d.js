import * as THREE from 'three';

// ============================================
// LIQUID GLASS BACKGROUND
// ============================================

let sceneReady = false;
const loadingScreen = document.getElementById('loading-screen');
const canvas = document.getElementById('three-canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a12);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0.5, 4.5);

const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.outputColorSpace = THREE.SRGBColorSpace;
canvas.appendChild(renderer.domElement);

// ============================================
// 1. LIQUID GLASS OBJECT (Morphing Icosahedron)
// ============================================
const geo = new THREE.IcosahedronGeometry(1.2, 3);
const pos = geo.attributes.position;
const origPos = new Float32Array(pos.array);

// Store random offsets per vertex for morphing
const vertexCount = pos.count;
const offsets = new Float32Array(vertexCount);
const speeds = new Float32Array(vertexCount);
const phases = new Float32Array(vertexCount);
for (let i = 0; i < vertexCount; i++) {
    offsets[i] = 0.15 + Math.random() * 0.45;
    speeds[i] = 0.3 + Math.random() * 0.7;
    phases[i] = Math.random() * Math.PI * 2;
}

const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x88bbff,
    metalness: 0.1,
    roughness: 0.05,
    transparent: true,
    opacity: 0.92,
    envMapIntensity: 2.0,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,
    ior: 1.6,
    reflectivity: 0.9,
    wireframe: false,
    side: THREE.DoubleSide,
});
const glassMesh = new THREE.Mesh(geo, glassMat);
glassMesh.position.y = 0.2;
scene.add(glassMesh);

// Wireframe overlay (separate geometry, updated by copying positions)
const wireMat = new THREE.MeshBasicMaterial({
    color: 0x88ddff,
    wireframe: true,
    transparent: true,
    opacity: 0.08,
});
const wireMesh = new THREE.Mesh(geo.clone(), wireMat);
wireMesh.position.y = 0.2;
scene.add(wireMesh);

// Inner glow sphere
const glowGeo = new THREE.SphereGeometry(0.6, 24, 24);
const glowMat = new THREE.MeshBasicMaterial({
    color: 0x4488ff,
    transparent: true,
    opacity: 0.15,
});
const glowMesh = new THREE.Mesh(glowGeo, glowMat);
glowMesh.position.y = 0.2;
scene.add(glowMesh);

// Internal point light
const pointLight = new THREE.PointLight(0xff66aa, 3, 8);
pointLight.position.set(0, 1.5, 0);
scene.add(pointLight);

// ============================================
// 2. FLOATING PARTICLES
// ============================================
const particleCount = 600;
const pGeo = new THREE.BufferGeometry();
const pPos = new Float32Array(particleCount * 3);
const pSizes = new Float32Array(particleCount);
const pOffsets = new Float32Array(particleCount);
const pSpeeds = new Float32Array(particleCount);

for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 2.0 + Math.random() * 2.8;
    pPos[i*3] = Math.sin(phi) * Math.cos(theta) * r;
    pPos[i*3+1] = Math.sin(phi) * Math.sin(theta) * r * 0.6 + 0.2;
    pPos[i*3+2] = Math.cos(phi) * r;
    pSizes[i] = 0.008 + Math.random() * 0.025;
    pOffsets[i] = Math.random() * Math.PI * 2;
    pSpeeds[i] = 0.1 + Math.random() * 0.3;
}
pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
pGeo.setAttribute('size', new THREE.BufferAttribute(pSizes, 1));

const pMat = new THREE.PointsMaterial({
    color: 0x88ccff,
    size: 0.02,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
});
const particles = new THREE.Points(pGeo, pMat);
scene.add(particles);

// ============================================
// 3. ORBITING LIGHT ORBS
// ============================================
const orbGroup = new THREE.Group();
const orbCount = 6;
for (let i = 0; i < orbCount; i++) {
    const orbGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const orbMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(i / orbCount, 0.8, 0.6),
        transparent: true,
        opacity: 0.8,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    const angle = (i / orbCount) * Math.PI * 2;
    const radius = 1.5;
    orb.position.set(Math.cos(angle) * radius, 0.2 + Math.sin(angle * 2) * 0.3, Math.sin(angle) * radius);
    orb.userData = { angle, radius, speed: 0.4 + Math.random() * 0.3, yOff: 0.3 };
    orbGroup.add(orb);
}
scene.add(orbGroup);

// ============================================
// 4. LIGHTING (ambient + directional)
// ============================================
const ambient = new THREE.AmbientLight(0x222244, 0.5);
scene.add(ambient);
const keyLight = new THREE.DirectionalLight(0x8888ff, 2.0);
keyLight.position.set(3, 4, 5);
scene.add(keyLight);
const fillLight = new THREE.DirectionalLight(0xff4488, 1.0);
fillLight.position.set(-3, 1, -2);
scene.add(fillLight);
const rimLight = new THREE.DirectionalLight(0x44ffff, 1.5);
rimLight.position.set(0, -2, -4);
scene.add(rimLight);

// ============================================
// MOUSE / TOUCH PARALLAX
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

    // Smooth mouse parallax
    targetX = mouseX * 1.5;
    targetY = mouseY * 0.8;
    curX += (targetX - curX) * 0.03;
    curY += (targetY - curY) * 0.03;
    camera.position.x = curX * 0.5;
    camera.position.y = 0.5 + curY * 0.25;
    camera.lookAt(0, 0.2, 0);

    const t = clock.elapsedTime;

    // --- Morph the glass shape ---
    const p = geo.attributes.position;
    const arr = p.array;
    for (let i = 0; i < arr.length; i += 3) {
        const vi = i / 3;
        const ox = origPos[vi*3];
        const oy = origPos[vi*3+1];
        const oz = origPos[vi*3+2];
        const off = offsets[vi];
        const spd = speeds[vi];
        const ph = phases[vi];
        const wave = Math.sin(t * spd + ph) * off;
        const wave2 = Math.cos(t * spd * 0.6 + ph * 1.3) * off * 0.4;
        const len = Math.sqrt(ox*ox + oy*oy + oz*oz) || 1;
        arr[i]   = ox + (ox/len) * (wave + wave2);
        arr[i+1] = oy + (oy/len) * (wave * 0.8 + wave2 * 0.6);
        arr[i+2] = oz + (oz/len) * (wave * 0.9 + wave2 * 0.7);
    }
    p.needsUpdate = true;
    geo.computeVertexNormals();

    // Update wireframe positions in-place (no new allocation)
    const wirePos = wireMesh.geometry.attributes.position;
    if (wirePos) {
        wirePos.array.set(arr);
        wirePos.needsUpdate = true;
    }

    // Pulse glow
    glowMat.opacity = 0.12 + Math.sin(t * 0.8) * 0.06;
    pointLight.intensity = 2.5 + Math.sin(t * 0.7) * 1.0;

    // Glass color shift
    const hueShift = (0.58 + Math.sin(t * 0.04) * 0.03) % 1;
    glassMat.color.setHSL(hueShift, 0.5, 0.55);

    // --- Animate particles (slow orbit) ---
    const pp = particles.geometry.attributes.position;
    for (let i = 0; i < particleCount; i++) {
        const theta = (i / particleCount) * Math.PI * 2 + t * pSpeeds[i] * 0.12;
        const r = 2.0 + Math.sin(t * pSpeeds[i] * 0.3 + pOffsets[i]) * 0.5;
        pp.array[i*3] = Math.cos(theta + pOffsets[i] * 0.5) * r;
        pp.array[i*3+2] = Math.sin(theta + pOffsets[i] * 0.5) * r;
    }
    pp.needsUpdate = true;

    // Particle opacity pulse
    pMat.opacity = 0.4 + 0.15 * Math.sin(t * 0.05);

    // --- Animate orbiting light orbs ---
    orbGroup.children.forEach((orb, i) => {
        const { angle, radius, speed, yOff } = orb.userData;
        const a = angle + t * speed * 0.2;
        orb.position.x = Math.cos(a) * (radius + Math.sin(t * 0.5 + i) * 0.2);
        orb.position.z = Math.sin(a) * (radius + Math.cos(t * 0.4 + i * 1.2) * 0.2);
        orb.position.y = 0.2 + Math.sin(t * speed * 0.5 + i) * yOff;
        const hue = ((i / orbCount) + Math.sin(t * 0.1) * 0.1) % 1;
        orb.material.color.setHSL(hue, 0.8, 0.6);
    });

    // Subtle slow rotation of the glass mesh
    glassMesh.rotation.y = t * 0.05;
    glassMesh.rotation.x = Math.sin(t * 0.03) * 0.03;
    wireMesh.rotation.copy(glassMesh.rotation);
    glowMesh.rotation.copy(glassMesh.rotation);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
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
// SCROLL REVEAL (IntersectionObserver)
// ============================================
const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));

const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 80); });

const nt = document.getElementById('navToggle'), nl = document.getElementById('navLinks');
if (nt && nl) {
    nt.addEventListener('click', () => nl.classList.toggle('open'));
    nl.querySelectorAll('a').forEach((l) => l.addEventListener('click', () => nl.classList.remove('open')));
}

document.querySelectorAll('a[href^="#"]').forEach((a) => {
    if (a.hasAttribute('data-language')) return;
    a.addEventListener('click', (e) => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});
