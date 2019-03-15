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
	sdk.setContent(docContent);
	sdk.setData({
		docContent: docContent,
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
	paintSliderValues();
});