const routes = require('express').Router();
const ownersController = require('../controllers/owners');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

routes.get('/', ownersController.getAllData);

routes.get('/:id', ownersController.getData);

routes.post('/', isAuthenticated, validation.owners, ownersController.createData);

routes.put('/:id', isAuthenticated, validation.owners, ownersController.updateData);

routes.delete('/:id', isAuthenticated, ownersController.deleteData);

module.exports = routes;
