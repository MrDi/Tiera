jQuery(document).ready(function () {
	"use strict";
	var ErrorPhone = true,
		ErrorMail = true,
		index = 0,
		click_id = 0,
		jVal = {

			'f_mail': function (index) {

				var ele = jQuery("#form" + index + " .mail");
				ErrorMail = true;

				if (ele.val() != '') {
					var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
					if (pattern.test(ele.val())) {
						ele.css('border-bottom', '1px solid green').css({
							'-webkit-box-shadow': '0 0 0px 1000px rgba(31, 161, 23, 0.32) inset'
						});

						ErrorMail = false;

					} else {
						ele.css({
							'border-bottom': '1px solid red',
							'-webkit-box-shadow': 'rgba(217, 43, 43, 0.44) 0px 0px 0px 1000px inset'
						});
						ErrorMail = true;
					}
				} else {
					ele.css({
						'border-bottom': '1px solid red',
						'-webkit-box-shadow': 'rgba(217, 43, 43, 0.44) 0px 0px 0px 1000px inset'
					});
					ErrorMail = true;
				}

			},
			'f_phone': function (index) {

				var ele2 = jQuery("#form" + index + " .phone");
				ErrorPhone = true;

				if (ele2.val() != '') {
					ErrorPhone = false;
					ele2.css('border-bottom', '1px solid green').css({
						'-webkit-box-shadow': '0 0 0px 1000px rgba(31, 161, 23, 0.32) inset'
					});

				} else {
					ele2.css({
						'border-bottom': '1px solid red',
						'-webkit-box-shadow': 'rgba(217, 43, 43, 0.44) 0px 0px 0px 1000px inset'
					});
					ErrorPhone = true;
				}


			},

			'sendIt': function () {

				//jQuery('#jform').submit(); 
			}
		}

	jQuery(".phone").mask("+7 (999) 999-9999");
	jQuery.change_form = function (index) {

		jQuery("#form" + index + " .mail").change(function () {
			jVal.f_mail(index);
		});

		jQuery("#form" + index + " .phone").change(function () {
			jVal.f_phone(index);
		});
	};

	jQuery.change_form(1);
	jQuery.change_form(2);

	//Кликаем на красную кнопку, получам её id
	jQuery(".my_feed_button").click(function (e) {
        var $a= 1000;
		
		click_id = e.target.id;
		click_id = click_id.substr(11);
		e.preventDefault();
		jQuery.change_form(click_id);
		jVal.f_phone(click_id);
		jVal.f_mail(click_id);
		console.log('Клик=' + click_id);
		if (!ErrorPhone && !ErrorMail) {
			jQuery.ajax({
				url: "templates/lemon/action/form.php",
				type: "POST",
				cache: false, //url-адрес, по которому будет отправлен запрос
				dataType: "html", //
				data: jQuery("#form" + click_id).serialize(),
				success: function (html) {

					jQuery("#form" + click_id + " .valid").val("");
					jQuery("#form" + click_id + " .valid").css({
						'border-bottom': '',
						'-webkit-box-shadow': 'rgba(217, 43, 43, 0) 0px 0px 0px 1000px inset'
					});


					jQuery('#cbox').removeClass('show');
					jQuery('#blurfon').removeClass('show');
					jQuery('#container').removeClass('blur');

					if(click_id == 2 ){
						yaCounter31293318.reachGoal('form_right'); 
						a = 2000;
					}
					if(click_id == 1 ){
						yaCounter31293318.reachGoal('form_bottom'); 
					}
					setTimeout(function () {

						jQuery('.ok').css("display", "block").delay(1000).animate({
							opacity: 0
						}, 1000, function () {
							jQuery('.ok').css("display", "none");
							jQuery('.ok').css("opacity", "1");



							ErrorMail = true;

						});
					}, $a);





					/*
										if (click_id == 1) {
											jQuery("#form" + click_id).addClass('hide');
											jQuery("#form" + click_id + " + .message_ok").fadeIn();
											yaCounter39619600.reachGoal('submit_bottom');
										} else {
											jQuery("#form" + click_id + " .message_ok").fadeIn();
											jQuery("#form" + click_id + " > .line_input").addClass('hide');
											yaCounter39619600.reachGoal('submit_right');
										}*/



				},
				error: function (xhr, ajaxOptions, thrownError) {
					console.log("Упс!"); //выводим ошибку
				}
			});
		} else {
			return false;
		}

	});

});