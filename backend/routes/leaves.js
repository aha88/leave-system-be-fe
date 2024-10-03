const express = require('express');
const router = express.Router();
const leavesController = require('../controllers/leavesController'); // Correct import path
const authenticateToken = require('../middleware/authMiddleware');
const verifyUser = require('../middleware/verifyUser');

// Define Customer routes
router.get('/leaves', authenticateToken,verifyUser, leavesController.getAllLeave); 
router.get('/leavesCompany', authenticateToken,verifyUser, leavesController.getAllLeaveByCompany);
router.post('/create-leave', authenticateToken,verifyUser, leavesController.createLeave);
router.post('/approve-leave', authenticateToken,verifyUser, leavesController.approvedLeave);
router.post('/rejected-leave', authenticateToken,verifyUser, leavesController.rejectedLeave);
router.post('/revoked-leave', authenticateToken,verifyUser, leavesController.revokedLeave);
 
module.exports = router;
