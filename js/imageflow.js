$(document).ready(function(){
	// console.log('ok');
	var images = $('section.eighth .imageflow img');
	var theimage = 1;

	var click_ok = true;

	// was created points
	var was_points = false;
	var click_points = false;
	
	var editInfo_arg = '';
	if($(window).width() < 550)
		editInfo_arg = 'mobile';

	editInfo(editInfo_arg);

// On Click
	// what click img
	images.on('click', function(){
		if($(this).attr('class') == 'left')
			LeftToRight();
		else if($(this).attr('class') == 'right') 
			RightToLeft();
	});
	if($(window).width() > 550){
		// To right
		$('section.eighth .arrows .leftarr').on('click', function(){LeftToRight();});
		// To left
		$('section.eighth .arrows .rightarr').on('click', function(){RightToLeft();});
	} else {
		var points_mobile = $('section.eighth .arrowsmobile .point');
		points_mobile.on('click', function(e){pointsMove(this)});
	}
// On Click

// main function
	function LeftToRight(){
		if(theimage > 0 && click_ok){
			click_ok = false;
			images.eq(theimage-1).removeClass('left');
			images.eq(theimage).removeClass('the');
			images.eq(theimage-1).addClass('the');
			images.eq(theimage+1).removeClass('right');
			images.eq(theimage).addClass('right');
			
			setTimeout(endSlideToRight,200);
		}
	}
	function RightToLeft(){
		if(theimage < images.length - 1 && click_ok){
			click_ok = false;
			images.eq(theimage+1).removeClass('right');
			images.eq(theimage).removeClass('the');
			images.eq(theimage+1).addClass('the');
			images.eq(theimage-1).removeClass('left');
			images.eq(theimage).addClass('left');
			
			setTimeout(endSlideToLeft,200);
		}
	}
	function pointsMove(e){
		var data_theimg = $(e).attr('data-theimg');
		
		editInfo_arg = 'mobile';
		click_points = true;

		theimage = data_theimg;
		
		var l = data_theimg-1,
			t = data_theimg,
			r = ++data_theimg;
		
		for (var i = 0; i <= images.length; i++) {
			images.eq(i).removeClass('right');
			images.eq(i).removeClass('the');
			images.eq(i).removeClass('left');
		}

		if(l >= 0) images.eq(l).addClass('left');
		images.eq(t).addClass('the');
		if((r) <= images.length) images.eq(r).addClass('right');
			
		editInfo(editInfo_arg);
	}
// Dop function
	function editInfo (what_the){
		var info = 'section.eighth ';
		$(info+'.info p.name').html(images.eq(theimage).attr('data-name'));
		$(info+'.info p.whois').html(images.eq(theimage).attr('data-whois'));
		$(info+'.info p.experience').html(images.eq(theimage).attr('data-experience'));

		if(what_the == ''){
			$(info+'.arrows .step').html((theimage+1)+' <sup>/ '+images.length+'</sup>');
		}else if(what_the == 'mobile'){
			if(!was_points){
				$(info+'.arrowsmobile').css('width',(images.length*30)+'px');
				for (var i = 0; i < images.length; i++) {
					if(i != theimage)
						$(info+'.arrowsmobile').append('<div class="point" data-theimg="'+i+'"><div class="circle"></div></div>');
					else
						$(info+'.arrowsmobile').append('<div class="point point-active" data-theimg="'+i+'"><div class="circle"></div></div>');
				}
				was_points = true;
			} else {
				$(info+'.arrowsmobile .point-active').removeClass('point-active');
				$(info+'.arrowsmobile .point[data-theimg="'+theimage+'"]').addClass('point-active');

			}
		}
	}
// slide end
	function endSlideToLeft() {
		if((theimage+2) <= images.length) images.eq(theimage+2).addClass('right');
		theimage++;
		editInfo(editInfo_arg);
		click_ok = true;
	}
	function endSlideToRight() {
		if((theimage-2) >= 0) images.eq(theimage-2).addClass('left');
		theimage--;
		editInfo(editInfo_arg);
		click_ok = true;
	}
}); 
