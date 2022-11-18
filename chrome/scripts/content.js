/* global chrome, TextSteganography */
let clickedElement;

document.addEventListener('contextmenu', (event) => {
    clickedElement = event.target;
}, true);

chrome.storage.sync.get('currentConfig', (result) => {
    const { currentConfig } = result;

    chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
        if (message.type === 'contextMenuClicked') {
            if (message.data.menuItemId === 'encodeMenu') {
                try {
                    clickedElement.innerText = TextSteganography.getEncodedText(currentConfig, clickedElement.innerText);
                } catch (error) {
                    console.log(error);
                }
            }
            if (message.data.menuItemId === 'decodeMenu') {
                try {
                    clickedElement.innerText = TextSteganography.getDecodedText(currentConfig, clickedElement.innerText);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    });

    const textsToHide = document.querySelectorAll(':root > body > div.content div.usertext-body > div.md');

    const editorArea = document.querySelector(':root > body > div.content > div.commentarea > form > div.usertext-edit > div.md > textarea');

    const editorOriginalSubmitButton = document.querySelector(':root > body > div.content > div.commentarea > form > div.usertext-edit > div.bottom-area > div.usertext-buttons > button[type="submit"]');
    const editorEncodeButton = editorOriginalSubmitButton.cloneNode(false);
    editorEncodeButton.id += 0; // TODO: Ensure unique ID.
    editorEncodeButton.textContent = 'Encode';
    editorEncodeButton.onclick = () => {
        editorArea.value = TextSteganography.getEncodedText(currentConfig, editorArea.value);
        return false; // Return false to stop form submit.
    };
    editorOriginalSubmitButton.parentNode.appendChild(editorEncodeButton);
    const editorNewSubmitButton = editorOriginalSubmitButton.cloneNode(false);
    editorNewSubmitButton.id += 1; // TODO: Ensure unique ID.
    editorNewSubmitButton.onclick = () => {
        editorArea.value = TextSteganography.getEncodedText(currentConfig, editorArea.value);
        return true; // Return true to NOT stop form submit.
    };
    editorNewSubmitButton.textContent = 'Encode and Submit';
    editorOriginalSubmitButton.parentNode.appendChild(editorNewSubmitButton);

    textsToHide.forEach((currentValue, _currentIndex, _listObj) => {
        try {
            const element = currentValue;
            element.innerText = TextSteganography.getDecodedText(currentConfig, currentValue.innerText);
        } catch (error) {
            console.log(error);
        }
    });
});
