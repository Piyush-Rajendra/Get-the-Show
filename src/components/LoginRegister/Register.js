import React from "react";
import { useState, useContext } from "react";
import './../css/LoginRegister/Register.css';

const Register = () => {
 return (
  <div className="centerFormRegister">  
    <div className="containerForm">
      <form className="bodyRegisterForm">
      <div>
      <div className="columnForm">
        <h2>User Information</h2>
        <div className="form-group">
          <label>Username: </label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Email: </label>
          <input type="email" />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input type="password" />
        </div>
        <div className="form-group">
          <label>Confirm Password: </label>
          <input type="password" />
        </div>
        <div className="form-group">
          <label>Phone Number: </label>
          <input type="tel" />
        </div>
      </div>

    <div className="columnForm">
      <div className="form-group">      
        <h2>Payment Information</h2>      
          <label>Card Type: </label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Card Number: </label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Expiration Date: </label>
          <input type="text" />
        </div>
    </div>

    </div>
    
    <div>
      <div className="columnForm">
        <h2>Home Address</h2>
        <div className="form-group">
          <label>Street: </label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>City: </label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>State: </label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Zip Code: </label>
          <input type="text" />
        </div>
      </div>

      <div className="columnForm">
        <h2>Billing Address</h2>
        <div className="form-group">
          <label>Street: </label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>City: </label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>State: </label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Zip Code: </label>
          <input type="text" />
        </div>
      </div>
      <button>Register!</button>
      
      </div>
      </form>
      </div>
  </div>
  );
}

export default Register;