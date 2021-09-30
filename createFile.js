const fs = require('fs');
const path = require('path');

const createFile = ({name, gender, dir}) => {
    const pathDir = path.join(__dirname, `${dir}`);

    fs.mkdir(pathDir, {recursive: true}, (err) => {
        console.log(err);
    });

    const pathFile = path.join(pathDir, `${name}.json`);
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
