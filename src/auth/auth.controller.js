const authService = require('./auth.service');

class AuthController {
  async signUpUser(req, res) {
    const {email, password} = req.body;
    await authService.signUpUser(email, password);
    res.json('123');
  }

  async signInUser(req, res) {
    const {email, password} = req.body;
    await authService.signInUser(email, password);
    res.json('123');
  }
}

module.exports = new AuthController();
