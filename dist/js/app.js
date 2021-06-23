document.addEventListener("DOMContentLoaded", function () {
	MicroModal.init({
		onShow: modal => console.info(`${modal-1} is shown`), 
		onClose: modal => console.info(`${close} is hidden`), 
		openClass: 'is-open', 
		disableScroll: true, 
		disableFocus: false, 
		awaitOpenAnimation: false, 
		awaitCloseAnimation: false, 
		debugMode: true, 
	});

	
	jQuery(document).ready(function($) {
		console.log($);
		let header = $("#header");
		let section = $("#section");
		let nav = $("#nav");
		let navToggle = $("#navToggle");
		let scrollPos = $(window).scrollTop();
		// fixed header
		$(window).on("scroll load resize", function() {
				scrollPos = $(this).scrollTop();
			if (scrollPos > 400) {
				header.addClass("fixed");
			} else {
				header.removeClass("fixed");
			}
		});
		    // Nav
			 navToggle.on("click", function(event) {
				event.preventDefault();
				nav.toggleClass("show");
		  });
		   /** Adaptive */
	// 		var window_width = window.innerWidth || document.documentElement.clientWidth,
	// 		lgMax = 1199,
	// 		lgMin = 992,
	// 		mdMax = 991,
	// 		mdMin = 768,
	// 		smMin = 576,
	// 		xsMax = 575;
 
	//   $(window).resize(function () {
	// 		window_width = window_width = window.innerWidth || document.documentElement.clientWidth;
	// 		sliderTeam();
	// 		sliderAbout();
	// 	 });

		 let sliderTeam = $(".team_slider_slick");
		 $('.single-item').slick();
	
		 sliderTeam.slick({
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  fade: false,
			  arrows: false,
			  dots: true,
			  speed: 500,
			  autoplay: true,
			  infinite: true,
			  responsive:[{
				  breakpoint: 1199,
				  settings: {
					 slidesToShow: 1,
					 slidesToScroll: 1,
				  }
			  },
			  {
				 breakpoint: 992,
				 settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				 }
			  },
			  {
				 breakpoint: 576,
				 settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				 }
			  },
			  {
				 breakpoint: 480,
				 settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				 }
			  },
			 ]
		 });

			let sliderAbout = $(".about_slider");
			$('.multiple-items').slick();
	  
			sliderAbout.slick({
				 slidesToShow: 4,
				 slidesToScroll: 2,
				 fade: false,
				 arrows: false,
				 dots: true,
				 speed: 300,
				 centerMode: true,
				 autoplay: true,
				 infinite: true,
				 responsive:[{
					 breakpoint: 1199,
					 settings: {
						slidesToShow: 4,
						slidesToScroll: 2,
						centerMode: true,
					 }
				 },
				 {
					breakpoint: 992,
					settings: {
					  slidesToShow: 2,
					  slidesToScroll: 2,
					  centerMode: true,
					}
				 },
				 {
					breakpoint: 576,
					settings: {
					  slidesToShow: 2,
					  slidesToScroll: 2,
					  centerMode: true,
					}
				 },
				 {
					breakpoint: 480,
					settings: {
					  slidesToShow: 1,
					  slidesToScroll: 4,
					}
				 },
				]
			});

		//Intro Tabs
		$(window).on('load', function(){
			$('.intro_wrap').each(function(index, item){
				$(item).find('.intro_link__wrapper').each(function(index_list, item_list){
					if(index_list === 0) {
						$(this).addClass('active');
					}
					$(item_list).attr('data-tab', index + '-tab-' + index_list);
				})
				$(item).find('.intro_col__big').each(function(index_content, item_content){
					if(index_content === 0) {
						$(this).show();
					}
					$(item_content).attr('id', index + '-tab-' + index_content);
				})
			})
		});
		
		
		// if(document.documentElement.clientWidth>767){
			$(document).on('click', '.intro_link__wrapper', function(e){
				e.preventDefault();
				
				let $this = $(this),
				data = $this.attr('data-tab'),
				parent = $($this.parents('.intro_wrap'));
				
				parent.find('.intro_link__wrapper').removeClass('active');
				$this.addClass('active');
				
				parent.find('.intro_col__big').hide();
				$('.intro_col__big#' + data).show();
			})			
	});
});