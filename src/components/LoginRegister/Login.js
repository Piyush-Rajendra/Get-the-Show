import React, { useContext } from "react";
import { useState } from "react";
import './../css/LoginRegister/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import UserContext from "../context/UserContext";

const Login = () => {
    const [formData, setFormData] = useState({
      usernameOrEmail: '',
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
      const response = await axios.post('http://localhost:3000/signin', formData);
      const token = response.data.token;
      const username = response.data.user.username; 
      localStorage.setItem('token', token);
      localStorage.setItem('username', username)
      setUserData(prevUserData => ({
        ...prevUserData,
        username: username,
        token: token,
      }));
      navigate("/", { state: { props: true } });
    } catch (error) {
      alert('Login Failed: ' + error.response.data.error);
    }
  };

    return (
    <div class = "background">
          <Link to="/">
            <button className="backButtonRegisterPage">Back</button>
          </Link>
          <hr></hr>
          <h2 class="register">Login</h2>
        <div className="center">
        <div class="formcontainer">
          <form className ="forms" onSubmit={handleSubmit}>
            <label class="forms-label">
              Email/Username
            </label>
              <input class="forms-input"
                type="text"
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
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
              <Link to='/adminlogin'><button class="signUp-ButtonLogin">Admin?</button></Link>
            </div>
            <button type="submit" className="register-button">Login</button>            
          </form>
      </div>
      </div>
    </div>
    )
  }

  export default Login;