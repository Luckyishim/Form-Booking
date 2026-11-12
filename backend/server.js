require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookingRoutes');
const errorHandler = require('./middleware/errorMiddleware');

const app = express()
app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())

app.use('/api/bookings', bookingRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 6700;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})