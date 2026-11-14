const mongoose = require("mongoose")

//Values in frontend
const service = [
    "land-survey",
    "soil-testing",
    "architecture",
    "structural-engineering",
    "building-approval",
    "project-management",
    "vaastu",
    "fencing",
    "bhumi-pooja",
    "civil-construction",
    "materials-supply",
    "water-boring",
    "plumbing",
    "electrical",
    "truss-roofing",
    "waterproofing",
    "upvc-doors-windows",
    "glass-works",
    "tiling",
    "parqueting",
    "painting",
    "woodwork",
    "custom-furniture",
    "modular-kitchen",
    "bathroom-setup",
    "interior-designing",
    "wall-decoration",
    "gardening-landscaping",
    "water-filter",
    "ac-services",
    "electronics-setup",
    "cctv",
    "home-automation",
    "wifi-access-point",
    "solar-panel",
    "car-porch-garage",
    "ev-charger",
    "lift-elevator",
    "fire-safety",
    "griha-pravesh",
    "packing-moving",
    "annual-maintenance"
];

const propertyTypes = [
    "House",
    "Apartment",
    "Office",
    "Commercial building",
    "Land / plot",
    "Other"
];

const provinces = [
    "Koshi Province",
    "Madhesh Province",
    "Bagmati Province",
    "Gandaki Province",
    "Lumbini Province",
    "Karnali Province",
    "Sudurpashchim Province"
];

const preferredTimes = [
    "Morning (8am – 12pm)",
    "Afternoon (12pm – 4pm)",
    "Evening (4pm – 7pm)"
];

const budgetRanges = [
    "below-50k",
    "50k-1l",
    "1l-5l",
    "5l-10l",
    "10l-25l",
    "25l-50l",
    "above-50l",
    "not-sure"
];
const statuses = [
    'pending_verification',
    'pending',
    'reviewing',
    'confirmed',
    'completed',
    'cancelled'
]

//Schemas
const bookingSchema = new mongoose.Schema({
    //services
    service: {
        type: String,
        required: true,
        enum: service
    },
    propertyTypes: {
        type: String,
        required: true,
        enum: propertyTypes
    },

    //Contact
    fullName: {
        type: String,
        required: true, trim: true,
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [100, "Name cannot be more than 100 characters"]
    },

    phone: {
        type: String,
        required: true,
        trim: true,
        match:[/^9[678]\d{8}$/, 'Please enter a valid 10-digit Nepali mobile number']
    },
    email: {
        type: String,
        trim: true,
        maxlength: [255, "Email too long"],
        validate: {
            validator: (value) => !value || /^\S+@\S+\.\S+$/.test(value),
            message: 'Please enter a valid email'
        }
    },
    provinces: {
        type: String, required: true,
        enum: provinces,
    },
    districtCity: {
        type: String, required: true, trim: true,
        minlength: [2, 'District/City must be at least 2 characters'],
        maxlength: [100, 'District/City cannot exceed 100 characters']
    },
    serviceAddress: {
        type: String, required: true, trim: true,
        minlength: [5, 'Address must be at least 5 characters'],
        maxlength: [300, 'Address cannot exceed 300 characters']
    },


    // Project Details
    preferredDate: {
        type: String, required: true,
        match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD']
    },
    preferredTime: {
        type: String,
        required: true,
        enum: preferredTimes
    },
    estimatedBudget: {
        type: String,
        required: true,
        enum: budgetRanges
    },
    siteVisit: { type: Boolean, default: false },
    projectDescription: {
        type: String, required: true,
        minlength: [15, 'Description must be at least 15 characters'],
        maxlength: [1500, 'Description cannot exceed 1500 characters']
    },
    urgent: { type: Boolean, default: false },

    // Internal
    otp: { type: String },
    status: {
        type: String,
        enum: statuses, default: 'pending_verification'
    }
},
    { timestamps: true }
)
module.exports = mongoose.model("Booking", bookingSchema)