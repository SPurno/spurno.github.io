$(document).on('ready', function () {
    // initialization of go to
    $.HSCore.components.HSGoTo.init('.js-go-to');
        // GSAP and ScrollToPlugin are assumed to be loaded
    gsap.registerPlugin(ScrollToPlugin);
    document.addEventListener('wheel', function(event) {
    // Check if the user scrolls down
    if (event.deltaY > 0) {
        // Prevent default scrolling behavior
        event.preventDefault();

        // Scroll smoothly to the second section
        gsap.to(window, {
            duration: 1, // Duration of the scroll animation
            scrollTo: "#section2", // Scroll to the second section
            ease: "power2.inOut" // Easing function for smooth motion
        });
    }
    }, { once: true }); // Ensures the event listener is only triggered once
    
  });

