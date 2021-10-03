const fs = require('fs');
const path = require('path');
const users = require('./users');

const MAN_OLDER = "manOlder20";
const MAN_YOUNGER = "manYounger20";
const WOMAN_OLDER = "womanOlder20";
const WOMAN_YOUNGER = "womanYounger20";

const createDir = (nameDir) => {
    fs.mkdir(`${nameDir}`, {recursive: true}, (err) => {
        if (err) {
            return console.log(err);
        }
    });
}

createDir(MAN_OLDER);
createDir(MAN_YOUNGER);
createDir(WOMAN_OLDER);
createDir(WOMAN_YOUNGER);

const selectDir = (age, gender) => {
    if (gender === 'male' && age >= 20) {
        return MAN_OLDER;
    } else if (gender === 'male' && age < 20) {
        return MAN_YOUNGER;
    }

    if (gender === 'female' && age >= 20) {
        return WOMAN_OLDER;
    } else if (gender === 'female' && age < 20) {
        return WOMAN_YOUNGER;
    }
}

const createFile = (user) => {
    let pathFile = path.join(__dirname, selectDir(user.age, user.gender), `${user.name}.json`);

    fs.writeFile(pathFile, JSON.stringify(user), (err) => {
        if (err) {
            return console.log(err);
        }
    });
};

users.forEach(user => {
    createFile(user);
});