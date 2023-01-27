(function ($) {
	"use strict";
    
    var kallem = {
        initialize: function() {
            this.events();
            this.build();
        },
        build : function() {
            this.layoutStyle();
            this.alertAction();
            this.stickyContent();
            this.scrollSidebar();
            this.resizenicescroll();
            this.HoverDropdown();
            this.controlYoutubeVideo();
            this.owlPostSlider();
            this.hoverEffect();
            this.masonryGrid();
            this.filterMasonry();
            this.toggleShare();
            this.zoomImages();
            this.ajaxPage();
            this.windowHistory();
            this.controlPortfolioLine();
            this.filterPortfolioLine();
            this.infiniteScroll_3Col();
            this.infiniteScroll_col_gap();
            this.infiniteScroll_4Col();
            this.infiniteScrollBlog_3col();
            this.infiniteScrollBlog_sidebar();
            this.FormValidation();
            this.googleMaps();
            this.jssorSlider('jssor-slider');
            this.panelSwitch();
        },
        events : function(){
            // ------------------------------------------------------------------------------ //
            // Toggle Nav
            // ------------------------------------------------------------------------------ //
            $("#toggle-nav").on("click", function(){
                $(".wrapper").toggleClass("open");
                $("i", this).toggleClass("fa-bars");
                $("i", this).toggleClass("fa-times");
                setTimeout(function() {
                    this.resizenicescroll();
                }, 500);
            });


            // ------------------------------------------------------------------------------ //
            // Hover Dropdown
            // ------------------------------------------------------------------------------ //
            $(".wrap-menu > ul.menu").each(function(){
                $("li.dropdown > a", this).append("<span class='state'></span>");

                $("ul.dropdown-menu a",this).on("click", function(){
                    $(this).closest("li.dropdown").addClass("on"); 
                });
            });


            // ------------------------------------------------------------------------------ //
            // Menu Fixed
            // ------------------------------------------------------------------------------ //
            $("ul.nav-fixed").each(function(){
                $("li", this).each(function(){
                    var getTarget = $("a", this).attr("href");

                    $("a", this).on("click", function(e){
                        e.preventDefault();
                        var onActive = $(this).closest("li").hasClass("active");
                        if( onActive ){
                            $(".wrap-menu > ul.menu").find("li.dropdown").removeClass("open");
                            $(this).closest("li").removeClass("active");
                            $(getTarget).slideUp();
                        }else{
                            // Remove
                            $(".wrap-menu > ul.menu").find("li.dropdown").removeClass("open");
                            $("ul.nav-fixed > li").removeClass("active");
                            $(".fixed-widget .widget").slideUp();

                            $(this).closest("li").toggleClass("active");
                            $(getTarget).slideDown();
                        }
                    });
                });
            });


            // ------------------------------------------------------------------------------ //
            // Twitter Feed
            // ------------------------------------------------------------------------------ //
            $(".twitter-feed").each(function(){
                var idTwitter = $(this).attr("id"),
                    setIdTwitter = "#" + idTwitter,
                    getUsername = $(this).data("username"),
                    getLimit = $(this).data("limit");

                kallem.twitterFeed(setIdTwitter,getUsername,getLimit);
            });
            $('.twitter-list').list_ticker({
                speed:5000,
                effect:'fade'
            });


            // ------------------------------------------------------------------------------ //
            // Input Group
            // ------------------------------------------------------------------------------ //
            $(".input-group").each(function(){
                $(".form-control", this).on("focus", function(){
                    $(this).closest(".input-group").addClass("active");
                });
                $(".form-control", this).on("blur", function(){
                    $(this).closest(".input-group").removeClass("active");
                });
            });


            // ------------------------------------------------------------------------------ //
            // Flickr Feed
            // ------------------------------------------------------------------------------ //
            $(".flickr").each(function(){
                var getId = $(this).attr("id"),
                    flickrId = $("ul", this).data("flickr-id"),
                    count = $("ul", this).data("count-photo-flickr");

                kallem.flickrFeed(getId,flickrId,count);
            });        


            // ------------------------------------------------------------------------------ //
            // Accordion
            // ------------------------------------------------------------------------------ //
            $(".accordion").each(function(){
                $(".panel", this).each(function(){
                    var cekIn = $(".collapse", this).hasClass("in"),
                        getId = $(".collapse", this).attr("id");
                    if( cekIn ){
                        $(this).addClass("on");
                    }

                    $('#' + getId).on('shown.bs.collapse', function () {
                        $(this).closest(".panel").addClass("on");
                    });

                    $('#' + getId).on('hidden.bs.collapse', function () {
                        $(this).closest(".panel").removeClass("on");
                    });
                });
            });        


            // ------------------------------------------------------------------------------ //
            // Icons
            // ------------------------------------------------------------------------------ //
            $("ul.icons li").each(function(){
                var getEffect = $(this).data("effect");

                $("a", this).addClass("animated");
                $(this).on("mouseenter", function(){
                    $("a", this).addClass(getEffect);
                });
                $(this).on("mouseleave", function(){
                    $("a", this).removeClass(getEffect);
                });
            });


            // ------------------------------------------------------------------------------ //
            // Iframe loader
            // ------------------------------------------------------------------------------ //
            $("iframe").each(function(){
                var getSrc = $(this).attr("src");

                $(this).attr("data-src",getSrc);
                $(this).attr("src","");
            });


            // ------------------------------------------------------------------------------ //
            // Testimonial
            // ------------------------------------------------------------------------------ //
            var testimonial = $("#owl-testimonial");

            testimonial.owlCarousel({
                navigation : false, 
                pagination : false,
                autoPlay : true,
                slideSpeed : 300,
                singleItem:true,
                transitionStyle : "fade"
            });

            // Custom Navigation Events
            $(".next-testimonial").on("click", function(){
                testimonial.trigger('owl.next');
            });
            $(".prev-testimonial").on("click", function(){
                testimonial.trigger('owl.prev');
            });


            // ------------------------------------------------------------------------------ //
            // Disable Click
            // ------------------------------------------------------------------------------ //
            $("#next-page").on("click", function(e){
                e.preventDefault();
            });

        },


        // ------------------------------------------------------------------------------ //
        // Panel Switch
        // ------------------------------------------------------------------------------ //
        panelSwitch : function(){
            $(".panel-switch").each(function(){
                $(".control", this).on("click", function(e){
                    e.preventDefault();
                    $(this).closest(".panel-switch").toggleClass("on");
                });

                $("li", this).each(function(){
                    $(this).addClass("animated");
                    $(this).on("mouseenter", function(){
                        $(this).addClass("pulse");
                    });
                    $(this).on("mouseleave", function(){
                        $(this).removeClass("pulse");
                    });


                    $("a", this).on("click", function(e){
                        var getSkins = $(this).attr("href");

                        e.preventDefault();
                        $("link.skins").attr("href",getSkins);
                        $(this).closest(".panel-switch").removeClass("on");
                    });
                });
            });
        },


        // ------------------------------------------------------------------------------ //
        // Layout Style
        // ------------------------------------------------------------------------------ //
        layoutStyle : function(){
            // Variable Width & Height Element
            var windowWidth = $(window).width(),
                windowHeight = $(window).height(),
                widthWrap = $(".wrapper").width(),
                widthSidebar = $(".wrap-sidebar").width(),
                getHFooter = $(".wrapper .wrap-content > footer.footer").outerHeight(),
                getHFilter = $(".wrap-filter").outerHeight(),
                getHProjectSidebar = $(".project-sidebar").outerHeight(),
                getHWrapContact = $(".wrap-contact").outerHeight(),
                getHThumbProject = $("#thumb-project").outerHeight(),
                htmlIE = $("html").hasClass("ie9");

            // Setting Layout
            $(".wrapper .wrap-content > footer.footer").css("width", widthWrap + "px");
            $(".wrapper").css("padding-bottom", getHFooter + "px");

            // Inner Loading
            var getLoadingWidth = windowWidth - widthSidebar;
            $(".wrap-loading.inner").css("width", getLoadingWidth + "px");

            // Set min height infinitescroll
            var setHeightMinScroll = ( windowHeight - getHFilter );
            $(".infinite-scroll").css("min-height", setHeightMinScroll  + "px");


            // Set Height zoom images
            $(".wrap-zoom").css("height", windowHeight  + "px");
            $(".wrap-zoom .content").css("height", windowHeight  + "px");
            $(".wrap-zoom .content").css("width", windowWidth  + "px");
            $(".wrap-zoom #thumb-project").css("width", windowWidth  + "px");


            // Portfolio Line set height
            $(".project-post").css("min-height", getHProjectSidebar  + "px");
            $(".load-thumb").css("min-height", getHThumbProject  + "px");
            $(".load-thumb").css("top", "-" + getHThumbProject  + "px");
            $(".load-thumb").css("margin-bottom", "-" + getHThumbProject  + "px");

            // Google Maps set Height
            $(".google-maps").css("height", getHWrapContact  + "px");

            // Error Page
            $(".error-page").css("height", windowHeight  + "px");
            $(".error-page").css("width", widthWrap  + "px");
        },


        // ------------------------------------------------------------------------------ //
        // Alert
        // ------------------------------------------------------------------------------ //
        alertAction : function(){
            $(".alert").each(function(){
                var getOut = $(this).data("out");

                $(this).on("click", function(){
                    $(this).addClass("animated");
                    $(this).addClass(getOut).delay(1000).slideUp("slow", function(){
                        setTimeout(function() {
                            kallem.layoutStyle(); // reinit layout style
                        }, 50);
                    });
                });
            });
        },


        // ------------------------------------------------------------------------------ //
        // Nicescroll sidebar
        // ------------------------------------------------------------------------------ //
        scrollSidebar : function(){
            $(".wrap-sidebar").niceScroll({cursorborder:"",cursorcolor:"#666",boxzoom:false});
        },
        // Resize nicescroll sidebar
        resizenicescroll : function(){
            $(".wrap-sidebar").getNiceScroll().resize();
        },


        // ------------------------------------------------------------------------------ //
        // Sticky
        // ------------------------------------------------------------------------------ //
        stickyContent : function(){
            var getWindow = $(window).width();

            if( getWindow > 1025 ){
                $(".main-sidebar").hcSticky({
                    top: 0,
                    wrapperClassName: 'right-blog'
                });
                $(".project-sidebar").hcSticky({
                    top: 0,
                    wrapperClassName: 'right-project'
                });
            }else if( getWindow < 1025 ){
                $(".main-sidebar").hcSticky({
                    top: 70,
                    wrapperClassName: 'right-blog'
                });
                $(".project-sidebar").hcSticky({
                    top: 70,
                    wrapperClassName: 'right-project'
                });
            }
        },


        // ------------------------------------------------------------------------------ //
        // Replace Path images
        // ------------------------------------------------------------------------------ //
        replacePath : function(){
            $('img').each(function(){
                return $(this).attr('src',$(this).attr('src').replace('../../../',''));
                return $(this).attr('src',$(this).attr('src').replace('../../',''));
            });

            $('a').each(function(){
                return $(this).attr('href',$(this).attr('href').replace('../../../',''));
                return $(this).attr('href',$(this).attr('href').replace('../../',''));
            });
        },


        // ------------------------------------------------------------------------------ //
        // Change dropdown to hover on dekstop
        // ------------------------------------------------------------------------------ //
        HoverDropdown : function(){
            var getWindow = $(window).width();

            if( getWindow < 1024 ){
                $(".wrap-menu > ul.menu").off("mouseleave");
                $(".wrap-menu > ul.menu").find("li.dropdown").off("mouseenter");
                $(".wrap-menu > ul.menu").find("li.dropdown").off("mouseleave");
                $(".wrap-menu > ul.menu").each(function(){
                    $("li.dropdown", this).removeClass("open");

                    $(".dropdown-toggle",this).on("click", function(){
                        $(this).closest("li.dropdown").removeClass("on"); 
                    });
                }); 
            }else if( getWindow > 1024 ){
                $(".wrap-menu > ul.menu").each(function(){                
                    $("li.dropdown", this).on("mouseenter", function(){
                        $(".dropdown-menu", this).stop().slideDown();
                        $(this).addClass("open");

                        $(".dropdown-toggle",this).on("click", function(){
                            $(this).closest("li.dropdown").addClass("on");
                        });
                        return false;
                    });

                    $(this).on("mouseleave", function(){
                        $(".dropdown-menu", this).stop().slideUp();
                        $("li.dropdown", this).removeClass("open");
                        $("li.dropdown", this).removeClass("on");
                        return false;
                    });
                }); 
            }
        }, 


        // ------------------------------------------------------------------------------ //
        // Twitter feed
        // ------------------------------------------------------------------------------ //
        twitterFeed : function(setIdTwitter,getUsername,getLimit){
            //Setting Configuration
            $(setIdTwitter).tweecool({
                //settings
                username : getUsername, 
                limit : getLimit,
                profile_image : false,
                show_time : false,
                show_media : false,
                show_media_size: 'thumb'  //values: small, large, thumb, medium 
            });
        },


        // ------------------------------------------------------------------------------ //
        // Flickr Feed
        // ------------------------------------------------------------------------------ //
        flickrFeed : function(id,flickrID,count){
            var myFlickr = $("#" + id + " ul"),
                flickr_id = flickrID,
                flickr_photo_count = count,
                get_count_photo = flickr_photo_count - 1;

            //Flickr Integration
            $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?id=" + flickr_id + "&lang=en-us&format=json&jsoncallback=?", function(data){
                $.each(data.items, function(i,item){
                    if(i<=get_count_photo){
                        $("<img/>").attr("src", item.media.m).appendTo(myFlickr)
                        .wrap("<li><a href='" + item.link + "' target='_blank'></a></li>");
                    }
                });
            });
        },


        // ------------------------------------------------------------------------------ //
        // Call Youtube Player
        // ------------------------------------------------------------------------------ //
        callPlayer : function(frame_id, func, args) {
            if (window.jQuery && frame_id instanceof jQuery) frame_id = frame_id.get(0).id;
            var iframe = document.getElementById(frame_id);
            if (iframe && iframe.tagName.toUpperCase() != 'IFRAME') {
                iframe = iframe.getElementsByTagName('iframe')[0];
            }
            if (iframe) {
                // Frame exists, 
                iframe.contentWindow.postMessage(JSON.stringify({
                    "event": "command",
                    "func": func,
                    "args": args || [],
                    "id": frame_id
                }), "*");
            }
        },
        // Control Youtube
        controlYoutubeVideo : function(){
            $(".post-video").each(function(){
                var getID = $(".thumbnail", this).attr("id"),
                    getSrc = $("iframe", this).data("src"),
                    btnPlay = $(".btn-play",this),
                    btnPlay2 = $(".btn-play2",this),
                    btnPause = $(".pause > .btn-pause",this),
                    btnPlay2 = $(".play > .btn-pause",this),
                    btnStop = $(".btn-stop",this);

                $("iframe", this).attr("src", getSrc);

                btnPlay.on("click", function(){
                    $(this).closest(".thumbnail").addClass("showvideo");
                    kallem.callPlayer(getID,'playVideo');
                    $(".share").slideUp();
                }); 

                btnStop.on("click", function(){
                    $(this).closest(".thumbnail").removeClass("showvideo");
                    kallem.callPlayer(getID,'stopVideo');
                });
            });
        },


        // ------------------------------------------------------------------------------ //
        // Owl Post Slider
        // ------------------------------------------------------------------------------ //
        owlPostSlider : function(){
            $(".owl-post").each(function(){
                var getID = $(this).attr("id");
                $("#" + getID ).owlCarousel({
                    navigation : false, // Show next and prev buttons
                    slideSpeed : 300,
                    paginationSpeed : 400,
                    singleItem:true,
                    autoPlay:true,
                    responsiveRefreshRate:700
                });
            });
        },


        // ------------------------------------------------------------------------------ //
        // Hover Effect
        // ------------------------------------------------------------------------------ //
        hoverEffect : function(){
            $(".hover-effect").each(function(){
                var getHeight = $("img", this).height(),
                    hoverIn = $(this).data("hover-in"),
                    hoverOut = $(this).data("hover-out"),
                    htmlIE = $("html").hasClass("ie9");

                $(".option", this).hide();

                $(".option", this).css("height", getHeight + "px");
                $(".option", this).stop().addClass('animated');

                $(this).on("mouseenter", function() {
                    $(".option", this).stop().show();
                    $(".option", this).stop().removeClass(hoverOut);
                    $(".option", this).stop().addClass(hoverIn);
                    return false;
                });
                $(this).on("mouseleave", function() {
                    $(".option", this).stop().removeClass(hoverIn);
                    $(".option", this).stop().addClass(hoverOut);
                    return false;
                });

                // Hover in IE
                if( htmlIE ){
                    $(this).on("mouseenter", function() {
                        $(".option", this).fadeIn();
                        return false;
                    });
                    $(this).on("mouseleave", function() {
                        $(".option", this).fadeOut();
                        return false;
                    });
                }
            });
        },


        // ------------------------------------------------------------------------------ //
        // Masonry Grid
        // ------------------------------------------------------------------------------ //
        masonryGrid : function(){
            $('#masonry').masonry({
                columnWidth:'.grid-sizer',
                itemSelector: '.grid-item',
                percentPosition:true,
                gutter: 0
            }); 
        },
        // Filter Masonry
        filterMasonry : function(){
            $(".filters li").on("click", function(e) {
                e.preventDefault();

                $(".filters li").removeClass("active");
                $(this).addClass("active");
                var filter = $(this).attr("data-filter");
                $('#masonry').masonryFilter({
                    filter: function () {
                        if (!filter) return true;
                        return $(this).attr("data-filter") == filter;
                    }
                });
                kallem.masonryGrid();
            });
        },
        // Remove Filter
        removeFilter : function(){
            $(".filters li").removeClass("active");
            $(".filters li").first().addClass("active");

            var filter = "";
            $('#masonry').masonryFilter({
                filter: function () {
                    if (!filter) return true;
                    return $(this).attr("data-filter") == filter;
                }
            });        
        },


        // ------------------------------------------------------------------------------ //
        // Ajax Page
        // ------------------------------------------------------------------------------ //
        ajaxPage : function(){    
            var htmlIE = $("html").hasClass("ie9");
            if( !htmlIE ){
                $("a.ajax-page").off("click");
                $("a.ajax-page").on("click", function(e){
                    e.preventDefault();
                    var getUrl = $(this).attr("href");

                    $("#loading").addClass("inner");
                    $("#loading").fadeIn();

                    $('html, body').animate({
                        scrollTop: 0
                    }, 800);

                    kallem.layoutStyle();

                    $("#wrapper > .content").empty();
                    $('.infinite-scroll').infinitescroll('pause');

                    $("#wrapper").load( getUrl + " #wrapper" , function(responseText, statusText, xhr){
                        if(statusText == "success"){

                            history.pushState(null, null, getUrl);
                            kallem.replacePath();

                            $("#wrapper").find("#wrapper.wrapper").unwrap();
                            kallem.initialize();
                            kallem.googleMaps();

                            $('.infinite-scroll').infinitescroll('resume');
                            $("img").on("load", function(){
                                kallem.layoutStyle();
                                kallem.masonryGrid();
                                kallem.hoverEffect();
                            });
                            $("#loading").fadeOut(); 
                        }

                        if(statusText == "error"){
                            kallem.errorAction();
                        }
                    });

                    $(".panel-switch").load( getUrl + " .panel-switch" , function(responseText, statusText, xhr){
                        if(statusText == "success"){
                            kallem.replacePath();
                            $(".panel-switch").find(".panel-switch").unwrap();
                            kallem.panelSwitch();
                        }
                    });
                    return false;
                });
            }

        },
        // Window History
        windowHistory : function(){
            var htmlIE = $("html").hasClass("ie9");
            if( !htmlIE ){
                $(window).off('popstate');
                $(window).on('popstate', function() {
                    var url = window.location.href;
                    $("#loading").addClass("inner");
                    $("#loading").fadeIn();

                    $('html, body').animate({
                        scrollTop: 0
                    }, 800);

                    kallem.layoutStyle();

                    $("#wrapper > .content").empty();
                    $('.infinite-scroll').infinitescroll('pause');

                    $("#wrapper").load( url + " #wrapper" , function(responseText, statusText, xhr){
                        if(statusText == "success"){

                            kallem.replacePath();

                            $("#wrapper").find("#wrapper.wrapper").unwrap();
                            kallem.initialize();
                            kallem.googleMaps();

                            $('.infinite-scroll').infinitescroll('resume');
                            $("img").on("load", function(){
                                kallem.layoutStyle();
                                kallem.masonryGrid();
                            });
                            $("#loading").fadeOut(); 
                        }

                        if(statusText == "error"){
                            kallem.errorAction();
                        }
                    });
                    $(".panel-switch").load( getUrl + " .panel-switch" , function(responseText, statusText, xhr){
                        if(statusText == "success"){
                            kallem.replacePath();
                            $(".panel-switch").find(".panel-switch").unwrap();
                            kallem.panelSwitch();
                        }
                    });
                    return false;
                });
            }
        },


        // ------------------------------------------------------------------------------ //
        // Error Action
        // ------------------------------------------------------------------------------ //
        errorAction : function(){
            $("#wrapper").load( "404.html #wrapper" , function(responseText, statusText, xhr){
                if(statusText == "success"){

                    history.pushState(null, null, "404.html");
                    $("#wrapper").find("#wrapper.wrapper").unwrap();

                    kallem.initialize();
                    kallem.googleMaps();
                    kallem.masonryGrid();
                    $('.infinite-scroll').infinitescroll('resume');
                    $("img").on("load", function(){
                        kallem.layoutStyle();
                        $("#loading").fadeOut(); 
                    });
                }
            });
        },

        // ------------------------------------------------------------------------------ //
        // Zoom Images
        // ------------------------------------------------------------------------------ //
        zoomImages : function(){
            $('.zoom').off("click");
            var $gallery = $('.zoom').simpleLightbox();
            $gallery.on('shown.simplelightbox', function(){
                $(".sl-wrapper .sl-navigation button.sl-next").html("<i class='fa fa-chevron-right'></i>");
                $(".sl-wrapper .sl-navigation button.sl-prev").html("<i class='fa fa-chevron-left'></i>");
                $(".sl-wrapper .sl-close").html("<i class='fa fa-times'></i>");
            });        
        },


        // ------------------------------------------------------------------------------ //
        // Portfolio Line
        // ------------------------------------------------------------------------------ //
        controlPortfolioLine : function(){       
            kallem.loadThumbPortfolioLine();

            // List Load Page
            $("ol.portfolio-line").each(function(){  
                $("li", this).addClass("on");
                $("li", this).addClass("animated");
                $("li", this).each(function(){     
                    $("a", this).on("click", function(e){
                        var checkAktivate = $(this).closest("li").hasClass("active");
                        // Filter active
                        if( checkAktivate ){
                            e.preventDefault();
                        }else{
                            e.preventDefault();
                            $("ol.portfolio-line li").removeClass("active");
                            $(this).closest("li").addClass("active");
                            kallem.loadThumbPortfolioLine();
                        }  
                    });
                });
            });

            // Previous Page            
            $(".prev-page").on("click", function(e){
                e.preventDefault();
                var checkPrev = $("ol.portfolio-line li.active").prevAll(".on").first().length;    

                if( checkPrev != 0 ){
                    $("ol.portfolio-line li.active").prevAll(".on").first().addClass("active");
                    $("ol.portfolio-line li.active").last().removeClass("active");
                    kallem.loadThumbPortfolioLine();
                }else{
                    $("ol.portfolio-line li.on").last().addClass("active");
                    $("ol.portfolio-line li.active").first().removeClass("active");
                    kallem.loadThumbPortfolioLine();
                }
            });

            // Next Page  
            $(".next-page").on("click", function(e){
                e.preventDefault();
                var checkNext = $("ol.portfolio-line li.active").nextAll(".on").first().length;

                if( checkNext != 0 ){
                    $("ol.portfolio-line li.active").nextAll(".on").first().addClass("active");
                    $("ol.portfolio-line li.active").first().removeClass("active");  
                    kallem.loadThumbPortfolioLine();
                }else{
                    $("ol.portfolio-line li.on").first().addClass("active");
                    $("ol.portfolio-line li.active").last().removeClass("active");
                    kallem.loadThumbPortfolioLine();
                }
            });
        },
        // Portfolio Line Position
        scrollPosition : function(){
            // Variable Width & Height Element
            var windowWidth = $(window).width(),
                windowHeight = $(window).height(),
                windowHalfHeight = windowHeight / 3,
                getOffset = $("ol.portfolio-line").find("li.active").offset().top,
                setPosition = getOffset - windowHalfHeight;

            if( windowWidth > 981 ){
                // Animate to position
                $('html, body').stop().animate({
                    scrollTop: setPosition
                }, 800);
            }else{
                // Animate to position
                $('html, body').stop().animate({
                    scrollTop: 50
                }, 800);
            }
        },
        // Filter Portfolio Line
        filterPortfolioLine : function(){
            $(".filter-line ul.filters li").each(function(){
                $("a", this).on("click", function(e){
                    e.preventDefault();
                    var getFilter = $(this).closest("li").data("filter");

                    if( getFilter == "" ){ 
                        $("ol.portfolio-line li").slideDown(500); 

                        $("ol.portfolio-line li").removeClass("active");
                        $("ol.portfolio-line li").first().addClass("active");
                        $("ol.portfolio-line li").addClass("on");
                        kallem.loadThumbPortfolioLine();
                    }else{   
                        $("ol.portfolio-line li").removeClass("on");
                        $("ol.portfolio-line li."+ getFilter).addClass("on");

                        $("ol.portfolio-line li").removeClass("active");
                        $("ol.portfolio-line li."+ getFilter).first().addClass("active");

                        $("ol.portfolio-line li").css("min-height","0px");
                        $("ol.portfolio-line li."+ getFilter).css("min-height","120px");

                        $("ol.portfolio-line li").slideUp(500);
                        $("ol.portfolio-line li."+ getFilter).slideDown(500);
                        kallem.loadThumbPortfolioLine();
                    }

                    setTimeout(function() {
                        kallem.layoutStyle();
                    }, 900);
                });
            });
        },
        // Ajax load thumbnail project
        loadThumbPortfolioLine : function(){
            var getHref = $("ol.portfolio-line li.active").find(".title > a").attr("href"),
                getLoading = $(".wrap-loading").html();

            $(".load-thumb").html(getLoading);
            $(".load-thumb").fadeIn();

            $("#thumb-portfolio-line").load( getHref + " #thumb-project" , function(responseText, statusText, xhr){
                if(statusText == "success"){

                    $("#thumb-project").find(".control-thumb").remove();
                    $(".control-thumb").find(".ajax-page").attr("href", getHref);

                    $('img').each(function(){
                        $(this).attr('src',$(this).attr('src').replace('../../../',''));
                        $(this).attr('src',$(this).attr('src').replace('../../',''));
                    });

                    kallem.scrollPosition();
                    kallem.toggleShare();
                    kallem.controlYoutubeVideo();  
                    kallem.owlPostSlider();

                    $("img").on("load", function(){
                        kallem.layoutStyle(); 
                        $(".load-thumb").fadeOut();
                    });
                }

                if(statusText == "error"){
                    kallem.errorAction();
                }
            });
        },
        // Toggle Share
        toggleShare : function(){
            $(".share-portfolio").off("click");
            $(".share-portfolio").on("click", function(e){
                e.preventDefault();
                $(".share").slideToggle();
                $(".owl-post .owl-controls").slideToggle();
            });
        },


        // ------------------------------------------------------------------------------ //
        // Infinite Scroll Portfolio
        // ------------------------------------------------------------------------------ //
        // Infinitescroll masonry 4 column
        infiniteScroll_4Col : function(){
            $('#masonry.col-4').infinitescroll({
                loading: {
                    finished: undefined,
                    finishedMsg: "<i class='fa fa-check'></i> Finish load portfolio",
                    img: null,
                    msgText: "<i class='fa fa-spinner fa-spin'></i> Load more portfolio...",
                    speed: 'fast',
                    start: undefined
                },
                navSelector  	: "a#next-page:last",
                nextSelector 	: "a#next-page:last",
                itemSelector 	: "#masonry .grid-item",
                debug		 	: true,
                dataType	 	: 'json',
                appendCallback	: false, 
            }, function( response ) {    

                var jsonData = response.results;
                var $theCntr = $("#masonry");

                for(var i=0;i<jsonData.length;i++) {
                    var item = $(_renderItem(jsonData[i]));
                    $theCntr.masonry().append(item).masonry( 'appended', item ).masonry();
                }

                kallem.removeFilter(); // remove filter active
                $(".hover-effect").find(".option", this).hide(); // Hidden Hover Effect
                $("img").on("load", function(){
                    kallem.masonryGrid();
                    kallem.hoverEffect();
                });
                kallem.filterMasonry();
                kallem.zoomImages();
                kallem.ajaxPage();

            });

            // Render Item
            var _renderItem = function(data) {
                return  "<div data-filter='" + data.filter + "' class='grid-item " + data.classIndex + "'>" +
                        "<div class='item-portfolio hover-effect' data-hover-in='" + data.hoverIn + "' data-hover-out='" + data.hoverOut + "'>" +
                            "<img src='" + data.images + "' alt=''>" +
                            "<div class='option'>" +
                                "<div class='content'>" +
                                    "<h5 class='title'>" +
                                        "<a href='" + data.UrlTitle + "' class='ajax-page'>" + data.title + "</a>" +
                                    "</h5>" +
                                    "<p>" + data.Category + "</p>" +
                                    "<ul class='action-link'>" +
                                        "<li>" +
                                            "<a href='" + data.UrlZoom + "'  class='zoom'>" +
                                                "<i class='fa fa-arrows-alt'></i>" +
                                            "</a>" +
                                        "</li>" +
                                        "<li><a href='" + data.UrlTitle + "' class='ajax-page'><i class='fa fa-link'></i></a></li>" +
                                    "</ul>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +    
                    "</div>"
            }
        },
        // Infinitescroll masonry 3 column
        infiniteScroll_3Col : function(){
            $('#masonry.col-3').infinitescroll({
                loading: {
                    finished: undefined,
                    finishedMsg: "<i class='fa fa-check'></i> Finish load portfolio",
                    img: null,
                    msgText: "<i class='fa fa-spinner fa-spin'></i> Load more portfolio...",
                    speed: 'fast',
                    start: undefined
                },
                navSelector  	: "a#next-page:last",
                nextSelector 	: "a#next-page:last",
                itemSelector 	: "#masonry .grid-item",
                debug		 	: true,
                dataType	 	: 'json',
                appendCallback	: false, 
            }, function( response ) {    

                var jsonData = response.results;
                var $theCntr = $("#masonry");

                for(var i=0;i<jsonData.length;i++) {
                    var item = $(_renderItem(jsonData[i]));
                    $theCntr.masonry().append(item).masonry( 'appended', item ).masonry();
                }

                kallem.removeFilter(); // remove filter active
                $(".hover-effect").find(".option", this).hide(); // Hidden Hover Effect
                $("img").on("load", function(){
                    kallem.masonryGrid();
                    kallem.hoverEffect();
                });
                kallem.filterMasonry();
                kallem.zoomImages();
                kallem.ajaxPage();

            });

            // Render Item
            var _renderItem = function(data) {
                return  "<div data-filter='" + data.filter + "' class='grid-item " + data.classIndex + "'>" +
                        "<div class='item-portfolio hover-effect' data-hover-in='" + data.hoverIn + "' data-hover-out='" + data.hoverOut + "'>" +
                            "<img src='" + data.images + "' alt=''>" +
                            "<div class='option'>" +
                                "<div class='content'>" +
                                    "<h5 class='title'>" +
                                        "<a href='" + data.UrlTitle + "' class='ajax-page'>" + data.title + "</a>" +
                                    "</h5>" +
                                    "<p>" + data.Category + "</p>" +
                                    "<ul class='action-link'>" +
                                        "<li>" +
                                            "<a href='" + data.UrlZoom + "'  class='zoom'>" +
                                                "<i class='fa fa-arrows-alt'></i>" +
                                            "</a>" +
                                        "</li>" +
                                        "<li><a href='" + data.UrlTitle + "' class='ajax-page'><i class='fa fa-link'></i></a></li>" +
                                    "</ul>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +    
                    "</div>"
            }
        },
        // Infinitescroll masonry 3 column with gap
        infiniteScroll_col_gap : function(){
            $('#masonry.col-gap').infinitescroll({
                loading: {
                    finished: undefined,
                    finishedMsg: "<i class='fa fa-check'></i> Finish load portfolio",
                    img: null,
                    msgText: "<i class='fa fa-spinner fa-spin'></i> Load more portfolio...",
                    speed: 'fast',
                    start: undefined
                },
                navSelector  	: "a#next-page:last",
                nextSelector 	: "a#next-page:last",
                itemSelector 	: "#masonry .grid-item",
                debug		 	: true,
                dataType	 	: 'json',
                appendCallback	: false, 
            }, function( response ) {    

                var jsonData = response.results;
                var $theCntr = $("#masonry");

                for(var i=0;i<jsonData.length;i++) {
                    var item = $(_renderItem(jsonData[i]));
                    $theCntr.masonry().append(item).masonry( 'appended', item ).masonry();
                }

                kallem.removeFilter(); // remove filter active
                $(".hover-effect").find(".option", this).hide(); // Hidden Hover Effect
                $("img").on("load", function(){
                    kallem.masonryGrid();
                    kallem.hoverEffect();
                });
                kallem.filterMasonry();
                kallem.zoomImages();
                kallem.ajaxPage();

            });

            // Render Item
            var _renderItem = function(data) {
                return  "<div data-filter='" + data.filter + "' class='grid-item " + data.classIndex + "'>" +
                        "<div class='item-portfolio hover-effect' data-hover-in='" + data.hoverIn + "' data-hover-out='" + data.hoverOut + "'>" +
                            "<img src='" + data.images + "' alt=''>" +
                            "<div class='option'>" +
                                "<div class='content'>" +
                                    "<ul class='action-link'>" +
                                        "<li>" +
                                            "<a href='" + data.UrlZoom + "'  class='zoom'>" +
                                                "<i class='fa fa-arrows-alt'></i>" +
                                            "</a>" +
                                        "</li>" +
                                        "<li><a href='" + data.UrlTitle + "' class='ajax-page'><i class='fa fa-link'></i></a></li>" +
                                    "</ul>" +
                                "</div>" +
                            "</div>" +
                            "<div class='portfolio-content'>" +
                                "<h5 class='title'>" +
                                    "<a href='" + data.UrlTitle + "' class='ajax-page'>" + data.title + "</a>" +
                                "</h5>" +
                                "<p>" + data.Category + "</p>" +
                            "</div>"
                        "</div>" +    
                    "</div>"
            }
        },


        // ------------------------------------------------------------------------------ //
        // Infinite Scroll Blog
        // ------------------------------------------------------------------------------ //
        // Infinitescroll masonry 3 column
        infiniteScrollBlog_3col : function(){
            $('#masonry.blog-3col').infinitescroll({
                loading: {
                    finished: undefined,
                    finishedMsg: "<i class='fa fa-check'></i> Finish load post",
                    img: null,
                    msgText: "<i class='fa fa-spinner fa-spin'></i> Load more post...",
                    speed: 'fast',
                    start: undefined
                  },
                navSelector  	: "a#next-page:last",
                nextSelector 	: "a#next-page:last",
                itemSelector 	: "#masonry .grid-item",
                debug		 	: true,
                dataType	 	: 'html',
                maxPage         : 4,
                path: function(index) {
                    return "load/html/blog-masonry/blog" + index + ".html";
                }
            }, function(newElements, data, url){

                kallem.replacePath(); // Replace Images
                var $newElems = $( newElements );
                $('#masonry').masonry( 'appended', $newElems );
                $("img").on("load", function(){
                    kallem.masonryGrid();// reset grid masonry
                });
                kallem.controlYoutubeVideo();
                kallem.owlPostSlider();
                kallem.layoutStyle();
                kallem.masonryGrid();
                kallem.ajaxPage();
            });
        },
        // Infinitescroll blog sidebar
        infiniteScrollBlog_sidebar : function(){
            // Scroll down
            var scrollDown = function(){
                var body = $("html, body"),
                    windowHeight = $(window).height() * 0.5,
                    offsetTop = $("#next-page").offset().top,
                    setOffset = offsetTop + windowHeight;
                body.animate({scrollTop:setOffset}, '5000', 'swing');
            }

            $('#blog.blog-sidebar').infinitescroll({
                loading: {
                    finished: undefined,
                    finishedMsg: "<i class='fa fa-check'></i> Finish load post",
                    img: null,
                    msgText: "<i class='fa fa-spinner fa-spin'></i> Load more post...",
                    speed: 'fast',
                    start: undefined
                  },
                navSelector  	: "a#next-page:last",
                nextSelector 	: "a#next-page:last",
                itemSelector 	: "#blog .post-article",
                debug		 	: true,
                dataType	 	: 'html',
                maxPage         : 4,
                path: function(index) {
                    return "load/html/blog/blog" + index + ".html";
                }
            }, function(newElements, data, url){

                kallem.replacePath();
                scrollDown();
                kallem.controlYoutubeVideo();
                kallem.owlPostSlider();
                $("img").on("load", function(){
                    kallem.layoutStyle();
                    kallem.stickyContent();
                });
                kallem.ajaxPage();
            });
        },


        // ------------------------------------------------------------------------------ //
        // Jssor SLider
        // ------------------------------------------------------------------------------ //
        jssorSlider : function (containerId) {

            if ( $( "#" + containerId ).length ) {

                // Option Effect
                var trans = [];
                trans["FADE"] = {$Duration:900,$Opacity:2};
                trans["MCLIP|B-FADE"] = {$Duration:1200,$Clip:4,$Move:true,$Opacity:1.7,$During:{$Clip:[0.5,0.5],$Opacity:[0,0.5]}};
                trans["MCLIP|T-FADE"] = {$Duration:1200,$Clip:8,$Move:true,$Opacity:1.7,$During:{$Clip:[0.5,0.5],$Opacity:[0,0.5]}};
                trans["MCLIP|L-FADE"] = {$Duration:1200,$Clip:1,$Move:true,$Opacity:1.7,$During:{$Clip:[0.5,0.5],$Opacity:[0,0.5]}};
                trans["MCLIP|R-FADE"] = {$Duration:1200,$Clip:2,$Move:true,$Opacity:1.7,$During:{$Clip:[0.5,0.5],$Opacity:[0,0.5]}};
                trans["CLIP"] = {$Duration:900,$Clip:15,$Easing:{$Clip:$JssorEasing$.$EaseInOutCubic},$Opacity:2};
                trans["CLIP|L"] = {$Duration:900,$Clip:1,$Easing:{$Clip:$JssorEasing$.$EaseInOutCubic},$Opacity:2};
                trans["CLIP|R"] = {$Duration:900,$Clip:2,$Easing:{$Clip:$JssorEasing$.$EaseInOutCubic},$Opacity:2};
                trans["CLIP|T"] = {$Duration:900,$Clip:4,$Easing:{$Clip:$JssorEasing$.$EaseInOutCubic},$Opacity:2};
                trans["CLIP|B"] = {$Duration:900,$Clip:8,$Easing:{$Clip:$JssorEasing$.$EaseInOutCubic},$Opacity:2};

                // Images Slides
                var sliderEffect = [
                    // Slide effect 01
                    {$Duration:800,$Delay:30,$Cols:8,$Rows:4,$Formation:$JssorSlideshowFormations$.$FormationStraightStairs,$Assembly:2050,$Opacity:2},
                    // Slide effect 02
                    {$Duration:400,$Delay:100,$Cols:10,$Clip:2,$Formation:$JssorSlideshowFormations$.$FormationStraight},
                    {$Duration:1800,x:1,$Delay:30,$Cols:10,$Rows:5,$Clip:15}
                ];
                
                // Options
                var options = {
                    $FillMode: 2,                                     
                    $AutoPlay: true,                                   
                    $AutoPlayInterval: 4000,                            
                    $PauseOnHover: 1,                                   
                    $ArrowKeyNavigation: true,   			            
                    $SlideEasing: $JssorEasing$.$EaseOutQuint,          
                    $SlideDuration: 800,                                
                    $MinDragOffsetToSlide: 20,                          
                    $SlideSpacing: 0, 					                
                    $ParkingPosition: 0,                                
                    $UISearchMode: 1,                                  
                    $PlayOrientation: 1,                              
                    $DragOrientation: 1,                               
                    $CaptionSliderOptions: {                           
                        $Class: $JssorCaptionSlider$,                  
                        $CaptionTransitions: trans,      
                        $PlayInMode: 1,                                 
                        $PlayOutMode: 3                               
                    },

                    $SlideshowOptions: {                              
                        $Class: $JssorSlideshowRunner$,                 
                        $Transitions: sliderEffect,           
                        $TransitionsOrder: 1,                   
                        $ShowLink: true                               
                    },

                    $BulletNavigatorOptions: {                               
                        $Class: $JssorBulletNavigator$,                     
                        $ChanceToShow: 2,                               
                        $AutoCenter: 1,                                 
                        $Steps: 1,                                     
                        $Lanes: 1,                                      
                        $SpacingX: 10,                                  
                        $SpacingY: 10,                                 
                        $Orientation: 1                                
                    },

                    $ArrowNavigatorOptions: {                      
                        $Class: $JssorArrowNavigator$,             
                        $ChanceToShow: 2,                              
                        $AutoCenter: 2,                              
                        $Steps: 1                                     
                    }
                };
                
                var jssor_slider = new $JssorSlider$(containerId, options);
                
                //responsive code begin
                //you can remove responsive code if you don't want the slider scales while window resizes
                var ScaleSlider = function() {
                    var bodyWidth = $('.wrap-content').parent().width();
                    if (bodyWidth)
                        jssor_slider.$ScaleWidth(Math.min(bodyWidth, 1920));
                    else
                        $Jssor$.$Delay(ScaleSlider, 50);
                }
                ScaleSlider();
                $Jssor$.$AddEvent(window, "load", ScaleSlider);
                $Jssor$.$AddEvent(window, "resize", $Jssor$.$WindowResizeFilter(window, ScaleSlider));
                $Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
                //responsive code end
            }            
        },


        // ------------------------------------------------------------------------------ //
        // Form Validation
        // ------------------------------------------------------------------------------ //
        FormValidation : function(){
            var alertError = "<div class='alert alert-danger margin-top40' role='alert' data-out='fadeOutUp'>" +
                                "<i class='fa fa-times'></i>" +
                                "<h6 class='title'>Error</h6>" +
                                "<p>Please verify fields and try again.</p>" +
                            "</div>";

            // Validation Contact Form
            $("#mycontactform").validate({
                invalidHandler : function(form, validator) {
                    var errors = validator.numberOfInvalids();
                    $("#alert").html(alertError);
                    kallem.alertAction();
                    setTimeout(function() {
                        kallem.layoutStyle(); // reinit layout style
                    }, 50);
                },
                submitHandler : function() {
                    $("#submit").addClass("disabled");
                    $(".status-progress").html("<i class='fa fa-spinner fa-spin'></i>"); 

                    $.post("load/php/email.php", $("#mycontactform").serialize(),  function(response) {
                        $('#alert').html(response);
                        $("#submit").removeClass("disabled");
                        $(".status-progress").html("");
                        kallem.alertAction();
                    });
                    return false;
                }							 
            });
        },


        // ------------------------------------------------------------------------------ //
        // Google Maps
        // ------------------------------------------------------------------------------ //
        googleMaps : function(idMap){ 
            if ( $("#google-maps").length ) {
                $("#google-maps").prettyMaps({
                    address: ['Melbourne, Australia'],
                    image: 'js/prettymaps/map-icon.png',
                    saturation: -100,
                    lightness: 10
                });
            }
        }
    };
    
    $(window).on("load", function(){
        kallem.initialize(); // Display initial on window load
        kallem.masonryGrid(); // reinit masonry
        kallem.layoutStyle(); // reinit layout style
        
        $("#loading").fadeOut(); // Hiding animation loading        
    });
    
    // Reinitail on window resize
    $(window).on("resize", function() {
        
        // Close navigation bar on mobile
        $(".wrapper").removeClass("open");
        $("#toggle-nav").html("<i class='fa fa-bars'></i>");
        
        setTimeout(function() {
            kallem.layoutStyle(); // reinit layout style
            kallem.stickyContent(); // reinit sticky content
            kallem.masonryGrid(); // reinit masonry
            kallem.hoverEffect(); // reinit hover effect
        }, 900);

        setTimeout(function() {
            kallem.HoverDropdown(); // Dropdown hover or click on mobile
            kallem.scrollSidebar(); // reinit scroll sidebar
            kallem.resizenicescroll(); // resize nice scroll
            kallem.googleMaps(); // reinit  google maps on resizse
        }, 500);  
    });
    
}(jQuery));

