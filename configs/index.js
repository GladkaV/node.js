module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',

    ACCESS: 'access',
    REFRESH: 'refresh',
    FORGOT_PASSWORD: 'forgot_password',
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    FORGOT_PASSWORD_TOKEN: 'token',

    JWT_FORGOT_PASSWORD: process.env.JWT_FORGOT_PASSWORD || 'secret_forgot_password',
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'secret_world',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'secret_world_refresh',

    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/test',
    PORT: process.env.PORT || 5000,

    PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/),
    EMAIL_REGEXP: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    AUTHORIZATION: 'Authorization',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'email@gmail.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || 123456,

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000;http://localhost:4200',

    AWS_SE_REGION: process.env.AWS_SE_REGION,
    AWS_S3_NAME: process.env.AWS_S3_NAME,
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,

    PHOTO_MAX_SIZE: 5 * 1024 * 1024,
    PHOTOS_MIMETYPES: [
        'image/gif',
        'image/jpeg',
        'image/png',
    ],

    // email-action.enum
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
    FORGOT_PASSWORD_EMAIL: 'forgotPassword',
    COME_BACK: 'comeBack',

    frontUrl: 'http://localhost:3000',
};
