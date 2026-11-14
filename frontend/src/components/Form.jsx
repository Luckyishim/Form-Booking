import { useState } from "react";
import OtpVerify from "./OtpVerify";
import "../styles/Form.css";

const Form = () => {
    const [formData, setFormData] = useState({
        service: "", propertyTypes: "", fullName: "", phone: "", email: "",
        provinces: "", districtCity: "", serviceAddress: "", preferredDate: "",
        preferredTime: "", estimatedBudget: "", siteVisit: false,
        projectDescription: "", urgent: false
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    
    const [verifying, setVerifying] = useState(false);
    const [bookingId, setBookingId] = useState(null);

    const handleChange = (e) => {
        let { name, value, type, checked } = e.target;
        if (name === "phone") {
            value = value.replace(/\D/g, "");
            if (value.startsWith("977")) value = value.slice(3);
            if (value.startsWith("0")) value = value.slice(1);
            value = value.slice(0, 10);
        }
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
        if (message.text) setMessage({ type: "", text: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (response.ok) {
                setBookingId(data.bookingId);
                setVerifying(true);
            } else {
                setMessage({ type: "error", text: data.errors ? data.errors[0].message : data.message });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Server error, backend problem...", error });
        }
        setLoading(false);
    };

    const handleVerifySuccess = (confirmedId) => {
        setMessage({ type: "success", text: `Booking Confirmed! Your Reference ID is: ${confirmedId}` });
        setVerifying(false);
        setFormData({
            service: "", propertyTypes: "", fullName: "", phone: "", email: "",
            provinces: "", districtCity: "", serviceAddress: "", preferredDate: "",
            preferredTime: "", estimatedBudget: "", siteVisit: false,
            projectDescription: "", urgent: false
        });
    };

    return (
        <form className="booking-form" onSubmit={handleSubmit}>
            {message.text && (
                <div style={{
                    padding: "12px", marginBottom: "20px", borderRadius: "8px",
                    background: message.type === "success" ? "#e8f5e9" : "#ffebee",
                    color: message.type === "success" ? "#2e7d32" : "#c62828"
                }}>
                    {message.text}
                </div>
            )}

            {/* Service Information */}
            <section>
                <div className="section-heading">
                    <span className="step-number">1</span>
                    <div>
                        <h2>Service Information</h2>
                        <p>Select the service and property type.</p>
                    </div>
                </div>

                <div className="form-grid">
                    <div className="form-group">
                        <label>Service *</label>
                        <select name="service" value={formData.service} onChange={handleChange} required>
                            <option value="" disabled>Select a service</option>
                            <option value="land-survey">Land Survey &amp; Site Inspection</option>
                            <option value="soil-testing">Soil Testing</option>
                            <option value="architecture">Architecture &amp; House Design</option>
                            <option value="structural-engineering">Structural Engineering</option>
                            <option value="building-approval">Building Approval &amp; Documentation</option>
                            <option value="project-management">Project Management</option>
                            <option value="vaastu">Vaastu Consultation</option>
                            <option value="fencing">Fencing</option>
                            <option value="bhumi-pooja">Bhumi Pooja</option>
                            <option value="civil-construction">Civil Construction</option>
                            <option value="materials-supply">Materials Supply</option>
                            <option value="water-boring">Water Boring</option>
                            <option value="plumbing">Plumbing</option>
                            <option value="electrical">Electrical Services</option>
                            <option value="truss-roofing">Truss Roofing</option>
                            <option value="waterproofing">Waterproofing</option>
                            <option value="upvc-doors-windows">uPVC Doors &amp; Windows</option>
                            <option value="glass-works">Glass Works</option>
                            <option value="tiling">Tiling</option>
                            <option value="parqueting">Parqueting</option>
                            <option value="painting">Painting</option>
                            <option value="woodwork">Woodwork</option>
                            <option value="custom-furniture">Custom Furniture</option>
                            <option value="modular-kitchen">Modular Kitchen</option>
                            <option value="bathroom-setup">Bathroom Setup</option>
                            <option value="interior-designing">Interior Designing</option>
                            <option value="wall-decoration">Wall Decoration</option>
                            <option value="gardening-landscaping">Gardening &amp; Landscaping</option>
                            <option value="water-filter">Water Filter Setup</option>
                            <option value="ac-services">AC Services</option>
                            <option value="electronics-setup">Electronics Setup (TV / Geyser / Fridge)</option>
                            <option value="cctv">CCTV Camera Installation</option>
                            <option value="home-automation">Home Automation</option>
                            <option value="wifi-access-point">Wi-Fi Access Point Installation</option>
                            <option value="solar-panel">Solar Panel Installation</option>
                            <option value="car-porch-garage">Car Porch &amp; Garage Setup</option>
                            <option value="ev-charger">EV Charger Installation</option>
                            <option value="lift-elevator">Lift &amp; Elevator Installation</option>
                            <option value="fire-safety">Fire Safety Systems</option>
                            <option value="griha-pravesh">Griha Pravesh Puja</option>
                            <option value="packing-moving">Packing &amp; Moving</option>
                            <option value="annual-maintenance">Annual Home Maintenance</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Property Type *</label>
                        <select name="propertyTypes" value={formData.propertyTypes} onChange={handleChange} required>
                            <option value="" disabled>Select property type</option>
                            <option value="House">House</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Office">Office</option>
                            <option value="Commercial building">Commercial building</option>
                            <option value="Land / plot">Land / plot</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Contact Information */}
            <section>
                <div className="section-heading">
                    <span className="step-number">2</span>
                    <div>
                        <h2>Contact Information</h2>
                        <p>Provide your contact and service location.</p>
                    </div>
                </div>

                <div className="form-grid">
                    <div className="form-group">
                        <label>Full Name *</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" required />
                    </div>

                    <div className="form-group">
                        <label>Phone Number *</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="98XXXXXXXX"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            pattern="9[678]\d{8}"
                            title="Please enter a valid 10-digit Nepal mobile number"
                        />
                    </div>

                    <div className="form-group">
                        <label>Email Address (Optional)</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
                    </div>

                    <div className="form-group">
                        <label>Province *</label>
                        <select name="provinces" value={formData.provinces} onChange={handleChange} required>
                            <option value="" disabled>Select province</option>
                            <option value="Koshi Province">Koshi Province</option>
                            <option value="Madhesh Province">Madhesh Province</option>
                            <option value="Bagmati Province">Bagmati Province</option>
                            <option value="Gandaki Province">Gandaki Province</option>
                            <option value="Lumbini Province">Lumbini Province</option>
                            <option value="Karnali Province">Karnali Province</option>
                            <option value="Sudurpashchim Province">Sudurpashchim Province</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>District / City *</label>
                        <input type="text" name="districtCity" value={formData.districtCity} onChange={handleChange} placeholder="e.g. Kathmandu" required />
                    </div>

                    <div className="form-group">
                        <label>Full Service Address *</label>
                        <input type="text" name="serviceAddress" value={formData.serviceAddress} onChange={handleChange} placeholder="Street, area, landmark..." required />
                    </div>
                </div>
            </section>

            {/* Project Details */}
            <section>
                <div className="section-heading">
                    <span className="step-number">3</span>
                    <div>
                        <h2>Project Details</h2>
                        <p>Tell us about your project and preferred schedule.</p>
                    </div>
                </div>

                <div className="form-grid">
                    <div className="form-group">
                        <label>Preferred Date *</label>
                        <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Preferred Time *</label>
                        <select name="preferredTime" value={formData.preferredTime} onChange={handleChange} required>
                            <option value="" disabled>Select preferred time</option>
                            <option value="Morning (8am – 12pm)">Morning (8am – 12pm)</option>
                            <option value="Afternoon (12pm – 4pm)">Afternoon (12pm – 4pm)</option>
                            <option value="Evening (4pm – 7pm)">Evening (4pm – 7pm)</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Estimated Budget *</label>
                        <select name="estimatedBudget" value={formData.estimatedBudget} onChange={handleChange} required>
                            <option value="" disabled>Select budget range</option>
                            <option value="below-50k">Below NPR 50,000</option>
                            <option value="50k-1l">NPR 50,000 - 1 Lakh</option>
                            <option value="1l-5l">NPR 1 Lakh - 5 Lakhs</option>
                            <option value="5l-10l">NPR 5 Lakhs - 10 Lakhs</option>
                            <option value="10l-25l">NPR 10 Lakhs - 25 Lakhs</option>
                            <option value="25l-50l">NPR 25 Lakhs - 50 Lakhs</option>
                            <option value="above-50l">Above NPR 50 Lakhs</option>
                            <option value="not-sure">Not sure yet</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Do you need a site visit?</label>
                        <div className="button-group">
                            <button type="button" className={formData.siteVisit === true ? "selected" : ""} onClick={() => setFormData({ ...formData, siteVisit: true })}>
                                Yes
                            </button>
                            <button type="button" className={formData.siteVisit === false ? "selected" : ""} onClick={() => setFormData({ ...formData, siteVisit: false })}>
                                No
                            </button>
                        </div>
                    </div>
                </div>

                <div className="form-group description">
                    <label>Tell Us About Your Project *</label>
                    <textarea
                        name="projectDescription"
                        value={formData.projectDescription}
                        onChange={handleChange}
                        required
                        minLength={15}
                        maxLength={1500}
                        rows="6"
                        placeholder="Describe your project, requirements, approximate size, construction stage, design requirements, or anything else our team should know..."
                    />
                    <div className="textarea-info">
                        <span>Minimum 15 characters</span>
                        <span>{formData.projectDescription.length}/1500</span>
                    </div>
                </div>

                <label className="urgent-option">
                    <input type="checkbox" name="urgent" checked={formData.urgent} onChange={handleChange} />
                    <span>
                        <strong>I need this service urgently</strong>
                        <small>Let our team know if you need faster assistance than your selected schedule.</small>
                    </span>
                </label>
            </section>

            <button type="submit" className="submit-button" disabled={loading}>
                {loading ? "Submitting..." : "Submit Booking →"}
            </button>

            <p className="form-footer">
                Our team will review your request and contact you to confirm the service details and schedule.
            </p>

            {/* OVERLAY COMPONENT - Placed here so it covers the screen */}
            {verifying && (
                <OtpVerify 
                    bookingId={bookingId} 
                    phone={formData.phone} 
                    onSuccess={handleVerifySuccess} 
                    onBack={() => setVerifying(false)} 
                />
            )}

        </form>
    );
};

export default Form;