const snapshotsService = require('../snapshots/snapshots.service');
const dbService = require('../database/database.service');
const {QueryTypes} = require('sequelize');

class WalletsService {
  constructor() {
    this.dbContext = dbService.getContext();
  }

  async create(userId, rowId, name, currencyId ) {
    const snapshot = await snapshotsService.findOne(userId);

    await this.dbContext.query(
        'CALL create_wallet($1, $2, $3, $4);', {
          bind: [rowId, name, currencyId, snapshot.id],
          type: QueryTypes.INSERT,
        });
  }

  async getAll(snapshotId) {

  }

  async insertProcedures() {
    await this.dbContext.query('CREATE OR REPLACE PROCEDURE create_wallet ' +
        '(row_id INTEGER, name TEXT, currency_id INTEGER, snapshot_id INTEGER) LANGUAGE SQL AS $$ ' +
        'INSERT INTO wallets (row_id, name, currency_id, snapshot_id) VALUES (row_id, name, currency_id, snapshot_id) ' +
        '$$;', {
      type: QueryTypes.RAW,
    });
  }
}

module.exports = new WalletsService();
