const {Schema, model} = require('mongoose');

const userSchema = new Schema({
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
    },
}, {timestamps: true});

module.exports = model('user', userSchema);
