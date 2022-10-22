const textsToHide = document.querySelectorAll(":root > body > div.content div.usertext-body > div.md");

console.log(textsToHide);

textsToHide.forEach((currentValue, currentIndex, listObj) => {
	currentValue.innerText = getConcealedText(defaultConfig, currentValue.innerText);
});
