const Car = require('../db/Car');

module.exports = {
    getCar: async (req, res) => {
        try {
            const cars = await Car.find();

            res.json(cars);
        } catch (e) {
            res.json(e.message);
        }
    },

    createCar: async (req, res) => {
        try {
            const newCar = await Car.create(req.body);

            res.json(newCar);
        } catch (e) {
            res.json(e.message);
        }
    },

    updateCar:  (req, res) => {
        try {
            res.json('Successfully updated');
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteCar: async (req, res) => {
        try {
            const {car_id} = req.params;

            const car = await Car.deleteOne({_id: car_id});

            await res.json(car);
        } catch (e) {
            res.json(e.message);
        }
    },
};
