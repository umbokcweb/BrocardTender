$(document).ready(function(){
var videos = $('section.fiveth .videosflow.videos video');
var thevideo = 1;
var activ_video = document.getElementById('activ_video');
var click_ok = true;
var was_points = false;

pointEdit();
if($(window).width() > 550){
	// To right
	$('section.fiveth .arrows .hoverzone-left').on('click', function(){LeftToRight();});
	// To left
	$('section.fiveth .arrows .hoverzone-right').on('click', function(){RightToLeft();});
} else {
	var points_mobile = $('section.fiveth .arrowsmobile .point');
	points_mobile.on('click', function(e){pointsMove(this);});
}


// check hoverzone
{
	$('section.fiveth .arrows .hoverzone-left,section.fiveth .arrows .hoverzone-right').fadeOut(0);
	if((thevideo+1) <= videos.length-1)
		$('section.fiveth .arrows .hoverzone-right').fadeIn(0);
	if(thevideo-1 >= 0)
		$('section.fiveth .arrows .hoverzone-left').fadeIn(0);
}
// main function
function LeftToRight(){
	if(thevideo > 0 && click_ok){
		click_ok = false;
		$('#activ_video').fadeOut(0);
		$('section.fiveth .arrows .hoverzone-left').fadeOut(0);
	
		videos.eq(thevideo-1).removeClass('left');
		videos.eq(thevideo).removeClass('the');
		videos.eq(thevideo-1).addClass('the');
		videos.eq(thevideo+1).removeClass('right');
		videos.eq(thevideo).addClass('right');
		
		pointEdit();

		setTimeout(ToRightHelp,550);
	}
}
function RightToLeft(){
	if(thevideo < videos.length - 1 && click_ok){
		click_ok = false;
		$('#activ_video').fadeOut(0);
		$('section.fiveth .arrows .hoverzone-right').fadeOut(0);
		
		videos.eq(thevideo+1).removeClass('right');
		videos.eq(thevideo).removeClass('the');
		videos.eq(thevideo+1).addClass('the');
		videos.eq(thevideo-1).removeClass('left');
		videos.eq(thevideo).addClass('left');
		
		pointEdit();

		setTimeout(ToLeftHelp,550);
	}
}
function pointsMove(e){
	var data_thevideo = $(e).attr('data-thevideo');
	thevideo = data_thevideo;
	active_video();
	pointEdit();
}
function pointEdit() {
	if($(window).width() < 550){
		var info = 'section.fiveth ';
		if(!was_points){

			$(info+'.arrowsmobile').css('width',(videos.length*30)+'px');
			for (var i = 0; i < videos.length; i++) {
				if(i != thevideo)
					$(info+'.arrowsmobile').append('<div class="point" data-thevideo="'+i+'"><div class="circle"></div></div>');
				else
					$(info+'.arrowsmobile').append('<div class="point point-active" data-thevideo="'+i+'"><div class="circle"></div></div>');
			}
			was_points = true;
		} else {
			$(info+'.arrowsmobile .point-active').removeClass('point-active');
			$(info+'.arrowsmobile .point[data-thevideo="'+thevideo+'"]').addClass('point-active');

		}
	}
}
//----------------------- Slide end
function ToRightHelp(){
	if(thevideo-2 >= 0) {
		videos.eq(thevideo-2).addClass('left');
		$('section.fiveth .arrows .hoverzone-left').fadeIn(0);
	}
	$('section.fiveth .arrows .hoverzone-right').fadeIn(0);
	thevideo--;
	click_ok = true;
	active_video();
}
function ToLeftHelp(){
	
	if((thevideo+2) <= videos.length-1) {
		videos.eq(thevideo+2).addClass('right');
		$('section.fiveth .arrows .hoverzone-right').fadeIn(0);
	}
	$('section.fiveth .arrows .hoverzone-left').fadeIn(0);
	thevideo++;
	click_ok = true;
	active_video();
}
function active_video(){
	$('#activ_video').attr('src',videos.eq(thevideo).attr('src')).fadeIn(0);
	if(!Poster_hide){
		Poster_hide = true;
		video.currentTime = 0;
	}
	controls.togglePlayback();
}
// hover
	$('section.fiveth .arrows .hoverzone-right').hover(
		function(){
			hover_arrow('right');
		},
		function(){
			outhover_arrow('right');
		}
	);
	$('section.fiveth .arrows .hoverzone-left').hover(
		function(){
			hover_arrow('left');

		},
		function(){
			outhover_arrow('left');
		}
	);
	function hover_arrow(even){
		var hoverzone = 'right';
		if(even == 'left'){hoverzone = even;}
		$('section.fiveth .arrows .hoverzone-'+hoverzone).css({'background':'rgba(0,0,0,0)'});
		$('section.fiveth .arrows .hoverzone-'+hoverzone+' .arrow').css({'background-position':'-3px -43px'});
	}
	function outhover_arrow(even){
		var hoverzone = 'right';
		if(even == 'left'){hoverzone = even;}
		$('section.fiveth .arrows .hoverzone-'+hoverzone).css({'background':'rgba(0,0,0,.8)'});
		$('section.fiveth .arrows .hoverzone-'+hoverzone+' .arrow').css({'background-position':'-3px -82px'});
	}
// Player 
	var controls = {
		video: $("#activ_video"),
		playpause: $("#playpause"),
		total: $("#total"),
		buffered: $("#buffered"),
		progress: $("#current"),
		currentTime: $("#currenttime"), 
		full: $("#full"), 
		hasHours: false,
		togglePlayback: function() {
				(video.paused) ?(video.play(), editPaysePlay(true)) :(video.pause(), editPaysePlay(false));
		}          
    };

    var video = controls.video[0];
	var Poster_hide = false;

    controls.playpause.click(function(){
	    if(!Poster_hide){
			Poster_hide = true;
			video.currentTime = 0;
		}
		controls.togglePlayback();
	});
	controls.video.click(function() {
	    if(!Poster_hide){
			Poster_hide = true;
			video.currentTime = 0;
		}
	    controls.togglePlayback();
	});
	controls.full.click(function() {
		enterFullscreen();
	});
	
	video.addEventListener("canplay", function() {
		if(!Poster_hide){
			video.currentTime = 5;
		}
		controls.hasHours = (video.duration / 3600) >= 1.0;
		controls.currentTime.text('- '+formatTime(video.duration),controls.hasHours);
	}, false);
	
	video.addEventListener("timeupdate", function() {
		if(Poster_hide){
			controls.currentTime.text('- '+formatTime(video.duration - video.currentTime, controls.hasHours));
			var progress = Math.floor(video.currentTime) / Math.floor(video.duration);
			controls.progress[0].style.width = Math.floor(progress * controls.total.width()) + "px";
		}
	
	}, false);

	controls.total.click(function(e) {
		var x = (e.pageX - this.offsetLeft)/$(this).width();
		video.currentTime = x * video.duration;
	});

	video.addEventListener("progress", function() {
		var buffered = Math.floor(video.buffered.end(0)) / Math.floor(video.duration);
		controls.buffered[0].style.width =  Math.floor(buffered * controls.total.width()) + "px";
	}, false);

	function formatTime(time, hours) {
		if (hours) {
			var h = Math.floor(time / 3600);
			time = time - h * 3600;

			var m = Math.floor(time / 60);
			var s = Math.floor(time % 60);

			return h.lead0(2)  + ":" + m.lead0(2) + ":" + s.lead0(2);
		} else {
			var m = Math.floor(time / 60);
			var s = Math.floor(time % 60);

			return m.lead0(2) + ":" + s.lead0(2);
		}
	}

	Number.prototype.lead0 = function(n) {
		var nz = "" + this;
		while (nz.length < n) {
			nz = "0" + nz;
		}
		return nz;
	};

	var editPaysePlay = function(what){
		if (what){
			$('#playpause').removeClass('glyphicon-play');
			$('#playpause').addClass('glyphicon-pause');
		} else {
			$('#playpause').removeClass('glyphicon-pause');
			$('#playpause').addClass('glyphicon-play');
		} 
	}
	//--------------------FullScreen
	document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen ||      document.mozCancelFullScreen;
	function enterFullscreen() {
		var onfullscreenchange =  function(e){
			var fullscreenElement = document.fullscreenElement || document.mozFullscreenElement || document.webkitFullscreenElement;
			var fullscreenEnabled = document.fullscreenEnabled || document.mozFullscreenEnabled || document.webkitFullscreenEnabled;
		}

		video.addEventListener("webkitfullscreenchange", onfullscreenchange);
		video.addEventListener("mozfullscreenchange",     onfullscreenchange);
		video.addEventListener("fullscreenchange",             onfullscreenchange);

		if (video.webkitRequestFullScreen) {
			video.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
		} else {
			video.mozRequestFullScreen();
		}
	}
	function exitFullscreen() {
	  document.cancelFullScreen();
	}
});

