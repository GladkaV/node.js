const {CREATE, UPDATE, DELETE, FORGOT_PASSWORD_EMAIL, COME_BACK} = require('../configs');

module.exports = {
    [CREATE]: {
        templateName: 'create',
        subject: 'Account created!'
    },
    [UPDATE]: {
        templateName: 'update',
        subject: 'Account updated!'
    },
    [DELETE]: {
        templateName: 'delete',
        subject: 'Account deleted!'
    },
    [FORGOT_PASSWORD_EMAIL]: {
        templateName: 'forgot-password',
        subject: 'Everybody forgot something!'
    },
    [COME_BACK]: {
        templateName: 'come-back',
        subject: 'Come back to us please. I will forgive everything!'
    },
};
