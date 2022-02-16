require('dotenv').config();
require('./src/util/console');
const express = require('express');
const modelInterface = require('./src/util/modelInterface');
const app = require('./src/app')(express, modelInterface);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  const server = { port, NODE_ENV: process.env.NODE_ENV };
  console.log(server);
});
