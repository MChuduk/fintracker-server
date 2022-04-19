const usersService = require('../users/users.service');
const utilsService = require('../utils/utils.service');
const jwtService = require('../jwt/jwt.service');

class AuthService {
  async signUpUser(email, password) {
    const candidate = await usersService.findUser(email);
    if (candidate) {
      throw new Error(`user with email ${email} already exists`);
    }
    const hashPassword = await utilsService.scryptHash(password);
    return await usersService.createUser(email, hashPassword);
  }

  async signInUser(email, password) {
    const candidate = await usersService.findUser(email);
    if (!candidate) {
      throw new Error(`user with email ${email} not found`);
    }

    const isValidPassword = await utilsService.scryptVerify(
        password,
        candidate.password,
    );
    if (!isValidPassword) {
      throw new Error(`wrong password for user ${email}`);
    }
    const accessToken = jwtService.generateToken(candidate);
    return {
      type: 'success',
      token: accessToken,
    };
  }
}

module.exports = new AuthService();
