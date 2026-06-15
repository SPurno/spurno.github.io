import * as THREE from 'three';

// --- Setup ---
let sceneReady = false;
const loadingScreen = document.getElementById('loading-screen');
const canvas = document.getElementById('three-canvas');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 1, 10);

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
canvas.appendChild(renderer.domElement);

// --- Lights ---
const ambientLight = new THREE.AmbientLight(0x111133, 0.4);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xff88cc, 1.2);
mainLight.position.set(4, 8, 6);
scene.add(mainLight);

const fillLight = new THREE.DirectionalLight(0x4488ff, 0.8);
fillLight.position.set(-6, -2, 4);
scene.add(fillLight);

const rimLight = new THREE.PointLight(0xff4488, 0.6, 30);
rimLight.position.set(-3, 4, -8);
scene.add(rimLight);

// --- 1. Central Geodesic Sphere (Wireframe + Glow) ---
const sphereGroup = new THREE.Group();
scene.add(sphereGroup);

// Outer wireframe sphere
const sphereGeo = new THREE.IcosahedronGeometry(1.8, 2);
const sphereMat = new THREE.MeshPhysicalMaterial({
    color: 0x8855ff,
    wireframe: true,
    transparent: true,
    opacity: 0.25,
    emissive: 0x6633cc,
    emissiveIntensity: 0.3,
});
const sphereWire = new THREE.Mesh(sphereGeo, sphereMat);
sphereGroup.add(sphereWire);

// Inner glow core
const coreGeo = new THREE.IcosahedronGeometry(1.0, 1);
const coreMat = new THREE.MeshPhysicalMaterial({
    color: 0xcc66ff,
    emissive: 0x8844ff,
    emissiveIntensity: 0.6,
    transparent: true,
    opacity: 0.2,
    roughness: 0.1,
    metalness: 0.3,
});
const core = new THREE.Mesh(coreGeo, coreMat);
sphereGroup.add(core);

// Outer glow aura
const glowGeo = new THREE.IcosahedronGeometry(2.2, 0);
const glowMat = new THREE.MeshBasicMaterial({
    color: 0x8855ff,
    transparent: true,
    opacity: 0.05,
    wireframe: true,
});
const glow = new THREE.Mesh(glowGeo, glowMat);
sphereGroup.add(glow);

// --- 2. Orbiting Particle Rings (Saturn-like) ---
const ringGroup = new THREE.Group();
scene.add(ringGroup);

function createRing(radius, particles, color, spread, tiltAngle) {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(particles * 3);
    const cols = new Float32Array(particles * 3);
    const sizes = new Float32Array(particles);
    const c = new THREE.Color(color);

    for (let i = 0; i < particles; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = radius + (Math.random() - 0.5) * spread;
        const yOff = (Math.random() - 0.5) * 0.08;

        pos[i * 3] = Math.cos(angle) * r;
        pos[i * 3 + 1] = yOff;
        pos[i * 3 + 2] = Math.sin(angle) * r;

        const bright = 0.3 + Math.random() * 0.7;
        cols[i * 3] = c.r * bright;
        cols[i * 3 + 1] = c.g * bright;
        cols[i * 3 + 2] = c.b * bright;

        sizes[i] = 0.02 + Math.random() * 0.06;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        depthWrite: false,
    });

    const mesh = new THREE.Points(geo, mat);
    mesh.rotation.x = tiltAngle;
    return mesh;
}

const ring1 = createRing(3.0, 2500, 0xff88cc, 0.6, 0.3);
const ring2 = createRing(3.8, 3000, 0x88bbff, 0.5, -0.5);
const ring3 = createRing(4.6, 2000, 0xffdd88, 0.4, 0.8);
ringGroup.add(ring1);
ringGroup.add(ring2);
ringGroup.add(ring3);

// --- 3. Orbiting Crystal Objects ---
const crystals = [];

function createOrbiter(geo, color, radius, orbitSpeed, size, phase) {
    const mat = new THREE.MeshPhysicalMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.2,
        metalness: 0.4,
        roughness: 0.15,
        transparent: true,
        opacity: 0.5,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.scale.set(size, size, size);
    mesh.userData = { radius, orbitSpeed, phase };
    scene.add(mesh);
    return mesh;
}

crystals.push(createOrbiter(
    new THREE.TetrahedronGeometry(0.4), 0xf093fb, 2.4, 0.5, 1, 0
));
crystals.push(createOrbiter(
    new THREE.OctahedronGeometry(0.35), 0x4facfe, 3.2, -0.35, 1, Math.PI * 0.5
));
crystals.push(createOrbiter(
    new THREE.DodecahedronGeometry(0.3), 0x43e97b, 4.0, 0.25, 1, Math.PI
));
crystals.push(createOrbiter(
    new THREE.BoxGeometry(0.3, 0.3, 0.3), 0xffd700, 5.0, -0.2, 1, Math.PI * 1.5
));
crystals.push(createOrbiter(
    new THREE.IcosahedronGeometry(0.25), 0xf5576c, 5.8, 0.15, 1, Math.PI * 0.25
));

// --- 4. Deep Starfield ---
const starCount = 3000;
const starGeo = new THREE.BufferGeometry();
const starPos = new Float32Array(starCount * 3);
const starCol = new Float32Array(starCount * 3);
const starSizes = new Float32Array(starCount);
const starTwinkle = new Float32Array(starCount);

for (let i = 0; i < starCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 30 + Math.random() * 70;

    starPos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
    starPos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r * 0.4;
    starPos[i * 3 + 2] = Math.cos(phi) * r - 10;

    const temp = Math.random();
    if (temp < 0.3) {
        starCol[i * 3] = 0.8 + Math.random() * 0.2;
        starCol[i * 3 + 1] = 0.6 + Math.random() * 0.3;
        starCol[i * 3 + 2] = 0.3 + Math.random() * 0.2;
    } else if (temp < 0.6) {
        starCol[i * 3] = 0.5 + Math.random() * 0.3;
        starCol[i * 3 + 1] = 0.7 + Math.random() * 0.3;
        starCol[i * 3 + 2] = 0.9 + Math.random() * 0.1;
    } else {
        const wh = 0.7 + Math.random() * 0.3;
        starCol[i * 3] = wh;
        starCol[i * 3 + 1] = wh;
        starCol[i * 3 + 2] = wh;
    }

    starSizes[i] = 0.05 + Math.random() * 0.15;
    starTwinkle[i] = Math.random() * Math.PI * 2;
}

starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));
starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

const starMat = new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    depthWrite: false,
});
const stars = new THREE.Points(starGeo, starMat);
scene.add(stars);

// --- 5. Floating Sparkle Particles (near camera) ---
const sparkleCount = 400;
const sparkleGeo = new THREE.BufferGeometry();
const sparklePos = new Float32Array(sparkleCount * 3);
const sparkleCol = new Float32Array(sparkleCount * 3);

for (let i = 0; i < sparkleCount; i++) {
    sparklePos[i * 3] = (Math.random() - 0.5) * 20;
    sparklePos[i * 3 + 1] = (Math.random() - 0.5) * 12;
    sparklePos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 2;

    const colors = [0xf093fb, 0x4facfe, 0xf5576c, 0xffd700, 0x43e97b];
    const c = new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
    sparkleCol[i * 3] = c.r;
    sparkleCol[i * 3 + 1] = c.g;
    sparkleCol[i * 3 + 2] = c.b;
}

sparkleGeo.setAttribute('position', new THREE.BufferAttribute(sparklePos, 3));
sparkleGeo.setAttribute('color', new THREE.BufferAttribute(sparkleCol, 3));

const sparkleMat = new THREE.PointsMaterial({
    size: 0.03,
    vertexColors: true,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
});
const sparkles = new THREE.Points(sparkleGeo, sparkleMat);
scene.add(sparkles);

// --- Mouse Interaction ---
let mouseX = 0;
let mouseY = 0;
let targetCamX = 0;
let targetCamY = 0;
let currentCamX = 0;
let currentCamY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

// --- Resize ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- Loading screen: wait for Fonts + Scene ---
const loadStartTime = performance.now();
const MIN_LOAD_DURATION = 2000;
let fontsReady = false;
let sceneRendered = false;

// Listen for font loading via the global promise
if (window.__fontsPromise) {
    window.__fontsPromise.then(() => { fontsReady = true; checkReady(); });
} else {
    fontsReady = true; // fallback if promise doesn't exist
}

function hideLoader() {
    if (!sceneReady) {
        sceneReady = true;
        loadingScreen.classList.add('hidden');
    }
}

function checkReady() {
    if (!fontsReady || !sceneRendered) return;
    const elapsed = performance.now() - loadStartTime;
    if (elapsed >= MIN_LOAD_DURATION) {
        hideLoader();
    } else {
        // Wait until min duration is reached
        setTimeout(checkReady, MIN_LOAD_DURATION - elapsed);
    }
}

// Fallback: hide loader after max time even if something goes wrong
setTimeout(hideLoader, 6000);

// --- Animation Loop ---
const clock = new THREE.Clock();
let frames = 0;

function animate() {
    const t = clock.getElapsedTime();
    frames++;

    // After a couple frames of rendering, mark scene as ready
    if (!sceneRendered && frames >= 3) {
        sceneRendered = true;
        checkReady();
    }

    // --- Mouse follow (smooth) ---
    targetCamX = mouseX * 1.5;
    targetCamY = mouseY * 0.8;
    currentCamX += (targetCamX - currentCamX) * 0.04;
    currentCamY += (targetCamY - currentCamY) * 0.04;

    camera.position.x = currentCamX * 0.5;
    camera.position.y = 1 + currentCamY * 0.3;
    camera.lookAt(0, 0, 0);

    // --- Central sphere rotation ---
    sphereGroup.rotation.x = Math.sin(t * 0.15) * 0.1;
    sphereGroup.rotation.y = t * 0.12;
    sphereGroup.rotation.z = Math.sin(t * 0.1) * 0.05;

    // Wireframe pulsation
    sphereWire.material.opacity = 0.2 + Math.sin(t * 0.5) * 0.08;
    glow.material.opacity = 0.04 + Math.sin(t * 0.3) * 0.03;
    core.material.emissiveIntensity = 0.4 + Math.sin(t * 0.6) * 0.3;

    // --- Ring rotation ---
    ring1.rotation.y = t * 0.05;
    ring2.rotation.y = -t * 0.04;
    ring3.rotation.y = t * 0.03;

    // --- Orbiting crystals ---
    crystals.forEach((mesh, i) => {
        const { radius, orbitSpeed, phase } = mesh.userData;
        const angle = t * orbitSpeed + phase;
        mesh.position.x = Math.cos(angle) * radius;
        mesh.position.z = Math.sin(angle) * radius;
        mesh.position.y = Math.sin(angle * 1.5 + phase) * 0.5;
        mesh.rotation.x = t * 0.5 + i;
        mesh.rotation.y = t * 0.3 + i * 2;
        const s = 1 + Math.sin(t * 0.4 + i) * 0.15;
        mesh.scale.set(s, s, s);
    });

    // --- Sparkle drift ---
    const sparkPos = sparkles.geometry.attributes.position.array;
    for (let i = 0; i < sparkleCount; i++) {
        sparkPos[i * 3 + 1] += Math.sin(t + i) * 0.0004;
        sparkPos[i * 3] += Math.cos(t * 0.7 + i * 0.1) * 0.0003;
    }
    sparkles.geometry.attributes.position.needsUpdate = true;

    // --- Star twinkle ---
    const starSizeAttr = stars.geometry.attributes.size;
    for (let i = 0; i < starCount; i++) {
        const twinkle = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 0.3 + starTwinkle[i]));
        starSizeAttr.array[i] = (0.05 + i % 3 * 0.05) * twinkle;
    }
    starSizeAttr.needsUpdate = true;

    // --- Dynamic light colors ---
    mainLight.color.setHSL(0.8 + Math.sin(t * 0.1) * 0.1, 0.6, 0.6);
    fillLight.color.setHSL(0.6 + Math.sin(t * 0.08 + 1) * 0.1, 0.6, 0.5);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();



// SCROLL REVEAL & NAVIGATION


// --- 3D TEXT TILT EFFECT — Hero Title ---
class Text3DTilt {
    constructor() {
        this.container = document.querySelector('.hero-3d-tilt');
        if (!this.container) return;

        this.title = this.container.querySelector('.hero-title-3d');
        this.glow = document.getElementById('hero3dGlow');

        this.boundingRect = null;
        this.mouseX = 0.5;
        this.mouseY = 0.5;
        this.targetRotX = 0;
        this.targetRotY = 0;
        this.currentRotX = 0;
        this.currentRotY = 0;
        this.glowX = 0;
        this.glowY = 0;
        this.isTouching = false;
        this.isHovering = false;
        this.autoRotate = true;
        this.autoAngle = 0;

        this.initSplitText();
        this.bindEvents();
        this.startAnimation();
    }

    initSplitText() {
        // Walk all text nodes inside the title and wrap each char in a span.
        // Critical: we skip whitespace-only text nodes (HTML source indentation)
        // and trim leading/trailing whitespace from meaningful text so alignment isn't broken.
        const walker = document.createTreeWalker(this.title, NodeFilter.SHOW_TEXT, null, false);
        const textNodes = [];
        while (walker.nextNode()) textNodes.push(walker.currentNode);

        textNodes.forEach((node) => {
            const text = node.textContent;

            // Skip pure whitespace nodes (HTML indentation between tags)
            if (!text.trim()) {
                node.parentNode.removeChild(node);
                return;
            }

            // Trim leading/trailing whitespace so HTML indentation doesn't become visible spans
            const trimmed = text.trim();

            const frag = document.createDocumentFragment();
            for (let i = 0; i < trimmed.length; i++) {
                const ch = trimmed[i];
                if (ch === ' ') {
                    const sp = document.createElement('span');
                    sp.className = 'char-3d-space';
                    sp.innerHTML = '&nbsp;';
                    frag.appendChild(sp);
                } else {
                    const span = document.createElement('span');
                    span.className = 'char-3d';
                    span.textContent = ch;
                    // staggered random delays & durations for organic feel
                    span.style.animationDelay = `${(Math.random() * 2).toFixed(2)}s`;
                    span.style.animationDuration = `${(2.8 + Math.random() * 1.8).toFixed(2)}s`;
                    frag.appendChild(span);
                }
            }
            node.parentNode.replaceChild(frag, node);
        });
    }

    bindEvents() {
        // --- Mouse ---
        document.addEventListener('mousemove', (e) => this.onPointer(e.clientX, e.clientY));

        this.container.addEventListener('mouseenter', () => {
            this.isHovering = true;
            this.autoRotate = false;
        });
        this.container.addEventListener('mouseleave', () => {
            this.isHovering = false;
            this.autoRotate = true;
            this.mouseX = 0.5;
            this.mouseY = 0.5;
        });

        // --- Touch ---
        this.container.addEventListener('touchstart', (e) => {
            this.isTouching = true;
            this.autoRotate = false;
            this.container.classList.add('touch-active');
            const t = e.touches[0];
            if (t) this.onPointer(t.clientX, t.clientY);
        }, { passive: true });

        this.container.addEventListener('touchmove', (e) => {
            const t = e.touches[0];
            if (t) this.onPointer(t.clientX, t.clientY);
        }, { passive: true });

        this.container.addEventListener('touchend', () => {
            this.isTouching = false;
            this.autoRotate = true;
            this.container.classList.remove('touch-active');
            this.mouseX = 0.5;
            this.mouseY = 0.5;
        }, { passive: true });

        window.addEventListener('resize', () => this.updateRect());
    }

    onPointer(cx, cy) {
        this.updateRect();
        const rect = this.boundingRect;
        if (!rect) return;

        this.mouseX = (cx - rect.left) / rect.width;
        this.mouseY = (cy - rect.top) / rect.height;
        this.glowX = cx - rect.left;
        this.glowY = cy - rect.top;
    }

    updateRect() {
        this.boundingRect = this.container.getBoundingClientRect();
    }

    startAnimation() {
        const tick = () => {
            if (this.autoRotate) {
                this.autoAngle += 0.002;
                this.targetRotY = Math.sin(this.autoAngle) * 3;
                this.targetRotX = Math.sin(this.autoAngle * 0.7) * 1.5;
            } else {
                this.targetRotY = (this.mouseX - 0.5) * 20;
                this.targetRotX = (this.mouseY - 0.5) * -12;
            }

            // Smooth spring interpolation
            this.currentRotX += (this.targetRotX - this.currentRotX) * 0.06;
            this.currentRotY += (this.targetRotY - this.currentRotY) * 0.06;

            if (this.title) {
                this.title.style.transform =
                    `rotateX(${this.currentRotX}deg) rotateY(${this.currentRotY}deg)`;
            }

            // Glow follower
            if (this.glow) {
                this.glow.style.left = `${this.glowX}px`;
                this.glow.style.top = `${this.glowY}px`;
            }

            // Highlight gradient hotspot
            const hl = this.title?.querySelector('.highlight');
            if (hl) {
                hl.style.setProperty('--glow-x', `${this.mouseX * 100}%`);
                hl.style.setProperty('--glow-y', `${this.mouseY * 100}%`);
            }

            requestAnimationFrame(tick);
        };
        setTimeout(tick, 120);
    }
}

// Init after DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new Text3DTilt());
} else {
    new Text3DTilt();
}

// --- Font loading promise (consumed by Three.js module) ---
window.__fontsPromise = document.fonts.ready;

// --- Scroll reveal ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px',
});

document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
});

// --- Navbar background on scroll ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- Mobile nav toggle ---
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});