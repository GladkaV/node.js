const Car = require('../db/Car');

module.exports = {
    createCarMiddleware: async (req, res, next) => {
        try {
            const {brand, year, model, price} = req.body;
            const car = await Car.findOne({brand});
            const validation = car || !model || !year || year < 1885 || year > 1980 || !price || price < 0;

            if (validation) {
                throw new Error('Sorry, we cannot create a car');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    updateCarMiddleware: async (req, res, next) => {
        try {
            const {car_id} = req.params;
            const {brand} = req.body;
            const car = await Car.findOne({brand});

            if (car) {
                throw new Error('Sorry, can`t update');
            }

            const updateCar = await Car.updateOne({id:car_id}).set({...req.body});

            if (!updateCar) {
                throw new Error('Sorry, can`t update');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
};
