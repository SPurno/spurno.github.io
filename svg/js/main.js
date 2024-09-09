const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const svg = document.getElementById('mySVG');
const svgData = new XMLSerializer().serializeToString(svg);
const img = new Image();
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let svgX = canvasWidth / 2 - 100;
let svgY = canvasHeight - 200;

// Convert SVG to Image
img.src = 'data:image/svg+xml;base64,' + window.btoa(svgData);

img.onload = () => {
    // Initial draw of the SVG image on the canvas
    ctx.drawImage(img, svgX, svgY, 200, 200);

    // Animate the SVG using GSAP
    gsap.to({ x: svgX, y: svgY }, {
        x: canvasWidth / 2 - 100,
        y: canvasHeight / 2 - 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: function () {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(img, this.x, this.y, 200, 200);
        }
    });
};

// Add mouse move interaction
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, mouseX - 100, mouseY - 100, 200, 200);
});

// Add touch interaction using Hammer.js
const hammer = new Hammer(canvas);
hammer.on('pan', (e) => {
    const touchX = e.center.x;
    const touchY = e.center.y;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, touchX - 100, touchY - 100, 200, 200);
});
