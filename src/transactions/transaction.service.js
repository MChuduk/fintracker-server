const dbService = require('../database/database.service');
const {QueryTypes} = require('sequelize');
const Transaction = require('../database/models/transaction.model');
const snapshotsService = require('../snapshots/snapshots.service');

class TransactionService {
  constructor() {
    this.dbContext = dbService.getContext();
  }

  async create(userId, rowId, typeId, note, amount, date, walletId, categoryId, repeat) {
    const [snapshot] = await snapshotsService.getAll(userId);
    const id = -1;
    const snapshotId = snapshot.id;

    const [result] = await this.dbContext.query(
        'CALL create_transaction(:rowId, :typeId, :note, :amount, :date, :walletId, :categoryId, :repeat, :snapshotId, :id);', {
          replacements: {rowId, typeId, note, amount, date, walletId, categoryId, repeat, snapshotId, id},
          type: QueryTypes.SELECT,
        });
    return await this.getOne(result.id);
  }

  async getAll(snapshotId) {
    return await this.dbContext.query(
        'SELECT row_id, type_id, note, amount, date, wallet_id, category_id, repeat, snapshot_id ' +
        'FROM get_all_transactions() WHERE snapshot_id = $1;', {
          bind: [snapshotId],
          type: QueryTypes.SELECT,
        });
  }

  async getOne(id) {
    const [transaction] = await this.dbContext.query(
        'SELECT id, row_id, type_id, note, amount, date, wallet_id, category_id, repeat, snapshot_id ' +
        'FROM get_all_transactions() WHERE id = $1; ', {
          bind: [id],
          model: Transaction,
          mapToModel: true,
          type: QueryTypes.SELECT,
        });
    return transaction;
  }

  async insertProcedures() {
    await this.dbContext.query('CREATE OR REPLACE PROCEDURE create_transaction ' +
            '(row_id INTEGER, type_id INTEGER, note TEXT, amount FLOAT, date TEXT, wallet_id INTEGER, ' +
        'category_id INTEGER, repeat INTEGER, snapshot_id INTEGER, INOUT id INTEGER) LANGUAGE SQL AS $$ ' +
            'INSERT INTO transactions (row_id, type_id, note, amount, date, wallet_id, category_id, repeat, snapshot_id) ' +
        'VALUES (row_id, type_id, note, amount, date, wallet_id, category_id, repeat, snapshot_id) ' +
            'RETURNING id ' +
            '$$;', {
      type: QueryTypes.RAW,
    });

    await this.dbContext.query('CREATE OR REPLACE FUNCTION get_all_transactions ' +
            '() RETURNS TABLE (id INTEGER, row_id INTEGER, type_id INTEGER, note TEXT, amount FLOAT, ' +
        'date TEXT, wallet_id INTEGER, category_id INTEGER, repeat INTEGER, snapshot_id INTEGER) LANGUAGE SQL AS $$ ' +
            'SELECT id, row_id, type_id, note, amount, date, wallet_id, category_id, repeat, snapshot_id FROM transactions ' +
            '$$;', {
      type: QueryTypes.RAW,
    });
  }
}

module.exports = new TransactionService();
