import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import signupImg from "../public/vector1.png";
import Icon from "../public/Icon.png";
import "../styles/App.scss";
import CryptoJS from "crypto-js";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    dob: "",
    terms: false,
    privacy: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // First Name & Last Name
    if (!formData.firstName.trim()) return setError("Enter first name");
    if (!formData.lastName.trim()) return setError("Enter last name");

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) return setError("Enter email");
    if (!emailRegex.test(formData.email))
      return setError("Enter a valid email address");

    // Mobile
    const mobileRegex = /^[0-9]{10}$/;
    if (!formData.mobile) return setError("Enter mobile number");
    if (!mobileRegex.test(formData.mobile))
      return setError("Mobile number must be 10 digits");

    // Password
    if (!formData.password) return setError("Enter password");
    if (formData.password.length < 6)
      return setError("Password must be at least 6 characters");

    // Date of Birth
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!formData.dob) return setError("Enter date of birth");
    if (!dobRegex.test(formData.dob))
      return setError("Date of Birth must be in YYYY-MM-DD format");

    // Terms & Privacy
    if (!formData.terms || !formData.privacy)
      return setError("You must agree to Terms and Privacy Policy");

    setLoading(true);

    // Encrypt password
    const encryptedPassword = CryptoJS.SHA256(formData.password).toString();

    // Prepare API data
    const payload = {
      firstname: formData.firstName,
      lastname: formData.lastName,
      email: formData.email,
      encryptpassword: encryptedPassword,
      mobile: formData.mobile,
      dob: formData.dob,
    };

    try {
      const res = await fetch("https://atologistinfotech.com/api/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success !== false) {
        alert(data.message || "Signup successful!");
        window.location.href = "/login";
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="left">
        <div className="box">
          <h2>Welcome To Atologist Infotech</h2>
          <p className="Create-Label">Create your account</p>

          <button className="gbtn">
            <FcGoogle size={18} />
          </button>

          <p style={{ margin: "10px 0", fontWeight: "bold" }}>OR</p>

          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit} className="form">
            <div className="name-row">
              <div className="firstname">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div className="lastname">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  onChange={handleChange}
                  className="input"
                />
              </div>
            </div>

            <div className="email">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="mobile">
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobile"
                placeholder="Enter your mobile number"
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="password">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="dob">
              <label>Date of Birth</label>
              <input
                type="text"
                name="dob"
                placeholder="Enter your date of birth"
                onChange={handleChange}
                className="input"
              />
            </div>

            <label className="checks-label">I agree to</label>
            <div className="checks">
              <label>
                <input
                  type="checkbox"
                  name="terms"
                  onChange={handleChange}
                />{" "}
                Terms of Service
              </label>
              <label>
                <input
                  type="checkbox"
                  name="privacy"
                  onChange={handleChange}
                />{" "}
                Privacy Policy
              </label>
            </div>

            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>

      <div className="right">
        <img src={signupImg} alt="signup" style={{ width: "80%" }} />
      </div>
      <button className="msg-btn">
        <img src={Icon} alt="Message" className="msg-icon" />
      </button>
    </div>
  );
}
