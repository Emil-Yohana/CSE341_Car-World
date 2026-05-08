const routes = require('express').Router();

const professionalController = require('../controllers/professional');

routes.get('/', professionalController.getData);

module.exports = routes;