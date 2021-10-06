const fs = require('fs');

const readFile = (path) => {
    return new Promise((res, rej) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                return rej(err);
            }

            const users = JSON.parse(data);
            return res(users);
        });
    })
}

module.exports = readFile;