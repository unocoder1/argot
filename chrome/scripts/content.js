var clickedElement;

document.addEventListener("contextmenu", function(event){
    clickedElement = event.target;
}, true);

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "contextMenuClicked") {
        if (message.data.menuItemId === "encodeMenu") {
            try {
                clickedElement.innerText = TextSteganography.getEncodedText(defaultConfig, clickedElement.innerText);
            } catch (error) {
                console.log(error);
            }
        }
        if (message.data.menuItemId === "decodeMenu") {
            try {
                clickedElement.innerText = TextSteganography.getDecodedText(defaultConfig, clickedElement.innerText);
            } catch (error) {
                console.log(error);
            }
        }
    }
});

const textsToHide = document.querySelectorAll(':root > body > div.content div.usertext-body > div.md');
console.log(textsToHide);

const editorArea = document.querySelector(':root > body > div.content > div.commentarea > form > div.usertext-edit > div.md > textarea');
console.log(editorArea);

const editorOriginalSubmitButton = document.querySelector(':root > body > div.content > div.commentarea > form > div.usertext-edit > div.bottom-area > div.usertext-buttons > button[type="submit"]');
console.log(editorOriginalSubmitButton);
const editorEncodeButton = editorOriginalSubmitButton.cloneNode(false);
editorEncodeButton.id += 0; // TODO: Ensure unique ID.
editorEncodeButton.textContent  = "Encode";
editorEncodeButton.onclick = function(){
    editorArea.value = TextSteganography.getEncodedText(defaultConfig, editorArea.value);
    return false;  // Return false to stop form submit.
};
editorOriginalSubmitButton.parentNode.appendChild(editorEncodeButton);
const editorNewSubmitButton = editorOriginalSubmitButton.cloneNode(false);
editorNewSubmitButton.id += 1; // TODO: Ensure unique ID.
editorNewSubmitButton.onclick = function(){
    editorArea.value = TextSteganography.getEncodedText(defaultConfig, editorArea.value);
    return true;  // Return true to NOT stop form submit.
};
editorNewSubmitButton.textContent  = "Encode and Submit";
editorOriginalSubmitButton.parentNode.appendChild(editorNewSubmitButton);

textsToHide.forEach((currentValue, currentIndex, listObj) => {
    try {
        currentValue.innerText = TextSteganography.getDecodedText(defaultConfig, currentValue.innerText);
    } catch (error) {
        console.log(error);
    }
});
