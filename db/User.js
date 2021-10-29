const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false,
    },
    age: {
        type: Number,
    },
    avatar: {
        type: String,
    },
}, {timestamps: true});

module.exports = model('user', userSchema);
