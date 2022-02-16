const models = require('../../models');

exports.repository = {
  User: require('./user')(models.sequelize.models.User),
};
