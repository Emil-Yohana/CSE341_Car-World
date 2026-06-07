const routes = require('express').Router();
const carsController = require('../controllers/cars');
const validation = require('../middleware/validate');
// const { isAuthenticated } = require('../middleware/authenticate');

// Analina: Temporarily removed isAuthenticated so Swagger can run requests without errors

routes.get('/', carsController.getAllData);

routes.get('/:id', carsController.getData);

routes.post('/', validation.cars, carsController.createData);

routes.put('/:id', validation.cars, carsController.updateData);

routes.delete('/:id', carsController.deleteData);

module.exports = routes;