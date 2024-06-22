const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

const authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Access denied, token missing!' });
  }

  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Access denied, token invalid!' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = authenticate;
