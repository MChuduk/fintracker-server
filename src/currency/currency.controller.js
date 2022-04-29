const currencyService = require('./currency.service');

class AuthController {
  async getAll(req, res) {
    const currency = await currencyService.getAll();
    res.json(currency);
  }
}

module.exports = new AuthController();
