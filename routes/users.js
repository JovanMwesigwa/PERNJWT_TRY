const express = require('express');
const registerUser = require('../controllers/users.js')
const getUsers = require('../controllers/users.js')
const login = require('../controllers/users.js')

const router = express.Router();

router.get('/users', getUsers);
router.post('/register', registerUser);
router.post('/login', login);

module.exports = router;