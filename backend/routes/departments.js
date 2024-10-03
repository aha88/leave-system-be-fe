const express = require('express');
const router = express.Router();
const departmentsController = require('../controllers/departmentsController'); // Correct import path
const authenticateToken = require('../middleware/authMiddleware');
const verifyUser = require('../middleware/verifyUser');

// Define Customer routes
router.get('/departments', authenticateToken,verifyUser, departmentsController.getAllDepartment ); 
router.get('/departmentsCompany', authenticateToken,verifyUser, departmentsController.getAllDepartmentByCompany ); 
router.post('/department-update', authenticateToken,verifyUser, departmentsController.updateDepartment ); 
router.post('/department-delete', authenticateToken,verifyUser, departmentsController.deleteDepartment ); 
router.post('/department-add', authenticateToken,verifyUser, departmentsController.addDepartment ); 
 
module.exports = router;
