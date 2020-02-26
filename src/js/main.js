$(window).on("load",function(){
	$('.loader').fadeOut();
});
$(document).ready(function(){

	var options = {
		strings: [
			'Рекрутинг - это <span class="section-1-bubble">наука</span>',
			'Рекрутинг - это <span class="section-1-bubble">технология</span>',
			'Рекрутинг - это <span class="section-1-bubble">система</span>'
		],
		typeSpeed: 100,
		backSpeed: 50,
		backDelay: 2000,
		loop: true,
	};
	
	var typed = new Typed('#bubble-1', options);

	$('.btn-goto').on('click', function(e){
		var _id = $(this).attr('href');
		var _mode = $(this).data('mode');

		if(_mode == 'mobile') {

			$('html, body').animate({
				'scrollTop': $(_id).offset().top
			}, 1000);

		} else if(_mode == 'pc') {

			$(_id).removeClass('active');

			$('html, body').animate({
				'scrollTop': $(_id).offset().top
			}, 1000);

			$(_id).addClass('active');

		} else {

			$('html, body').animate({
				'scrollTop': $(_id).offset().top - 100
			}, 1000);

		}
		
		return false;
	});

	var swiper = new Swiper('#swiper-2', {
		// Default parameters
		slidesPerView: 1,
		spaceBetween: 10,
		speed: 0,
		autoplay: {
			delay: 4000,
			stopOnLastSlide: true,
			disableOnInteraction: false
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		on: {
			reachEnd: function(){
				//swiper.off('reachEnd');
			},
			slideChange: function(){
				if(this.activeIndex >=3) {
					this.autoplay.stop();
				}
			}
		}
	});

	$(window).on('activate.bs.scrollspy', function (e, obj) {
		if(obj.relatedTarget == '#section-1') {
			$('.header').removeClass('fixed');

		} else if(obj.relatedTarget == '#section-2-mobile') {
			$('.header').removeClass('fixed');
			$('.widget-phone').removeClass('fixed');

			swiper.autoplay.start();
			swiper.slideToLoop(0, 0);

		} else if(obj.relatedTarget == '#section-2-pc') {
			$('.header').removeClass('fixed');
			$('.widget-phone').removeClass('fixed');

		} else if(obj.relatedTarget == '#section-contacts') {
			$('.header').addClass('fixed');
			$('.widget-phone').removeClass('fixed');

		} else if(obj.relatedTarget == '#footer') {
			$('.header').addClass('fixed');
			$('.widget-phone').removeClass('fixed');

		} else {
			$('.header').addClass('fixed');
			$('.widget-phone').addClass('fixed');
		}

		$(obj.relatedTarget).addClass('active');
	});	

	$('[name=phone]').inputmask("+7 (999) 999-9999");

	$('.form-ajax').on('submit', function(e){
		e.stopPropagation();
		e.preventDefault();
		$.ajax({
			url: $(this).data('action'),
			method: 'POST',
			data: $(this).serialize()
		})
		.done(function( msg ) {
			$('#modal-sended').modal('show');
		})
		.fail(function( jqXHR, textStatus ) {
			$('#modal-error').modal('show');
		});
	});

	$('.modal-form-ajax').on('submit', function(e){
		e.stopPropagation();
		e.preventDefault();
		$.ajax({
			url: $(this).data('action'),
			method: 'POST',
			data: $(this).serialize()
		})
		.done(function( msg ) {
			$('#modal-callback').modal('hide');
			$('#modal-callback').on('hidden.bs.modal', function (e) {
				$('#modal-sended').modal('show');
				$('#modal-callback').off('hidden.bs.modal');
			});
		})
		.fail(function( jqXHR, textStatus ) {
			$('#modal-callback').modal('hide');
			$('#modal-callback').on('hidden.bs.modal', function (e) {
				$('#modal-error').modal('show');
				$('#modal-callback').off('hidden.bs.modal');
			});
		});
	});
});