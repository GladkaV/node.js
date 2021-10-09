const express = require('express');
const mongoose = require('mongoose');

const carRouter = require('./routes/car');
const {MONGO_CONNECT_URL, PORT} = require('./configs');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/cars', carRouter);

app.listen(PORT, () => {
    console.log(`hostname ${PORT}`);
});
