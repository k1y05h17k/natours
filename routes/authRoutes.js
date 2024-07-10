const express = require('express');
// const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

module.exports = router;   