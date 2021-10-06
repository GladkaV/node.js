const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);

const readFile = (path) => (readFilePromise(path));

module.exports = readFile;