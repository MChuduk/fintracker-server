const authService = require('./auth.service');

class AuthController {
  async signUpUser(req, res) {
    const {email, password} = req.body;
    const result = await authService.signUpUser(email, password);
    res.json(result);
  }

  async signInUser(req, res) {
    const {email, password} = req.body;
    const result = await authService.signInUser(email, password);
    res.json(result);
  }
}

module.exports = new AuthController();
