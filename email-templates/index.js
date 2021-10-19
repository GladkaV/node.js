const {CREATE, UPDATE, DELETE} = require('../configs');

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
};
