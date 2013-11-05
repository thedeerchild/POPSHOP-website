//Base URL for images to use in bio modals, probably same as thumbnails on index.html
var imageBaseURL = 'images/people/';

function writeBio(netID) {
	//Calls bio-data.js
	var info = bios[netID];
	info['photo'] = imageBaseURL + netID + ".jpg";
	var payload, target;
	//Cycle through everything in the dictionary
	for (key in info) {
		if (key == 'photo') {
			payload = '<img src="' + info[key] + '">';
		} else if (key == 'links') {
			payload = '';
			var first = true;
			for (keykey in info[key]) {
				if (!first) {
					//Toss a divider character in between each link
					payload += '<li>|</li>';
				} else {
					first = false;
				}
				payload += '<li><a href="' + info[key][keykey] + '">' + keykey + '</a></li>';
			}
		} else {
			payload = info[key];
		}
		//Put each item in its appropriate div
		target = '#bio-' + key;
		$(target).html(payload);
	}
};