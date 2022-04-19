const dbService = require('../database/database.service');
const {plainToInstance} = require('class-transformer');

class UsersService {
  async createUser(email, password) {
    let user;
    await dbService.query('insert into users(email, password) values($1, $2)', [
      email,
      password,
    ]).then(async () => {
      user = await this.findUser(email);
    }).catch((err) => {
      throw new Error(err);
    });
    return user;
  }

  async findUser(email) {
    let user;
    await dbService.query(
        'select id, email, password from users where email = $1', [email],
    ).then((result) => {
      user = plainToInstance(User, result.rows[0]);
    }).catch((err) => {
      throw new Error(err);
    });
    return user;
  }
}

module.exports = new UsersService();
