//Call tabletop.js and load in bio data from https://docs.google.com/spreadsheet/ccc?key=0AnPxd5MoDKC8dEhETDdWcXh5Z0tPWkhMV1UwME9jc1E
Tabletop.init({
	key : '0AnPxd5MoDKC8dEhETDdWcXh5Z0tPWkhMV1UwME9jc1E',
	callback : loadInfo,
	simpleSheet : true
})

var bios = {};

function loadInfo(data, tabletop) {
	for (var i = 0; i < data.length; i++) {
		//Re-key data based on NetIDs
		var key = data[i]['netid'];
		//Remove additional fields so they don't break the template parser
		delete data[i]['rowNumber'];
		delete data[i]['netid'];
		bios[key] = data[i];

		//Put the links in an associative array for the template parser
		var linkArray = {};
		var original = bios[key]['links'];
		//Split into seperate links by ';'
		var links = original.split(";");
		for (var j = 0; j < links.length; j++) {
			//Split title from URL by '$'
			var link = links[j].split("$");
			linkArray[link[0]] = link[1];
		};
		bios[key]['links'] = linkArray;
	}
}

