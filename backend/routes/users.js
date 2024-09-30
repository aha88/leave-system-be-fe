const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Correct import path
const authenticateToken = require('../middleware/authMiddleware');
const verifyUser = require('../middleware/verifyUser');

// Define user routes
router.post('/login',  userController.postLogin);       
router.get('/users', authenticateToken, verifyUser, userController.getAllUsers);       
router.post('/users/add', authenticateToken, verifyUser, userController.addUserAccess);       
router.post('/users/delete', authenticateToken, verifyUser, userController.deleteUserAccess);       
router.get('/user/:id', authenticateToken, verifyUser, userController.getUserId); 

module.exports = router;
