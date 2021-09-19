const express = require('express')
const todo = require('../controllers/todo')
const router = express.Router()


router.post('/', todo.post)

module.exports = router