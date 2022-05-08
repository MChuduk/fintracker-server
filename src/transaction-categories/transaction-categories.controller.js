const transactionCategoriesService = require('./transaction-categories.service');

class TransactionCategoriesController {
  async create(req, res) {
    const {id} = req.user;
    const {row_id, name} = req.body;
    const result = await transactionCategoriesService.create(id, row_id, name);
    res.json(result);
  }

  async getAll(req, res) {
    const {snapshot_id} = req.query;
    const result = await transactionCategoriesService.getAll(snapshot_id);
    res.json(result);
  }
}

module.exports = new TransactionCategoriesController();
