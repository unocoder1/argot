/* global chrome */
console.log('popup.js loaded');

const restoreDefaultsButton = document.getElementById('restore_defaults');

const passwordTextBox = document.getElementById('password');
const removeNonASCIIFieldSet = document.getElementById('remove_non_ascii');
const compressPlaintextFieldSet = document.getElementById('compress_plain_text');
const encryptFieldSet = document.getElementById('encrypt');
const normalizeFrequenciesFieldSet = document.getElementById('normalize_frequencies');
const generateFakeTextFieldSet = document.getElementById('generate_fake_text');
const mapThroughDictionaryFieldSet = document.getElementById('map_through_dictionary');

const configControls = [
    passwordTextBox,
    removeNonASCIIFieldSet,
    compressPlaintextFieldSet,
    encryptFieldSet,
    normalizeFrequenciesFieldSet,
    generateFakeTextFieldSet,
    mapThroughDictionaryFieldSet,
];

function getDefaultConfigFromStorage() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('defaultConfig', (result) => {
            // Pass any observed errors down the promise chain.
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            // Pass the data retrieved from storage down the promise chain.
            return resolve(result.defaultConfig);
        });
    });
}

function getCurentConfigFromStorage() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('currentConfig', (result) => {
            // Pass any observed errors down the promise chain.
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            // Pass the data retrieved from storage down the promise chain.
            return resolve(result.currentConfig);
        });
    });
}

function setUI(config) {
    passwordTextBox.value = config.password;
    removeNonASCIIFieldSet.querySelector(`input[value="${config.removeNonASCII}"]`).checked = true;
    compressPlaintextFieldSet.querySelector(`input[value="${config.compressPlainText}"]`).checked = true;
    encryptFieldSet.querySelector(`input[value="${config.encrypt}"]`).checked = true;
    normalizeFrequenciesFieldSet.querySelector(`input[value="${config.normalizeFrequencies}"]`).checked = true;
    generateFakeTextFieldSet.querySelector(`input[value="${config.generateFakeText}"]`).checked = true;
    mapThroughDictionaryFieldSet.querySelector(`input[value="${config.mapThroughDictionary}"]`).checked = true;
}

function getConfigFromUI() {
    const config = { debug: false };

    config.password = passwordTextBox.value;
    config.removeNonASCII = removeNonASCIIFieldSet.querySelector('input[type="radio"]:checked').value;
    config.compressPlainText = compressPlaintextFieldSet.querySelector('input[type="radio"]:checked').value;
    config.encrypt = encryptFieldSet.querySelector('input[type="radio"]:checked').value;
    config.normalizeFrequencies = normalizeFrequenciesFieldSet.querySelector('input[type="radio"]:checked').value;
    config.generateFakeText = generateFakeTextFieldSet.querySelector('input[type="radio"]:checked').value;
    config.mapThroughDictionary = mapThroughDictionaryFieldSet.querySelector('input[type="radio"]:checked').value;

    return config;
}

restoreDefaultsButton.addEventListener('click', () => {
    getDefaultConfigFromStorage().then((config) => {
        setUI(config);
        chrome.storage.sync.set({ currentConfig: getConfigFromUI() });
    });
});

// chrome.storage.sync.get('defaultConfig', function(result) {
//    console.log('Value currently is ' + JSON.stringify(result.defaultConfig));
// });

getCurentConfigFromStorage().then((config) => setUI(config));

for (let i = 0; i < configControls.length; i += 1) {
    configControls[i].addEventListener('change', (_e) => {
        chrome.storage.sync.set({ currentConfig: getConfigFromUI() });
    });
}
