;(function($, window, undefined) {'use strict';

	var $doc = $(document), Modernizr = window.Modernizr;

	$(document).ready(function() {
		$.fn.foundationAlerts ? $doc.foundationAlerts() : null;
		$.fn.foundationButtons ? $doc.foundationButtons() : null;
		$.fn.foundationAccordion ? $doc.foundationAccordion() : null;
		$.fn.foundationNavigation ? $doc.foundationNavigation() : null;
		$.fn.foundationTopBar ? $doc.foundationTopBar() : null;
		$.fn.foundationCustomForms ? $doc.foundationCustomForms() : null;
		$.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;
		$.fn.foundationTabs ? $doc.foundationTabs({
			callback : $.foundation.customForms.appendCustomMarkup
		}) : null;
		$.fn.foundationTooltips ? $doc.foundationTooltips() : null;
		$.fn.foundationMagellan ? $doc.foundationMagellan() : null;
		$.fn.foundationClearing ? $doc.foundationClearing() : null;

		$.fn.placeholder ? $('input, textarea').placeholder() : null;
	});

	// UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
	// $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
	// $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
	// $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
	// $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});

	// Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).
	if (Modernizr.touch && !window.location.hash) {
		$(window).load(function() {
			setTimeout(function() {
				window.scrollTo(0, 1);
			}, 0);
		});
	}

	/*************************************************************************************
	 * Above: Foundation activation code.  Below: Click handlers and form validation.    *
	 *************************************************************************************/

	$(document).ready(function() {
		//Email Regex
		var email_check = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i;
		
		$('.launch-join-modal').click(function(e) {
			e.preventDefault();
			$('#join-modal').reveal();
		});
		$('.bio-link').click(function(e) {
			e.preventDefault();
			$('#bio-modal').reveal({
				//Calls bios.js
				open : writeBio($(this).attr('data-bio'))
			});
		});
		$('a.scroll').click(function(e) {
			e.preventDefault();
			$('.reveal-modal').trigger('reveal:close');
			var target = $(this).attr('href');
			$('html, body').animate({
				scrollTop : $(target).offset().top
			}, 750);
		});
		$('a.livestream-trigger').click(function(e) {
			e.preventDefault();
			$('#livestream-modal').reveal({
				//Calls webcam.js
				open : makeLivestream('livestream-container')
			});
		});
		$('#contact-submit').click(function(e) {
			e.preventDefault();
			var submit = true;
			//Checks name isn't empty
			if ($('#ctc-fm-name').val() == '') {
				$('#ctc-fm-name').addClass('error');
				$('#ctc-fm-name-lbl').addClass('error');
				submit = false;
			} else {
				$('#ctc-fm-name').removeClass('error');
				$('#ctc-fm-name-lbl').removeClass('error');
			}
			//Checks email is a real email
			if (!email_check.test($('#ctc-fm-email').val())) {
				$('#ctc-fm-email').addClass('error');
				$('#ctc-fm-email-lbl').addClass('error');
				submit = false;
			} else {
				$('#ctc-fm-email').removeClass('error');
				$('#ctc-fm-email-lbl').removeClass('error');
			}
			//Checks message isn't empty
			if ($('#ctc-fm-message').val() == '') {
				$('#ctc-fm-message').addClass('error');
				$('#ctc-fm-message-lbl').addClass('error');
				submit = false;
			} else {
				$('#ctc-fm-message').removeClass('error');
				$('#ctc-fm-message-lbl').removeClass('error');
			}
			//Submit form
			var data_string = 'type=message' + '&name= ' + $('#ctc-fm-name').val() + '&email=' + $('#ctc-fm-email').val() + '&message=' + $('#ctc-fm-message').val() + '&join=' + $('#ctc-fm-join').val();
			if (submit) {
				$.ajax({
					type : "POST",
					url : "form.php",
					data : data_string,
					beforeSend : function() {
						$('#ctc-fm-msg').html('<img src="images/ajax-loader.gif">');
					},
					success : function(data) {
						if (data.success) {
							$('#ctc-fm-msg').html("Message sent. :) ");
						} else {
							$('#ctc-fm-msg').html('' + data.error);
						}
					}
				});
			}
		});
		$('#list-fm-submit').click(function(e) {
			e.preventDefault();
			var email = $('#list-fm-email').val();
			var submit = true;
			//Checks email is a real email
			if (!email_check.test(email)) {
				$('#list-fm-email').addClass('error');
				$('#list-fm-email-lbl').addClass('error');
				submit = false;
			} else {
				$('#list-fm-email').removeClass('error');
				$('#list-fm-email-lbl').removeClass('error');
			}
			//Submit form
			var data_string = 'type=join' + '&email=' + email;
			if (submit) {
				$.ajax({
					type : "POST",
					url : "form.php",
					data : data_string,
					beforeSend : function() {
						$('#list-fm-msg').html('<img src="images/ajax-loader.gif">');
					},
					success : function(data) {
						if (data.success) {
							$('#list-fm-msg').html(data.email + " successfully joined the listserv. Prepare to be notified about some really cool events!");
						} else {
							$('#list-fm-msg').html('' + data.error);
						}
					}
				});
			}
		});
	});

})(jQuery, this);
