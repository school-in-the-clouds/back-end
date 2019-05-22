const express = require('express')
const apiRoutes = require('./api/apiRoutes')
const server = express()
server.get('/', (req,res)=>{res.status(200).json({message:"Server Working"})})
server.use('/api', apiRoutes)
server.use('/uploads', express.static(__dirname + '/public'))

server.listen((process.env.PORT || 5000),()=>{console.log('API running on port')})