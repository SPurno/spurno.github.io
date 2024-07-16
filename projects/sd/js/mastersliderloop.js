$(document).on('ready', function () {
    // initialization of carousel
    $.HSCore.components.HSCarousel.init('.js-carousel');
  });

  $(window).on('load', function() {
    // initialization of header
    $.HSCore.components.HSHeader.init($('#js-header'));
    $.HSCore.helpers.HSHamburgers.init('.hamburger');

    // initialization of HSMegaMenu component
    $('.js-mega-menu').HSMegaMenu({
      event: 'hover',
      pageContainer: $('.container'),
      breakpoint: 991
    });

    // initialization of masonry
    $('.masonry-grid').imagesLoaded().then(function () {
      $('.masonry-grid').masonry({
        columnWidth: '.masonry-grid-sizer',
        itemSelector: '.masonry-grid-item',
        percentPosition: true
      });
    });
  });

  var sliderIds = ['masterslider', 'masterslider2', 'masterslider3', 'masterslider4', 'masterslider5', 'masterslider6']; // add more IDs as needed
// Define a function to setup a MasterSlider
function setupMasterSlider(sliderId) {
  var slider = new MasterSlider();
  slider.control('arrows', {
    autohide: true,
    overVideo: true
  });
  slider.control('slideinfo', {
    autohide: false,
    overVideo: true,
    dir: 'h',
    align: 'bottom',
    inset: false,
    margin: 10
  });
  slider.setup(sliderId, {
    width: 240,
    height: 240,
    minHeight: 0,
    space: 0,
    start: 1,
    grabCursor: true,
    swipe: true,
    mouse: true,
    keyboard: false,
    layout: "partialview",
    wheel: true,
    autoplay: false,
    instantStartLayers: false,
    loop: true,
    shuffle: false,
    preload: 4,
    heightLimit: true,
    autoHeight: false,
    smoothHeight: true,
    endPause: false,
    overPause: true,
    fillMode: "fill",
    centerControls: true,
    startOnAppear: false,
    layersMode: "center",
    autofillTarget: "",
    hideLayers: false,
    fullscreenMargin: 0,
    speed: 20,
    dir: "h",
    parallaxMode: 'swipe',
    view: "focus" // or "wave" for the second slider, etc.
  });
}
    for (var i = 0; i < sliderIds.length; i++) {
        setupMasterSlider(sliderIds[i]);
    }
