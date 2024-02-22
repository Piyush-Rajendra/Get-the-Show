import React from "react";
import { useState, useContext } from "react";
import './../css/LoginRegister/Register.css';

const Register = () => {
 return (
  <div className="centerFormRegister">  
    <div className="containerForm">
      <form className="bodyRegisterForm">
      <div>
        <h2>User Information</h2>
        <div className="form-group">
          <label>Username: </label>
          <input class="forms-inputRegister" type="text" />
        </div>
        <div className="form-group">
          <label>Email: </label>
          <input class="forms-inputRegister" type="email" />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input class="forms-inputRegister" type="password" />
        </div>
        <div className="form-group">
          <label>Confirm Password: </label>
          <input class="forms-inputRegister" type="password" />
        </div>
        <div className="form-group">
          <label>Phone Number: </label>
          <input class="forms-inputRegister" type="tel" />
        </div>
      <div className="form-group">      
        <h2>Payment Information</h2>      
          <label>Card Type: </label>
          <input class="forms-inputRegister" type="text" />
        </div>
        <div className="form-group">
          <label>Card Number: </label>
          <input class="forms-inputRegister" type="text" />
        </div>
        <div className="form-group">
          <label>Expiration Date: </label>
          <input class="forms-inputRegister" type="text" />
        </div>
        <div className="form-group">        
          <button class="registerButtonRegister">Register!</button>
        </div>        
    </div>
    
    
    <div>
        <h2>Home Address</h2>
        <div className="form-group">
          <label>Street: </label>
          <input class="forms-inputRegister" type="text" />
        </div>
        <div className="form-group">
          <label>City: </label>
          <input class="forms-inputRegister" type="text" />
        </div>
        <div className="form-group">
          <label>State: </label>
          <input class="forms-inputRegister" type="text" />
        </div>
        <div className="form-group">
          <label>Zip Code: </label>
          <input class="forms-inputRegister" type="text" />
        </div>

        <h2>Billing Address</h2>
        <div className="form-group">
          <label>Street: </label>
          <input class="forms-inputRegister" type="text" />
        </div>
        <div className="form-group">
          <label>City: </label>
          <input class="forms-inputRegister" type="text" />
        </div>
        <div className="form-group">
          <label>State: </label>
          <input class="forms-inputRegister" type="text" />
        </div>
        <div className="form-group">
          <label>Zip Code: </label>
          <input class="forms-inputRegister" type="text" />
        </div>
        <div className="fillInSpaceRegister"></div>
        
      </div>
      </form>
      </div>
  </div>
  );
}

export default Register;