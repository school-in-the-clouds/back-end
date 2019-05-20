const jwt = require('jsonwebtoken');

const jwtKey =
  process.env.JWT_SECRET ||
    "keep it secret, keep it safe, don't tell anyone";

// quickly see what this file exports
module.exports = {
  checkAdmin,
};

// implementation details

function checkAdmin(req, res, next) {
  const token = req.get('authorization');
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