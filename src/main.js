require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');

var SDK = require('blocksdk');
var sdk = new SDK(null, null, true); // 3rd argument true bypassing https requirement: not prod worthy

var address, width, height, zoom, link, mapsKey;

function debounce (func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

function paintSettings () {
	document.getElementById('text-input-id-11').value = doctitle;
	document.getElementById('text-input-id-12').value = docContent;
}

function paintMap() {
	doctitle = document.getElementById('text-input-id-11').value;
	docContent = document.getElementById('text-input-id-12').value;
	docBody = '<link rel="stylesheet" href="https://cdn.ef.design/libs/gud-css/0.0.1/css/main.min.css" crossorigin="anonymous"><div class="ef-card--content">';
	docBody += ' <div class="ef-card--content"> <a href="#" class="ef-card--content__img" tabindex="-1" style="background-image: url(\'https://placeimg.com/640/480/arch\')"></a>';
	docBody += '<div class="ef-card--content__inner"><div class="ef-card--content__content"> <h4 class="ef-card--content__title">'; 
	docBody += doctitle; 
	docBody += '</h4><div class="ef-card--content__text"><p>';
	docBody += docContent; 
	docBody += '</p><a href="#" class="ef-card--content__link">Link to page</a> </div> </div></div>';
	console.log(docBody);
	sdk.setContent(docBody);
	sdk.setData({
		docContent: docBody,
		doctitle: doctitle
	});
}

sdk.getData(function (data) {
	docContent = data.docContent || '';
	doctitle = data.doctitle || '';
	paintSettings();
	paintMap();
});

document.getElementById('workspace').addEventListener("input", function () {
	debounce(paintMap, 500)();
});