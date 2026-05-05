const express = require('express');
const app = express();
const port = 3000;
const lesson1Controller = require('./controllers/lesson1');

app.get('/', lesson1Controller.emilyRoute);
app.get('/john', lesson1Controller.johnRoute);

app.listen(process.env.port || port);
console.log('Web Server is listening at port ' + (process.env.port || port));