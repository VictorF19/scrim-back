'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    userId: {
      type: DataTypes.UUIDV4,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    gameId: {
      type: DataTypes.UUIDV4,
      references: {
        model: 'Games',
        key: 'id'
      }
    },
    requiredRank: {
      type: DataTypes.UUIDV4,
      references: {
        model: 'GameRank',
        id: 'id'
      }
    },
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};