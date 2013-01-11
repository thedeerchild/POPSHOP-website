function tumblrData(data) {
	var first = true;
	var insert = '';
	//If you change the number of posts being displayed, be sure to change the query URL in the JSON-P section of index.html
	for ( i = 0; i < 2; i++) {
		if (i > 0) {
			first = false;
		}
		var body = data.response.posts[i].body;
		
		//Pull the first image (or it could pick up an iframe by accident, eek) out of the post
		var im_start = body.indexOf('src=\"') + 5;
		var im_end = body.indexOf('\"', im_start);
		var img = body.substring(im_start, im_end);

		//Filter out any HTML tags		
		body = body.replace(/<(?:.|\n)*?>/gm, '');
		
		//Pull the first x characters as a text preview and add an elipsis, extend until it reaches the end of a word and isn't on a punctuation mark
		var bod_end = body.indexOf(' ', 175);
		if (body[bod_end - 1] == '.' || body[bod_end - 1] == '!' || body[bod_end - 1] == '?' || body[bod_end - 1] == ',') {
			bod_end = body.indexOf(' ', bod_end + 1);
		}
		body = body.substring(0, bod_end) + "...";

		//Add a horizontal divider between each post
		var divider = first ? '' : '<hr />';
		
		//Sorry for a messy template, but you'll figure it out
		insert += divider + '<div class="row recent-event"><div class="four columns"><a href="' + data.response.posts[i].post_url + '"><img class="radius" src="' + img + '"></a></div><div class="eight columns"><a href="' + data.response.posts[i].post_url + '"><h5>' + data.response.posts[i].title + '</h5></a>' + body + '<a class="see-more" href="' + data.response.posts[i].post_url + '">Read more</a></div></div>';
	}
	$('#tumblr-container').html(insert);
};