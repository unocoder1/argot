const huffmanTable = {
    "a": "000",
    "o": "0010",
    "y": "00110",
    "g": "00111",
    "i": "010",
    "b": "0110",
    "l": "01110",
    "r": "01111",
    "s": "1000",
    "w": "1001",
    "f": "10100",
    "p": "10101",
    "d": "10110",
    "e": "101110",
    "j": "1011110",
    "k": "1011111",
    "t": "110",
    "c": "11100",
    "h": "11101",
    "m": "11110",
    "n": "111110",
    "u": "1111110",
    "v": "11111110",
    "q": "111111110",
    "z": "1111111110",
    "x": "1111111111"
};

var temp = {};
for(const key in huffmanTable) {
    const value = huffmanTable[key];
    temp[value] = key;
}
const huffmanReverseTable = temp;

module.exports = {

    getEncoded: (_config, text) => {
        const buffer = Buffer.from(text, 'base64');
        var string = "";
        for (const x of buffer) {
            string += x.toString(2).padStart(6, '0');
        }
        var encodedText = "";
        var encodingBuffer = "";
        for (const c of string) {
            encodingBuffer += c;
            if (encodingBuffer in huffmanReverseTable) {
                encodedText += huffmanReverseTable[encodingBuffer];
                encodingBuffer = "";
            }
        }
        for (const c of encodingBuffer) {
            if (c === "0") {
                encodedText += "!";
                console.log("cucc2");
            } else if (c === "1") {
                encodedText += "?";
                console.log("cucc");
            } else {

            }

        }
        return encodedText;
    },

    getDecoded: (_config, text) => {
        return text;
    }

};
