import { lightbox2 } from 'lightbox2';

declare var $:JQueryStatic;

export var teslaThemes = {

	init : function() {
		this.bxSliderInit();
		this.fixedElements();
		// this.lightBox();
		this.videoBox();
	},

	bxSliderInit : function() {
		// Hero Slider (Main)
		var heroSliderPrev = jQuery('.hero-slider .custom-nav .prev');
		var heroSliderNext = jQuery('.hero-slider .custom-nav .next');

		// var heroSlider = jQuery('.hero-slider .slides').bxSlider({
		// 	speed : 980,
		// 	auto : true,
		// 	pause : 5500,
		// 	mode : 'fade',
		// 	pager : false,
		// 	autoHover : true,
		// 	controls : false,
		// 	adaptiveHeight : true,
		// 	onSliderLoad : function() {
		// 		jQuery('.slider-component').addClass('ready');
		// 	},
		// 	onSlideAfter : function() {
		// 		jQuery('.slider-component').addClass('ready');
		// 	},
		// 	onSlideBefore : function() {
		// 		jQuery('.slider-component').removeClass('ready');
		// 	}
		// });

		// heroSliderPrev.on('click', function() {
		// 	heroSlider.goToPrevSlide();
		// });

		// heroSliderNext.on('click', function() {
		// 	heroSlider.goToNextSlide();
		// });
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

	// lightBox : function() {
	// 	lightbox2.option({
	// 		'fadeDuration' : 700,
	// 		'positionFromTop' : 200
	// 	});
	// },

	videoBox : function(){
		
		// Resize video
		scaleVideoContainer();

		initBannerVideoSize('.video-container .poster img');
		initBannerVideoSize('.video-container .filter');
		initBannerVideoSize('.video-container video');
			
		jQuery(window).on('resize', function() {
			scaleVideoContainer();
			scaleBannerVideoSize('.video-container .poster img');
			scaleBannerVideoSize('.video-container .filter');
			scaleBannerVideoSize('.video-container video');
		});
		
		
		function scaleVideoContainer() {

			var height = jQuery(window).height();
			var unitHeight = height + 'px';
			jQuery('.homepage-hero-module').css('height',unitHeight);

		}

		function initBannerVideoSize(element){
			
			jQuery(element).each(function(){
				jQuery(this).data('height', jQuery(this).height());
				jQuery(this).data('width', jQuery(this).width());
			});

			scaleBannerVideoSize(element);

		}

		function scaleBannerVideoSize(element){

			var windowWidth = jQuery(window).width(),
				windowHeight = jQuery(window).height(),
				videoWidth,
				videoHeight;
			
			//console.log(windowHeight);

			jQuery(element).each(function(){
				var videoAspectRatio = jQuery(this).data('height') / jQuery(this).data('width'),
					windowAspectRatio = windowHeight/windowWidth;

				if (videoAspectRatio > windowAspectRatio) {
					videoWidth = windowWidth;
					videoHeight = videoWidth * videoAspectRatio;
					jQuery(this).css({'top' : -(videoHeight - windowHeight) / 2 + 'px', 'margin-left' : 0});
				} else {
					videoHeight = windowHeight;
					videoWidth = videoHeight / videoAspectRatio;
					jQuery(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});
				}

				jQuery(this).width(videoWidth).height(videoHeight);

				jQuery('.homepage-hero-module .video-container video').addClass('fadeIn animated');
				

			});
		}
	}
};

export var courseDescriptionToggle = function (element) {
	if (typeof element == 'undefined') element = '.course-description-list';
	var courseDescription = jQuery(element),
		courseLessons = courseDescription.find('.lesson');

	courseLessons.each(function () {
		var lesson = jQuery(this),
			lessonDescription = lesson.find('> .lesson-description'),
			lessonDescriptionItems = lessonDescription.find('> li');

		lesson.find('> .heading > .lesson-nr').on('click', function () {
			lessonDescription.toggleClass('visible');

			if (lessonDescription.hasClass('visible')) {
				// lessonDescription.velocity('slideDown', {duration: 200});

				lessonDescriptionItems.each(function (i) {
					var obj = jQuery(this);
					setTimeout(function () {
						obj.find('.icon').addClass('visible');
					}, 100 * (i + 1));
				});
			} else {
				// lessonDescription.velocity('slideUp', {duration: 170});

				lessonDescriptionItems.each(function (i) {
					var obj = jQuery(this);
					obj.find('.icon').removeClass('visible');
				});
			}
		});
	});
}