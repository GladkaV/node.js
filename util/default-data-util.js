// это сохраняю для себя как пример
const {User} = require('../db');

module.exports = async () => {
    const user = await User.findOne({role: 'admin'});

    if (!user) {
        await User.createUserDefault({
            name: 'Vika',
            email: 'vika.admin@site.com',
            password: 'Hello_world1!',
            role: 'admin',
        });
    }
};
