const bcrypt = require('bcrypt');

const {ErrorHandler} = require("../errors");

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hasPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hasPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler('Wrong email or password', 500);
        }
    }
};
