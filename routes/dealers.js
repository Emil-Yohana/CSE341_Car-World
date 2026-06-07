const routes = require('express').Router();
const dealersController = require('../controllers/dealers');
const validation = require('../middleware/validate');
// const { isAuthenticated } = require('../middleware/authenticate');

// Analina: Temporarily removed isAuthenticated so Swagger can run requests without errors

routes.get('/', dealersController.getAllData);

routes.get('/:id', dealersController.getData);

routes.post('/', validation.dealers, dealersController.createData);

routes.put('/:id', validation.dealers, dealersController.updateData);

routes.delete('/:id', dealersController.deleteData);

module.exports = routes;