const container = document.getElementById('container');
const canvasWidth = 1920;
const canvasHeight = 1080;

let scene, camera, renderer, plane;
init();
animate();

function init() {
    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(canvasWidth, canvasHeight);
    container.appendChild(renderer.domElement);

    // Create texture from SVG
    const svg = document.getElementById('Layer_2');
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.src = 'data:image/svg+xml;base64,' + window.btoa(svgData);

    img.onload = () => {
        const texture = new THREE.Texture(img);
        texture.needsUpdate = true;

        // Create plane geometry and material
        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });

        // Create plane and add to scene
        plane = new THREE.Mesh(geometry, material);
        plane.position.y = -2.5; // Position at the bottom
        scene.add(plane);

        // Add interaction
        addInteraction();
    };
}

function animate() {
    requestAnimationFrame(animate);

    // GSAP animation
}

function addInteraction() {
    // Mouse move interaction
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

        plane.position.x = mouseX;
        plane.position.y = mouseY - 2.5;
    });

    // Touch interaction using Hammer.js
    const hammer = new hammer(document.body);
    hammer.on('Layer_2', (e) => {
        const touchX = (e.center.x / window.innerWidth) * 2 - 1;
        const touchY = -(e.center.y / window.innerHeight) * 2 + 1;

        plane.position.x = touchX;
        plane.position.y = touchY - 2.5;
    });
}
