import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import Header from "../Header";
import Footer from "../Footer";

const ContactUs = () => {
  // State hooks for form fields and feedback
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    const payload = {
      name,
      mobile_number: mobileNumber,
      query,
    };

    try {
      // Post the payload to your Node.js API endpoint
      const response = await axios.post("http://localhost:4000/api/queries/add", payload);
      setResponseMessage(response.data.message || "Message sent successfully!");
      // Clear form fields after success
      setName("");
      setMobileNumber("");
      setQuery("");
    } catch (error) {
      console.error("Error sending query:", error);
      setResponseMessage("Failed to send message, please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <div
        className="contact-container"
        style={{ backgroundImage: 'url("./images/background-image.png")' }}
      >
        <div className="contact-box">
          <h2 className="contact-title">Contact Us</h2>
          <div className="contact-grid">
            {/* Contact Form */}
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                className="contact-input"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                className="contact-input"
                required
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <textarea
                rows="5"
                placeholder="Your Message"
                className="contact-textarea"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              ></textarea>
              <button type="submit" className="contact-button" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
              {responseMessage && (
                <p style={{ fontSize: '15px', color: 'green' }}>**{responseMessage}</p>
              )}
            </form>
            {/* Contact Details */}
            <div className="contact-details">
              <div className="contact-item">
                <p>
                  <strong>Email:</strong> contact@yatrayaan.com
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <strong>Phone:</strong> +91 8639357910
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <strong>Address:</strong> NIT Srinagar, Srinagar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
