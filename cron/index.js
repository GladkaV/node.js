const cron = require('node-cron');

const removeOldTokens = require('./old-token-remove.job');

module.exports = () => {
    cron.schedule('*/10 * * * * *', () => {
        removeOldTokens();
    });
};
