var imageBaseURL = 'images/people/';

function writeBio(netID) {
	var info = bios[netID];
	var payload, target;
	for (key in info) {

		if (key == 'photo') {
			payload = '<img src="' + imageBaseURL + info[key] + '">';
		} else if (key == 'links') {
			payload = '';
			var first = true;
			for (keykey in info[key]) {
				if (!first) {
					payload += '<li>|</li>';
				} else {
					first = false;
				}
				payload += '<li><a href="' + info[key][keykey] + '">' + keykey + '</a></li>';
			}
		} else {
			payload = info[key];
		}

		target = '#bio-' + key;
		$(target).html(payload);
	}
};