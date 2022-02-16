const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GameRank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GameRank.init({
    gameId: {
      type: DataTypes.UUIDV4,
      references: {
        model: 'Games',
        key: 'id',
      },
    },
    rankValue: DataTypes.INTEGER,
    rankName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'GameRank',
  });
  return GameRank;
};
