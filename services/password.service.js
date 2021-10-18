const bcrypt = require('bcrypt');

const {ErrorHandler, enumStatus, enumMessage} = require('../errors');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hasPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hasPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler(enumMessage.BAD_REQUEST, enumStatus.BAD_REQUEST);
        }
    }
};
