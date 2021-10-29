const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJs.extend(utc);

const {COME_BACK} = require('../configs');
const {O_Auth, User} = require('../db');
const {emailService} = require('../services');

module.exports = async () => {
    const previousMonth = dayJs.utc().subtract(10, 'day');

    const users = await O_Auth.find({
        createdAt: { $lt: previousMonth },
    });

    users.map(async ({user_id}) => {
        const {email, name: userName} = await User.findById(user_id);

        await emailService.sendMail(email, COME_BACK, {userName});
    });
};
