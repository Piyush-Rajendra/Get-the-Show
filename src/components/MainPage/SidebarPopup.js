import '../css/HomePage/SidebarPopup.css';
import { Link } from 'react-router-dom';
import BlankProfile from './blankProfile.png';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

const SidebarPopup = ({ isOpen, onClose }) => {
  const username = localStorage.getItem('username');
  const [base64String, setBase64String] = useState('');
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${username}`);
        setBase64String(response.data.profilePhoto);
      } catch (error) {
        alert("Cannot get profile picture!");
      }
    };
    fetchUserInfo();
  }, [username]);
  
  return (
    <div className={`sidebar-popup ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-popup-close">
        <button className="close-btn-SideProfile" onClick={onClose}>Close</button>
      </div>
      <div className="sidebar-popup-content">
        <div>
          {base64String ? (
            <img className="imgProfileSideBar" src={base64String} alt="Base64 Image" />
          ) : (
            <p>No valid base64 string provided</p>
          )}
        </div>
        <Link to='/Profile'><button className="close-btn-SideProfile">Profile</button></Link>
      </div>
    </div>
  );
};

export default SidebarPopup;