
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
 });

 $(document).ready(function(){
	$("#slider").owlCarousel({
		items: 1,
		loop: true,
		nav: true,
	})
 })

});