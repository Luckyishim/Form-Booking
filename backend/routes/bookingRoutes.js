const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  verifyOtp
} = require('../controller/bookingController');

router.post('/', createBooking);
router.post('/:id/verify', verifyOtp);
router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.patch('/:id', updateBooking);
router.delete('/:id', deleteBooking);

module.exports = router;