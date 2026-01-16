const express = require('express');
const router = express.Router();

// فحص صحة API
router.get('/', (req, res) => res.send('✅ Khadma API is running!'));

// Route 
const usersRoutes = require('./users');
const servicesRoutes = require('./services');
const vehiclesRoutes = require('./vehicles');
const trafficFinesRoutes = require('./trafficFines');
const paymentsRoutes = require('./payments');
const appointmentsRoutes = require('./appointments');
const driverLicensesRoutes = require('./driverLicenses');

// ربط كل Route
router.use('/users', usersRoutes);
router.use('/services', servicesRoutes);
router.use('/vehicles', vehiclesRoutes);
router.use('/trafficFines', trafficFinesRoutes);
router.use('/payments', paymentsRoutes);
router.use('/appointments', appointmentsRoutes);
router.use('/driverLicenses', driverLicensesRoutes);

module.exports = router;
