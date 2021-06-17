document.addEventListener("DOMContentLoaded", function () {
	
	MicroModal.init({
		onShow: modal => console.info(`${modal-1} is shown`), // [1]
		onClose: modal => console.info(`${close} is hidden`), // [2]
		//openTrigger: 'data-custom-open', // [3]
		//closeTrigger: 'data-custom-close', // [4]
		openClass: 'is-open', // [5]
		disableScroll: true, // [6]
		disableFocus: false, // [7]
		awaitOpenAnimation: false, // [8]
		awaitCloseAnimation: false, // [9]
		debugMode: true, // [10]
	})
	
	
	var $ = jQuery;
	$(function() {
		let header = $("#header");
		let section = $("#section");
		let sectionH;
		let nav = $("#nav");
		let navToggle = $("#navToggle");
		let scrollPos = $(window).scrollTop();
		// fixed header
		$(window).on("scroll load resize", function() {
			let sectionH = section.innerHeight();
			scrollPos = $(this).scrollTop();
			if (scrollPos > sectionH) {
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
		
		
		$(document).ready(function(){
			$("#slider").owlCarousel({
				items: 1,
				loop: true,
				nav: true,
			})
		})
		$(document).ready(function(){
			$("#sliderAbout").owlCarousel({
				items: 4,
				loop: true,
				nav: true,
			})
		})
		
		//Intro Tabs
		$(window).on('load', function(){
			$('.wrap-intro').each(function(index, item){
				$(item).find('.intro_link__wrapper').each(function(index_list, item_list){
					if(index_list === 0) {
						$(this).addClass('active');
					}
					$(item_list).attr('data-tab', index + '-tab-' + index_list);
				})
				$(item).find('.wrap_col__big').each(function(index_content, item_content){
					if(index_content === 0) {
						$(this).show();
					}
					$(item_content).attr('id', index + '-tab-' + index_content);
				})
			})
		});
		
		
		if(document.documentElement.clientWidth>767){
			$(document).on('click', '.intro_link__wrapper', function(e){
				e.preventDefault();
				
				let $this = $(this),
				data = $this.attr('data-tab'),
				parent = $($this.parents('.wrap-intro'));
				
				parent.find('.intro_link__wrapper').removeClass('active');
				$this.addClass('active');
				
				parent.find('.wrap_col__big').hide();
				$('.wrap_col__big#' + data).show();
			})			
		} 
	})
});