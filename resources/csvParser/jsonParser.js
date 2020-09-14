const directoryPath = require('../pdf/test.json');
const arr = directoryPath
const jsonParsed = [];

const jsonParser = () => {
    arr.forEach(element => {
        jsonParsed.push(element);
    });
    return jsonParsed;
}
module.exports = {
    jsonParser
}