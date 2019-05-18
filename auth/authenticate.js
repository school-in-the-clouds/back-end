const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

module.exports = {
  authenticate, 
};

function authenticate(req, res, next) {
  const token = req.get('Authorization');

  if (token) {
    jwt.verify(token, secrets.jwtKey, (err, decodedToken) => {
      if (err) return res.status(401).json(err);

      req.decodedJwt = decodedToken;
      console.log('decoded token', req.decodedJwt);
      next();
    });
    
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}