/* Author: Daniel R. C. Filho

*/
var FullscreenrOptions = {  width:1280, height:853, bgID:'#bgimg' }; 
jQuery.fn.fullscreenr(FullscreenrOptions)

(function(){
	var timerElement = document.createElement('div');
	var timerElementBar = document.createElement('span');
	
	timerElement.class = "timerElement";
	timerElementBar.class = "timerBar";

	$('#container').append(timerElement).append(timerElementBar);

})();
