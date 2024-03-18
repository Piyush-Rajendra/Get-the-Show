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
    username: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    fullName: '',
    registerForPromotions: '',
  });

  const [paymentInfo, setPaymentInfo] = useState([]);

  const [myValue, setMyValue] = useState(true);

 const [paymentInfoForms, setPaymentInfoForms] = useState([
    {
      cardType: '',
      cardNumberHash: '',
      cardPINHash: '',
      expirationDate: '',
      billingAddress: '',
      city: '',
      state: '',
      zipCode: '',
    },
  ]);

const [newPaymentInfo, setNewPaymentInfo] = useState({
  cardType: '',
  cardNumberHash: '',
  cardPINHash: '',
  expirationDate: '',
  billingAddress: '',
  city: '',
  state: '',
  zipCode: ''
});

const handleAddPaymentInfo = () => {
    const newPaymentInfoItem = {
      cardType: '',
      cardNumberHash: '',
      cardPINHash: '',
      expirationDate: '',
      billingAddress: '',
      city: '',
      state: '',
      zipCode: '',
    };
    setNewPaymentInfo([...newPaymentInfo, newPaymentInfoItem]);
};


  function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
  }

useEffect(() => {
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user/${username}`);
      setUserInfo(response.data);
      const userId = response.data.id;

      console.log(response.data);
  
      const paymentResponse = await axios.get(`http://localhost:3000/users/${userId}/payment-info`);
      const last3Payments = paymentResponse.data.paymentInfo.slice(-3);
      setPaymentInfo(last3Payments);

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
    const response = await axios.get(`http://localhost:3000/user/${username}`);
    const userId = response.data.id;
    try {
      await axios.put(`http://localhost:3000/users/${userId}`, {
        fullName: userInfo.fullName,
        username: userInfo.username,
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
    const response = await axios.get(`http://localhost:3000/user/${username}`);
    const userId = response.data.id;
    try {
      const lastPayment = paymentInfo.slice(-1)[0];
      await axios.put(`http://localhost:3000/payment/${userId}`, {
        cardType: lastPayment.cardType,
        cardNumberHash: lastPayment.cardNumberHash,
        cardPINHash: lastPayment.cardPINHash,
        expirationDate: lastPayment.expirationDate,
        billingAddress: lastPayment.billingAddress,
        city: lastPayment.city,
        state: lastPayment.state,
        zipCode: lastPayment.zipCode,
        userId: lastPayment.userId,
      });
      alert('Payment information updated!');
    } catch (error) {
      console.error('Failed to update payment information', error);
      alert('Failed to update payment information');
    }
  };

const handleAddPaymentCard = async (e) => {
  e.preventDefault();
  const response = await axios.get(`http://localhost:3000/user/${username}`);
  const userId = response.data.id;
  try {
    console.log(newPaymentInfo);
    const lastPayment = paymentInfo.slice(-1)[0];
    const response = await axios.post(`http://localhost:3000/users/${userId}/payment`, {
      cardType: newPaymentInfo.cardType,
      cardNumber: newPaymentInfo.cardNumberHash,
      cardPIN: newPaymentInfo.cardPINHash,
      expirationDate: newPaymentInfo.expirationDate,
      billingAddress: lastPayment.billingAddress,
      city: lastPayment.city,
      state: lastPayment.state,
      zipCode: lastPayment.zipCode,
    });
    setPaymentInfo([...paymentInfo, response.data]);
    setNewPaymentInfo({  
      cardType: '',
      cardNumberHash: '',
      cardPINHash: '',
      expirationDate: '',
      billingAddress: '',
      city: '',
      state: '',
      zipCode: '',
    });
    alert('Payment information added successfully!');
    window.location.reload(); // Reload the page
  } catch (error) {
    console.error('Failed to add payment information', error);
    alert('Failed to add payment information');
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
              {paymentInfo.map((payment, index) => (
                <form key={index} onSubmit={handleAddPaymentInfo}>
                  <input
                    className="inputProfilePage"
                    type="text"
                    placeholder="Card Type"
                    value={payment.cardType}
                  />
                  <input
                    className="inputProfilePage"
                    type="text"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                  />
                  <input
                    className="inputProfilePage"
                    type="date"
                    placeholder="Expiration Date"
                    value={formatDate(payment.expirationDate)}
                    onChange={(e) => newPaymentInfo(prevState => {
                      const updatedPaymentInfo = [...prevState];
                      updatedPaymentInfo[index].expirationDate = e.target.value;
                      return updatedPaymentInfo;
                    })}
                  />
                  <button className='editButtonProfilePage' type="submit">Edit</button>
                </form>
              ))}
              {paymentInfo.length < 3 && (
              <div>
                <form onSubmit={handleAddPaymentCard}>
                  <input
                    className="inputProfilePage"
                    type="text"
                    placeholder="Card Type"
                    value={newPaymentInfo.cardType}
                    onChange={(e) => setNewPaymentInfo({ ...newPaymentInfo, cardType: e.target.value })}
                  />
                  <input
                    className="inputProfilePage"
                    type="number"
                    placeholder="Card Number"
                    value={newPaymentInfo.cardNumberHash}
                    onChange={(e) => setNewPaymentInfo({ ...newPaymentInfo, cardNumberHash: e.target.value })}
                  />
                  <input
                    className="inputProfilePage"
                    type="number"
                    placeholder="Card Pin"
                    value={newPaymentInfo.cardPINHash}
                    onChange={(e) => setNewPaymentInfo({ ...newPaymentInfo, cardPINHash: e.target.value })}
                  />
                  <input
                    className="inputProfilePage"
                    type="date"
                    placeholder="Expiration Date"
                    value={newPaymentInfo.expirationDate}
                    onChange={(e) => setNewPaymentInfo({ ...newPaymentInfo, expirationDate: e.target.value })}
                  />
                  <button className='editButtonProfilePage' type="submit">Add</button>
                </form>
              </div>
            )}
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
      value={paymentInfoForms && paymentInfoForms.length > 0 ? paymentInfoForms[0].billingAddress : ''}
      onChange={(e) => setPaymentInfoForms([{ ...paymentInfoForms[0], billingAddress: e.target.value }])}
    />
    <input
      className="inputProfilePage"
      type="text"
      placeholder="City"
      value={paymentInfoForms && paymentInfoForms.length > 0 ? paymentInfoForms[0].city : ''}
      onChange={(e) => setPaymentInfoForms([{ ...paymentInfoForms[0], city: e.target.value }])}
    />
    <input
      className="inputProfilePage"
      type="text"
      placeholder="State"
      value={paymentInfoForms && paymentInfoForms.length > 0 ? paymentInfoForms[0].state : ''}
      onChange={(e) => setPaymentInfoForms([{ ...paymentInfoForms[0], state: e.target.value }])}
    />
    <input
      className="inputProfilePage"
      type="number"
      placeholder="Zip Code"
      value={paymentInfoForms && paymentInfoForms.length > 0 ? paymentInfoForms[0].zipCode : ''}
      onChange={(e) => setPaymentInfoForms([{ ...paymentInfoForms[0], zipCode: e.target.value }])}
    />
    <button type="submit" className='editButtonProfilePage'>Edit</button>
  </form>
)}
      </div>
    </div>
  );
};


export default ProfilePage;