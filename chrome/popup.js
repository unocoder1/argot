const encodeSelectedTextButton = document.getElementById("encodeSelectedTextButton");
encodeSelectedTextButton.addEventListener("click", () => {
	chrome.tabs.query ({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {body: "getSelection"}, function(message) {
			console.log("aaaaand back");
		});
	});
	/*const text = getSelectedText();
	const encodedText = TextSteganography.getEncoded(text);
	replaceFocusedText(encodedText);*/
});
