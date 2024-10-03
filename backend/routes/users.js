const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Correct import path
const authenticateToken = require('../middleware/authMiddleware');
const verifyUser = require('../middleware/verifyUser');

// Define user routes

router.post('/login',  userController.postLogin);       
router.get('/users', authenticateToken, verifyUser, userController.getAllUsers);       
router.get('/user/:id', authenticateToken, verifyUser, userController.getUserId); 
router.post('/user/add', authenticateToken, verifyUser, userController.addUserAccess);       
router.post('/user/delete', authenticateToken, verifyUser, userController.deleteUserAccess);       

module.exports = router;
