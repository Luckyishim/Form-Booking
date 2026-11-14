const Booking = require("../models/Booking")
const sendSMS = require("../utils/sendSMS")


//Get all booking data
//@route /api/bookings
const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 })
    res.json({ success: true, data: bookings })
  } catch (error) {
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
    //Generating OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    const booking = await Booking.create({
      ...req.body,
      otp: otp,
      status: 'pending_verification'
    })

    //OTp via SMS process
    await sendSMS(booking.phone, otp)

    res.status(201).json({
      success: true,
      message: "OTP sent to phone",
      bookingId: booking._id
    })
  } catch (error) {
    next(error);
  }
};

//Verifying the OTP
//@route /api/bookings/:id/verify
const verifyOtp = async (req, res, next) => {
  try {
    const { otp } = req.body;
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      })
    }

    if (booking.status !== 'pending_verification') {
      return res.status(400).json({
        success: false,
        message: "Booking already verified"
      })
    }

    //Otp matching check
    if (booking.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again."
      })
    }

    //Confirming booking
    booking.status = 'confirmed'
    booking.otp = undefined;
    await booking.save()

    res.json({
      success: true,
      message: "Booking Confirmed!", data: booking
    })
  } catch (error) {
    next(error)
  }
}

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



module.exports = {
  createBooking,
  verifyOtp,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking
}