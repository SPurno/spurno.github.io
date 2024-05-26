// HTML document is loaded
$(window).on("load", function() {
  "use strict";

  // var preloader
  var loader = $('.preloader, .preloader-white');
  var bgpreloader = $('.bg-preloader, .bg-preloader-white');

  // var navigation
  var Slink = $('.scroll-link');
  var menumobile = $('#main-menu');
  var navdefault = $('.navbar-default, .navbar-default-white');
  var sTick = $(".navbar-fixed-top");
  var Navactive = $("nav a");
  //gallery
  var iconnav = $('#nav-icon');
  var galnav = $('#opengal');
  var galclose = $('.nav-bottom-close, .btn-content');
  var maingall = $('.bottom-option');


  // contactform var
  var contactname = $('#name-contact');
  var contactemail = $('#email-contact, input#email-contact');
  var contactmessage = $('#message-contact');
  var contactsent = $('#send-contact');
  
  //form failed succes var
  var successent = $("#mail_success");
  var failedsent = $("#mail_failed");

  // totop var
  var totop = $('#totop');
  var bodyScroll = $('html,body');

  // start function fadeOut preloader when condition window has been load
  loader.fadeOut('slow', function() {
    "use strict";

    // opening slideup
    bgpreloader.addClass("scale3dpreloader").fadeOut(1000);

    // animated transition & scroll onStep
    onStep();

    // responsive part
    if ($(window).width() < 1025) {
      // scroll navigation
      $(".scroll-link").on('click', function(e) {
        var id = $(this).attr('href');
        var $id = $(id);
        if ($id.length === 0) {
          return;
        }
        e.preventDefault();
        var offSet = -1;
        var targetOffset = $(id).offset().top - offSet;
        bodyScroll.animate({
          scrollTop: targetOffset
        }, 800);
        menumobile.removeClass('menu-show');
        navdefault.removeClass('fullHeight');
      });
    } else {
      // scroll navigation
      $(".scroll-link").on('click', function(e) {
        var id = $(this).attr('href');
        var $id = $(id);
        if ($id.length === 0) {
          return;
        }
        e.preventDefault();
        var offSet = -1;
        var targetOffset = $(id).offset().top - offSet;
        bodyScroll.animate({
          scrollTop: targetOffset
        }, 800);
      });
    }

    // mobile icon
    $(".navbar-toggle").on("click", function() {
      menumobile.toggleClass('menu-show');
      navdefault.toggleClass('fullHeight');
    });

    // animation block menu on scroll
    $(window).scroll(function() {
      if ($(".navbar").offset().top > 10) {
        sTick.addClass("sticky-nav");
        totop.fadeIn(100);
      } else {
        sTick.removeClass("sticky-nav");
        totop.fadeOut(100);
      }
    });
	
	$(document).height(function() { 
		if ($(".navbar").offset().top > 10) {
        	sTick.addClass("sticky-nav");
       		totop.fadeIn(100);
        }
        else {
			sTick.removeClass("sticky-nav");
        	totop.fadeOut(100);
        }							   
	 });

  });

  totop.on("click", function(e) {
    e.preventDefault();
    bodyScroll.animate({
      scrollTop: 0
    }, 800);
  });
  // end function

  // navigation slide up gallery
  galnav.on('click', function(e) {
    $(this).fadeOut(500);
    maingall.slideDown(600);
  });
  // navigation slide down gallery
  galclose.on('click', function(e) {
    galnav.fadeIn(500);
    maingall.fadeOut(500);
  });

  // contact form
  $(function() {
    contactsent.on('click', function(e) {
      e.preventDefault();
      var e = contactname.val(),
        a = contactemail.val(),
        s = contactmessage.val(),
        r = !1;
      if (0 == a.length || "-1" == a.indexOf("@") || "-1" == a.indexOf(".")) {
        var r = !0;
        contactemail.css({
          "border-top": "none",
          "border-left": "none",
          "border-bottom": "1px solid #ff6600",
          "border-right": "none"
        });
      } else contactemail.css({
        "border-top": "none",
        "border-left": "none",
        "border-bottom": "1px solid #959595",
        "border-right": "none"
      });
      if (0 == e.length) {
        var r = !0;
        contactname.css({
          "border-top": "none",
          "border-left": "none",
          "border-bottom": "1px solid #ff6600",
          "border-right": "none"
        });
      } else contactname.css({
        "border-top": "none",
        "border-left": "none",
        "border-bottom": "1px solid #959595",
        "border-right": "none"
      });
      if (0 == s.length) {
        var r = !0;
        contactmessage.css({
          "border-top": "none",
          "border-left": "none",
          "border-bottom": "1px solid #ff6600",
          "border-right": "none"
        });
      } else contactmessage.css({
        "border-top": "none",
        "border-left": "none",
        "border-bottom": "1px solid #959595",
        "border-right": "none"
      });
      return 0 == r && (contactsent.attr({
        disabled: "true",
        value: "Sending..."
      }), $.ajax({
        type: "POST",
        url: "send.php",
        data: "name=" + e + "&email=" + a + "&subject=You Got Email&message=" + s,
        success: function(e) {
          "success" == e ? (successent.fadeIn(500)) : (failedsent.html(e).fadeIn(500), contactsent.removeAttr("disabled").attr("value", "send").remove())
        }
      })), !1
    })
  });

  // countDown
  $(function() {
    $('#given_date').countdowntimer({
      dateAndTime: "2019/01/01 00:00:00",
      size: "lg",
      regexpMatchFormat: "([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})",
      regexpReplaceWith: "$1<span>days</span> $2<span>hours</span> $3<span>mnt</span> $4<span>sec</span>"
    });
  });

});
// HTML document is loaded end