const routes = require('express').Router();
const brandsController = require('../controllers/brands');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

routes.get('/', brandsController.getAllData);

routes.get('/:id', brandsController.getData);

routes.post('/', isAuthenticated, validation.brand, brandsController.createData);

routes.put('/:id', isAuthenticated, validation.brand, brandsController.updateData);

routes.delete('/:id', isAuthenticated, brandsController.deleteData);

module.exports = routes;
