const axios = require('axios');
const dbService = require('../database/database.service');
const Currency = require('../database/models/currency.model');
const {QueryTypes} = require('sequelize');

class CurrencyService {
  constructor() {
    this.dbContext = dbService.getContext();
  }
  async getAll() {
    return await this.dbContext.query(
        'SELECT id, name, exchange_rate FROM get_all_currency();', {
          mapToModel: true,
          model: Currency,
          type: QueryTypes.SELECT,
        });
  }

  async create(name, exchangeRate) {
    await this.dbContext.query(
        'CALL create_currency($1, $2);', {
          bind: [name, exchangeRate],
          type: QueryTypes.RAW,
        });
    return await this.findOne(name);
  }

  async findOne(name) {
    const [currency] = await this.dbContext.query(
        'SELECT id, name, exchange_rate FROM currency WHERE name = $1', {
          bind: [name],
          model: Currency,
          mapToModel: true,
          type: QueryTypes.SELECT,
        });
    return currency;
  }

  async updateExchangeRates() {
    const response = await axios.get('https://belarusbank.by/api/kursExchange')
        .catch((error) => {
          console.log(error);
        });
    const [data] = response.data;
    if (data) {
      const BYN = 1;
      const EUR = data.EUR_out;
      const USD = data.USD_out;
      await this.create('BYN', BYN);
      await this.create('EUR', EUR);
      await this.create('USD', USD);
    }
  }

  async insertProcedures() {
    await this.dbContext.query('CREATE OR REPLACE PROCEDURE create_currency ' +
            '(name TEXT, exchange_rate DECIMAL) LANGUAGE SQL AS $$ ' +
            'INSERT INTO currency (name, exchange_rate) VALUES (name, exchange_rate)' +
            'ON CONFLICT (name) DO UPDATE SET exchange_rate = EXCLUDED.exchange_rate; ' +
            '$$;', {
      type: QueryTypes.RAW,
    });

    await this.dbContext.query('CREATE OR REPLACE FUNCTION get_all_currency ' +
          '() RETURNS TABLE (id INTEGER, name TEXT, exchange_rate FLOAT) LANGUAGE SQL AS $$ ' +
          'SELECT id, name, exchange_rate FROM currency ' +
          '$$;', {
      type: QueryTypes.RAW,
    });
  }
}

module.exports = new CurrencyService();
