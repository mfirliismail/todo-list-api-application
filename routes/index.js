const express = require('express')

const todo = require('./todo')
const router = express.Router()
const auth = require('./auth')


router.use('/todo', todo)
router.use('/auth', auth)

module.exports = router