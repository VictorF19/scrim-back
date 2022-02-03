module.exports = {
    host: 'localhost',
    username: 'postgres',
    password: '1234',
    database: 'scrim',
    dialect: 'postgres', // aqui se especifica o db escolhido
    define: {
      timestamps: true, // Este campo cria automaticamente as inserções em created_at e updated_at
      underscored: true,
      underscoredAll: true
    }
  }