const express = require('express')
const user = require('./user')
const todo = require('./todo')
const router = express.Router()

router.use('/user', user)
router.use('/todo', todo)

module.exports = router