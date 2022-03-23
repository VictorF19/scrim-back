module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GameRanks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      gameId: {
        type: Sequelize.UUID,
      },
      rankValue: {
        type: Sequelize.INTEGER,
      },
      rankName: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GameRanks');
  },
};
