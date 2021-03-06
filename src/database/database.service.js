const config = require('./../config');
const {Sequelize} = require('sequelize');

class DatabaseService {
  getContext() {
    return new Sequelize({
      dialect: config.DB_TYPE,
      username: config.DB_USER,
      password: config.DB_PASSWORD,
      host: config.DB_HOST,
      port: config.DB_PORT,
      database: config.DB_NAME,
      timezone: 'Europe/Minsk',
      logging: false,
    });
  }
}

module.exports = new DatabaseService();
