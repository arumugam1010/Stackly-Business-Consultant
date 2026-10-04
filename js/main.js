/* ===================================================================
    
    Author          : Valid Theme
    Template Name   : Buskey - Corporate Business Template
    Version         : 1.0
    
* ================================================================= */
(function($) {
    "use strict";

    $(document).ready(function() {


        /* ==================================================
            # Wow Init
         ===============================================*/
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();


        /* ==================================================
            # Banner Animation
         ===============================================*/
        function doAnimations(elems) {
            //Cache the animationend event in a variable
            var animEndEv = 'webkitAnimationEnd animationend';
            elems.each(function() {
                var $this = $(this),
                    $animationType = $this.data('animation');
                $this.addClass($animationType).one(animEndEv, function() {
                    $this.removeClass($animationType);
                });
            });
        }

        //Variables on page load
        var $immortalCarousel = $('.animate_text'),
            $firstAnimatingElems = $immortalCarousel.find('.carousel-item:first').find("[data-animation ^= 'animated']");
        //Initialize carousel
        $immortalCarousel.carousel();
        //Animate captions in first slide on page load
        doAnimations($firstAnimatingElems);
        //Other slides to be animated on carousel slide event
        $immortalCarousel.on('slide.bs.carousel', function(e) {
            var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
            doAnimations($animatingElems);
        });

        /* ==================================================
            # imagesLoaded active
        ===============================================*/
        $('#portfolio-grid,.blog-masonry').imagesLoaded(function() {

            /* Filter menu */
            $('.mix-item-menu').on('click', 'button', function() {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({
                    filter: filterValue
                });
            });

            /* filter menu active class  */
            $('.mix-item-menu button').on('click', function(event) {
                $(this).siblings('.active').removeClass('active');
                $(this).addClass('active');
                event.preventDefault();
            });

            /* Filter active */
            var $grid = $('#portfolio-grid').isotope({
                itemSelector: '.pf-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.pf-item',
                }
            });

            /* Filter active */
            $('.blog-masonry').isotope({
                itemSelector: '.blog-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.blog-item',
                }
            });

        });


        /* ==================================================
            # Magnific popup init
         ===============================================*/
        $(".popup-link").magnificPopup({
            type: 'image',
            // other options
        });

        $(".popup-gallery").magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            },
            // other options
        });

        $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        $('.magnific-mix-gallery').each(function() {
            var $container = $(this);
            var $imageLinks = $container.find('.item');

            var items = [];
            $imageLinks.each(function() {
                var $item = $(this);
                var type = 'image';
                if ($item.hasClass('magnific-iframe')) {
                    type = 'iframe';
                }
                var magItem = {
                    src: $item.attr('href'),
                    type: type
                };
                magItem.title = $item.data('title');
                items.push(magItem);
            });

            $imageLinks.magnificPopup({
                mainClass: 'mfp-fade',
                items: items,
                gallery: {
                    enabled: true,
                    tPrev: $(this).data('prev-text'),
                    tNext: $(this).data('next-text')
                },
                type: 'image',
                callbacks: {
                    beforeOpen: function() {
                        var index = $imageLinks.index(this.st.el);
                        if (-1 !== index) {
                            this.goTo(index);
                        }
                    }
                }
            });
        });

        /* ==================================================
            # Story Timeline
         ===============================================*/
        timeline(document.querySelectorAll('.timeline'), {
            forceVerticalMode: 991,
            mode: 'horizontal',
            verticalStartPosition: 'left',
            visibleItems: 3
        });

        /* ==================================================
            # Quote Carousel
         ===============================================*/
        $('.testimonials').owlCarousel({
            loop: false,
            nav: false,
            dots: true,
            items: 1,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
        });

        /* ==================================================
            # Quote Carousel
         ===============================================*/
        $('.full-about-info-items').owlCarousel({
            loop: false,
            nav: true,
            dots: false,
            items: 1,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
        });

        /* ==================================================
            # Team Carousel
         ===============================================*/
        $('.team-carousel-items').owlCarousel({
            loop: false,
            nav: true,
            dots: false,
            items: 1,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
        });

        /* ==================================================
            # Porfolio Banner Carousel
         ===============================================*/
        $('.pf-thum-carousel').owlCarousel({
            loop: false,
            nav: true,
            dots: false,
            items: 1,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
        });

        /* ==================================================
            # Projects Carousel
         ===============================================*/
        $('.project-items').owlCarousel({
            loop: false,
            margin: 10,
            nav: false,
            dots: true,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });

        /* ==================================================
            # Related Projects Carousel
         ===============================================*/
        $('.prelated-project-items').owlCarousel({
            loop: false,
            margin: 15,
            nav: false,
            dots: true,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });

        /* ==================================================
            # Services Carousel
         ===============================================*/
        $('.service-carousel').owlCarousel({
            loop: false,
            margin: 30,
            nav: true,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });

        /* ==================================================
            # Clients Carousel
         ===============================================*/
        $('.clients-items').owlCarousel({
            loop: false,
            margin: 20,
            nav: true,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 6
                }
            }
        });


        /* ==================================================
            # Testimonials Carousel
         ===============================================*/
        $('.testimonials').owlCarousel({
            loop: false,
            margin: 30,
            nav: false,
            dots: true,
            autoplay: false,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 2
                }
            }
        })


        /* ==================================================
            # Carousel Slide For Services (Autoplay enabled)
         ===============================================*/
        $('.carousel-service-items').owlCarousel({
            loop: true,
            autoplay: true,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
            smartSpeed: 800,
            nav: false,
            dots: true,
            items: 1,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
        })

        /* ==================================================
            # Carousel Slide Featured Work
         ===============================================*/
        $('.features-wrok-items').owlCarousel({
            loop: false,
            nav: true,
            dots: false,
            items: 1,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
        })

        /* ==================================================
            # Fun Factor Init
        ===============================================*/
        $('.timer').countTo();
        $('.fun-fact').appear(function() {
            $('.timer').countTo();
        }, {
            accY: -100
        });


        /* ==================================================
            Universal Button Redirect to 404.html
            Redirects content action buttons to 404.html
            EXCEPT:
            1. Header / Navigation bar (desktop, sticky, top bar)
            2. Footer (all footer links and footer newsletter)
            3. Mobile view sidebar / drawer (hamburger, close, drawer links)
            4. In-page functional widgets (carousel controls, tabs, accordions, filters, popups)
        ================================================== */
        $(document).on('click', 'a, button, [role="button"], input[type="submit"], input[type="button"]', function(e) {
            var $el = $(this);

            // 1. EXCEPT Navigation / Header
            if ($el.closest('header, nav, .navbar, .validnavs, #navbar-menu, .navbar-header, .top-bar-area').length > 0) {
                return;
            }

            // 2. EXCEPT Footer
            if ($el.closest('footer, .footer-area, .footer-bottom, .f-items').length > 0) {
                return;
            }

            // 3. EXCEPT Mobile view sidebar / drawer
            if ($el.closest('.mobile-sidenav, .navbar-collapse, .side, .overlay-screen').length > 0 ||
                $el.is('.navbar-toggle, .btn-close, .close-side, [data-bs-dismiss="modal"]') ||
                $el.closest('.navbar-toggle, .btn-close, .close-side').length > 0) {
                return;
            }

            // 4. EXCEPT In-page functional UI widgets
            // Carousel arrows & indicators
            if ($el.closest('.carousel-control-prev, .carousel-control-next, .owl-prev, .owl-next, .owl-dot, .carousel-indicators, [data-bs-slide], [data-bs-slide-to]').length > 0) {
                return;
            }
            // Tab switchers & pills
            if ($el.closest('[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-toggle="tab"], [data-toggle="pill"], .nav-tabs, .nav-pills').length > 0) {
                return;
            }
            // Accordion expand/collapse buttons
            if ($el.closest('.accordion-button, [data-bs-toggle="collapse"], [data-toggle="collapse"]').length > 0) {
                return;
            }
            // Isotope portfolio filter buttons
            if ($el.closest('.mix-item-menu, [data-filter]').length > 0) {
                return;
            }
            // Lightbox & Magnific popups
            if ($el.closest('.popup-link, .popup-gallery, .popup-youtube, .popup-vimeo, .mfp-close, .mfp-arrow, .mfp-container').length > 0) {
                return;
            }

            // 5. Check if element is a button / action CTA
            var isButton = false;

            // Native button tag or input button
            if ($el.is('button') || $el.is('input[type="submit"], input[type="button"]')) {
                isButton = true;
            }

            // Elements styled as buttons or with button role
            if ($el.is('.btn, [class*="btn-"], [role="button"]')) {
                isButton = true;
            }

            // Content CTA links or missing subpages
            var href = ($el.attr('href') || '').trim();
            if (href === '404.html' || 
                href === 'projects-details.html' || 
                href === 'blog-single-left-sidebar.html' ||
                $el.is('.read-more') ||
                $el.hasClass('read-more') ||
                $el.find('.fa-link').length > 0 ||
                $el.hasClass('fa-link')) {
                isButton = true;
            }

            if (isButton) {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = '404.html';
            }
        });

        // Auto-detect and highlight current active page in navigation
        function updateActiveNavLink() {
            var rawPath = window.location.pathname || '';
            var page = rawPath.split('/').pop().split('?')[0].split('#')[0].toLowerCase();
            if (!page || page === '' || page === 'index.html') {
                page = 'index.html';
            }

            var $navItems = $('header nav.navbar ul.nav.navbar-nav > li');
            $navItems.each(function() {
                var $li = $(this);
                if ($li.is('#nav-login-item, #nav-register-item, #nav-dashboard-item')) {
                    return;
                }
                var $a = $li.find('> a');
                if ($a.length) {
                    var href = ($a.attr('href') || '').split('/').pop().split('?')[0].split('#')[0].toLowerCase();
                    if (href === page || (page === 'index.html' && (href === '' || href === 'index.html'))) {
                        $li.addClass('active');
                    } else {
                        $li.removeClass('active');
                    }
                }
            });
        }
        updateActiveNavLink();

        // Contact form submit also safely navigates to 404
        $('.contact-form').on('submit', function(e) {
            e.preventDefault();
            window.location.href = '404.html';
        });

        // Input restrictions: Name cannot contain numbers; Phone/Number cannot contain alphabets
        $(document).on('keypress', '#name, #regName, input[name="name"]', function(e) {
            if (e.key >= '0' && e.key <= '9') {
                e.preventDefault();
            }
        });
        $(document).on('input paste', '#name, #regName, input[name="name"]', function() {
            var $this = $(this);
            setTimeout(function() {
                var clean = $this.val().replace(/[0-9]/g, '');
                if ($this.val() !== clean) {
                    $this.val(clean);
                }
            }, 0);
        });

        $(document).on('keypress', '#phone, input[name="phone"], input[type="tel"]', function(e) {
            if (/[a-zA-Z]/.test(e.key)) {
                e.preventDefault();
            }
        });
        $(document).on('input paste', '#phone, input[name="phone"], input[type="tel"]', function() {
            var $this = $(this);
            setTimeout(function() {
                var clean = $this.val().replace(/[a-zA-Z]/g, '').replace(/[^0-9+\s\-()]/g, '');
                if ($this.val() !== clean) {
                    $this.val(clean);
                }
            }, 0);
        });

        // Newsletter / Subscribe button navigates to 404
        $(document).on('submit', '.subscribe form', function(e) {
            e.preventDefault();
            window.location.href = '404.html';
        });
        $(document).on('click', '.subscribe button, .subscribe button i', function(e) {
            e.preventDefault();
            window.location.href = '404.html';
        });

        // Mobile drawer background blur & scroll-lock sync
        function syncMobileDrawer() {
            setTimeout(function() {
                var isOpen = $('.navbar-collapse').hasClass('show') || $('.overlay-screen').hasClass('opened');
                $('html, body').toggleClass('mobile-drawer-open', isOpen);
            }, 50);
        }
        $(document).on('click', '.navbar-toggle, .overlay-screen, .navbar-collapse a', function() {
            syncMobileDrawer();
        });
        $(window).on('resize', function() {
            if ($(window).width() >= 1024) {
                $('html, body').removeClass('mobile-drawer-open');
            }
        });

    }); // end document ready function

    function hidePreloader() {
        $(".se-pre-con").fadeOut("slow");
    }
    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        $(window).on('load', hidePreloader);
        setTimeout(hidePreloader, 1500);
    }

})(jQuery); // End jQuery