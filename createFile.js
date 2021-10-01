const fs = require('fs');
const path = require('path');
const {DIR_BOYS, DIR_GIRLS} = require('./sortFile');

const createDir = (nameDir) => {
    fs.mkdir(nameDir, {recursive: true}, (err) => {
        if (err) {
            return console.log(err);
        }
    });
}

createDir(DIR_BOYS);
createDir(DIR_GIRLS);

const createFile = ({name, gender, dir}) => {
    let pathFile = '';

    if (dir === 'girls') {
        pathFile = path.join(__dirname, DIR_GIRLS, `${name}.json`);
    }

    if (dir === 'boys') {
        pathFile = path.join(__dirname, DIR_BOYS, `${name}.json`);
    }

    const data = {
        name, gender
    };

    fs.writeFile(pathFile, JSON.stringify(data), (err) => {
        if (err) {
            return console.log(err);
        }
    });
};

const users = require('./users');

users.forEach(user => {
    createFile(user);
});
