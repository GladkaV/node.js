const cron = require('node-cron');

const removeOldTokens = require('./old-token-remove.job');
const sendEmailUsers = require('./long-time-send-email.job');

module.exports = () => {
    cron.schedule('0 0 1 * *', () => {
        removeOldTokens();
    });

    cron.schedule('0 0 */10 * *', () => {
        sendEmailUsers();
    });
};
