const express = require('express');
const router = express.Router();
const designationsController = require('../controllers/designationsController'); // Correct import path
const authenticateToken = require('../middleware/authMiddleware');
const verifyUser = require('../middleware/verifyUser');

// Define Customer routes
router.get('/designations', authenticateToken,verifyUser, designationsController.getAllDesignation); 
router.get('/designationsCompany', authenticateToken,verifyUser, designationsController.getAllDesignationByCompany); 
router.post('/designation-update', authenticateToken,verifyUser, designationsController.updateDesignation); 
router.post('/designation-delete', authenticateToken,verifyUser, designationsController.deleteDesignation); 
router.post('/designation-create', authenticateToken,verifyUser, designationsController.addDesignation); 
 
module.exports = router;