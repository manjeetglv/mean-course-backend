const express = require("express");

const router = express.Router();
const userController = require('../controllers/userController');

/**
 * Signup 
 */
router.post('/signup', userController.createUser);


/**
 * Login
 */
router.post('/login', userController.userLogin);

module.exports = router;