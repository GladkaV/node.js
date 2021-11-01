const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJs.extend(utc);

const {COME_BACK} = require('../configs');
const {O_Auth} = require('../db');
const {emailService} = require('../services');

module.exports = async () => {
    const previousMonth = dayJs.utc().subtract(10, 'day');

    const users = await O_Auth
        .find({createdAt:{$lt: previousMonth}})
        .populate('user_id');

    const emails = [...new Set(users.map (user => user.user_id.email))];

    await Promise.allSettled(
        emails.map(email => emailService.sendMail(email, COME_BACK))
    );
};
