 $(document).ready(function(){
//----------------------------Variables
// form
var step = 1;
var form_button = 'section.third .form .cards .card form .buttons button';
var form_step = 'section.third .form .cards .card form .step';
var form_line = [
	'section.third .form .cards .card .line .hr hr.first-line-step.green', 
	'section.third .form .cards .card .line .hr hr.second-line-step.green',
	'section.third .form .cards .card .line .hr hr.third-line-step.green'
]; 
var form_dot = [
	'section.third .form .cards .card .line .hr .second-dot',
	'section.third .form .cards .card .line .hr .third-dot',
	'section.third .form .cards .card .line .hr .fourth-dot'
];

// cause
// first click for open, second click for close
var first_click_cause_on_mobile = false;
// the cause
var cause = 1;
// descripions
var what_cause = [
	'section.fourth .description .text.text-one',
	'section.fourth .description .text.text-two',
	'section.fourth .description .text.text-three',
	'section.fourth .description .text.text-four'
];
// clicks cause
var what_click_cause = [
	'section.fourth .cause .cause1',
	'section.fourth .cause .cause2',
	'section.fourth .cause .cause3',
	'section.fourth .cause .cause4'
];

//----------------------------click
// from (next, lost)
	// third
	$(form_button + '.next, '+form_button + '.done').on('click', function(){
		 if(step < 4){
		 	var SlideTo = true;
			if (step == 3) {
				SlideTo = false;
				var whatdocom = $('input[name="scthird-whatdocom"]').val().trim();
				if(whatdocom == ''){
					focusInput('input[name="scthird-whatdocom"]');
				} else{
					SlideTo = true;
					$(form_button + '.next').fadeOut(0);
				 	$(form_button + '.done').fadeIn(0);
				}
			}
			if(SlideTo){
				step++;
				slideStep(step-1, 'next');
				slideStep(step, 'next');
			}
		 } else if(step == 4){
			if(check_input_return('input[name="scthird-name"]') && check_input_return('input[name="scthird-phone"]')){
			 	$('section.third .call-thanks').fadeIn(0); 
			 	$(form_button + '.done').attr('type','submit');
			}else
				setInterval(function () {
					console.log('');
				}, 1000);
		 }
	});
	$(form_button + '.lost').on('click', function(){
		 if(step > 1 ){
		 	step--;
			slideStep(step+1, 'lost');
			slideStep(step, 'lost');
		 }
	});
	//sixth
	$('section.sixth .form form .input button').on('click', function(){
		if(check_input_return('input[name="scsixth-whatdocom') && check_input_return('input[name="scsixth-name"]') && check_input_return('input[name="scsixth-phone"]')){
			$('section.sixth .form form .input button').attr('type','submit');
		}
	});
	//neinth
	$('section.neinth .blocktwo form .input button').on('click', function(){
		if(check_input_return('input[name="scneinth-name"]') && check_input_return('input[name="scneinth-phone"]')){
			$('section.neinth .blocktwo form .input button').attr('type','submit');
		}
	});
	//tenth
	$('section.tenth .form form .input button').on('click', function(){
		if(check_input_return('input[name="sctenth-name"]') && check_input_return('input[name="sctenth-phone"]')){
			$('section.tenth .form form .input button').attr('type','submit');
		}
	});
// call thanks
	$('section.third .call-thanks .closeicon').on('click', function(){
		$('section.third .call-thanks').fadeOut(0);
	});

// view cause
if($(window).width() > 768){
	$(what_click_cause[0]).on('click', function(){
		if(cause != 1){
			CauseToggle(1);
		}
	});
	$(what_click_cause[1]).on('click', function(){
		if(cause != 2){
			CauseToggle(2);
		}
	});
	$(what_click_cause[2]).on('click', function(){
		if(cause != 3){
			CauseToggle(3);
		}
	});
	$(what_click_cause[3]).on('click', function(){
		if(cause != 4){
			CauseToggle( 4);
		}
	});
} else {
	$(what_click_cause[0]).on('click', function(){
			CauseToggle(1,'mobile');
			console.log('ok');
	});
	$(what_click_cause[1]).on('click', function(){
			CauseToggle(2,'mobile');
	});
	$(what_click_cause[2]).on('click', function(){
			CauseToggle(3,'mobile');
	});
	$(what_click_cause[3]).on('click', function(){
			CauseToggle(4,'mobile');
	});
}
// check input when user writing 
$('input[name="scthird-whatdocom"],input[name="scthird-name"],input[name="scthird-phone"],input[name="scsixth-whatdocom"],input[name="scsixth-name"],input[name="scsixth-phone"],input[name="scneinth-name"],input[name="scneinth-phone"],input[name="sctenth-name"],input[name="sctenth-phone"]').keyup(function(){check_input(this);});

function check_input(event){
	var text = $(event).val().trim();
	if(text == ''){
		$(event).css({'border-color': '#f54663'});
	} else {
		$(event).css({'border-color': '#0bb743'});
	}
}

function check_input_return(name){
	var name_text = $(name).val().trim();
	if(name_text == ''){
		focusInput(name);
		return false;
	} else {
		return true;
	}
}

function focusInput(event){
	$(event).focus().css({'border-color': '#f54663'});
}
//----------------------------hover
// menu 
	// show
	$('section.head .menu-button .icon').hover(function(){
		$('.menu-main').slideDown();
	}, function(){});
	// hide
	$('.menu-main .closemenu').hover(function(){
		$('.menu-main').slideUp();
	}, function(){});
//----------------------------function
// form
var slideStep = function (step, what){
	$(form_step + step).slideToggle();
	if (what == 'next') {
		$(form_line[step-2]).css({'width':'33.3333333%'});
		$(form_dot[step-2]).css({'background':'#26a340'});
	} else if(what == 'lost') {
		$(form_line[step-1]).css({'width':'0'});
		$(form_dot[step-1]).css({'background':'#ebebeb'});
	}
}
// cause-----------------start func
var CauseToggle = function(num, whereUser){
	if(whereUser == null){
		// show information
		$(what_cause[num-1]).fadeIn(0);
		To_active(what_click_cause[num-1]);
		// hide inforation
		$(what_cause[cause-1]).fadeOut(0);
		To_disactive(what_click_cause[cause-1]);
	} else if (whereUser == 'mobile'){
		if(!first_click_cause_on_mobile){

			// show information
			To_active(what_click_cause[num-1]);
			$('section.fourth .description').fadeIn(0);
			$(what_cause[num-1]).fadeIn(0);
			
			$.each(what_click_cause, function(key,val){
				if(val != what_click_cause[num-1])
					$(val).fadeOut(0);
			});

			first_click_cause_on_mobile = true;
		} else {

			// hide inforation
			$('section.fourth .description').fadeOut(0);
			$(what_cause[cause-1]).fadeOut(0);

			$.each(what_click_cause, function(key,val){
				$(val).fadeIn(0);
				if(val != what_click_cause[num-1])
					To_disactive(val);
			});

			first_click_cause_on_mobile = false;
		}

	}
	cause = num;
}
var To_active = function(what){
	// to active
	$(what).css({'background':'#0bb758'});
	$(what+' .num').css({'background':'#fff','color':'#f54663'});
	$(what+' p').css({'color':'#fff'});
}
var To_disactive = function(what){
	// to disactive
	$(what).css({'background':'#f5f5f5'});
	$(what+' .num').css({'background':'#f54663','color':'#fff'});
	$(what+' p').css({'color':'#1b4162'});
}
// cause-----------------end func

// Scroll main menu
$(".menu-main nav, section.head .number").on("click", "a", function (event) {
	
	$('.menu-main').slideUp(100);
	
	//отменяем стандартную обработку нажатия по ссылке
	event.preventDefault();
	//забираем идентификатор бока с атрибута href
	var id  = $(this).attr('href'),
	//узнаем высоту от начала страницы до блока на который ссылается якорь
		top = $(id).offset().top;
	//анимируем переход на расстояние - top за 2500 мс
	$('body,html').animate({scrollTop: top}, 2000);

});

var circle_percentr_ok = false;
var circle_percentr_head_ok = false;

// circle percent
circle_percent();

$(window).scroll(function () { // Когда страница прокручивается
	circle_percent();
});

function circle_percent(){
	var scrTop = $(window).scrollTop();
    if(scrTop>$('.circlestat').offset().top - $(window).height() && !circle_percentr_ok){
		$('.circlestat').circliful();
		editNumberPercent('.circlestat.first',' .circle-text',' <sup>%</sup>',40);
		editNumberPercent('.circlestat.second',' .circle-text',' <sup>%</sup>',40);
		editNumberPercent('.circlestat.third',' .circle-text',' <sup>%</sup>',40);
		editNumberPercent('.circlestat.fourth',' .circle-text',' <sup>%</sup>',40);
		circle_percentr_ok = true;
    } 

    if (scrTop>$('.section-head-title').offset().top - $(window).height() && !circle_percentr_head_ok) {
		editNumberPercent('.section-head-title',' span','%',10);
		circle_percentr_head_ok = true;
    }
};

function editNumberPercent(what,edit,percent_view, speed){
	var number = 1;
	var result = document.querySelector(what).dataset.percent;
	setInterval(function () {
		number++;
		if (number<=result) { $(what+edit).html(number+percent_view); };
	}, speed);
}

// Hands off
if($(window).width() <= 550){
	$('section.head .title p').html('Почему <span> 91%</span> подрядчиков никогда <br> не смогут выиграть тендер?');
	$('section.second .title h2').html('<span>Мы знаем как <b>выиграть тендер</b></span> <br> без опыта работы и без предварительной <br> договоренностей с заказчиком');
	$('section.second .cards p').html('Вы можете получить свой первый контракт<br> от <b> 10 млн. руб.</b> уже через <b> 8 дней</b><br> без вложений и рисков');
	$('section.third .title h2').html('<b>Мы получаем от 1 до 5%<br> по факту выигрыша тендера</b>');
	$('section.fourth .title h2').html('<b>Причины, почему компании <br>не могут выиграть тендер:</b>');
	$('section.sixth .title p').html('и наш менеджер в течение 15 минут расскажет вам о выставленных тендерах, где вы можете принять участие прямо сейчас');
	$('section.neinth .title2 p').html('Вы можете увеличить оборот<br>своего бизнеса путем заключения<br> прямого контракта!');
	$('section.neinth .title3 p').html('Заполните форму и узнайте как работать<br> напрямую с заказчиком без процедуры закупок<br> в соответствии с положением 44-ФЗ<span>*</span>');
}
$(window).resize(function(e) {
	$("p.size").text("Width: "+ window.innerWidth + ", Height: " + window.innerHeight);
});
});
