const snapshotsService = require('../snapshots/snapshots.service');

class SnapshotsController {
  async create(req, res) {
    const {id} = req.user;
    const result = await snapshotsService.create(id);
    res.json(result);
  }

  async getAll(req, res) {
    const {id} = req.user;
    const result = await snapshotsService.getAll(id);
    res.json(result);
  }

  async getOne(req, res) {
    const {id} = req.params;
    const result = await snapshotsService.getOne(id);
    res.json(result);
  }

  async delete(req, res) {
    const {id} = req.params;
    const result = await snapshotsService.delete(id);
    res.json(result);
  }
}

module.exports = new SnapshotsController();
