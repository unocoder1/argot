console.log("popup.js loaded");

const restoreDefaultsButton = document.getElementById("restore_defaults");

const passwordTextBox = document.getElementById("password");
const removeNonASCIIFieldSet = document.getElementById("remove_non_ascii");
const compressPlaintextFieldSet = document.getElementById("compress_plain_text");
const encryptFieldSet = document.getElementById("encrypt");
const normalizeFrequenciesFieldSet = document.getElementById("normalize_frequencies");
const generateFakeTextFieldSet = document.getElementById("generate_fake_text");
const mapThroughDictionaryFieldSet = document.getElementById("map_through_dictionary");

restoreDefaultsButton.addEventListener("click", () => {
    getConfigShorthandFromUI();
    getConfigShorthandFromDefaults();
});


function getConfigShorthandFromUI() {
    let configShorthand = [0, 0, 0, 0, 0, 0];

    configShorthand[0] = passwordTextBox.value;
    configShorthand[1] = removeNonASCIIFieldSet.querySelector('input[type="radio"]:checked').value;
    configShorthand[2] = compressPlaintextFieldSet.querySelector('input[type="radio"]:checked').value;
    configShorthand[3] = encryptFieldSet.querySelector('input[type="radio"]:checked').value;
    configShorthand[4] = normalizeFrequenciesFieldSet.querySelector('input[type="radio"]:checked').value;
    configShorthand[5] = generateFakeTextFieldSet.querySelector('input[type="radio"]:checked').value;
    configShorthand[6] = mapThroughDictionaryFieldSet.querySelector('input[type="radio"]:checked').value;

    console.log(configShorthand);
    return configShorthand;
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
