const dbService = require('../database/database.service');
const {QueryTypes} = require('sequelize');
const Snapshot = require('../database/models/snapshot.model');

class SnapshotsService {
  constructor() {
    this.dbContext = dbService.getContext();
  }

  async create(userId) {
    await this.dbContext.query(
        'CALL create_snapshot($1);', {
          bind: [userId],
          type: QueryTypes.INSERT,
        });
    return await this.findOne(userId);
  }

  async findOne(userId) {
    const [snapshot] = await this.dbContext.query(
        'SELECT id, user_id, created_at FROM get_all_snapshots() WHERE user_id = $1; ', {
          bind: [userId],
          model: Snapshot,
          mapToModel: true,
          type: QueryTypes.SELECT,
        });
    return snapshot;
  }

  async insertProcedures() {
    await this.dbContext.query('CREATE OR REPLACE PROCEDURE create_snapshot ' +
        '(user_id INTEGER) LANGUAGE SQL AS $$ ' +
        'INSERT INTO snapshots (user_id, created_at) VALUES (user_id, DEFAULT) ' +
        '$$;', {
      type: QueryTypes.RAW,
    });

    await this.dbContext.query('CREATE OR REPLACE FUNCTION get_all_snapshots ' +
          '() RETURNS TABLE (id INTEGER, user_id INTEGER, created_at TEXT) LANGUAGE SQL AS $$ ' +
          'SELECT id, user_id, created_at FROM snapshots ' +
          '$$;', {
      type: QueryTypes.RAW,
    });
  }
}

module.exports = new SnapshotsService();
