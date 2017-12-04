$(document).ready(function() {
	$('.roundlist').roundabout({
		minZ: 100,
		maxZ: 300,
		minOpacity: 1,
		minScale: 0.85,
		childSelector: '.mover',
		clickToFocus: false,
		tilt: -5,
		autoplay: true,
		autoplayDuration: 2200,
		autoplayPauseOnHover: true,
	});
});