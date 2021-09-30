const fs = require('fs');
const path = require('path');

const MAN_OLDER = "manOlder20";
const MAN_YOUNGER = "manYounger20";
const WOMAN_OLDER = "womanOlder20";
const WOMAN_YOUNGER = "womanYounger20";

const createDir = (nameDir) => {
    fs.mkdir(`${nameDir}`, {recursive: true}, (err) => {
        console.log(err);
    });
}

createDir(MAN_OLDER);
createDir(MAN_YOUNGER);
createDir(WOMAN_OLDER);
createDir(WOMAN_YOUNGER);

const createFile = (user) => {
    let pathFile = '';

    if (user.age >= 20 && user.gender === 'male') {
        pathFile = path.join(__dirname, `${MAN_OLDER}`, `${user.name}.json`);
    } else if (user.age < 20 && user.gender === 'male') {
        pathFile = path.join(__dirname, `${MAN_YOUNGER}`, `${user.name}.json`);
    }

    if (user.age >= 20 && user.gender === 'female') {
        pathFile = path.join(__dirname, `${WOMAN_OLDER}`, `${user.name}.json`);
    } else if (user.age < 20 && user.gender === 'female') {
        pathFile = path.join(__dirname, `${WOMAN_YOUNGER}`, `${user.name}.json`);
    }

    return fs.writeFile(pathFile, JSON.stringify(user), (err) => {
        console.log(err)
    });
};

const users = require('./users');

users.forEach(user => {
    createFile(user);
});