const walletsService = require('./wallets.service');

class WalletsController {
  async create(req, res) {
    const {id} = req.user;
    const {row_id, name, currency_id} = req.body;
    const result = await walletsService.create(id, row_id, name, currency_id);
    res.json(result);
  }
}

module.exports = new WalletsController();
