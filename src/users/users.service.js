const {QueryTypes} = require('sequelize');
const User = require('../database/models/user.model');
const dbService = require('../database/database.service');

class UsersService {
  constructor() {
    this.dbContext = dbService.getContext();
  }

  async create(email, password) {
    await this.dbContext.query(
        'CALL create_user($1, $2);', {
          bind: [email, password],
          type: QueryTypes.INSERT,
        });
    return await this.findOne(email);
  }

  async findOne(email) {
    const [user] = await this.dbContext.query(
        'SELECT id, email, password FROM get_all_users() WHERE email = $1; ', {
          bind: [email],
          model: User,
          mapToModel: true,
          type: QueryTypes.SELECT,
        });
    return user;
  }

  async insertProcedures() {
    await this.dbContext.query('CREATE OR REPLACE PROCEDURE create_user ' +
          '(email TEXT, password TEXT) LANGUAGE SQL AS $$ ' +
          'INSERT INTO users (email, password) VALUES (email, password) ' +
          '$$;', {
      type: QueryTypes.RAW,
    });

    await this.dbContext.query('CREATE OR REPLACE FUNCTION get_all_users ' +
          '() RETURNS TABLE (id INTEGER, email TEXT, password TEXT) LANGUAGE SQL AS $$ ' +
          'SELECT id, email, password FROM users; ' +
          '$$;', {
      type: QueryTypes.RAW,
    });
  }
}

module.exports = new UsersService();
