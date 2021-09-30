const fs = require('fs');
const path = require('path');
const {DIR_BOYS, DIR_GIRLS} = require('./sortFile');

const pathDirBoys = path.join(__dirname, `${DIR_BOYS}`);
fs.mkdir(pathDirBoys, {recursive: true}, (err) => {
    console.log(err);
});

const pathDirGirls = path.join(__dirname, `${DIR_GIRLS}`);
fs.mkdir(pathDirGirls, {recursive: true}, (err) => {
    console.log(err);
});

const createFile = ({name, gender, dir}) => {
    let pathFile = '';

    if (dir === 'girls') {
        pathFile = path.join(pathDirGirls, `${name}.json`);
    }

    if (dir === 'boys') {
        pathFile = path.join(pathDirBoys, `${name}.json`);
    }

    const data = {
        name, gender
    };

    return fs.writeFile(pathFile, JSON.stringify(data), (err) => {
        console.log(err)
    });
};

const users = require('./users');

users.forEach(user => {
    createFile(user);
});
