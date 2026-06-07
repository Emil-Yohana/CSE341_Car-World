// Analina here friends I'm using localhost for now; once we have the Render URL, I'll replace it here.

const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Car World API',
        description: 'API documentation for the Car World project'
    },
    host: 'cse341-car-world.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);