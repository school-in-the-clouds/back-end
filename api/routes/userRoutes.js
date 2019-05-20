const express = require('express')

const router = express.Router()
const db = require('../../database/dbConfig')
const { authenticate } = require('../../auth/authenticate');

router.use(express.json())

router.get('/',authenticate, (req,res)=>{
  db('profiles').then(users=>{res.status(200).json(users)}).catch(err=>{res.status(404).json({message:"No users found!"})})

})

router.get('/students/', authenticate, (req,res)=>{
  db('profiles').where('role', 'student').then(users=>{res.status(200).json(users)}).catch(err=>{res.status(404).json({message:"No users found!"})})

})

router.get('/volunteers/',(req,res)=>{
  const id = req.params.id
  db('profiles').where('role', 'volunteer').then(users=>{res.status(200).json(users)}).catch(err=>{res.status(500).json({message:"Error trying to GET user!"})})
})

router.get('/:id', authenticate, (req,res)=>{
    const id = req.params.id
    db('profiles').where('id', id).first().then(users=>{res.status(200).json(users)}).catch(err=>{res.status(500).json({message:"Error trying to GET user!"})})
  })

router.put('/:id', authenticate,(req,res)=>{
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

router.delete('/:id', authenticate,(req,res)=>{
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
    }
    )

})

module.exports = router