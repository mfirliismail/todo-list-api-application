const express = require('express')
const user = require('./user')
const todo = require('./todo')
const router = express.Router()
const auth = require('./auth')

router.use('/user', user)
router.use('/todo', todo)
router.use('/auth', auth)

module.exports = router