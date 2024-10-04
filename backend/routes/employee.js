const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController'); // Correct import path
const authenticateToken = require('../middleware/authMiddleware');
const verifyUser = require('../middleware/verifyUser');
const userAccessPass = require('../middleware/UserAccessPass');

// Define Customer routes
router.get('/employees', authenticateToken,verifyUser, employeeController.getAllEmployee); 
router.post('/employee/add', authenticateToken,verifyUser, employeeController.employeeAdd); 
router.get('/employeeCompany/:id', authenticateToken,verifyUser, employeeController.allEmployeeByCompany); 
router.get('/employee/:id', authenticateToken,verifyUser, userAccessPass, employeeController.idEmployee); 
router.post('/employee_update/:id', authenticateToken,verifyUser,userAccessPass, employeeController.idEmployeeUpdate); 
router.post('/employee-details-update/:id', authenticateToken,verifyUser, userAccessPass, employeeController.idEmployeeDetailsUpdate); 
router.get('/employee-leave-history/:id/:company', authenticateToken,verifyUser, userAccessPass, employeeController.idEmployeeLeaveHistory); 

module.exports = router;
