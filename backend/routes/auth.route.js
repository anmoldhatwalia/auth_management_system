const express = require('express');
const ctrl = require('../controllers/auth.controller');
const authmiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', ctrl.register);
router.get('/users', authmiddleware, ctrl.getUsers);
router.post('/login', ctrl.login);
router.post('/forgotpassword',ctrl.forgotPassword);
router.post('/resetpassword',ctrl.resetPassword);
router.get('/analytics',ctrl.getAnalytics);

module.exports = router;