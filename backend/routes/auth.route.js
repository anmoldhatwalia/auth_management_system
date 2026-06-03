const express = require('express');
const ctrl = require('../controllers/auth.controller');
const authmiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', ctrl.register);
router.get('/users', ctrl.getUsers);
router.post('/login',ctrl.login);

module.exports = router;