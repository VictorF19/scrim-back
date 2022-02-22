const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GameProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GameProfile.init(
    {
      nickname: DataTypes.STRING,
      userId: {
        type: DataTypes.UUIDV4,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      gameId: {
        type: DataTypes.UUIDV4,
        references: {
          model: 'Games',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'GameProfile',
    },
  );
  return GameProfile;
};
