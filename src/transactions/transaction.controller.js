const transactionsService = require('./transaction.service');

class TransactionController {
  async create(req, res) {
    const {id} = req.user;
    const {row_id, type_id, note, amount, date, wallet_id, category_id, repeat} = req.body;
    const result = await transactionsService.create(id, row_id, type_id, note, amount, date, wallet_id, category_id, repeat);
    res.json(result);
  }

  async getAll(req, res) {
    const {snapshot_id} = req.body;
    const result = await transactionsService.getAll(snapshot_id);
    res.json(result);
  }
}

module.exports = new TransactionController();
