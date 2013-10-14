var makeLivestream = function() {

	var width = $('#livestream-modal').width();
	var height = width * 0.75;

	$('#livestream-container').height(height + 'px')

	var output = '<object width="' + width + '" height="' + height + '">\
					<param name="movie" value="https://www.dropcam.com/e/76153ef8fad04a2f809ddb65e40c32ba?autoplay=true"></param>\
					<param name="allowFullScreen" value="true"></param>\
					<param name="allowscriptaccess" value="always"></param>\
					<param name="wmode" value="opaque"></param>\
					<embed src="https://www.dropcam.com/e/76153ef8fad04a2f809ddb65e40c32ba?autoplay=true" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="' + width + '" height="' + height + '" wmode="opaque"></embed>\
				</object>';
				
	$('#livestream-container').html(output);
};