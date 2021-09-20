const express = require('express')
const todo = require('../controllers/todo')
const router = express.Router()
const auth = require('../middlewares/auth')

router.post('/', auth, todo.addTodo)
router.get('/', auth, todo.getTodo)
router.put('/:id', auth, todo.finishTodo)
router.delete('/:id', auth, todo.deleteTodo)

module.exports = router