const router = require('express').Router();

const Users = require('./user-model.js');

router.get('/', (req, res) => {
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => 
        res.status(500).json({ message: 'You will not pass!' }));
});

router.get('/:id', (req, res) => {
    Users.findById(req.params.id)
      .then(user => {
        res.json(user);
      })
      .catch(err => res.send(err));
  });

module.exports = router;