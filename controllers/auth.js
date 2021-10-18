const {enumMessage} = require('../errors');

module.exports = {
    authorizationUser: (req, res) => {
        try {
            res.json(enumMessage.SUCCESS);
        } catch (e) {
            res.json(e.message);
        }
    }
};
