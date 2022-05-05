const snapshotsService = require('../snapshots/snapshots.service');

class SnapshotsController {
  async create(req, res) {
    const {id} = req.user;
    const result = await snapshotsService.create(id);
    res.json(result);
  }
}

module.exports = new SnapshotsController();
