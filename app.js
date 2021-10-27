const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const swaggerUI = require('swagger-ui-express');
require('dotenv').config();

const {MONGO_CONNECT_URL, PORT, ALLOWED_ORIGIN, NODE_ENV} = require('./configs');
const startCron = require('./cron');
const {userRouter, authRouter} = require('./routes');
const {enumStatus, enumMessage, ErrorHandler} = require('./errors');
const {defaultUser} = require('./util');
const {swaggerJson} = require('./docs');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(helmet());
app.use(cors({origin: _configureCors}));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
}));

if (NODE_ENV === 'dev') {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || enumStatus.SERVER_ERROR)
        .json({
            message: err.message,
        });
});

app.listen(PORT, () => {
    console.log(`hostname ${PORT}`);
    defaultUser();
    startCron();
});

function _configureCors(origin, callback) {
    if (NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!whiteList.include(origin)) {
        return callback(new ErrorHandler(enumMessage.NO_CORS), false);
    }

    return callback(null, true);
}
