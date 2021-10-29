const {PHOTOS_MIMETYPES, PHOTO_MAX_SIZE} = require('../configs');
const {ErrorHandler, enumMessage, enumStatus} = require('../errors');

module.exports = {
    checkUserAvatar: (req, res, next) => {
        try {
            if (!req.files && !req.files.avatar) {
                next();
                return;
            }

            const {name, size, mimetype} = req.files.avatar;

            if (!PHOTOS_MIMETYPES.includes(mimetype)){
                throw new ErrorHandler(enumMessage.NOT_SUPPORTED_FORMAT, enumStatus.BAD_REQUEST);
            }

            if (size > PHOTO_MAX_SIZE) {
                throw new ErrorHandler(enumMessage.BIG_FILE(name), enumStatus.BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
