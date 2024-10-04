const express = require('express');
const userRoutes = require('./users'); 
const customerRoute = require('./customer'); 
const employeeRoute = require('./employee'); 
const leavesRoute = require('./leaves'); 
const departmentRoute = require('./departments'); 
const designationsRoute = require('./designations'); 
const categoriesRoute = require('./categories'); 

const router = express.Router();

// '/api' path
router.use('/api', userRoutes);
// router.use('/api', customerRoute);
router.use('/api', employeeRoute);
router.use('/api', leavesRoute);
router.use('/api', departmentRoute);
router.use('/api', designationsRoute);
router.use('/api', categoriesRoute);

module.exports = router;

