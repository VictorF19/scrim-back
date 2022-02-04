const models = require("../models");

// use this inferface to facilitate encapsulation of ORM methods and objects
module.exports = {
    models: models.sequelize.models
}