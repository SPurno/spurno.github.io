(function ($) {
 "use strict";

/*- jQuery MeanMenu 
--------------------*/
	jQuery('nav#dropdown').meanmenu();	
	
    
/*- wow js active
----------------------*/
 new WOW().init();
    

/*-  stickey menu 
-----------------------*/        
    $(window).on('scroll',function() {    
	   var scroll = $(window).scrollTop();
	   if (scroll < 265) {
		$(".header-sticky").removeClass("sticky");
	   }else{
		$(".header-sticky").addClass("sticky");
	   }
	});
/*- datepicker
------------------------*/
$('.date-picker').datepicker({
    startDate: '-3d'
});    
    
/*- smoth-scroll js
-------------------------*/ 
    $('.smoth-scroll a').on("click", function (e) {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - 65
        }, 1000);
        e.preventDefault();
    });
/*- slider-list active 
------------------------*/  
  $(".slider-list").owlCarousel({
      autoPlay: true, 
	  slideSpeed:2000,
	  pagination:true,
	  navigation:true,	  
      items : 1,
	   transitionStyle : "fade",     /* [This code for animation ] */
	  navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
      itemsDesktop : [1199,1],
	  itemsDesktopSmall : [980,1],
	  itemsTablet: [768,1],
	  itemsMobile : [479,1],
  });
    
/*- review-carousel active 
---------------------------*/  
  $(".review-carousel").owlCarousel({
      autoPlay: false, 
	  slideSpeed:2000,
	  pagination:true,
	  navigation:false,	  
      items : 1,
	  navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
      itemsDesktop : [1199,1],
	  itemsDesktopSmall : [980,1],
	  itemsTablet: [768,1],
	  itemsMobile : [479,1],
  });
    
/*- scrollUp
---------------------*/	
	$.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    }); 
    
    
/*- MagnificPopup 
-----------------------*/
    $('.protfolio-icon a').magnificPopup({
        type: 'image',
        gallery:{enabled:true}
    });	
    
/*- mixItup 
----------------------*/	    
   $('.mixitup-work').mixItUp({
        
    }); 
/*- parallax js 
----------------------*/    
    $('.parallax').parallax("50%", 0.1);
   
/*- Extra js 
---------------------*/	    
    $(document).on('click', '.navbar-collapse.in', function (e) {
        if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
            $(this).collapse('hide');
        }
    });
    $('body').scrollspy({
        target: '.navbar-collapse',
        offset: 195
    });   
    
    
/*- video active 
------------------------*/
    $(".youtube-bg").YTPlayer({
        videoURL:"https://youtu.be/uFN1FDxuUIw",
        containment:'.youtube-bg',
        mute:true,
        loop:true,
        showControls: true
        
    });
    
    
    /*-----------------------------
    Loader activation here. 
    -------------------------------*/
    $("#fakeLoader").fakeLoader({
        timeToHide:1500, 
        zIndex:999999, 
        spinner:"spinner2",
        bgColor:"#dc143c"
    });

    
    
 
})(jQuery); 


