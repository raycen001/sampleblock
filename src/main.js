require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');

var SDK = require('blocksdk');
var sdk = new SDK(null, null, true); // 3rd argument true bypassing https requirement: not prod worthy

var doctitle, docContent, imageURL, linkURL, cardType;

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
	document.getElementById('text-input-id-13').value = imageURL;
	document.getElementById('text-input-id-14').value = linkURL;
	document.getElementById('text-input-id-15').value = cardType;
	
}

function paintMap() {
	docBody = '';
	doctitle = document.getElementById('text-input-id-11').value;
	docContent = document.getElementById('text-input-id-12').value;
	imageURL = document.getElementById('text-input-id-13').value;
	linkURL = document.getElementById('text-input-id-14').value;
	cardType = document.getElementById('text-input-id-15').value;
	docBody = '<html><style type="text/css"> @import url(https://cdn.ef.design/libs/gud-css/0.0.1/css/main.min.css);</style><div class="ef-card--content {5}"><a href="#" class="ef-card--content__img" tabindex="-1" ><img border="0" src="{3}" /></a><div class="ef-card--content__inner"><div class="ef-card--content__content"><h4 class="ef-card--content__title">{1}</h4><div class="ef-card--content__text"> <p>{2}</p><a href="{4}" class="ef-card--content__link">Link to page</a></div></div></div></div></html>';
	docBody = docBody.replace("{1}",doctitle);
	docBody = docBody.replace("{2}",docContent);
	docBody = docBody.replace("{3}",imageURL);
	docBody = docBody.replace("{4}",linkURL);

	if(cardType=="" || cardType==undefined || cardType==null){
		cardType = '';
	}
	docBody = docBody.replace("{5}",cardType);

	console.log(docBody);
	sdk.setContent(docBody);
	sdk.setData({
		docContent: docBody,
		doctitle: doctitle,
		docContent: imageURL,
		linkURL: linkURL,
		cardType: cardType
	});
}

sdk.getData(function (data) {
	docContent = data.docContent || '';
	doctitle = data.doctitle || '';
	imageURL = data.imageURL || '';
	linkURL = data.linkURL || '';
	cardType = data.cardType || '';
	paintSettings();
	paintMap();
});

document.getElementById('workspace').addEventListener("input", function () {
	debounce(paintMap, 500)();
});