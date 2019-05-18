
const { authenticate } = require('../auth/authenticate');
const bcrypt = require('bcryptjs');
const secrets = require('../config/secrets.js');
const jwt = require('jsonwebtoken');
const Users = require('../users/user-model.js');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  
};

function register(req, res) {
 let user = req.body;
 const hash = bcrypt.hashSync(user.password, 10);
 user.password = hash;

 Users.add(user)
 .then(saved => {
   res.status(201).json(saved);
 })
 .catch(err => {
   res.status(500).json(err.message);
 })
}

function login(req, res) {
  // implement user login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);

          res.status(200).json({
              message: `Welcome ${user.username}!`,
              token,
          });
      } else {
          res.status(401).json({ message: 'Credentials not accepted'});
      }
  })
  .catch(err => {
      res.status(500).json(err);
  });
}

function generateToken(user) {
  const payload = {
      subject: user.id,
      username: user.username
  }
  const options = {
      expiresIn: '2d'
  }
  return jwt.sign(payload, secrets.jwtKey, options)
}


