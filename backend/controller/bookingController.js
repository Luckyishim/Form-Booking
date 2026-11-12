const Booking = require("../models/Booking")

//Get all booking data
//@route /api/bookings
const getAllBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 })
        res.json({ success: true, data: bookings })
    }catch(error){
        next(error)
    }
}

//Get specific booking data
//@route /api/bookings/:id
const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

// posting a new bookings
//@route /api/bookings
const createBooking = async (req, res, next) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

// updating a booking
//@route /api/bookings/:id
const updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

// deleting specific boooking
//@route /api/bookings/:id
const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, message: 'Booking deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports={
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking
}