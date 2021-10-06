const path = require('path');

const {readFile, writeFile} = require('../helpers');

const pathDB = path.join(process.cwd(), 'db', 'users.json');

module.exports = {
    getUsers: async (req, res) => {
        const data = JSON.parse(await readFile(pathDB));

        res.json(data);
    },

    createUser: async (req, res) => {
        const data = JSON.parse(await readFile(pathDB));
        const maxId = data.sort((a, b) => a.id - b.id)[data.length - 1].id;
        const id = data.length ? maxId + 1 : 1;
        const user = {id, ...req.body};

        data.push(user);
        await writeFile(pathDB, data);

        res.json(data);
    },

    getUserById: async (req, res) => {
        const {user_id} = req.params;
        const data = JSON.parse(await readFile(pathDB));

        res.json(data.find(user => user.id === +user_id));
    },

    updateUser: async (req, res) => {
        const data = JSON.parse(await readFile(pathDB));
        const {user_id} = req.params;

        let index = data.findIndex(item => item.id === +user_id);
        data[index] = {...data[index], ...req.body};

        await writeFile(pathDB, data);

        res.json(data);
    },

    deleteUser: async (req, res) => {
        const data = JSON.parse(await readFile(pathDB));
        const {user_id} = req.params;

        const updateValue = data.filter(user => user.id !== +user_id);
        await writeFile(pathDB, updateValue);

        res.json(updateValue);
    },
}