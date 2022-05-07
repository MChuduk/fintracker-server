const dbService = require('../database/database.service');
const {QueryTypes} = require('sequelize');
const snapshotsService = require('../snapshots/snapshots.service');
const TransactionCategory = require('../database/models/transaction-category.model');

class TransactionCategoriesService {
  constructor() {
    this.dbContext = dbService.getContext();
  }

  async create(userId, rowId, name) {
    const [snapshot] = await snapshotsService.getAll(userId);
    const id = -1;
    const snapshotId = snapshot.id;

    const [result] = await this.dbContext.query(
        'CALL create_transaction_category(:rowId, :name, :snapshotId, :id);', {
          replacements: {rowId, name, snapshotId, id},
          type: QueryTypes.SELECT,
        });
    return await this.getOne(result.id);
  }

  async getAll(snapshotId) {
    return await this.dbContext.query(
        'SELECT row_id, name, snapshot_id FROM get_all_transaction_categories() WHERE snapshot_id = $1;', {
          bind: [snapshotId],
          type: QueryTypes.SELECT,
        });
  }

  async getOne(id) {
    const [category] = await this.dbContext.query(
        'SELECT row_id, name, snapshot_id, id FROM get_all_transaction_categories() WHERE id = $1; ', {
          bind: [id],
          model: TransactionCategory,
          mapToModel: true,
          type: QueryTypes.SELECT,
        });
    return category;
  }

  async insertProcedures() {
    await this.dbContext.query('CREATE OR REPLACE PROCEDURE create_transaction_category ' +
        '(row_id INTEGER, name TEXT, snapshot_id INTEGER, INOUT id INTEGER) LANGUAGE SQL AS $$ ' +
        'INSERT INTO transaction_categories (row_id, name, snapshot_id) VALUES (row_id, name, snapshot_id) ' +
        'RETURNING id ' +
        '$$;', {
      type: QueryTypes.RAW,
    });

    await this.dbContext.query('CREATE OR REPLACE FUNCTION get_all_transaction_categories ' +
        '() RETURNS TABLE (id INTEGER, row_id INTEGER, name TEXT, snapshot_id INTEGER) LANGUAGE SQL AS $$ ' +
        'SELECT id, row_id, name, snapshot_id FROM transaction_categories ' +
        '$$;', {
      type: QueryTypes.RAW,
    });
  }
}

module.exports = new TransactionCategoriesService();
