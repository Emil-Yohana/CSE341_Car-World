const routes = require('express').Router();
const carsController = require('../controllers/cars');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

routes.get('/', carsController.getAllData);

routes.get('/:id', carsController.getData);

routes.post('/', isAuthenticated, validation.cars, carsController.createData);

routes.put('/:id', isAuthenticated, validation.cars, carsController.updateData);

// NOTE — Added by Analina:
// I am temporarily commenting out this DELETE route because the controller 
// function is not implemented yet. Once the deleteData function is created, 
// we can safely uncomment this route.

// routes.delete('/:id', isAuthenticated, carsController.deleteData);

module.exports = routes;
