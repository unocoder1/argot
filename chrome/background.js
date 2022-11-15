// background.js
chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
        id: "encodeMenu",
        title: "Encode",
        type: 'normal',
        contexts: ['all']
    });
    chrome.contextMenus.create({
        id: "decodeMenu",
        title: "Decode",
        type: 'normal',
        contexts: ['all']
    });
});

chrome.contextMenus.onClicked.addListener(menu => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            type: "contextMenuClicked",
            data: menu
        });
    });
});
