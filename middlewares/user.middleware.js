const {Types} = require("mongoose");

const {ErrorHandler, enumStatus, enumMessage} = require("../errors");
const {User} = require('../db');

module.exports = {
    isIdValid: (req, res, next) => {
        try {
            const {user_id} = req.params;
            const idValid = Types.ObjectId.isValid(user_id);

            if (!idValid) {
                throw new ErrorHandler(enumMessage.BAD_REQUEST, enumStatus.BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const user = await User.exists({_id: Types.ObjectId(user_id)});

            if (!user) {
                throw new ErrorHandler(enumMessage.BAD_REQUEST, enumStatus.BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isBodyValid: (validator) => (req, res, next) => {
        try {
            const {error, value} = validator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, enumStatus.BAD_REQUEST);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkEmail: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = await User.findOne({email});

            if (userByEmail) {
                throw new ErrorHandler(enumMessage.CONFLICT, enumStatus.CONFLICT);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
