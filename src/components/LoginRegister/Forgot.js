import React from "react";
import './../css/LoginRegister/Register.css';
import {useState } from 'react';


const Forgot = () => {
  const [displayText, setDisplayText] = useState(
    "Please enter your email and we will send a password change."
  );
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleClick = (e) => {
    e.preventDefault();

    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Email is valid, update displayText
    setDisplayText("Thank you! The email should be send to your inbox!");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  return (
    <div className="background">
      <hr></hr>
      <h2 className="register">Forgot Password</h2>
      <div className="center">
        <div className="formcontainer">
          <form className="forms">
            <h3>{displayText}</h3>
            <label className="forms-label">
              Email
              <input
                className="forms-input"
                type="email"
                name="email"
                required
                value={email}
                onChange={handleEmailChange}
              />
            </label>
            <br />
            <span className="error-message">{emailError}</span>
            <button onClick={handleClick} className="register-button">
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;