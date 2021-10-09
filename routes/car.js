const router = require('express').Router();

const carController = require('../controllers/car.controller');
const carMiddleware = require('../middlewares/car.middlewares');

router.get('/', carController.getCar);
router.post('/', carMiddleware.createCarMiddleware, carController.createCar);

router.put('/:car_id', carMiddleware.updateCarMiddleware, carController.updateCar);
router.delete('/:car_id', carController.deleteCar);

module.exports = router;
