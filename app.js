const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const {userRouter, authRouter} = require('./routes');
const {MONGO_CONNECT_URL, PORT} = require('./configs');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message,
        });
});

app.listen(PORT, () => {
    console.log(`hostname ${PORT}`);
});
