const express = require('express')

const router = express.Router()

const db = require('../../database/dbConfig')
const { authenticate } = require('../../auth/authenticate');
const { checkRole } = require('../../auth/checkRole');


router.use(express.json())
router.get('/', authenticate, (req,res)=>{
  db('tasks').then(tasks=>{res.status(200).json(tasks)}).catch(err=>res.status(404).json({message:"No tasks found!"}))

})

router.get('/:id',authenticate, (req,res)=>{
  const id = req.params.id
  db('tasks').where('id', id).then(tasks=>{res.status(200).json(tasks)}).catch(err=>res.status(404).json({message:"No task with that id found!"}))
})

router.get('/byVolunteer/:id',authenticate, (req,res)=>{
  const id = req.params.id
  db('tasks').where('user_id', id).then(tasks=>{res.status(200).json(tasks)}).catch(err=>res.status(404).json({message:"No trips found for that volunteer"}))
})

router.put('/:id', authenticate, checkRole,(req,res)=>{
  const id = req.params.id
  db('tasks')
    .where('id', id)
    .update({
      title: req.body.title,
      description: req.body.description,
      user_id: req.body.user_id
    })
    .then(numUpdated=>{
      if(numUpdated!=0){
        res.status(201).json({message:"Updated task information"})
      }else{
        res.status(404).json({message:"No task with that id found"})
      }
    })
    .catch(err=>{
      res.status(500).json({message: err.message})
    })

})

router.post('/', authenticate,checkRole,(req,res)=>{
  const task = req.body
  console.log('in post tasks')
  db('tasks').insert(task).then(
    (tasks)=>{

      res.status(201).json({message:'Task added successfully!'})
}).catch(err=>{res.status(500).send(err)})
})

router.delete('/:id', authenticate,checkRole, (req,res)=>{
  const id = req.params.id
  db('tasks')
    .where('id', id)
    .del()
    .then(numDeleted=>{
      if(numDeleted !=0){
        res.status(201).json({message:"Deleted task"})
      }else{
        res.status(401).json({message:"No task with that id found!"})
      }
    })
    .catch(err=>{
      res.status(500).json({message:"Internal server error"})
    }
    )

})

module.exports = router