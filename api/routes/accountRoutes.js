const axios = require('axios')
const bcrypt = require('bcryptjs')
const knex = require('knex')
const db = require('../../database/dbConfig')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET || "keep it secret, keep it safe, don't tell anyone";

const express = require('express')
const router = express.Router()

const { authenticate } = require('../../auth/authenticate');
const { checkRole } = require('../../auth/checkRole');
const { checkAdmin } = require('../../auth/checkAdmin');
router.use(express.json())


router.post('/register', register);
router.post('/login', login);


router.get('/', authenticate, (req,res)=>{
  db('users').where('role', 'student').then(users=>{res.status(200).json(users)}).catch(err=>{res.status(404).json({message:"No users found!"})})
})

router.get('/volunteer/', authenticate,  (req,res)=>{
  console.log('in volunteer')
  db('users').where('role', 'volunteer').then(users=>{res.status(200).json(users)}).catch(err=>{res.status(404).json({message:"No users found!"})})
})

router.get('/admin/', authenticate,  (req,res)=>{
    console.log('in admin')
    db('users').where('role', 'admin').then(users=>{res.status(200).json(users)}).catch(err=>{res.status(404).json({message:"No users found!"})})
  })

router.get('/:id', authenticate, (req,res)=>{
  const id = req.params.id
  db('users').where('id', id).where('role', 'student').first().then(users=>{res.status(200).json(users)}).catch(err=>{res.status(500).json({message:"Error trying to GET user!"})})
})

router.get('/volunteer/:id',authenticate,  (req,res)=>{
  const id = req.params.id
  db('users').where('id', id).where('role', 'volunteer').first().then(users=>{res.status(200).json(users)}).catch(err=>{res.status(500).json({message:"Error trying to GET user!"})})
})

router.get('/admin/:id',authenticate,  (req,res)=>{
    const id = req.params.id
    db('users').where('id', id).where('role', 'admin').first().then(users=>{res.status(200).json(users)}).catch(err=>{res.status(500).json({message:"Error trying to GET user!"})})
  })


router.put('/:id',  authenticate,(req,res)=>{
  console.log('in put')
  console.log(req.body)
  const id = req.params.id

  db('users')
    .where('id', id)
    .update({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      phone: req.body.phone
    })
    .then(numUpdated=>{
      if(numUpdated!=0){
        res.status(201).json({message: `You changed your information`})
      }else{
        res.status(404).json({message: 'No record found!'})
      }
    })
    .catch(err=>{res.status(500).json({message:'Internal server error'})})
})

router.delete('/:id', (req,res)=>{
  const id = req.params.id
  db('users')
    .where('id', id)
    .del()
    .then(numDeleted=>{
      if(numDeleted!=0){
        res.status(201).json({message:"User deleted"})
      }else{
        res.status(404).json({message:"No record found!"})
      }
    })
    .catch(err=>{
      res.status(500).json({message:"Internal server error"})
    })
})

module.exports = router
function generateToken(user){
  console.log('in generatetoken')
  console.log(user[0])
  const payload = {
    username:user[0].username,
    role:user[0].role
  }
  console.log('payload')
  console.log(payload)

  const options = {
    expiresIn: '1h',
    jwtid:'12345'
  }
  return jwt.sign(payload,secret,options)
}

function register(req, res) {
  const credentials = req.body
  const hash = bcrypt.hashSync(credentials.password, 14)
  credentials.password = hash
  db('users').where('username',credentials.username).then(user=>{
    console.log('user found')
    console.log(user)
    console.log(credentials)
    if(user.length !=0 && user[0].username === credentials.username){
      res.send({message:"That user already exists!"})
    }else{db('users').insert(credentials).then(
      (ids)=>{
        db('users').where('id',ids[0]).then(user=>{
          const token = generateToken(user)
          console.log(user)
          console.log(token)
          const userData = user[0]
          db('profiles').insert(
            
              credentials
            )
            .then(user=>{res.status(201).json({id:userData.id, role:userData.role, token})})
            .catch(err=>{res.status(500).json({message:"Error inserting into profiles"})})
      }).catch(err=>{res.status(500).send(err)})
  }).catch(err=>{res.status(401).json({message:err.message})})}
}).catch(err=>{res.status(500).json({message:err.message})})
}

function login(req, res) {
  const credentials = req.body
  db('users').where('username', credentials.username).then(user=>{
    console.log('in login')
    console.log('user')
    console.log('usermsg2')
    if(user.length ==0){
      res.status(404).json({message:'That user does not exist!'})
    }
    else if(!bcrypt.compareSync(credentials.password, user[0].password)){
      res.status(401).json({message:'incorrect credentials, access denied'})
    }else{

      const token = generateToken(user)
      res.status(200).json({name: user[0].name, role:user[0].role, id:user[0].id,token})
    }

  }).catch(err=>res.status(500).json({message:err.message}))
}