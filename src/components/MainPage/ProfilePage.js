 import React from 'react';
import '../css/HomePage/ProfilePage.css';
import blankProfile from './blankProfile.png';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


const ProfilePage = ({ props }) => {
  const [activeTab, setActiveTab] = useState('user');
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    fullName: '',
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
      const response = await axios.get(`http://localhost:3000/user/Test 2610`);
      setUserInfo(response.data);
      
      const paymentResponse = await axios.get('http://localhost:3000/users/1/payment-info');
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
    try {
      await axios.put(`http://localhost:3000/users/1`, {
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
      const lastPayment = paymentInfo.slice(-1)[0];
      console.log (lastPayment);
      await axios.put(`http://localhost:3000/payment/1`, {
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
          </form>
        )}
        {activeTab === 'payment' && (
          <div>
            {paymentInfo.map((payment, index) => (
              <form key={index} onSubmit={handleSubmit}>
                <input
                className="inputProfilePage"
                  type="text"
                  placeholder="Card Type"
                  value={payment.cardType}
                  // Handle change
                />
                <input
                className="inputProfilePage"
                  type="text"
                  placeholder="Card Number"
                  value={payment.cardNumberHash}
                  // Handle change
                />
                <input
                  className="inputProfilePage"
                  type="date"
                  placeholder="Expiration Date"
                  value={payment.expirationDate}
                  // Handle change
                />
                <button className='editButtonProfilePage' type="submit">Edit</button>
              </form>
            ))}
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
      value={paymentInfo && paymentInfo.length > 0 ? paymentInfo[paymentInfo.length - 1].billingAddress : ''}
      onChange={(e) => setPaymentInfo(prevState => {
        const updatedPaymentInfo = [...prevState];
        updatedPaymentInfo[prevState.length - 1].billingAddress = e.target.value;
        return updatedPaymentInfo;
      })}
    />
    <input
      className="inputProfilePage"
      type="text"
      placeholder="City"
      value={paymentInfo && paymentInfo.length > 0 ? paymentInfo[paymentInfo.length - 1].city : ''}
      onChange={(e) => setPaymentInfo(prevState => {
        const updatedPaymentInfo = [...prevState];
        updatedPaymentInfo[prevState.length - 1].city = e.target.value;
        return updatedPaymentInfo;
      })}
    />
    <input
      className="inputProfilePage"
      type="text"
      placeholder="State"
      value={paymentInfo && paymentInfo.length > 0 ? paymentInfo[paymentInfo.length - 1].state : ''}
      onChange={(e) => setPaymentInfo(prevState => {
        const updatedPaymentInfo = [...prevState];
        updatedPaymentInfo[prevState.length - 1].state = e.target.value;
        return updatedPaymentInfo;
      })}
    />
    <input
      className="inputProfilePage"
      type="number"
      placeholder="Zip Code"
      value={paymentInfo && paymentInfo.length > 0 ? paymentInfo[paymentInfo.length - 1].zipCode : ''}
      onChange={(e) => setPaymentInfo(prevState => {
        const updatedPaymentInfo = [...prevState];
        updatedPaymentInfo[prevState.length - 1].zipCode = e.target.value;
        return updatedPaymentInfo;
      })}
    />
    <button type="submit" className='editButtonProfilePage'>Edit</button>
  </form>
)}
      </div>
    </div>
  );
};


export default ProfilePage;