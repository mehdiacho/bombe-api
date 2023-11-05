const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { FieldValue } = require('firebase-admin/firestore');
const app = express();
const port = 8383;
const { db } = require('./firebase.js');

app.use(express.json())

const options = require('./swagger');

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => console.log(`Server has started on port: ${port}`))
