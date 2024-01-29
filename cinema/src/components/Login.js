import React, { useContext } from "react";
import { useState } from "react";
import './css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import burningHospital from './images/burning-hospital.png';
import UserContext from "./context/UserContext";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { setUserData } = useContext(UserContext);

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    async function handleSubmit(e) {
      e.preventDefault();
      setLoading(true);
      try {
        const loginUser = formData;
        const loginRes = await axios.post("http://localhost:4000/api/users/login", loginUser);
        setUserData({
          token: loginRes.data.token,
          user: loginRes.data.user,
        });
        console.log(loginRes.data.token);
        localStorage.setItem("auth-token", loginRes.data.token);
        const test = localStorage.getItem("auth-token");
        console.log(test);
        //setLoading(false);
        navigate('/');
      } catch (err) {
        setLoading(false);
        err.response.data.msg && setError(err.response.data.msg);
        alert(err.response.data.msg);
      }
 
    };
    return (
    <div class = "background">
          <div class="outer">
            <div class="logo">
                <img src={burningHospital} alt="Burning Hospital" width='130px'/>
                <h1 class="logo"><span style={{ color: '#FF6056' }}>HOT</span>SPITALS</h1>
            </div>
          </div>
          <hr></hr>
          <h2 class="register">Login</h2>
        <div className="center">
        <div class="formcontainer">
          <form onSubmit={handleSubmit} className ="forms">
            <label class="forms-label">
              Email
              <input class="forms-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label class="forms-label">
              Password
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                class="forms-input"
              />
            </label>
            <br />
            <button type="submit" className="register-button">Login</button>
          </form>
      </div>
      </div>
    </div>
    )
  }

  export default Login;