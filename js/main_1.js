/* ===================================================================
    
    Author          : Valid Theme
    Template Name   : Premium WordPress Themes and Plugins - ValidThemes
    Version         : 1.0
    
* ================================================================= */
(function($) {
	"use strict";

	$(document).ready(function() {


		/* ==================================================
		    # Tooltip Init
		===============================================*/
		$('[data-toggle="tooltip"]').tooltip();


		/* ==================================================
		    # Youtube Video Init
		 ===============================================*/
		$('.player').mb_YTPlayer();


		/* ==================================================
		    # Scrolla active
		===============================================*/
		$('.animate').scrolla();


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
            # Hover Active Init
        ===============================================*/
		$('.hover-active-item').on('mouseenter', function() {
			var $this;
			$this = $(this);
			if ($this.hasClass('active')) {
				$this.addClass('active');
			} else {
				$this.addClass('active');
				$this.siblings().removeClass('active');
			}
		})


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
		    Nice Select Init
		===============================================*/
		$('select').niceSelect();


		/* ==================================================
            # Load More
        ===============================================*/
		 $('.product-load').simpleLoadMore({
            item: '.product-item',
            count: 9,
            counterInBtn: true,
            btnText: 'View More {showing}/{total}',
        });


		/* ==================================================
            # Feature Product Carousel
         ===============================================*/
		 const featureProduct = new Swiper(".feature-product-carousel", {
            // Optional parameters
            direction: "horizontal",
            loop: true,
            grabCursor: true,
            autoplay: true,
            effect: "fade",
			fadeEffect: {
				crossFade: true
			},

            // If we need pagination
            pagination: {
                el: '.feature-product-pagination',
                type: 'bullets',
                clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            }

            // And if we need scrollbar
            /*scrollbar: {
            el: '.swiper-scrollbar',
          },*/
        });


		/* ==================================================
            # Testimonial Carousel
         ===============================================*/
		 const testimonialCarousel = new Swiper(".testimonial-carousel", {
			// Optional parameters
			loop: true,
			freeMode: true,
			grabCursor: true,
			slidesPerView: 1,
			spaceBetween: 30,
			autoplay: false,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
				},
				1400: {
					slidesPerView: 3,
				}
			},
		});


		/* ==================================================
		    Ticket Form
		================================================== */
		$('.form-check-input').click(function() {
			$('.collapse').collapse('hide');
			$('#' + $(this).attr('aria-controls')).collapse('show');
		});
		
		/* ==================================================
		    Loop Counter
		================================================== */


	}); // end document ready function
})(jQuery); // End jQuery