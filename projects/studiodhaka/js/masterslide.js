$(document).on('ready', function () {
    // initialization of carousel
    $.HSCore.components.HSCarousel.init('.js-carousel');
  });

  $(window).on('load', function() {
    // initialization of header

    // initialization of masonry
    $('.masonry-grid').imagesLoaded().then(function () {
      $('.masonry-grid').masonry({
        columnWidth: '.masonry-grid-sizer',
        itemSelector: '.masonry-grid-item',
        percentPosition: true
      });
    });
  });

  var slider = new MasterSlider();

  slider.control('arrows', {
    autohide: true,
    overVideo: true,
  });

  slider.control('bullets', {
    autohide: true,
    overVideo: true,
    dir: 'h',
    align: 'bottom',
    space: 8,
    margin: 10
  });

  slider.setup("masterslider", {
    width: 1366,
    height: 768,
    minHeight: 0,
    space: 0,
    start: 1,
    grabCursor: true,
    swipe: true,
    mouse: true,
    keyboard: true,
    layout: "fullwidth",
    wheel: false,
    autoplay: true,
    instantStartLayers: true,
    loop: true,
    shuffle: false,
    preload: 0,
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
    view: "wave"
  });