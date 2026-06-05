const routes = require('express').Router();
const ownersController = require('../controllers/owners');
const validation = require('../middleware/validate');
// const { isAuthenticated } = require('../middleware/authenticate');

// Analina: Temporarily removed isAuthenticated so Swagger can run requests without errors

routes.get('/', ownersController.getAllData);

routes.get('/:id', ownersController.getData);

routes.post('/', validation.owners, ownersController.createData);

routes.put('/:id', validation.owners, ownersController.updateData);

// NOTE — Added by Analina:
// I am temporarily commenting out this DELETE route because the controller 
// function is not implemented yet. Once the deleteData function is created, 
// we can safely uncomment this route.

//routes.delete('/:id', isAuthenticated, ownersController.deleteData);

module.exports = routes;
