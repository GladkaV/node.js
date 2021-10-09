const {Schema, model} = require('mongoose');

const CarSchema = new Schema({
    brand: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    model: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: Number,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    }
}, {timestamps: true});

module.exports = model('car', CarSchema);
