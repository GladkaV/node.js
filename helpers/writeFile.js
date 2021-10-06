const fs = require('fs');
const util = require('util');

const writeFilePromise = util.promisify(fs.writeFile);

const writeFile = (path, value) => writeFilePromise(path, JSON.stringify(value));

module.exports = writeFile;