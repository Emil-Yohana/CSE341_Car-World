const routes = require('express').Router();
const brandsController = require('../controllers/brands');
const validation = require('../middleware/validate');
// const { isAuthenticated } = require('../middleware/authenticate');

// Analina: Temporarily removed isAuthenticated so Swagger can run requests without errors

routes.get('/', brandsController.getAllData);

routes.get('/:id', brandsController.getData);

routes.post('/', validation.brand, brandsController.createData);

routes.put('/:id', validation.brand, brandsController.updateData);

// NOTE — Added by Analina:
// I am temporarily commenting out this DELETE route because the controller 
// function is not implemented yet. Once the deleteData function is created, 
// we can safely uncomment this route.

// routes.delete('/:id', isAuthenticated, brandsController.deleteData);

module.exports = routes;
