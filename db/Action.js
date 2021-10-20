const {Schema, model} = require('mongoose');

const {ACTION} = require('../configs');

const ActionSchema = new Schema({
    token: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        enum: Object.values({ACTION}),
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
}, {timestamps: true});

module.exports = model('action', ActionSchema);
