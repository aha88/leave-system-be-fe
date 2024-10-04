const express = require('express');
const router = express.Router();
const departmentsController = require('../controllers/departmentsController'); // Correct import path
const authenticateToken = require('../middleware/authMiddleware');
const verifyUser = require('../middleware/verifyUser');
const userAccessPass = require('../middleware/UserAccessPass');

// Define Customer routes
router.get('/departments', authenticateToken,verifyUser, departmentsController.getAllDepartment ); 
router.get('/departmentsCompany', authenticateToken,verifyUser, departmentsController.getAllDepartmentByCompany ); 
router.post('/department/add', authenticateToken,verifyUser, departmentsController.addDepartment ); 
router.get('/department-update/:id', authenticateToken,verifyUser, userAccessPass, departmentsController.updateDepartment ); 
router.post('/department-delete/:id', authenticateToken,verifyUser, userAccessPass, departmentsController.deleteDepartment ); 
 
module.exports = router;
