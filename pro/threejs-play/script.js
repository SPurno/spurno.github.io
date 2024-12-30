// script.js

// Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas3d') });

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Create a basic cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff90 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

let isDragging = false;
let rotationComplete = false;
let dragStartTime;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    if (isDragging && !rotationComplete) {
        const elapsedTime = Date.now() - dragStartTime;
        const duration = 5000; // Duration of 1 second for the rotation

        if (elapsedTime < duration) {
            const rotationProgress = elapsedTime / duration;
            cube.rotation.y = rotationProgress * 2 * Math.PI; // 360 degrees rotation
        } else {
            cube.rotation.y = 2 * Math.PI; // Ensure the rotation ends exactly at 360 degrees
            rotationComplete = true;
        }
    }

    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Mouse move event handler
function onMouseMove(event) {
    if (isDragging) {
        // Convert mouse position to normalized device coordinates (-1 to +1)
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update cube position
        cube.position.x = mouseX * 5; // Scale to scene size
        cube.position.y = mouseY * 5; // Scale to scene size
    }
}

// Mouse down event handler
function onMouseDown(event) {
    isDragging = true;
    rotationComplete = false;
    dragStartTime = Date.now();
}

// Mouse up event handler
function onMouseUp(event) {
    isDragging = false;
}

// Add event listeners
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mouseup', onMouseUp);

// Scroll effect
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => {
    observer.observe(section);
});
