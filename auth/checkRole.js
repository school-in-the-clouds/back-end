const jwt = require('jsonwebtoken');

const jwtKey =
  process.env.JWT_SECRET ||
    'add a .env file to root of project with the JWT_SECRET variable';

// quickly see what this file exports
module.exports = {
  checkRole,
};

// implementation details

function checkRole(req, res, next) {
  const token = req.get('Authorization');
  if (token) {
    console.log('token')
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);
      req.decoded = decoded;
      userRole = req.decoded.role
      if(userRole==="admin"){
        next();

      }else{
        return(res.status(403).json({message:"you don't have access, sorry"}))
      }

    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}