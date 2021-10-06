const fs = require('fs');

const writeFile = (path, value) => {
    return new Promise((res, rej) => {
        fs.writeFile(path, JSON.stringify(value), err => {
            if (err) {
                return rej(err);
            }

            res();
        });
    })
}

module.exports = writeFile;