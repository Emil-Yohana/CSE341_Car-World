const routes = require('express').Router();
const carsController = require('../controllers/cars');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

routes.get('/', carsController.getAllData);

routes.get('/:id', carsController.getData);

routes.post('/', isAuthenticated, validation.cars, carsController.createData);

routes.put('/:id', isAuthenticated, validation.cars, carsController.updateData);

routes.delete('/:id', isAuthenticated, carsController.deleteData);

module.exports = routes;
