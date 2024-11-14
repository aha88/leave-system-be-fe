const express = require('express');
const router = express.Router();
const leavesController = require('../controllers/leavesController'); // Correct import path
const authenticateToken = require('../middleware/authMiddleware');
const verifyUser = require('../middleware/verifyUser');
const userAccessPass = require('../middleware/UserAccessPass');

// Define Customer routes
router.get('/leaves', authenticateToken,verifyUser, leavesController.getAllLeave); 
router.get('/leavesCompany', authenticateToken,verifyUser, leavesController.getAllLeaveByCompany);
router.post('/create-leave', authenticateToken,verifyUser, leavesController.createLeave);
router.get('/approve-leave/:id', authenticateToken,verifyUser, leavesController.approvedLeave);
router.get('/rejected-leave/:id', authenticateToken,verifyUser, leavesController.rejectedLeave);
router.get('/revoked-leave/:id', authenticateToken,verifyUser, leavesController.revokedLeave);
router.get('/user-history', authenticateToken,verifyUser, leavesController.userleaveTotalHistory);
router.get('/leaves-history/:id', authenticateToken,verifyUser, leavesController.leaveTotalHistory);
 
module.exports = router;
