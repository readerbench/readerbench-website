(function() {
	'use strict';

	var teslaThemes = {

		init : function() {
			this.bxSliderInit();
			this.fixedElements();
			this.lightBox();
			this.videoBox();
		},

		bxSliderInit : function() {
			// Hero Slider (Main)
			var heroSliderPrev = jQuery('.hero-slider .custom-nav .prev'), heroSliderNext = jQuery('.hero-slider .custom-nav .next'),

			heroSlider = jQuery('.hero-slider .slides').bxSlider({
				speed : 980,
				auto : true,
				pause : 5500,
				mode : 'fade',
				pager : false,
				autoHover : true,
				controls : false,
				adaptiveHeight : true,
				onSliderLoad : function() {
					jQuery('.slider-component').addClass('ready');
				},
				onSlideAfter : function() {
					jQuery('.slider-component').addClass('ready');
				},
				onSlideBefore : function() {
					jQuery('.slider-component').removeClass('ready');
				}
			});

			heroSliderPrev.on('click', function() {
				heroSlider.goToPrevSlide();
			});

			heroSliderNext.on('click', function() {
				heroSlider.goToNextSlide();
			});
		},

		fixedElements : function() {
			var header = jQuery('header');

			jQuery(window).on(
					'scroll',
					function() {
						var st = jQuery(this).scrollTop();

						// Fixed Header
						(st > header.outerHeight(true)) ? header
								.addClass('not-visible') : header
								.removeClass('not-visible');

						(st > header.outerHeight(true) + 70) ? header
								.addClass('fixed') : header
								.removeClass('fixed');
					});
		},

		lightBox : function() {
			lightbox.option({
				'fadeDuration' : 700,
				'positionFromTop' : 200
			});
		},
		videoBox : function(){
			
		    // Resive video
		    scaleVideoContainer();

		    initBannerVideoSize('.video-container .poster img');
		    initBannerVideoSize('.video-container .filter');
		    initBannerVideoSize('.video-container video');
		        
		    $(window).on('resize', function() {
		        scaleVideoContainer();
		        scaleBannerVideoSize('.video-container .poster img');
		        scaleBannerVideoSize('.video-container .filter');
		        scaleBannerVideoSize('.video-container video');
		    });
		    
		    
			function scaleVideoContainer() {

			    var height = $(window).height();
			    var unitHeight = parseInt(height) + 'px';
			    $('.homepage-hero-module').css('height',unitHeight);

			}

			function initBannerVideoSize(element){
			    
			    $(element).each(function(){
			        $(this).data('height', $(this).height());
			        $(this).data('width', $(this).width());
			    });

			    scaleBannerVideoSize(element);

			}

			function scaleBannerVideoSize(element){

			    var windowWidth = $(window).width(),
			        windowHeight = $(window).height(),
			        videoWidth,
			        videoHeight;
			    
			    //console.log(windowHeight);

			    $(element).each(function(){
			        var videoAspectRatio = $(this).data('height')/$(this).data('width'),
			            windowAspectRatio = windowHeight/windowWidth;

			        if (videoAspectRatio > windowAspectRatio) {
			            videoWidth = windowWidth;
			            videoHeight = videoWidth * videoAspectRatio;
			            $(this).css({'top' : -(videoHeight - windowHeight) / 2 + 'px', 'margin-left' : 0});
			        } else {
			            videoHeight = windowHeight;
			            videoWidth = videoHeight / videoAspectRatio;
			            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});
			        }

			        $(this).width(videoWidth).height(videoHeight);

			        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');
			        

			    });
			}
		}
	};

	jQuery(document).ready(function() {
		teslaThemes.init();

		setTimeout(function() {
			jQuery('body').addClass('dom-ready');
		}, 200);
	});
}());

courseDescriptionToggle = function () {
	var courseDescription = jQuery('.course-description-list'),
		courseLessons = jQuery('.course-description-list .lesson');

	courseLessons.each(function () {
		var lesson = jQuery(this),
			lessonDescription = jQuery(this).find('.lesson-description').first(),
			lessonDescriptionItems = jQuery(this).find('.lesson-description li').first();

		lesson.find('.lesson-nr').on('click', function () {
			lessonDescription.toggleClass('visible');

			if (lessonDescription.hasClass('visible')) {
				lessonDescription.velocity('slideDown', {duration: 200});

				lessonDescriptionItems.each(function (i) {
					var obj = jQuery(this);
					setTimeout(function () {
						obj.find('.icon').addClass('visible');
					}, 100 * (i + 1));
				});
			} else {
				lessonDescription.velocity('slideUp', {duration: 170});

				lessonDescriptionItems.each(function (i) {
					var obj = jQuery(this);
					obj.find('.icon').removeClass('visible');
				});
			}
		});
	});
}