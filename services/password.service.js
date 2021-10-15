const bcrypt = require('bcrypt');

const {ErrorHandler, enumStatus, enumMessage} = require("../errors");

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hasPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hasPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler(enumMessage.NOT_FOUND, enumStatus.NOT_FOUND);
        }
    }
};
