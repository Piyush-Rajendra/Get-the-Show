import React, { useContext } from "react";
import { useState } from "react";
import './../css/LoginRegister/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import UserContext from "../context/UserContext";

const AdminLogIn = () => {
    const [formData, setFormData] = useState({
      username: '',
      password: '',
    });


    const { userData, setUserData } = useContext(UserContext);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData);
      const response = await axios.post('http://localhost:3000/admin/signin', formData);
      const token = response.data.token;
      const user = response.data.user.username; 
      localStorage.setItem('token', token);
      localStorage.setItem('username', user)
      localStorage.setItem('isAdmin', 'admin')
      setUserData(prevUserData => ({
        ...prevUserData,
        username: user,
        token: token,
        isAdmin: true,
      }));
      /*setUserData(prevUserData => ({
        ...prevUserData,
        isAdmin: true,
      }));*/
      //console.log(username);
      
      navigate("/", { state: { props: true } });
    } catch (error) {
      console.error('Login failed', error);
      alert('Username/Email or password is not correct');
    }
  };

    return (
    <div class = "background">
          <hr></hr>
          <h2 class="register">Admin Login</h2>
        <div className="center">
        <div class="formcontainer">
          <form className ="forms" onSubmit={handleSubmit}>
            <label class="forms-label">
              Username
            </label>
              <input class="forms-input"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />            
            <br/>
            <label class="forms-label">
              Password
            </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                class="forms-input"
              />      
            <div className="forgot-register-Buttons">
              <Link to='/forgotPage'><button class="forgot-Button">Forgot Password?</button></Link>
              <Link to='/registerPage'><button class="signUp-ButtonLogin">SignUp</button></Link>
            </div>
            <button type="submit" className="register-button">Login</button>            
          </form>
      </div>
      </div>
    </div>
    )
  }

  export default AdminLogIn;