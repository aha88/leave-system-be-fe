const express = require('express');
const router = express.Router();
const designationsController = require('../controllers/designationsController'); // Correct import path
const authenticateToken = require('../middleware/authMiddleware');
const verifyUser = require('../middleware/verifyUser');
const userAccessPass = require('../middleware/UserAccessPass');

// Define Customer routes
router.get('/designations', authenticateToken,verifyUser, designationsController.getAllDesignation); 
router.get('/designationsCompany', authenticateToken,verifyUser, designationsController.getAllDesignationByCompany); 
router.post('/designation/add', authenticateToken,verifyUser, designationsController.addDesignation); 
router.post('/designation-update/:id', authenticateToken,verifyUser, userAccessPass, designationsController.updateDesignation); 
router.post('/designation-delete/:id', authenticateToken,verifyUser,userAccessPass,  designationsController.deleteDesignation); 
 
module.exports = router;