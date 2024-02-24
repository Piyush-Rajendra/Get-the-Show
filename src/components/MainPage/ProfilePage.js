import React from 'react';
import '../css/HomePage/ProfilePage.css';
import blankProfile from './blankProfile.png';
import {useState} from 'react';
import {Link} from 'react-router-dom'

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('user');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="profile-container">
      <Link to='/HomePage'><button className='backButtonProfilePage'>Back</button></Link>
      <div>
        <img className="imgProfilePage" src={blankProfile} alt="profile pircutre"/>
      </div>
      <div>
        <h1> Welcome, User!</h1>
      </div>
      <div className="tabsProfilePage">
        <button className={activeTab === 'user' ? 'active' : ''} onClick={() => handleTabClick('user')}>
          User Information
        </button>
        <button className={activeTab === 'payment' ? 'active' : ''} onClick={() => handleTabClick('payment')}>
          Payment Information
        </button>
        <button className={activeTab === 'home' ? 'active' : ''} onClick={() => handleTabClick('home')}>
          Home Address
        </button>
        <button className={activeTab === 'billing' ? 'active' : ''} onClick={() => handleTabClick('billing')}>
          Billing Address
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'user' && (
          <div >
            <input className="inputProfilePage" type="text" placeholder="Username" />
            <input className="inputProfilePage" type="password" placeholder="Password" />
            <input className="inputProfilePage" type="tel" placeholder="Phone Number" />
            <button className='editButtonProfilePage'>Edit</button>
          </div>
        )}
        {activeTab === 'payment' && (
          <div>
            <input className="inputProfilePage" type="text" placeholder="Card Type" />
            <input className="inputProfilePage" type="text" placeholder="Card Number" />
            <input className="inputProfilePage" type="date" placeholder="Expiration Date" />
            <button className='editButtonProfilePage'>Edit</button>
          </div>
        )}
        {activeTab === 'home' && (
          <div>
            <input className="inputProfilePage" type="text" placeholder="Street" />
            <input className="inputProfilePage" type="text" placeholder="City" />
            <input className="inputProfilePage" type="text" placeholder="State" />
            <input className="inputProfilePage" type="number" placeholder="Zip Code" />
            <button className='editButtonProfilePage'>Edit</button>
          </div>
        )}
        {activeTab === 'billing' && (
          <div>
            <input className="inputProfilePage" type="text" placeholder="Street" />
            <input className="inputProfilePage" type="text" placeholder="City" />
            <input className="inputProfilePage" type="text" placeholder="State" />
            <input className="inputProfilePage" type="number" placeholder="Zip Code" />
            <button className='editButtonProfilePage'>Edit</button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProfilePage;