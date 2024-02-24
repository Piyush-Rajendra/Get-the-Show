import React, { useContext } from "react";
import { useState } from "react";
import './../css/LoginRegister/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    return (
    <div class = "background">
          <hr></hr>
          <h2 class="register">Login</h2>
        <div className="center">
        <div class="formcontainer">
          <form className ="forms">
            <label class="forms-label">
              Email
            </label>
              <input class="forms-input"
                type="email"
                name="email"
                value={formData.email}
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

  export default Login;