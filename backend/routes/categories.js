const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController'); // Correct import path
const authenticateToken = require('../middleware/authMiddleware');
const verifyUser = require('../middleware/verifyUser');
const userAccessPass = require('../middleware/UserAccessPass');

// Define Customer routes
router.get('/categories', authenticateToken,verifyUser, categoriesController.getAllCategories); 
router.get('/categoriesCompany', authenticateToken,verifyUser, categoriesController.getAllCategoriesByCompany); 
router.post('/category/add', authenticateToken,verifyUser, categoriesController.addCategory); 
router.post('/category-update/:id', authenticateToken,verifyUser, userAccessPass,  categoriesController.updateCategory); 
router.post('/category-delete/:id', authenticateToken,verifyUser, userAccessPass, categoriesController.deleteCategory); 
 
module.exports = router;