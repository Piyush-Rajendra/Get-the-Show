import React from 'react';
import '../css/HomePage/SidebarPopup.css';
import { Link } from 'react-router-dom';

const SidebarPopup = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar-popup ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-popup-close">
        <button className="close-btn-SideProfile" onClick={onClose}>Close</button>
      </div>
      <div className="sidebar-popup-content">
        <Link to='/Profile'><button className="close-btn-SideProfile">Profile</button></Link>
      </div>
    </div>
  );
};

export default SidebarPopup;