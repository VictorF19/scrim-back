require("dotenv").config();
const express = require("express");
const models = require("./src/models");
const app = require("./src/app")(express, models);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
