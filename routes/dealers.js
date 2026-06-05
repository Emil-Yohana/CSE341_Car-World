const routes = require('express').Router();
const dealersController = require('../controllers/dealers');
const validation = require('../middleware/validate');
// const { isAuthenticated } = require('../middleware/authenticate');

// Analina: Temporarily removed isAuthenticated so Swagger can run requests without errors

routes.get('/', dealersController.getAllData);

routes.get('/:id', dealersController.getData);

routes.post('/', validation.dealers, dealersController.createData);

routes.put('/:id', validation.dealers, dealersController.updateData);

// NOTE — Added by Analina:
// I am temporarily commenting out this DELETE route because the controller 
// function is not implemented yet. Once the deleteData function is created, 
// we can safely uncomment this route.

// routes.delete('/:id', isAuthenticated, dealersController.deleteData);

module.exports = routes;
