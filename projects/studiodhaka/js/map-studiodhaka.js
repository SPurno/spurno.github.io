
// Make the image draggable
gsap.registerPlugin(Draggable);

Draggable.create("#draggable-image", {
    type: "x,y", // Allow dragging in both x and y directions
    edgeResistance: 0.65, // Resistance when dragging near the edges
    bounds: "body", // Constrain dragging within the body element
    inertia: true, // Enable inertia for a smooth, natural feel
    onDragStart: function() {
        this.target.style.cursor = "grabbing";
    },
    onDragEnd: function() {
        this.target.style.cursor = "grab";
    }
});

// Add zoom functionality
let scale = 1;

document.getElementById("draggable-image").addEventListener("wheel", function(event) {
    event.preventDefault();
    if (event.deltaY < 0) {
        // Zoom in
        scale *= 1.09;
    } else {
        // Zoom out
        scale /= 1.09;
    }
    gsap.to(this, { 
        scale: scale, 
        duration: 0.2, 
        transformOrigin: "center center" 
    });
});