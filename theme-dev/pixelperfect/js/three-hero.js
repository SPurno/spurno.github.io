/* ============================================================
   PixelPerfect - Three.js 3D Hero Background
   Version: 1.0.0
   ============================================================ */

(function() {
    'use strict';

    // Only run on homepage where three-container exists
    const container = document.getElementById('three-container');
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 30;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ===== PARTICLE SYSTEM =====
    const particleCount = 2000;
    const particlesGeometry = new THREE.BufferGeometry();
    
    const posArray = new Float32Array(particleCount * 3);
    const colorsArray = new Float32Array(particleCount * 3);
    const sizesArray = new Float32Array(particleCount);
    
    const color1 = new THREE.Color('#7c6ff0'); // Primary indigo
    const color2 = new THREE.Color('#6dd5c8'); // Mint accent
    const color3 = new THREE.Color('#b0a6f5'); // Light indigo
    const color4 = new THREE.Color('#f0b27a'); // Warm gold
    
    for (let i = 0; i < particleCount; i++) {
        // Position particles in a sphere with some randomness
        const radius = 15 + Math.random() * 15;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        
        posArray[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
        posArray[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * radius;
        posArray[i * 3 + 2] = Math.cos(phi) * radius;
        
        // Random colors
        const randomColor = [color1, color2, color3, color4][Math.floor(Math.random() * 4)];
        colorsArray[i * 3] = randomColor.r;
        colorsArray[i * 3 + 1] = randomColor.g;
        colorsArray[i * 3 + 2] = randomColor.b;
        
        sizesArray[i] = Math.random() * 0.3 + 0.1;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizesArray, 1));
    
    // Create particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.8)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    const particleTexture = new THREE.CanvasTexture(canvas);
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.3,
        map: particleTexture,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        opacity: 0.8,
        vertexColors: true,
        sizeAttenuation: true
    });
    
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // ===== FLOATING GEOMETRIES =====
    const geometries = [];
    const geoCount = 40;
    
    const geoTypes = [
        { type: 'icosahedron', size: 0.3 + Math.random() * 0.5 },
        { type: 'octahedron', size: 0.3 + Math.random() * 0.4 },
        { type: 'tetrahedron', size: 0.3 + Math.random() * 0.5 },
        { type: 'torus', radius: 0.3, tube: 0.1, radialSegments: 8, tubularSegments: 6 },
        { type: 'box', width: 0.4, height: 0.4, depth: 0.4 }
    ];
    
    for (let i = 0; i < geoCount; i++) {
        const type = geoTypes[Math.floor(Math.random() * geoTypes.length)];
        let geometry;
        
        switch (type.type) {
            case 'icosahedron':
                geometry = new THREE.IcosahedronGeometry(type.size, 0);
                break;
            case 'octahedron':
                geometry = new THREE.OctahedronGeometry(type.size, 0);
                break;
            case 'tetrahedron':
                geometry = new THREE.TetrahedronGeometry(type.size, 0);
                break;
            case 'torus':
                geometry = new THREE.TorusGeometry(type.radius, type.tube, type.radialSegments, type.tubularSegments);
                break;
            case 'box':
                geometry = new THREE.BoxGeometry(type.width, type.height, type.depth);
                break;
        }
        
        const hue = Math.random() * 0.3 + 0.65; // Purple to blue range
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(hue, 0.8, 0.6),
            wireframe: true,
            transparent: true,
            opacity: 0.15 + Math.random() * 0.25
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        
        const radius = 8 + Math.random() * 18;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        
        mesh.position.x = Math.sin(phi) * Math.cos(theta) * radius;
        mesh.position.y = Math.sin(phi) * Math.sin(theta) * radius;
        mesh.position.z = Math.cos(phi) * radius;
        
        mesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            },
            floatSpeed: Math.random() * 0.005 + 0.002,
            floatOffset: Math.random() * Math.PI * 2,
            originalPosition: mesh.position.clone(),
            scale: 0.5 + Math.random() * 1.5
        };
        
        mesh.scale.set(mesh.userData.scale, mesh.userData.scale, mesh.userData.scale);
        
        scene.add(mesh);
        geometries.push(mesh);
    }

    // ===== CONNECTING LINES =====
    const linePositions = [];
    const lineCount = 100;
    
    for (let i = 0; i < lineCount; i++) {
        const radius = 5 + Math.random() * 20;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        
        linePositions.push(
            Math.sin(phi) * Math.cos(theta) * radius,
            Math.sin(phi) * Math.sin(theta) * radius,
            Math.cos(phi) * radius
        );
    }
    
    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    
    const linesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x7c6ff0,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
    });
    
    const linePoints = new THREE.Points(linesGeometry, linesMaterial);
    scene.add(linePoints);

    // ===== MOUSE TRACKING =====
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Touch support
    document.addEventListener('touchmove', (event) => {
        if (event.touches.length > 0) {
            mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
        }
    }, { passive: true });

    // ===== RESIZE HANDLER =====
    function handleResize() {
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }
    
    window.addEventListener('resize', handleResize);

    // ===== ANIMATION LOOP =====
    let time = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        // Smooth mouse following
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        
        // Rotate particle system based on mouse
        particleSystem.rotation.x += (targetY * 0.002 - particleSystem.rotation.x * 0.001);
        particleSystem.rotation.y += (targetX * 0.002 - particleSystem.rotation.y * 0.001);
        
        // Rotate line system
        linePoints.rotation.x += 0.0003;
        linePoints.rotation.y += 0.0005;
        
        // Animate floating geometries
        geometries.forEach(mesh => {
            mesh.rotation.x += mesh.userData.rotationSpeed.x;
            mesh.rotation.y += mesh.userData.rotationSpeed.y;
            mesh.rotation.z += mesh.userData.rotationSpeed.z;
            
            const floatOffset = Math.sin(time * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 0.5;
            mesh.position.x = mesh.userData.originalPosition.x + floatOffset * 0.3;
            mesh.position.y = mesh.userData.originalPosition.y + floatOffset * 0.3;
            mesh.position.z = mesh.userData.originalPosition.z + floatOffset * 0.3;
        });
        
        // Pulse particle opacity
        particlesMaterial.opacity = 0.6 + Math.sin(time * 0.5) * 0.2;
        
        // Camera subtle movement
        camera.position.x += (targetX * 2 - camera.position.x) * 0.01;
        camera.position.y += (targetY * 2 - camera.position.y) * 0.01;
        camera.lookAt(0, 0, 0);
        
        renderer.render(scene, camera);
    }
    
    animate();

    // ===== CLEANUP =====
    // Store cleanup function for main.js to call if needed
    window.__threeCleanup = function() {
        renderer.dispose();
        scene.traverse((object) => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (object.material.map) object.material.map.dispose();
                object.material.dispose();
            }
        });
        container.removeChild(renderer.domElement);
        window.removeEventListener('resize', handleResize);
    };

})();
