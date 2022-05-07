const snapshotsService = require('../snapshots/snapshots.service');
const dbService = require('../database/database.service');
const {QueryTypes} = require('sequelize');
const Wallet = require('../database/models/wallet.model');

class WalletsService {
  constructor() {
    this.dbContext = dbService.getContext();
  }

  async create(userId, rowId, name, currencyId ) {
    const [snapshot] = await snapshotsService.getAll(userId);
    const id = -1;
    const snapshotId = snapshot.id;

    const [result] = await this.dbContext.query(
        'CALL create_wallet(:rowId, :name, :currencyId, :snapshotId, :id);', {
          replacements: {rowId, name, currencyId, snapshotId, id},
          type: QueryTypes.SELECT,
        });
    return await this.getOne(result.id);
  }

  async getAll(snapshotId) {
    return await this.dbContext.query(
        'SELECT row_id, name, currency_id, snapshot_id FROM get_all_wallets() WHERE snapshot_id = $1;', {
          bind: [snapshotId],
          type: QueryTypes.SELECT,
        });
  }

  async getOne(id) {
    const [wallet] = await this.dbContext.query(
        'SELECT row_id, name, currency_id, snapshot_id, id FROM get_all_wallets() WHERE id = $1; ', {
          bind: [id],
          model: Wallet,
          mapToModel: true,
          type: QueryTypes.SELECT,
        });
    return wallet;
  }

  async insertProcedures() {
    await this.dbContext.query('CREATE OR REPLACE PROCEDURE create_wallet ' +
        '(row_id INTEGER, name TEXT, currency_id INTEGER, snapshot_id INTEGER, INOUT id INTEGER) LANGUAGE SQL AS $$ ' +
        'INSERT INTO wallets (row_id, name, currency_id, snapshot_id) VALUES (row_id, name, currency_id, snapshot_id) ' +
        'RETURNING id ' +
        '$$;', {
      type: QueryTypes.RAW,
    });

    await this.dbContext.query('CREATE OR REPLACE FUNCTION get_all_wallets ' +
        '() RETURNS TABLE (id INTEGER, row_id INTEGER, name TEXT, currency_id INTEGER, snapshot_id INTEGER) LANGUAGE SQL AS $$ ' +
        'SELECT id, row_id, name, currency_id, snapshot_id FROM wallets ' +
        '$$;', {
      type: QueryTypes.RAW,
    });
  }
}

module.exports = new WalletsService();
