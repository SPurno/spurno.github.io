// GSAP and ScrollToPlugin are assumed to be loaded
gsap.registerPlugin(ScrollToPlugin);

let scrollTriggered = false;

document.addEventListener('wheel', function(event) {
    // Determine scroll direction
    if (!scrollTriggered) {
        if (event.deltaY > 0) {
            // User scrolls down
            scrollTriggered = true;
            gsap.to(window, {
                duration: 1,
                scrollTo: "#section2",
                ease: "power2.inOut",
                onComplete: () => { scrollTriggered = false; } // Reset trigger after animation
            });
        } else if (event.deltaY < 0) {
            // User scrolls up
            scrollTriggered = true;
            gsap.to(window, {
                duration: 1,
                scrollTo: "#section1",
                ease: "power2.inOut",
                onComplete: () => { scrollTriggered = false; } // Reset trigger after animation
            });
        }
    }
});