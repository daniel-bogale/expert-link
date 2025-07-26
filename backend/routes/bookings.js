const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

// Protected routes - require authentication
router.use(authController.verifyToken);

// Booking routes
router.post('/', bookingController.createBooking);
router.get('/', bookingController.getBookings);
router.get('/upcoming', bookingController.getUpcomingBookings);
router.get('/past', bookingController.getPastBookings);
router.get('/:id', bookingController.getBookingDetails);
router.put('/:id', bookingController.updateBooking);
router.post('/:id/cancel', bookingController.cancelBooking);

module.exports = router; 