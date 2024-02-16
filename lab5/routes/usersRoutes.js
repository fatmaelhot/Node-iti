const express = require('express')

// controller functions
const { register, login } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', login)

// signup route
router.post('/signup', register)

module.exports = router