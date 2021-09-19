const express = require('express')
const user = require('../controllers/user')
const router = express.Router()


router.post('/', user.post)
router.get('/', user.get)
module.exports = router