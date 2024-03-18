import React from "react";
import {useState, useContext } from "react";
import './../css/LoginRegister/Register.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import axios from "axios";

const Register = () => {
    const location = useLocation();
    const holder = location.state || {};
  const [formData, setFormData] = useState({
    cardType: '',
    cardNumber: '',
    cardPIN: '',
    expirationDate: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

   const [passwordsMatch, setPasswordsMatch] = useState(true);
   const newLocation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your registration logic here
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      setPasswordsMatch(false);
      return;
    } 
    setPasswordsMatch(true);
    console.log(formData);
    // Reset form data
    

    try {
        if (formData.cardType !== '') {
        console.log(holder.email);
         const userID = await axios.get(`http://localhost:3000/users/${holder.email}`);

         console.log(formData);
         const submit = await axios.post(`http://localhost:3000/users/${userID.data.id}/payment`, formData);
        }
    setFormData({
        cardType: '',
        cardNumber: '',
        cardPIN: '',
        expirationDate: '',
        billingAddress: '',
        city: '',
        state: '',
        zipCode: '',
    });
    newLocation("/confirmationPage")
    } catch(error) {

    }
  };
 return (
  <div className="centerFormRegister">  
    <div className="containerForm">
    <h2 class="register">Register: Optional</h2>
      <form className="bodyRegisterContinuedForm" onSubmit={handleSubmit}>
      <div>
        {/* <h2>User Information</h2>
        <div className="form-group">
          <label>Username: </label>
          <input className="forms-inputRegister"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
        </div>
        <div className="form-group">
          <label>Email: </label>
          <input className="forms-inputRegister"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input className="forms-inputRegister"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
        </div>
        <div className="form-group">
          <label>Confirm Password: </label>
          <input className="forms-inputRegister"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
        </div>
        <div className="form-group">
          <label>Phone Number: </label>
          <input className="forms-inputRegister"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
        </div> */}
        
      <div className="form-group">      
        <h2>Payment Information</h2>      
          <label>Card Type: </label>
          <input className="forms-inputRegister"
              type="text"
              name="cardType"
              value={formData.cardType}
              onChange={handleChange}
            />
        </div>
        <div className="form-group">
          <label>Card Number: </label>
          <input className="forms-inputRegister"
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
            />
        </div>
        <div className="form-group">
          <label>Expiration Date: </label>
          <input className="forms-inputRegister"
              type="text"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
            />
            
        </div>  
        <div className="form-group">
          <label>Card Pin: </label>
          <input className="forms-inputRegister"
              type="text"
              name="cardPIN"
              value={formData.cardPIN}
              onChange={handleChange}
            />
            
        </div> 
         
        {/* <div className="form-group">  
          <button className="registerButtonRegisterContinued" type="submit">Register!</button>
        </div>          */}
        
      <div className="form-group">  
          <button className="registerButtonRegisterContinued" type="submit">Register!</button>
        </div>  
    </div>
    
    
    <div>
        {/* <h2>Home Address</h2>
        <div className="form-group">
          <label>Street: </label>
          <input className="forms-inputRegister"
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
            />
        </div>
        <div className="form-group">
          <label>City: </label>
          <input className="forms-inputRegister"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
        </div>
        <div className="form-group">
          <label>State: </label>
          <input className="forms-inputRegister"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
        </div>
        <div className="form-group">
          <label>Zip Code: </label>
          <input className="forms-inputRegister"
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
            />
        </div> */}
        <h2>Billing Address</h2>
        <div className="form-group">
          <label>Street: </label>
          <input className="forms-inputRegister"
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
            />
        </div>
        <div className="form-group">
          <label>City: </label>
          <input className="forms-inputRegister"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
        </div>
        <div className="form-group">
          <label>State: </label>
          <input className="forms-inputRegister"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
        </div>
        <div className="form-group">
          <label>Zip Code: </label>
          <input className="forms-inputRegister"
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
            />
        </div>
        <div className="form-group">
          <label>Billing Address: </label>
          <input className="forms-inputRegister"
              type="text"
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleChange}
            />
        </div>
        <div className="fillInSpaceRegister"></div>
      </div> 
      </form>
      
      </div>  
  </div>
  );
}

export default Register;