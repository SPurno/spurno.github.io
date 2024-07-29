import 'https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js';
import 'https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox';
const fancybox = Fancybox.getInstance();
const autoplay = fancybox.plugins.Slideshow.ref;
const autoplayC = fancybox.Carousel.plugins.Autoplay;

Fancybox.bind("[data-fancybox]", {
    groupAll: true,
    toolbar: {
        display: {
            left: ["infobar"],
            middle: [
                "zoomIn",
                "zoomOut",
                "toggle1to1",
                "rotateCCW",
                "rotateCW",
                "flipX",
                "flipY",
            ],
            right: ["slideshow", "thumbs", "close"],
        },
    }
});