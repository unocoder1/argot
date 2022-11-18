const LanguageModel = require('./language-model');

const languageModel = new LanguageModel();

module.exports = {

    getEncoded: (_config, text) => languageModel.GenerateText(text),

    getDecoded: (_config, text) => languageModel.DeGenerateText(text),

};
