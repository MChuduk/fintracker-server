const dbService = require('../database/database.service');
const {QueryTypes} = require('sequelize');
const Snapshot = require('../database/models/snapshot.model');

class SnapshotsService {
  constructor() {
    this.dbContext = dbService.getContext();
  }

  async create(userId) {
    const id = -1;
    const [result] = await this.dbContext.query(
        'CALL create_snapshot(:userId, :id);', {
          replacements: {userId, id},
          type: QueryTypes.SELECT,
          raw: true,
        });
    return await this.getOne(result.id);
  }

  async getOne(id) {
    const [snapshot] = await this.dbContext.query(
        'SELECT id, user_id, created_at FROM get_all_snapshots() WHERE id = $1; ', {
          bind: [id],
          model: Snapshot,
          mapToModel: true,
          type: QueryTypes.SELECT,
        });
    return snapshot;
  }

  async getAll(userId) {
    return await this.dbContext.query(
        'SELECT id, user_id, created_at FROM get_all_snapshots() WHERE user_id = $1; ', {
          bind: [userId],
          model: Snapshot,
          mapToModel: true,
          type: QueryTypes.SELECT,
        });
  }

  async delete(id) {
    const snapshot = await this.getOne(id);
    await this.dbContext.query(
        'CALL delete_snapshot($1);', {
          bind: [id],
          type: QueryTypes.RAW,
        });
    return snapshot;
  }

  async insertProcedures() {
    await this.dbContext.query('CREATE OR REPLACE PROCEDURE create_snapshot ' +
        '(user_id INTEGER, INOUT id INTEGER) LANGUAGE SQL AS $$ ' +
        'INSERT INTO snapshots (user_id, created_at) VALUES (user_id, DEFAULT) RETURNING id' +
        '$$;', {
      type: QueryTypes.RAW,
    });

    await this.dbContext.query('CREATE OR REPLACE PROCEDURE delete_snapshot ' +
          '(id_in INTEGER) LANGUAGE SQL AS $$ ' +
          'DELETE FROM snapshots WHERE id = id_in ' +
          '$$;', {
      type: QueryTypes.RAW,
    });

    await this.dbContext.query('CREATE OR REPLACE FUNCTION get_all_snapshots ' +
          '() RETURNS TABLE (id INTEGER, user_id INTEGER, created_at TEXT) LANGUAGE SQL AS $$ ' +
          'SELECT id, user_id, created_at FROM snapshots ORDER BY created_at DESC' +
          '$$;', {
      type: QueryTypes.RAW,
    });
  }
}

module.exports = new SnapshotsService();
