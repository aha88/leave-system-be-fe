const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController'); // Correct import path
const authenticateToken = require('../middleware/authMiddleware');
const verifyUser = require('../middleware/verifyUser');

// Define Customer routes
router.get('/employees', authenticateToken,verifyUser, employeeController.getAllEmployee); 
router.get('/employeeCompany/:id', authenticateToken,verifyUser, employeeController.allEmployeeByCompany); 
router.get('/employee/:id', authenticateToken,verifyUser, employeeController.idEmployee); 
router.post('/employee_update/:id', authenticateToken,verifyUser, employeeController.idEmployeeUpdate); 
router.post('/employee_details_update/:id', authenticateToken,verifyUser, employeeController.idEmployeeDetailsUpdate); 

module.exports = router;
