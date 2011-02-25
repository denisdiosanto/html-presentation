/* Author: Daniel R. C. Filho
*/

// var FullscreenrOptions = {  width:1280, height:853, bgID:'#bgimg' }; 
// jQuery.fn.fullscreenr(FullscreenrOptions);


$(function() {

	// Options for SuperBGImage
	$.fn.superbgimage.options = {
		id: 'imageContainer', // id for the containter
		z_index: 0, // z-index for the container
		inlineMode: 0, // 0-resize to browser size, 1-do not resize to browser-size
		showimage: 1, // number of first image to display
		vertical_center: 1, // 0-align top, 1-center vertical
		transition: 1, // 0-none, 1-fade, 2-slide down, 3-slide left, 4-slide top, 5-slide right, 6-blind horizontal, 7-blind vertical, 90-slide right/left, 91-slide top/down
		transitionout: 1, // 0-no transition for previous image, 1-transition for previous image
		preload: 1, // 0-none, 1-preload images
		onShow: imageContainer_show, // function-callback show image
		onHide: imageContainer_hide // function-callback hide image
		// onClick: imageContainer_click, // function-callback click image
		// onMouseenter: imageContainer_mouseenter, // function-callback mouseenter
		// onMouseleave: imageContainer_mouseleave, // function-callback mouseleave
		// onMousemove: imageContainer_mousemove // function-callback mousemove
	};

	// initialize SuperBGImage
	$('#slidesImages').superbgimage();

});

// function callback on hiding image
function imageContainer_hide(img) {

}

// function callback on showing image
// get title and display it
function imageContainer_show(img) {
	$('#imageContainer').css('background', 'none');

	// show current slide
	$('.slideInfo p.slideCount').html('slide ' + img + ' de ' + $.superbg_imgIndex);

	// insert slide title
	if($('#slidesImages a' + "[rel='" + img + "']").attr('title')){
		$('.slideInfo h2').html($('#slidesImages a' + "[rel='" + img + "']").attr('title')).show();
	} else {
		$('.slideInfo h2').hide();
	}
	
	// insert slide's credits
	if($('#slidesImages a' + "[rel='" + img + "']").attr('credits')){
		$('.slideCredits p').html($('#slidesImages a' + "[rel='" + img + "']").attr('credits')).show();
	} else {
		$('.slideCredits p').hide();
	}

	$('.slideInfo').fadeIn('fast');

	showTimer(15, 'top', img);
	
}

// function callback on clicking image, show next slide
function imageContainer_click(img) {
	$('#thumbs').nextSlide();
}

my_slideshowActive = false;

// function callback onmouseenter, stop slideshow, show pause-indicator
function imageContainer_mouseenter(img) {
	if ($.superbg_slideshowActive) {
		my_slideshowActive = true;
		if ($('#pause').length == 0) { 
			$('body').prepend('<div id="pause"><img src="pause.png" \/><\/div>');
		}
		$('#pause').css('position', 'absolute').css('z-index', 3).show();
		return $('#thumbs').stopSlideShow();
	}
}

// function callback onmouseleave, start slideshow, hide pause-indicator
function imageContainer_mouseleave(img) {
	if (my_slideshowActive && ($('#pause').length > 0) && ($('#pause').css('display') == 'block'))  { 
		$('#pause').hide();
		return $('#thumbs').startSlideShow();
	}	
}

// function callback onmousemove, show and move pause-indicator
function imageContainer_mousemove(img, e) {
	if (my_slideshowActive && ($('#pause').length > 0)) { 
		$("#pause").css("top",(e.pageY + 20) + "px").css("left",(e.pageX + 20) + "px").show();
	}
}

// function to render the timer
// use:
// showTimer(15, 'up');
// it will show the timer on the top side and lasts 15 seconds
function showTimer(time, position, currentSlide){
	var timerDiv = document.createElement('div');
	var timerSpan= document.createElement('span');

	timerDiv.id = 'timerDiv';
	timerDiv.style.position = 'absolute';
	timerDiv.style.left = '0';
	timerDiv.style.backgroundColor = '#CCC';
	timerDiv.style.width = '100%';
	timerDiv.style.height = '10px';
	timerDiv.style.display = 'none';
	if(position){
		if(position == 'bottom'){
			timerDiv.style.bottom = '0';
		} else {
			timerDiv.style.top = '0';
		}
	}

	timerSpan.id = 'timerSpan';
	timerSpan.style.display = 'block';
	timerSpan.style.backgroundColor = 'yellow';
	timerSpan.style.height = '10px';
	timerSpan.style.width = '1px';

	$('body').append(timerDiv);
	$('#timerDiv').append(timerSpan).slideDown('fast');

	$('#timerSpan').animate(
		{ width: 	'100%' },
		(time * 1000),
		function(){
			// check if is the last slide
			if(currentSlide == 15){
				$('#timerDiv').slideUp('slow');
				return $('#slidesImages').stopSlideShow();
			} else {
				imageContainer_click();
			}
			$('#timerDiv').slideUp('fast').remove();
		}
	);
}