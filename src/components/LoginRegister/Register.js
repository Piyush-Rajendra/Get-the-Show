import React from "react";
import {useState, useContext } from "react";
import './../css/LoginRegister/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import axios from "axios";
const Register = () => {
  const handleCheck = (event) => {
    formData.registerForPromotion = event.target.checked;
    console.log(formData.registerForPromotion);

  }
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    profilePhoto: '',
    email: '',
    age: '18',
    street: '',
    city: '',
    registerForPromotion: 'false',
    zipCode: '',
    state: '',
    phoneNumber: ''
  });

  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    const hasCapitalLetter = /[A-Z]/.test(value);
    setIsValid(regex.test(value) && hasCapitalLetter);

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
    const response = await axios.post("http://localhost:3000/signup", formData);
    setFormData({
      fullName: '',
      username: '',
      password: '',
      confirmPassword: '',
      profilePhoto: '',
      email: '',
      age: '18',
      street: '',
      city: '',
      registerForPromotion: 'false',
      zipCode: '',
      state: '',
      phoneNumber: ''
    });
    newLocation("/registerContinued", { state: { email: formData.email } })
    } catch(error) {
      console.error('Registering failed', error.response.data.error);
      // alert('Error while registering');
      alert(error.response.data.error)
    }
  
  };
 return (
  <div className="centerFormRegister">  
    <div className="containerForm">
    <h2 class="register">Register</h2>
      <form className="bodyRegisterForm" onSubmit={handleSubmit}>
      <div>
        <h2>User Information</h2>
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
        </div>
      {/* <div className="form-group">       */}
        {/* <h2>Payment Information</h2>      
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
 </div>    */} 
        <div className="form-group">    
          <label for="registerForPromotion">Register for promotions:</label> 
          <input type="checkbox" id="registerForPromotion" name="registerForPromotion" onChange={handleCheck}></input> 
          <button className="registerButtonRegister" type="submit">Continue</button>
        </div>          
    </div>
    
    <div>
        <h2>Home Address</h2>
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
        {/* <h2>Billing Address</h2>
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
        </div> */}
        {/* <div className="form-group">
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
        <div className="fillInSpaceRegister"></div>
      </div> 
      </form>
      </div>
  </div>
  );
}

export default Register;