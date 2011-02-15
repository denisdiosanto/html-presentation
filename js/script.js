/* Author: Daniel R. C. Filho
*/

var FullscreenrOptions = {  width:1280, height:853, bgID:'#bgimg' }; 
jQuery.fn.fullscreenr(FullscreenrOptions);

(function(){
	var timerDiv = document.createElement('div');
	var timerSpan= document.createElement('span');

	timerDiv.id = 'timerDiv';
	timerDiv.style.position = 'absolute';
	timerDiv.style.top = '0';
	timerDiv.style.left = '0';
	timerDiv.style.backgroundColor = '#CCC';
	timerDiv.style.width = '100%';
	timerDiv.style.height = '3px';
	
	timerSpan.id = 'timerSpan';
	timerSpan.style.display = 'block';
	timerSpan.style.backgroundColor = 'yellow';
	timerSpan.style.height = '3px';
	timerSpan.style.width = '1px';

	$('body').append(timerDiv);
	$('#timerDiv').append(timerSpan);

	$('#timerSpan').animate({
		width: 	'100%'
	},15000);

})();
