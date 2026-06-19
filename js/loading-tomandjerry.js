/**
 * loading-tomandjerry.js
 * Three.js Tom & Jerry chase scene for the loading screen.
 * Cartoon-accurate proportions, larger size, Jerry ahead & Tom chasing.
 */
import * as THREE from 'three';

const canvas = document.getElementById('loader-canvas');
if (!canvas) throw new Error('#loader-canvas not found');

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(80, 80);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.3;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();

// Camera - zoomed in for larger characters
const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 10);
camera.position.set(0, 1.2, 4.0);
camera.lookAt(0, 1.2, 0);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const key = new THREE.DirectionalLight(0xffffff, 1.2);
key.position.set(5, 10, 5);
scene.add(key);
const fill = new THREE.DirectionalLight(0xaaccff, 0.5);
fill.position.set(-5, 4, -4);
scene.add(fill);
const rim = new THREE.DirectionalLight(0xffeedd, 0.35);
rim.position.set(-3, 2, -7);
scene.add(rim);

// ===================================================================
// ENHANCED MATERIALS — cartoon-accurate colors
// ===================================================================
const jBodyMat = new THREE.MeshStandardMaterial({ color: 0xc4874a, roughness: 0.55 });
const jHeadMat = new THREE.MeshStandardMaterial({ color: 0xcc8f55, roughness: 0.50 });
const jEarMat = new THREE.MeshStandardMaterial({ color: 0xc4874a, roughness: 0.60 });
const jInnerMat = new THREE.MeshStandardMaterial({ color: 0xffbbaa, roughness: 0.50 });
const jBellyMat = new THREE.MeshStandardMaterial({ color: 0xdba875, roughness: 0.50 });
const jDarkMat = new THREE.MeshStandardMaterial({ color: 0x2a1a0a, roughness: 0.85 });
const tBodyMat = new THREE.MeshStandardMaterial({ color: 0x6f7d94, roughness: 0.40 });
const tHeadMat = new THREE.MeshStandardMaterial({ color: 0x7a8a9e, roughness: 0.40 });
const tBellyMat = new THREE.MeshStandardMaterial({ color: 0xe8e4dc, roughness: 0.40 });
const tWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf5f0e8, roughness: 0.35 });
const tPinkMat = new THREE.MeshStandardMaterial({ color: 0xffa098, roughness: 0.45 });
const tDarkMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.80 });
const tWhiskerMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.50 });

const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x000000, transparent: true, opacity: 0.10,
    side: THREE.DoubleSide, depthWrite: false,
});
const whiteGlint = new THREE.MeshBasicMaterial({ color: 0xffffff });

// ===================================================================
// BUILD JERRY (mouse) — cartoon-accurate, larger
// ===================================================================
const jerry = new THREE.Group();

// --- Body (pear shape — wider hips) ---
const jBody = new THREE.Mesh(new THREE.SphereGeometry(0.38, 14, 14), jBodyMat);
jBody.scale.set(1, 0.8, 0.72);
jBody.position.y = 0.50;
jerry.add(jBody);

// Belly (lighter area)
const jBelly = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 10), jBellyMat);
jBelly.scale.set(0.7, 0.6, 0.5);
jBelly.position.set(0, 0.40, 0.36);
jerry.add(jBelly);

// --- Head (round, slightly larger in proportion) ---
const jHead = new THREE.Mesh(new THREE.SphereGeometry(0.30, 14, 14), jHeadMat);
jHead.position.set(0, 0.82, 0);
jerry.add(jHead);

// Cheeks (slightly wider lower face)
const jCheek = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 10), jHeadMat);
jCheek.scale.set(1, 0.6, 0.7);
jCheek.position.set(0, 0.76, 0.06);
jerry.add(jCheek);

// --- EARS (big round discs — Jerry's #1 feature, angled outward) ---
// Face left ear ← left, right ear → right so they're visible from camera
const jEarGeo = new THREE.CircleGeometry(0.24, 16);
const jEarL = new THREE.Mesh(jEarGeo, jEarMat);
jEarL.position.set(-0.28, 1.00, 0.04);
jEarL.rotation.y = -1.0;
jEarL.rotation.x = -0.2;
jerry.add(jEarL);

const jEarR = new THREE.Mesh(jEarGeo.clone(), jEarMat);
jEarR.position.set(0.28, 1.00, 0.04);
jEarR.rotation.y = 1.0;
jEarR.rotation.x = -0.2;
jerry.add(jEarR);

// Inner ears
const jInnerGeo = new THREE.CircleGeometry(0.16, 12);
const jInnerL = new THREE.Mesh(jInnerGeo, jInnerMat);
jInnerL.position.set(-0.27, 0.99, 0.08);
jInnerL.rotation.y = -1.0;
jInnerL.rotation.x = -0.2;
jerry.add(jInnerL);

const jInnerR = new THREE.Mesh(jInnerGeo.clone(), jInnerMat);
jInnerR.position.set(0.27, 0.99, 0.08);
jInnerR.rotation.y = 1.0;
jInnerR.rotation.x = -0.2;
jerry.add(jInnerR);

// --- Eyes (black dots, close together) ---
const jEye = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 8), jDarkMat);
jEye.position.set(-0.09, 0.88, 0.28);
jerry.add(jEye);
const jEyeR = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 8), jDarkMat);
jEyeR.position.set(0.09, 0.88, 0.28);
jerry.add(jEyeR);

// Eye white glints
const jGlint = new THREE.Mesh(new THREE.SphereGeometry(0.018, 6, 6), whiteGlint);
jGlint.position.set(-0.07, 0.89, 0.32);
jerry.add(jGlint);
const jGlintR = new THREE.Mesh(new THREE.SphereGeometry(0.018, 6, 6), whiteGlint);
jGlintR.position.set(0.11, 0.89, 0.32);
jerry.add(jGlintR);

// --- Nose (small black oval) ---
const jNose = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 6), jDarkMat);
jNose.scale.set(0.7, 0.6, 1);
jNose.position.set(0, 0.78, 0.30);
jerry.add(jNose);

// --- Mouth (tiny smile arc) ---
const jMouth = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.008, 4, 8, Math.PI), jDarkMat);
jMouth.position.set(0, 0.73, 0.28);
jMouth.rotation.y = -Math.PI / 2;
jMouth.rotation.x = 0.15;
jerry.add(jMouth);

// --- Whiskers (3 each side) ---
for (let s = -1; s <= 1; s += 2) {
    for (let w = 0; w < 3; w++) {
        const wisk = new THREE.Mesh(
            new THREE.CylinderGeometry(0.004, 0.006, 0.18, 4), jDarkMat
        );
        wisk.position.set(s * (0.20 + w * 0.04), 0.78 - w * 0.035, 0.32);
        wisk.rotation.z = s * (0.25 + w * 0.12);
        wisk.rotation.x = -0.2;
        jerry.add(wisk);
    }
}

// --- Arms ---
const jArmGeo = new THREE.CylinderGeometry(0.03, 0.035, 0.28, 6);
const jArmL = new THREE.Mesh(jArmGeo, jBodyMat);
jArmL.position.set(-0.42, 0.58, 0);
jArmL.rotation.z = 0.35;
jArmL.rotation.x = 0.15;
jerry.add(jArmL);
const jArmR = new THREE.Mesh(jArmGeo, jBodyMat);
jArmR.position.set(0.42, 0.58, 0);
jArmR.rotation.z = -0.35;
jArmR.rotation.x = -0.15;
jerry.add(jArmR);

// --- Legs (grouped for swing) ---
const jLegGeo = new THREE.CylinderGeometry(0.035, 0.04, 0.22, 6);
const jLegGroupL = new THREE.Group();
jLegGroupL.position.set(-0.16, 0.28, 0);
const jLegL = new THREE.Mesh(jLegGeo, jBodyMat);
jLegL.position.y = -0.11;
jLegGroupL.add(jLegL);
jerry.add(jLegGroupL);

const jLegGroupR = new THREE.Group();
jLegGroupR.position.set(0.16, 0.28, 0);
const jLegR = new THREE.Mesh(jLegGeo, jBodyMat);
jLegR.position.y = -0.11;
jLegGroupR.add(jLegR);
jerry.add(jLegGroupR);

// --- Tail (long, thin, curved) ---
const jTail = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.02, 0.45, 6), jBodyMat);
jTail.position.set(0.04, 0.30, -0.38);
jTail.rotation.x = 0.6;
jTail.rotation.z = 0.35;
jerry.add(jTail);

// Shadow
const jShadow = new THREE.Mesh(new THREE.RingGeometry(0.15, 0.38, 16), shadowMat.clone());
jShadow.material.opacity = 0.08;
jShadow.rotation.x = -Math.PI / 2;
jShadow.position.y = -0.02;
jerry.add(jShadow);

scene.add(jerry);

// ===================================================================
// BUILD TOM (cat) — cartoon-accurate, larger, chases behind
// ===================================================================
const tom = new THREE.Group();

// --- Body (athletic pear shape) ---
const tBody = new THREE.Mesh(new THREE.SphereGeometry(0.48, 14, 14), tBodyMat);
tBody.scale.set(1, 0.78, 0.70);
tBody.position.y = 0.62;
tom.add(tBody);

// Belly / chest (white)
const tBelly = new THREE.Mesh(new THREE.SphereGeometry(0.32, 10, 10), tBellyMat);
tBelly.scale.set(0.65, 0.60, 0.48);
tBelly.position.set(0, 0.55, 0.44);
tom.add(tBelly);

// --- Head (round, larger) ---
const tHead = new THREE.Mesh(new THREE.SphereGeometry(0.40, 14, 14), tHeadMat);
tHead.position.set(0, 1.15, 0);
tom.add(tHead);

// Cheek fluff (wider at jowls)
const tJowl = new THREE.Mesh(new THREE.SphereGeometry(0.38, 10, 10), tHeadMat);
tJowl.scale.set(1.1, 0.5, 0.7);
tJowl.position.set(0, 1.00, 0.05);
tom.add(tJowl);

// --- Ears (pointy triangles — ConeGeometry, angled outward) ---
const tEarGeo = new THREE.ConeGeometry(0.14, 0.22, 6);
const tEarL = new THREE.Mesh(tEarGeo, tBodyMat);
tEarL.position.set(-0.30, 1.45, -0.02);
tEarL.rotation.z = 0.25;
tEarL.rotation.x = -0.15;
tom.add(tEarL);

const tEarR = new THREE.Mesh(tEarGeo.clone(), tBodyMat);
tEarR.position.set(0.30, 1.45, -0.02);
tEarR.rotation.z = -0.25;
tEarR.rotation.x = -0.15;
tom.add(tEarR);

// Inner ears (pink)
const tInnerGeo = new THREE.ConeGeometry(0.07, 0.14, 6);
const tInnerL = new THREE.Mesh(tInnerGeo, tPinkMat);
tInnerL.position.set(-0.30, 1.42, 0.02);
tInnerL.rotation.z = 0.25;
tom.add(tInnerL);
const tInnerR = new THREE.Mesh(tInnerGeo.clone(), tPinkMat);
tInnerR.position.set(0.30, 1.42, 0.02);
tInnerR.rotation.z = -0.25;
tom.add(tInnerR);

// --- Muzzle (white — lower half of face) ---
const tMuzzle = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 12), tWhiteMat);
tMuzzle.scale.set(0.95, 0.65, 0.60);
tMuzzle.position.set(0, 1.08, 0.36);
tom.add(tMuzzle);

// Muzzle chin extension
const tChin = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), tWhiteMat);
tChin.scale.set(0.8, 0.5, 0.6);
tChin.position.set(0, 0.88, 0.36);
tom.add(tChin);

// --- Eyes (big white spheres) ---
const tEye = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 10), tWhiteMat);
tEye.position.set(-0.16, 1.28, 0.34);
tom.add(tEye);
const tEyeR = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 10), tWhiteMat);
tEyeR.position.set(0.16, 1.28, 0.34);
tom.add(tEyeR);

// Black pupils
const tPupil = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), tDarkMat);
tPupil.position.set(-0.16, 1.27, 0.46);
tom.add(tPupil);
const tPupilR = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), tDarkMat);
tPupilR.position.set(0.16, 1.27, 0.46);
tom.add(tPupilR);

// Eye white highlights
const tGlint = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 6), whiteGlint);
tGlint.position.set(-0.13, 1.29, 0.50);
tom.add(tGlint);
const tGlintR = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 6), whiteGlint);
tGlintR.position.set(0.19, 1.29, 0.50);
tom.add(tGlintR);

// Small second glint
const tGlint2 = new THREE.Mesh(new THREE.SphereGeometry(0.015, 6, 6), whiteGlint);
tGlint2.position.set(-0.19, 1.25, 0.49);
tom.add(tGlint2);
const tGlintR2 = new THREE.Mesh(new THREE.SphereGeometry(0.015, 6, 6), whiteGlint);
tGlintR2.position.set(0.13, 1.25, 0.49);
tom.add(tGlintR2);

// --- Nose (small pink triangle) ---
const tNose = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 6), tPinkMat);
tNose.scale.set(0.8, 0.6, 1);
tNose.position.set(0, 1.12, 0.46);
tom.add(tNose);

// --- Mouth (wide smile) ---
const tMouth = new THREE.Mesh(new THREE.TorusGeometry(0.065, 0.012, 5, 10, Math.PI), tDarkMat);
tMouth.position.set(0, 1.00, 0.42);
tMouth.rotation.y = -Math.PI / 2;
tMouth.rotation.z = 0.08;
tom.add(tMouth);

// --- Whiskers (3 each side, prominent) ---
for (let s = -1; s <= 1; s += 2) {
    for (let w = 0; w < 3; w++) {
        const wisk = new THREE.Mesh(
            new THREE.CylinderGeometry(0.005, 0.007, 0.24, 4), tWhiskerMat
        );
        wisk.position.set(s * (0.28 + w * 0.05), 1.10 - w * 0.04, 0.48);
        wisk.rotation.z = s * (0.2 + w * 0.12);
        wisk.rotation.x = -0.25;
        tom.add(wisk);
    }
}

// --- Arms with white paws ---
const tArmGeo = new THREE.CylinderGeometry(0.045, 0.06, 0.38, 6);
const tArmL = new THREE.Mesh(tArmGeo, tBodyMat);
tArmL.position.set(-0.60, 0.72, 0);
tArmL.rotation.z = 0.35;
tArmL.rotation.x = 0.15;
tom.add(tArmL);

// White paw tips
const tPaw = new THREE.Mesh(new THREE.SphereGeometry(0.055, 6, 6), tWhiteMat);
tPaw.position.set(-0.60, 0.50, 0.02);
tom.add(tPaw);

const tArmR = new THREE.Mesh(tArmGeo, tBodyMat);
tArmR.position.set(0.60, 0.72, 0);
tArmR.rotation.z = -0.35;
tArmR.rotation.x = -0.15;
tom.add(tArmR);

const tPawR = new THREE.Mesh(new THREE.SphereGeometry(0.055, 6, 6), tWhiteMat);
tPawR.position.set(0.60, 0.50, 0.02);
tom.add(tPawR);

// --- Legs (grouped for swing) + white feet ---
const tLegGeo = new THREE.CylinderGeometry(0.065, 0.08, 0.32, 6);
const tFootGeo = new THREE.SphereGeometry(0.07, 6, 6);

const tLegGroupL = new THREE.Group();
tLegGroupL.position.set(-0.24, 0.32, 0);
const tLegL = new THREE.Mesh(tLegGeo, tBodyMat);
tLegL.position.y = -0.16;
tLegGroupL.add(tLegL);
const tFoot = new THREE.Mesh(tFootGeo, tWhiteMat);
tFoot.scale.set(1, 0.5, 1.3);
tFoot.position.set(0, -0.30, 0.04);
tLegGroupL.add(tFoot);
tom.add(tLegGroupL);

const tLegGroupR = new THREE.Group();
tLegGroupR.position.set(0.24, 0.32, 0);
const tLegR = new THREE.Mesh(tLegGeo, tBodyMat);
tLegR.position.y = -0.16;
tLegGroupR.add(tLegR);
const tFootR = new THREE.Mesh(tFootGeo.clone(), tWhiteMat);
tFootR.scale.set(1, 0.5, 1.3);
tFootR.position.set(0, -0.30, 0.04);
tLegGroupR.add(tFootR);
tom.add(tLegGroupR);

// --- Tail (thick, white tip) ---
const tTail = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.045, 0.75, 6), tBodyMat);
tTail.position.set(0, 0.45, -0.48);
tTail.rotation.x = 0.7;
tTail.rotation.z = 0.3;
tom.add(tTail);

// White tail tip
const tTip = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 6), tWhiteMat);
tTip.position.set(-0.20, 0.15, -0.88);
tom.add(tTip);

// Shadow
const tShadow = new THREE.Mesh(new THREE.RingGeometry(0.18, 0.50, 16), shadowMat.clone());
tShadow.material.opacity = 0.08;
tShadow.rotation.x = -Math.PI / 2;
tShadow.position.y = -0.02;
tom.add(tShadow);

scene.add(tom);

// ===================================================================
// RUNNING PARAMETERS — tighter bounds for larger characters
// ===================================================================
const RUN_MIN_X = -0.6;
const RUN_MAX_X = 0.6;
const RUN_DISTANCE = RUN_MAX_X - RUN_MIN_X;
const RUN_DURATION = 2.2;
const RUN_SPEED = RUN_DISTANCE / RUN_DURATION;

const JERRY_AHEAD = 0.20;
const TOM_BEHIND = -0.22;

const JERRY_STEP_FREQ = 6.0;
const TOM_STEP_FREQ = 4.2;
const TOM_PHASE = 1.3;

const clock = new THREE.Clock();

// --- Animation Loop ---
function animate() {
    const t = clock.getElapsedTime();

    const rawX = RUN_MIN_X + (t * RUN_SPEED) % RUN_DISTANCE;

    jerry.position.x = rawX + JERRY_AHEAD;
    tom.position.x = rawX + TOM_BEHIND;

    // --- Jerry run cycle ---
    const jc = t * JERRY_STEP_FREQ;
    const js = Math.sin(jc);
    jerry.position.y = Math.abs(js) * 0.04;
    jerry.rotation.x = 0.06;
    jerry.rotation.z = js * 0.02;
    jArmL.rotation.z = 0.35 + js * 0.40;
    jArmR.rotation.z = -0.35 - js * 0.40;
    jLegGroupL.rotation.x = js * 0.35;
    jLegGroupR.rotation.x = -js * 0.35;

    // --- Tom run cycle ---
    const tc = t * TOM_STEP_FREQ + TOM_PHASE;
    const ts = Math.sin(tc);
    tom.position.y = Math.abs(ts) * 0.05;
    tom.rotation.x = 0.08;
    tom.rotation.z = ts * 0.025;
    tArmL.rotation.z = 0.35 + ts * 0.40;
    tArmR.rotation.z = -0.35 - ts * 0.40;
    tLegGroupL.rotation.x = ts * 0.32;
    tLegGroupR.rotation.x = -ts * 0.32;

    // Pupils look ahead
    const lx = Math.sin(t * 0.12) * 0.025;
    tPupil.position.x = -0.16 + lx;
    tPupilR.position.x = 0.16 + lx;
    tGlint.position.x = -0.13 + lx * 0.5;
    tGlintR.position.x = 0.19 + lx * 0.5;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
