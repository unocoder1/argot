const huffmanTable = new Map([
    ['a', '000'],
    ['o', '0010'],
    ['y', '00110'],
    ['g', '00111'],
    ['i', '010'],
    ['b', '0110'],
    ['l', '01110'],
    ['r', '01111'],
    ['s', '1000'],
    ['w', '1001'],
    ['f', '10100'],
    ['p', '10101'],
    ['d', '10110'],
    ['e', '101110'],
    ['j', '1011110'],
    ['k', '1011111'],
    ['t', '110'],
    ['c', '11100'],
    ['h', '11101'],
    ['m', '11110'],
    ['n', '111110'],
    ['u', '1111110'],
    ['v', '11111110'],
    ['q', '111111110'],
    ['z', '1111111110'],
    ['x', '1111111111'],
]);

const temp = new Map();
for (const [key, value] of huffmanTable) {
    temp.set(value, key);
}
const huffmanReverseTable = temp;

module.exports = {

    getEncoded: (_config, text) => {
        const buffer = Buffer.from(text, 'base64');
        let binaryString = '';
        for (const x of buffer) {
            binaryString += x.toString(2).padStart(8, '0');
        }
        let encodedText = '';
        let encodingBuffer = '';
        for (const c of binaryString) {
            encodingBuffer += c;
            if (huffmanReverseTable.has(encodingBuffer)) {
                encodedText += huffmanReverseTable.get(encodingBuffer);
                encodingBuffer = '';
            }
        }
        for (const c of encodingBuffer) {
            if (c === '0') {
                encodedText += '!';
            } else if (c === '1') {
                encodedText += '?';
            } else {
                // TODO: Assert here.
            }
        }
        return encodedText;
    },

    getDecoded: (_config, text) => {
        let binaryString = '';
        for (const c of text) {
            if (c === '!') {
                binaryString += '0';
            } else if (c === '?') {
                binaryString += '1';
            } else {
                binaryString += huffmanTable.get(c);
            }
        }
        const decodedText = [];
        let decodingBuffer = '';
        for (const c of binaryString) {
            decodingBuffer += c;
            if (decodingBuffer.length === 8) {
                decodedText.push(parseInt(decodingBuffer, 2));
                decodingBuffer = '';
            }
        }
        const buffer = Buffer.from(decodedText);
        return buffer.toString('base64');
    },

};
