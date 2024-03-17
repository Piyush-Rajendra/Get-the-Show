import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';




const Logout = props => {
    const [token, setToken] = useState();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            setToken(localStorage.getItem("token"));
        }
    }, []);

    return (    
      <div>
        <h3>You have been succesfully logged out.</h3>
        <Link to='/'>
        <h3>Click here to return to home</h3>
        </Link>
      </div>
    )
}

export default Logout; 