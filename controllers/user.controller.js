const path = require('path');

const {readFile, writeFile} = require('../helpers/index');

const pathDB = path.join(__dirname, '..', 'db', 'users.json');

module.exports = {
    getUsers: (req, res) => {
        readFile(pathDB)
            .then(value => res.json(value))
            .catch(err => {
                console.log(err);
                res.json(err);
            });
    },

    createUser: (req, res) => {
        readFile(pathDB)
            .then(value => {
                const maxId = value.sort((a, b) => a.id - b.id)[value.length - 1].id;
                const id = value.length ? maxId + 1 : 1;
                const user = {id, ...req.body};

                value.push(user);

                return writeFile(pathDB, value);
            })
            .then(() => res.json('success'))
            .catch(err => {
                console.log(err);
                res.json(err);
            });
    },

    getUserById: (req, res) => {
        const {user_id} = req.params;

        readFile(pathDB)
            .then(value => {
                const user = value.find(user => user.id === +user_id);
                res.json(user);
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            });
    },

    updateUser: (req, res) => {
        const {user_id} = req.params;

        readFile(pathDB)
            .then(value => {
                let index = value.findIndex(item => item.id === +user_id);
                value[index] = {...value[index], ...req.body};

                return writeFile(pathDB, value);
            })
            .then(() => res.json('success'))
            .catch(err => {
                console.log(err);
                res.json(err);
            });
    },

    deleteUser: (req, res) => {
        const {user_id} = req.params;

        readFile(pathDB)
            .then(value => {
                const updateValue = value.filter(user => user.id !== +user_id);

                return writeFile(pathDB, updateValue);
            })
            .then(() => res.json('success'))
            .catch(err => {
                console.log(err);
                res.json(err);
            });
    },
}