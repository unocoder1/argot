// background.js
const defaultConfig = {
    debug: false,
    password: "Argot",
    removeNonASCII: 1,
    compressPlainText: 1,
    encrypt: "A",
    normalizeFrequencies: 1,
    generateFakeText: "A",
    mapThroughDictionary: 0,
};

chrome.runtime.onInstalled.addListener(async () => {
    chrome.storage.local.set({defaultConfig: defaultConfig}, function() {
        console.log("Default config: " + JSON.stringify(defaultConfig));
    });

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
