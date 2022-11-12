const LanguageModel = require('./language-model.js');


const languageModel = new LanguageModel();

module.exports = {

    getEncoded: (_config, text) => {
        return languageModel.GenerateText(text);
    },

    getDecoded: (_config, text) => {
        return languageModel.DeGenerateText(text);
    }

};
