const dbService = require('../database/database.service');
const TransactionType = require('../database/models/transaction-type.model');
const {QueryTypes} = require('sequelize');

class TransactionTypesService {
  constructor() {
    this.dbContext = dbService.getContext();
  }

  async create(name) {
    await this.dbContext.query(
        'CALL create_transaction_type($1);', {
          bind: [name],
          type: QueryTypes.RAW,
        });
    return await this.findOne(name);
  }

  async findOne(name) {
    const [currency] = await this.dbContext.query(
        'SELECT id, name FROM get_all_transaction_types() WHERE name = $1', {
          bind: [name],
          model: TransactionType,
          mapToModel: true,
          type: QueryTypes.SELECT,
        });
    return currency;
  }

  async insertInitData() {
    await this.create('Доход');
    await this.create('Расход');
  }

  async insertProcedures() {
    await this.dbContext.query('CREATE OR REPLACE PROCEDURE create_transaction_type ' +
            '(name TEXT) LANGUAGE SQL AS $$ ' +
            'INSERT INTO transaction_types (name) VALUES (name) ' +
            'ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name; ' +
            '$$;', {
      type: QueryTypes.RAW,
    });

    await this.dbContext.query('CREATE OR REPLACE FUNCTION get_all_transaction_types ' +
            '() RETURNS TABLE (id INTEGER, name TEXT) LANGUAGE SQL AS $$ ' +
            'SELECT id, name FROM transaction_types ' +
            '$$;', {
      type: QueryTypes.RAW,
    });
  }
}

module.exports = new TransactionTypesService();
