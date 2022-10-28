const textsToHide = document.querySelectorAll(':root > body > div.content div.usertext-body > div.md');
console.log(textsToHide);

const editorArea = document.querySelector(':root > body > div.content > div.commentarea > form > div.usertext-edit > div.md > textarea');
console.log(editorArea);

const editorOriginalSubmitButton = document.querySelector(':root > body > div.content > div.commentarea > form > div.usertext-edit > div.bottom-area > div.usertext-buttons > button[type="submit"]');
console.log(editorOriginalSubmitButton);
const editorEncodeButton = editorOriginalSubmitButton.cloneNode(false);
editorEncodeButton.id += 0; // TODO: Ensure unique ID.
editorEncodeButton.textContent  = "Encode";
editorOriginalSubmitButton.parentNode.appendChild(editorEncodeButton);
const editorNewSubmitButton = editorOriginalSubmitButton.cloneNode(false);
editorNewSubmitButton.id += 1; // TODO: Ensure unique ID.
editorNewSubmitButton.textContent  = "Encode and Submit";
editorOriginalSubmitButton.parentNode.appendChild(editorNewSubmitButton);
console.log(TextSteganography);
textsToHide.forEach((currentValue, currentIndex, listObj) => {
	currentValue.innerText = TextSteganography.getEncodedText(defaultConfig, currentValue.innerText);
});
