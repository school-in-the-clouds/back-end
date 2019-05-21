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



module.exports = router