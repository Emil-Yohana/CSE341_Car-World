const routes = require('express').Router();
const dealersController = require('../controllers/dealers');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

routes.get('/', dealersController.getAllData);

routes.get('/:id', dealersController.getData);

routes.post('/', isAuthenticated, validation.dealers, dealersController.createData);

routes.put('/:id', isAuthenticated, validation.dealers, dealersController.updateData);

// NOTE — Added by Analina:
// I am temporarily commenting out this DELETE route because the controller 
// function is not implemented yet. Once the deleteData function is created, 
// we can safely uncomment this route.

// routes.delete('/:id', isAuthenticated, dealersController.deleteData);

module.exports = routes;
