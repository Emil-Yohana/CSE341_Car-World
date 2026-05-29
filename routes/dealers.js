const routes = require('express').Router();
const dealersController = require('../controllers/dealers');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

routes.get('/', dealersController.getAllData);

routes.get('/:id', dealersController.getData);

routes.post('/', isAuthenticated, validation.dealers, dealersController.createData);

routes.put('/:id', isAuthenticated, validation.dealers, dealersController.updateData);

routes.delete('/:id', isAuthenticated, dealersController.deleteData);

module.exports = routes;
