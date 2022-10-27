const textsToHide = document.querySelectorAll(':root > body > div.content div.usertext-body > div.md');
console.log(textsToHide);

const editorArea = document.querySelector(':root > body > div.content > div.commentarea > form > div.usertext-edit > div.md > textarea');
console.log(editorArea);

const editorOriginalSubmitButton = document.querySelector(':root > body > div.content > div.commentarea > form > div.usertext-edit > div.bottom-area > div.usertext-buttons > button[type="submit"]');
console.log(editorOriginalSubmitButton);

textsToHide.forEach((currentValue, currentIndex, listObj) => {
	currentValue.innerText = getConcealedText(defaultConfig, currentValue.innerText);
});
