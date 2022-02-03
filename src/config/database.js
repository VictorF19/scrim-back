module.exports = {
    host: 'localhost',
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    dialect: 'postgres', // aqui se especifica o db escolhido
    define: {
      timestamps: true, // Este campo cria automaticamente as inserções em created_at e updated_at
      underscored: true,
      underscoredAll: true
    }
  }