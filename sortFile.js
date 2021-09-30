const fs = require('fs');
const path = require('path');

const DIR_GIRLS = 'girls';
const DIR_BOYS = 'boys';

const moveFile = (dir, pathFile, nameFile) => {
    return fs.rename(`${pathFile}`, path.join(__dirname, `${dir}`, `${nameFile}`), (err) => {
        console.log(err)
    })
}

const sortFile = (dir, nameFile) => {
    const pathFile = path.join(__dirname, `${dir}`, `${nameFile}`);

    return fs.readFile(pathFile, (err, data) => {
        if (err) {
            console.log(err);
            return;
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