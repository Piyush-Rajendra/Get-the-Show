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
  if (name === 'phoneNumber' && !/^\d*$/.test(value)) {
    return;
  }
  if (name === 'zipCode' && !/^\d{0,5}$/.test(value)) {
    return; 
  }
  if (name === 'cardPIN' && !/^\d{0,3}$/.test(value)) {
    return;
  }
  setFormData({
    ...formData,
    [name]: value
  });
};

const [passwordsMatch, setPasswordsMatch] = useState(true);
const newLocation = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  if (formData.password !== formData.confirmPassword) {
    alert('Passwords do not match');
    setPasswordsMatch(false);
    return;
  }
  setPasswordsMatch(true);

  try {
    const isPaymentInfoFilled =
      formData.cardType !== '' &&
      formData.cardNumber !== '' &&
      formData.cardPIN !== '' &&
      formData.expirationDate !== '';
    const isBillingAddressFilled =
      formData.street !== '' &&
      formData.city !== '' &&
      formData.state !== '' &&
      formData.zipCode !== '' &&
      formData.billingAddress !== '';
    if ((isPaymentInfoFilled || !isBillingAddressFilled) || (!isBillingAddressFilled || isPaymentInfoFilled)) {
      alert('Please fill out all payment information fields or none at all');
      return;
    }
    if (formData.cardType !== '') {
      const username = localStorage.getItem('username');
      const userID = await axios.get(`http://localhost:3000/user/${username}`);
      console.log(userID);
      console.log(userID.data);
      await axios.post(`http://localhost:3000/billing-address/${userID.data.id}/payment`, formData);

      await axios.post(`http://localhost:3000/user/${userID.data.id}/payment`,formData)
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
  } catch (error) {
    alert(error.response.data.error)
  }
};

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return ''; 
  }
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  const year = utcDate.getFullYear();
  let month = utcDate.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = utcDate.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
}

 return (
  <div className="centerFormRegister">  
    <div className="containerForm">
    <h2 class="register">Register: Optional</h2>
      <form className="bodyRegisterContinuedForm" onSubmit={handleSubmit}>
      <div>
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
          <label>Phone Number: </label>
          <input
            className="forms-inputRegister"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            maxLength="10"
            minLength="10"
          />
        </div>
        <div className="form-group">
          <label>Expiration Date: </label>
          <input
            className="forms-inputRegister"
            type="date"
            name="expirationDate"
            value={formatDate(formData.expirationDate)}
            onChange={handleChange}
            min={formatDate(new Date().toISOString().split('T')[0])} // Set the min attribute to the current date
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
      <div className="form-group">  
          <button className="registerButtonRegisterContinued" type="submit">Continue!</button>
        </div>  
    </div>
    <div>
        <h2>Billing Address</h2>
        <div className="form-group">
          <label>Billing Address: </label>
          <input className="forms-inputRegister"
              type="text"
              name="billingAddress"
              value={formData.billingAddress}
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
          <input
            className="forms-inputRegister"
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            maxLength="5"
            minLength="5"
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