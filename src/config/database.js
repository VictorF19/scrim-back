require("dotenv").config();

module.exports = {
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    dialect: process.env.DATABASE_TYPE,
    define: {
      timestamps: true, // Este campo cria automaticamente as inserções em created_at e updated_at
      underscored: true,
      underscoredAll: true
    }
  }