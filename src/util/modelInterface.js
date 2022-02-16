const repository = require('../database/repository');

// use this inferface to facilitate encapsulation of ORM methods and objects
module.exports = {
  models: repository,
};
