const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const userRoutes = require('./routes/userRoutes')
const accountRoutes = require('./routes/accountRoutes')

const router = express.Router()
router.use(cors())
router.use(morgan('short'))
router.use('/users', userRoutes)
router.use('/accounts', accountRoutes)

module.exports = router