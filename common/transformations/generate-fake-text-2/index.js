var temp = {};
for(const key in dictionary) {
    const value = dictionary[key];
    temp[value] = key;
}
const dictionaryReverse = temp;

module.exports = {

    getEncoded: (_config, text) => {
        var encodedText = "";
        for (const c of text){
            if (c in dictionary) {
                encodedText += dictionary[c];
            } else {
                encodedText += c;
            }
            encodedText += " ";
        }
        return encodedText;
    },

    getDecoded: (_config, text) => {
        var decodedText = "";
        const words = text.trim().split(/\s+/);
        for (const w of words) {
            if (w in dictionaryReverse) {
                decodedText += dictionaryReverse[w];
            } else {
                decodedText += w;
            }
        }
        return decodedText;
    }

};
