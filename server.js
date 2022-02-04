require("dotenv").config();
const express = require("express");
const modelInterface = require("./src/util/modelInterface")
const app = require("./src/app")(express, modelInterface);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
