import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import '../css/Logout/Logout.css';






const Logout = props => {
    const [token, setToken] = useState();
    const { userData, setUserData } = useContext(UserContext);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const admin = localStorage.getItem("isAdmin")
        
        //localStorage.removeItem("isAdmin");
        if (token || admin) {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.setItem('isAdmin', 'notAdmin');
            localStorage.removeItem("isAdmin");
            setToken(localStorage.getItem("token"));
            setUserData(prevUserData => ({
                ...prevUserData,
                username: undefined,
                token: undefined,
                isAdmin: false,
              }));
        }
    }, []);

    return (    
      <div id="logout-page">
        <h3 id="success-logout">You have been succesfully logged out.</h3>
        <Link to='/'>
        <h3 id="click-here">Click here to return to home</h3>
        </Link>
      </div>
    )
}

export default Logout; 