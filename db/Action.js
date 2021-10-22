const {Schema, model} = require('mongoose');

const {FORGOT_PASSWORD} = require('../configs');

const ActionSchema = new Schema({
    token: {
        type: String,
        required: true,
        trim: true,
    },
    token_type: {
        type: String,
        required: true,
        enum: [FORGOT_PASSWORD],
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

ActionSchema.pre('findOne', function () {
    this.populate('user_id');
});

module.exports = model('action', ActionSchema);