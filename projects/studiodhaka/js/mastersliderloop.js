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

  var sliderIds = [
    'masterslider', 'masterslider2', 
    'masterslider3', 'masterslider4', 
    'masterslider5', 'masterslider6', 
    'masterslider7', 'masterslider8', 
    'masterslider9', 'masterslider10'
  ];

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
      loop: false,
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
      layersMode: "full",
      autofillTarget: "",
      hideLayers: false,
      fullscreenMargin: 0,
      speed: 8,
      dir: "h",
      parallaxMode: 'mouse:x-only',
      view: "flow" // or "wave" for the second slider, etc.
    });
  }
  // lopping the image to setup every slides 
    for (var i = 0; i < sliderIds.length; i++) {
        setupMasterSlider(sliderIds[i]);
    }
    
  // Disabling the user interaction on image 
  document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
  });

  document.addEventListener('dragstart', function(event) {
    event.preventDefault();
  });

  