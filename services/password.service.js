const bcrypt = require('bcrypt');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hasPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hasPassword);

        if (!isPasswordMatched) {
            throw new Error('Wrong email or password');
        }
    }
};
