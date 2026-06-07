const routes = require('express').Router();
const ownersController = require('../controllers/owners');
const validation = require('../middleware/validate');
// const { isAuthenticated } = require('../middleware/authenticate');

// Analina: Temporarily removed isAuthenticated so Swagger can run requests without errors

routes.get('/', ownersController.getAllData);

routes.get('/:id', ownersController.getData);

routes.post('/', validation.owners, ownersController.createData);

routes.put('/:id', validation.owners, ownersController.updateData);

routes.delete('/:id', ownersController.deleteData);

module.exports = routes;