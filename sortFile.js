const fs = require('fs');
const path = require('path');

const DIR_GIRLS = 'girls';
const DIR_BOYS = 'boys';

const moveFile = (dir, pathFile, nameFile) => {
    fs.rename(pathFile, path.join(__dirname, dir, nameFile), (err) => {
        if (err) {
            return console.log(err);
        }
    })
}

const sortFile = (dir, nameFile) => {
    const pathFile = path.join(__dirname, dir, nameFile);

    fs.readFile(pathFile, (err, data) => {
        if (err) {
            return console.log(err);
        }

        const user = JSON.parse(data);

        if (user.gender === 'female' && dir !== DIR_GIRLS) {
            moveFile(DIR_GIRLS, pathFile, nameFile);
        }

        if (user.gender === 'male' && dir !== DIR_BOYS) {
            moveFile(DIR_BOYS, pathFile, nameFile);
        }
    });
};

module.exports = {
    DIR_GIRLS,
    DIR_BOYS,
    sortFile,
};