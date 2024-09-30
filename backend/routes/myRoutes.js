const express = require('express');
const userRoutes = require('./users'); // Import user routes
const customerRoute = require('./customer'); // Import customer routes
const employeeRoute = require('./employee'); // Import customer routes

const router = express.Router();

// '/api' path
router.use('/api', userRoutes);
router.use('/api', customerRoute);
router.use('/api', employeeRoute);

module.exports = router;

