const config = require('../config');
const jwt = require('jsonwebtoken');

class JwtService {
  generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return jwt.sign(payload, config.JWT_SECRET, {expiresIn: '24h'});
  }
}

module.exports = new JwtService();
