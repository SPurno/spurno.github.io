// Basic setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a simple ground plane
const geometry = new THREE.PlaneGeometry(100, 100);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff45, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = Math.PI / 2;
scene.addplane;

// Add a simple cube as the character
const charGeometry = new THREE.BoxGeometry(1, 1, 1);
const charMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const character = new THREE.Mesh(charGeometry, charMaterial);
character.position.y = 0.5;
scene.add(character);

camera.position.z = 5;

// Movement variables
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

// Event listeners for keyboard input
document.addEventListener('keydown', (event) => {
switch (event.key) {
case 'ArrowUp':
moveForward = true;
break;
case 'ArrowDown':
moveBackward = true;
break;
case 'ArrowLeft':
moveLeft = true;
break;
case 'ArrowRight':
moveRight = true;
break;
}
});

document.addEventListener('keyup', (event) => {
switch (event.key) {
case 'ArrowUp':
moveForward = false;
break;
case 'ArrowDown':
moveBackward = false;
break;
case 'ArrowLeft':
moveLeft = false;
break;
case 'ArrowRight':
moveRight = false;
break;
}
});

// Animation loop
function animate() {
requestAnimationFrame(animate);

if (moveForward) character.position.z -= 0.1;
if (moveBackward) character.position.z += 0.1;
if (moveLeft) character.position.x -= 0.1;
if (moveRight) character.position.x += 0.1;

renderer.render(scene, camera);
}

animate();