import React, { useContext } from "react";
import { useState } from "react";
import './../css/LoginRegister/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const AddAdmin = () => {
  const [displayText, setDisplayText] = useState(
    "Please enter the admin's new username and password"
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

      const resetData = {
        username: email,
        password: newPassword
      }
      const resetResponse = await axios.post('http://localhost:3000/admin/addAdmin', resetData);
      setDisplayText('Admin Created!');
      setEmail('');
      setConfirmPassword('');
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      alert('Username or Password is not valid');
    }
  };

    return (
    <div class = "background">
          <hr></hr>
        <div>
          <Link to="/ManageUser">
            <button className="backButtonForgotEditAddAdmin">Back</button>
          </Link>   
          <h2 class="register">Add Admin</h2>
        </div>
        <div className="center">
        <div class="formcontainer">
          <form className ="forms-reset" onSubmit={handleSubmit}>
            <h3 style={{ textAlign: 'center' }}>{displayText}</h3>
            <label class="forms-label">
              Username
            </label>
              <input class="forms-input"
                type="text"
                name="usernameOrEmail"
                value={email}
                onChange={handleEmailChange}
                required
              /> 
            <br/>
            <label class="forms-label">
              Password
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
            <button type="submit" className="reset-button">Register</button>            
          </form>
      </div>
      </div>
    </div>
    )
  }

  export default AddAdmin;