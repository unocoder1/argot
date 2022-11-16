console.log("popup.js loaded");

const restoreDefaultsButton = document.getElementById("restore_defaults");

const passwordTextBox = document.getElementById("password");
const removeNonASCIIFieldSet = document.getElementById("remove_non_ascii");
const compressPlaintextFieldSet = document.getElementById("compress_plain_text");
const encryptFieldSet = document.getElementById("encrypt");
const normalizeFrequenciesFieldSet = document.getElementById("normalize_frequencies");
const generateFakeTextFieldSet = document.getElementById("generate_fake_text");
const mapThroughDictionaryFieldSet = document.getElementById("map_through_dictionary");

const configControls = [
    passwordTextBox,
    removeNonASCIIFieldSet,
    compressPlaintextFieldSet,
    encryptFieldSet,
    normalizeFrequenciesFieldSet,
    generateFakeTextFieldSet,
    mapThroughDictionaryFieldSet
];

restoreDefaultsButton.addEventListener("click", () => {
    getConfigShorthandFromUI();
    //getConfigShorthandFromDefaults();
});

function getDefaultConfigFromStorage() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('defaultConfig', (result) => {
          // Pass any observed errors down the promise chain.
          if (chrome.runtime.lastError) {
            return reject(chrome.runtime.lastError);
          }
          // Pass the data retrieved from storage down the promise chain.
          resolve(result.defaultConfig);
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
          resolve(result.currentConfig);
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


function getConfigShorthandFromUI() {
    const configShorthand = [0, 0, 0, 0, 0, 0];

    configShorthand[0] = passwordTextBox.value;
    configShorthand[1] = removeNonASCIIFieldSet.querySelector('input[type="radio"]:checked').value;
    configShorthand[2] = compressPlaintextFieldSet.querySelector('input[type="radio"]:checked').value;
    configShorthand[3] = encryptFieldSet.querySelector('input[type="radio"]:checked').value;
    configShorthand[4] = normalizeFrequenciesFieldSet.querySelector('input[type="radio"]:checked').value;
    configShorthand[5] = generateFakeTextFieldSet.querySelector('input[type="radio"]:checked').value;
    configShorthand[6] = mapThroughDictionaryFieldSet.querySelector('input[type="radio"]:checked').value;

    return configShorthand;
}

function getConfigFromUI() {
    const config = { debug:false };

    config.password = passwordTextBox.value;
    config.removeNonASCII = removeNonASCIIFieldSet.querySelector('input[type="radio"]:checked').value;
    config.compressPlainText = compressPlaintextFieldSet.querySelector('input[type="radio"]:checked').value;
    config.encrypt = encryptFieldSet.querySelector('input[type="radio"]:checked').value;
    config.normalizeFrequencies = normalizeFrequenciesFieldSet.querySelector('input[type="radio"]:checked').value;
    config.generateFakeText = generateFakeTextFieldSet.querySelector('input[type="radio"]:checked').value;
    config.mapThroughDictionary = mapThroughDictionaryFieldSet.querySelector('input[type="radio"]:checked').value;

    return config;
}

function getConfigShorthandFromDefaults() {
    let configShorthand = [0, 0, 0, 0, 0, 0];

    configShorthand[0] = defaultConfig.password;
    configShorthand[1] = defaultConfig.removeNonASCII;
    configShorthand[2] = defaultConfig.compressPlainText;
    configShorthand[3] = defaultConfig.encrypt;
    configShorthand[4] = defaultConfig.normalizeFrequencies;
    configShorthand[5] = defaultConfig.generateFakeText;
    configShorthand[6] = defaultConfig.mapThroughDictionary;

    console.log(configShorthand);
    return configShorthand;
}

//chrome.storage.sync.get('defaultConfig', function(result) {
//    console.log('Value currently is ' + JSON.stringify(result.defaultConfig));
//});

getCurentConfigFromStorage().then(config => setUI(config));

for (let i = 0; i < configControls.length; i++) {
    configControls[i].addEventListener("change", function(e) {
        chrome.storage.sync.set({currentConfig: getConfigFromUI ()});
    });
}
