// Analina here friends I'm using localhost for now; once we have the Render URL, I'll replace it here.

const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Car World API',
        description: 'API documentation for the Car World project'
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);