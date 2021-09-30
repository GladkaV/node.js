const fs = require('fs');
const path = require('path');
const {sortFile, DIR_BOYS, DIR_GIRLS} = require('./sortFile');

const sortInDir = (dir) => {
    return fs.readdir(path.join(__dirname, `${dir}`), (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        return data.forEach(nameFile => {
            sortFile(dir, nameFile);
        })
    });
};

sortInDir(DIR_GIRLS);
sortInDir(DIR_BOYS);