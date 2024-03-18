 import React from 'react';
import '../css/HomePage/ProfilePage.css';
import blankProfile from './blankProfile.png';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


const ProfilePage = ({ props }) => {
  const username = localStorage.getItem('username');
  const [activeTab, setActiveTab] = useState('user');
  const [userInfo, setUserInfo] = useState({
    id: '',
    username: '',
    password: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    fullName: '',
    registerForPromotions: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardType: '',
    cardNumberHash: '',
    cardPINHash: '',
    expirationDate:'',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [myValue, setMyValue] = useState(true);

  const [paymentInfoForms, setPaymentInfoForms] = useState([
    { cardType: '', cardNumberHash: '', cardPINHash: '', expirationDate: '', billingAddress: '', city: '', state: '', zipCode: '' }
  ]);

  const addPaymentInfoForm = () => {
    setPaymentInfoForms([...paymentInfoForms, { cardType: '', cardNumberHash: '', cardPINHash: '', expirationDate: '', billingAddress: '', city: '', state: '', zipCode: '' }]);
  };

  const handlePaymentInfoChange = (index, field, value) => {
    const updatedForms = [...paymentInfoForms];
    updatedForms[index][field] = value;
    setPaymentInfoForms(updatedForms);
  };

  const removePaymentInfoForm = (index) => {
    const updatedForms = [...paymentInfoForms];
    updatedForms.splice(index, 1);
    setPaymentInfoForms(updatedForms);
  };

useEffect(() => {
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user/${username}`);
      setUserInfo(response.data);
      
      const paymentResponse = await axios.get('http://localhost:3000/users/1/payment-info');
      setPaymentInfo(paymentResponse.data.paymentInfo); // Set the paymentInfo state with the fetched data
    } catch (error) {
      console.error('Failed to fetch user information', error);
      // Handle error, e.g., redirect to login page
    }
  };

  fetchUserInfo();
}, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/users/${username}`, {
        fullName: userInfo.fullName,
        username: userInfo.username,
        phone: userInfo.phone,
        city: userInfo.city,
        street: userInfo.street,
        state: userInfo.state,
        zipCode: userInfo.zipCode,
        phoneNumber: userInfo.phoneNumber,
      });
      alert('User information updated!');
    } catch (error) {
      console.error('Failed to update user information', error);
    }
  };

  const handleSubmitPayment = async (e) => {
  e.preventDefault();
  try {
    await axios.put('http://localhost:3000/payment/1', {
      paymentInfo: [
        {
          paymentId: paymentInfo.paymentId,
          cardType: paymentInfo.cardType,
          cardNumberHash: paymentInfo.cardNumberHash,
          cardPINHash: paymentInfo.cardPINHash,
          expirationDate: paymentInfo.expirationDate,
          billingAddress: paymentInfo.billingAddress,
          city: paymentInfo.city,
          state: paymentInfo.state,
          zipCode: paymentInfo.zipCode,
        }
      ]
    });
    alert('Payment information updated!');
  } catch (error) {
    console.error('Failed to update payment information', error);
    alert('Failed to update payment information');
  }
};

  

  return (
    <div className="profile-container">
      <Link to="/" state={{ props: myValue }}>
        <button className="backButtonProfilePage">Back</button>
      </Link>
      <div>
        <img className="imgProfilePage" src={blankProfile} alt="profile pircutre"/>
      </div>
      <div>
        <h1> Welcome, {userInfo && userInfo.fullName}!</h1>
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
          <form onSubmit={handleSubmit}>
            <input className="inputProfilePage" type="text" placeholder="Full Name" 
            value={userInfo && userInfo.fullName}
            onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}/>
            <input className="inputProfilePage" type="text" placeholder="Username" 
            value={userInfo && userInfo.username}
            onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}/>
            <Link to="/forgotPage"><button className="inputProfilePage">Forgot Password?</button></Link>
            <input className="inputProfilePage" type="tel" placeholder="Phone Number" 
            value={userInfo && userInfo.phoneNumber}
            onChange={(e) => setUserInfo({ ...userInfo, phoneNumber: e.target.value })}/>
            <button className='editButtonProfilePage'>Edit</button>
            <label>
            <input
              type="checkbox"
              checked={userInfo.registeredForPromotions}
            />
              Registered for promotions
            </label>
          </form>
        )}
        {activeTab === 'payment' && (
          <div>
            {paymentInfoForms.slice(0, 3).map((paymentInfo, index) => (
              <form key={index} onSubmit={(e) => handleSubmitPayment(e, index)}>
                <input
                  className="inputProfilePage"
                  type="text"
                  placeholder="Card Type"
                  value={paymentInfo.cardType}
                  onChange={(e) => handlePaymentInfoChange(index, 'cardType', e.target.value)}
                />
                <input
                  className="inputProfilePage"
                  type="text"
                  placeholder="Card Number"
                  value={paymentInfo.cardNumberHash}
                  onChange={(e) => handlePaymentInfoChange(index, 'cardNumberHash', e.target.value)}
                />
                <input
                  className="inputProfilePage"
                  type="date"
                  placeholder="Expiration Date"
                  value={paymentInfo.expirationDate}
                  onChange={(e) => handlePaymentInfoChange(index, 'expirationDate', e.target.value)}
                />
                <button className='editButtonProfilePage'>Edit</button>
                <button type="button" className="removeButtonProfilePage" onClick={() => removePaymentInfoForm(index)}>Remove</button>
              </form>
            ))}
            {paymentInfoForms.length < 3 && <button className="editButtonProfilePage" onClick={addPaymentInfoForm}>Add</button>}
          </div>
        )}
        {activeTab === 'home' && (
          <form onSubmit={handleSubmit}>
            <input className="inputProfilePage" type="text" placeholder="Street" 
            value={userInfo && userInfo.street}
            onChange={(e) => setUserInfo({ ...userInfo, street: e.target.value })}/>
            <input className="inputProfilePage" type="text" placeholder="City" 
            value={userInfo && userInfo.city}
            onChange={(e) => setUserInfo({ ...userInfo, city: e.target.value })}/>
            <input className="inputProfilePage" type="text" placeholder="State" 
             value={userInfo && userInfo.state}
            onChange={(e) => setUserInfo({ ...userInfo, state: e.target.value })}/>
            <input className="inputProfilePage" type="number" placeholder="Zip Code" 
             value={userInfo && userInfo.zipCode}
            onChange={(e) => setUserInfo({ ...userInfo, zipCode: e.target.value })}/>
            <button className='editButtonProfilePage'>Edit</button>
          </form>
        )}
        {activeTab === 'billing' && (
          <form onSubmit={handleSubmitPayment}>
            <input
              className="inputProfilePage"
              type="text"
              placeholder="Street"
              value={paymentInfo && paymentInfo.length > 0 ? paymentInfo[0].billingAddress : ''}
              onChange={(e) => setPaymentInfo([{ ...paymentInfo[0], billingAddress: e.target.value }])}
            />
            <input
              className="inputProfilePage"
              type="text"
              placeholder="City"
              value={paymentInfo && paymentInfo.length > 0 ? paymentInfo[0].city : ''}
              onChange={(e) => setPaymentInfo([{ ...paymentInfo[0], city: e.target.value }])}
            />
            <input
              className="inputProfilePage"
              type="text"
              placeholder="State"
              value={paymentInfo && paymentInfo.length > 0 ? paymentInfo[0].state : ''}
              onChange={(e) => setPaymentInfo([{ ...paymentInfo[0], state: e.target.value }])}
            />
            <input
              className="inputProfilePage"
              type="number"
              placeholder="Zip Code"
              value={paymentInfo && paymentInfo.length > 0 ? paymentInfo[0].zipCode : ''}
              onChange={(e) => setPaymentInfo([{ ...paymentInfo[0], zipCode: e.target.value }])}
            />
            <button type="submit" className='editButtonProfilePage'>Edit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;