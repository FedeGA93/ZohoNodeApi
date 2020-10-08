const directoryPath = require('../pdf/mcdonalds.json');
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