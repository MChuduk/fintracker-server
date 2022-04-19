const crypto = require('crypto');
const util = require('util');

class UtilsService {
  async scryptHash(string, salt) {
    const saltInUse = salt || crypto.randomBytes(16).toString('hex');
    const hashBuffer = await util.promisify(crypto.scrypt)(string, saltInUse, 32);

    return `${hashBuffer.toString('hex')}:${saltInUse}`;
  }

  async scryptVerify(string, hashAndSalt) {
    const [, salt] = hashAndSalt.split(':');
    return await this.scryptHash(string, salt) === hashAndSalt;
  }

  dispatchErrors(controller) {
    return async (req, res) => {
      try {
        const result = await controller(req, res);
        res.send(result);
      } catch (error) {
        console.log(error.message);
        res.send({
          type: 'error',
          message: error.message,
        });
      }
    };
  }
}

module.exports = new UtilsService();
