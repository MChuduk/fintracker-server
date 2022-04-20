const jwtService = require('./../jwt/jwt.service');

module.exports = function(req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).json({message: 'Access token is not valid'});
    }
    const decodedData = jwtService.verify(token);
    req.user = decodedData;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({message: 'Access token is not valid'});
  }
};
