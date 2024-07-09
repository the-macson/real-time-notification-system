const express = require('express');
const mongoose = require('./src/config/db.config');
const app = express();
const dotenv = require('dotenv');
const api = require('./src/api');
dotenv.config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notification System API",
      version: "1.0.0",
    },
  },
  apis: ["./src/api/*.js"], 
};

const swaggerSpec = swaggerJsdoc(options);

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', api);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});