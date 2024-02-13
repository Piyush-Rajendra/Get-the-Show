import React from "react";
import './../css/LoginRegister/Register.css';
import {useState } from 'react';

//import UserContext from "./context/UserContext";

const Forgot = () => {

   const [displayText, setDisplayText] = useState('Please enter your email and we will send a password change.');

    const handleClick = () => {
        setDisplayText('Thank you! The email should be send to your inbox!');
    };

    return (
    <div class = "background">
          <hr></hr>
          <h2 class="register">Forgot Password</h2>
        <div className="center">
        <div class="formcontainer">
          <form className ="forms">
          <h3>{displayText}</h3>
            <label class="forms-label">
              Email
              <input class="forms-input"
                type="email"
                name="email"
                required
              />
            </label>
            <br />
            <button onClick={handleClick} className="register-button">Confirm</button>
          </form>
      </div>
      </div>
    </div>
    )
  }

  export default Forgot;