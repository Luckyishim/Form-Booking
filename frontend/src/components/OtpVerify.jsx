import { useState } from "react";
import "../styles/OtpVerify.css";

const OtpVerify = ({ bookingId, phone, onSuccess, onBack }) => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${bookingId}/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ otp })
            });
            const data = await response.json();

            if (response.ok) {
                onSuccess(bookingId);
            } else {
                setMessage({ type: "error", text: data.message });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Server error during verification." , error});
        }
        setLoading(false);
    };

    return (
        <div className="modal-overlay">
            <div className="otp-modal">
                <h2>Verify Your Number</h2>
                <p>
                    Enter the 6-digit code sent to <strong>{phone}</strong>
                </p>

                {message.text && (
                    <div className={`otp-message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleVerify}>
                    <input
                        type="text"
                        className="otp-input"
                        placeholder="000000"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        maxLength={6}
                        required
                    />
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? "Verifying..." : "Verify & Confirm Booking →"}
                    </button>
                </form>

                <button type="button" onClick={onBack} className="back-button">
                    Go back and edit form
                </button>
            </div>
        </div>
    );
};

export default OtpVerify;