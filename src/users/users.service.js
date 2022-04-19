const {QueryTypes} = require('sequelize');
const User = require('./models/user.model');
const dbService = require('../database/database.service');

class UsersService {
  async createUser(email, password) {
    const dbContext = dbService.getContext();
    await dbContext.query(
        'INSERT INTO users(email, password) VALUES($1, $2)', {
          bind: [email, password],
          type: QueryTypes.INSERT,
        });
    return await this.findUser(email);
  }

  async findUser(email) {
    const dbContext = dbService.getContext();
    const [user] = await dbContext.query(
        'SELECT id, email, password FROM users WHERE email = $1', {
          bind: [email],
          model: User,
          mapToModel: true,
          type: QueryTypes.SELECT,
        });
    return user;
  }
}

module.exports = new UsersService();
