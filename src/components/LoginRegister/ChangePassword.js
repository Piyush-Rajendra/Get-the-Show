import React, { useContext } from "react";
import { useState } from "react";
import './../css/LoginRegister/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const UpdatePassword = () => {
  const [displayText, setDisplayText] = useState(
    "Please enter your current and new password"
  );
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");


    const handleEmailChange = (e) => {
      setEmail(e.target.value);
      setEmailError("");
    };

    const handlePasswordChange = (e) => {
      setNewPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
    }
    const handleCurrentPasswordChange = (e) => {
      setCurrentPassword(e.target.value);
    }
  

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    // const handleChange = (e) => {
    //   setFormData({
    //     ...formData,
    //     [e.target.name]: e.target.value
    //   });
    // };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (confirmPassword !== newPassword) {
        alert('Passwords do not match!');
        return;
      }
      const formData = {
        usernameOrEmail: email,
        password: currentPassword
      }
      const response = await axios.get('http://localhost:3000/users', email);
      const token = response.data.token;
      console.log(formData);
      const log = await axios.post('http://localhost:3000/signin', formData)
      console.log(log.data.token);
      const resetData = {
        email: email,
        newPassword: newPassword
      }
      console.log(resetData);
      const resetResponse = await axios.post('http://localhost:3000/reset-password', resetData);
      setDisplayText('Password Updated!')
      setEmail('');
      setConfirmPassword('');
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      console.error('Reset failed', error);
      alert('Email or current password is not correct');
    }
  };

    return (
    <div class = "background">
          <hr></hr>
          <h2 class="register">Reset Password</h2>
        <div className="center">
        <div class="formcontainer">
          <form className ="forms-reset" onSubmit={handleSubmit}>
            <h3 style={{ textAlign: 'center' }}>{displayText}</h3>
            <label class="forms-label">
              Email
            </label>
              <input class="forms-input"
                type="email"
                // name="usernameOrEmail"
                // value={formData.usernameOrEmail}
                // onChange={handleChange}
                name="usernameOrEmail"
                value={email}
                onChange={handleEmailChange}
                required
              /> 
            <label class="forms-label-reset">
              Current Password
            </label>
              <input class="forms-input"
                type="password"
                // name="password"
                // value={formData.password}
                // onChange={handleChange}
                name="password"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
                required
              />            
            <br/>
            <label class="forms-label">
              New Password
            </label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={handlePasswordChange}
                required
                class="forms-input"
              />     
              <br/>
            <label class="forms-label">
              Confirm Password
            </label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                class="forms-input"
              />      
            <button type="submit" className="reset-button">Update Password</button>            
          </form>
      </div>
      </div>
    </div>
    )
  }

  export default UpdatePassword;