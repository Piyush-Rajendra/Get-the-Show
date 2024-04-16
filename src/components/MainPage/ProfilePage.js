 import React from 'react';
import '../css/HomePage/ProfilePage.css';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


const ProfilePage = ({ props }) => {
  const username = localStorage.getItem('username');
  const [file, setFile] = useState(null);
  const [base64String, setBase64String] = useState('');
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${username}`);
        setBase64String(response.data.profilePhoto);
      } catch (error) {
        console.error('Failed to fetch user information', error);
        // Handle error, e.g., redirect to login page
      }
    };
    fetchUserInfo();
  }, [username]);
  const [activeTab, setActiveTab] = useState('user');
  const [userInfo, setUserInfo] = useState({
    username: '',
    phoneNumber: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    fullName: '',
    registerForPromotions: '',
    email: '',
    profilePhoto: '',
  });

  const [paymentInfo, setPaymentInfo] = useState([]);

  const [myValue, setMyValue] = useState(true);

 const [billingInfoForms, setbillingInfoForms] = useState([
    {
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
  expirationDate: ''
});

const handleAddPaymentInfo = () => {
    const newPaymentInfoItem = {
      cardType: '',
      cardNumberHash: '',
      cardPINHash: '',
      expirationDate: '',
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

      console.log("LINE 96 " +response.data);
  
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
  
 const handleEditBillingAddress = async (e) => {
    e.preventDefault();
    const response = await axios.get(`http://localhost:3000/user/${username}`);
    const userId = response.data.id;
    try {
      console.log(billingInfoForms[0].city);
      console.log(paymentInfo);
      await axios.put(`http://localhost:3000/payment/${userId}`, {
        cardType: billingInfoForms.cardType,
        cardNumberHash: billingInfoForms.cardNumberHash,
        cardPINHash: billingInfoForms.cardPINHash,
        expirationDate: billingInfoForms.expirationDate,
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
    // console.log(lastPayment);
    // console.log(newPaymentInfo.cardType);
    const response = await axios.post(`http://localhost:3000/users/${userId}/onlypayment`, {
      cardType: newPaymentInfo.cardType,
      cardNumber: newPaymentInfo.cardNumberHash,
      cardPIN: newPaymentInfo.cardPINHash,
      expirationDate: newPaymentInfo.expirationDate,
    });
    /** 
    if (lastPayment.billingAddress != null) {
      console.log('RUNNING');
       await axios.put(`http://localhost:3000/payment/${userId}`, {
        billingAddress: lastPayment.billingAddress,
        city: lastPayment.city,
        state: lastPayment.state,
        zipCode: lastPayment.zipCode,
      });
    }
    */
    setPaymentInfo([...paymentInfo, response.data]);
    setNewPaymentInfo({  
      cardType: '',
      cardNumberHash: '',
      cardPINHash: '',
      expirationDate: '',
    });
    alert('Payment information added successfully!');
    window.location.reload(); // Reload the page
  } catch (error) {
    console.error('Failed to add payment information', error);
    alert('Failed to add payment information');
  }
};

const handleFileChange = async (e) => {
  e.preventDefault();
  const selectedFile = e.target.files[0];
  if (selectedFile) {
    const reader = new FileReader();
    reader.onloadend = async () => {
      setFile(selectedFile);
      setBase64String(reader.result);

      const response = await axios.get(`http://localhost:3000/user/${username}`);
      const userId = response.data.id;

      try {
        await axios.put(`http://localhost:3000/users/${userId}`, {
          profilePhoto: reader.result,
          username: response.data.username,
          phoneNumber: response.data.phoneNumber,
          street: response.data.street,
          city: response.data.city,
          state: response.data.state,
          zipCode: response.data.zipCode,
          fullName: response.data.fullName,
          registerForPromotions: response.data.registerForPromotions,
          email: response.data.email,
        });
        alert('Profile photo updated successfully!');
      } catch (error) {
        console.error('Failed to update profile photo', error);        
        alert('Failed to update profile photo');
        window.location.reload();
      }
    };
    reader.readAsDataURL(selectedFile);
  }
};

  const handleButtonClick = () => {
    const fileInput = document.getElementById('file-upload');
    fileInput.click();
  };

  return (
    <div className="profile-container">
      <Link to="/" state={{ props: myValue }}>
        <button className="backButtonProfilePage">Back</button>
      </Link>
      <div>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button className='imageButtonProfilePage' onClick={handleButtonClick}>
        {base64String ? (
          <img className="imgProfileSideBar" src={base64String} alt="Base64 Image" />
        ) : (
          <p>No valid base64 string provided</p>
        )}
      </button>
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
            <Link to="/ChangePassword"><button className="inputProfilePage">Change Password</button></Link>
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
                  <button
                    className='removeButtonProfilePage'
                    onClick={async () => {
                      console.log(payment.paymentId);
                      try {
                        await axios.delete(`http://localhost:3000/payment-info/${payment.paymentId}`);
                        const updatedPaymentInfo = paymentInfo.filter((_, i) => i !== index);
                        setPaymentInfo(updatedPaymentInfo);
                        alert('Payment information removed!');
                      } catch (error) {
                        console.error('Failed to remove payment information', error);
                        alert('Failed to remove payment information');
                      }
                    }}
                  >
                    Remove
                  </button>
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
  <form onSubmit={handleEditBillingAddress}>
    <input
      className="inputProfilePage"
      type="text"
      placeholder="Street"
      value={billingInfoForms && billingInfoForms.length > 0 ? billingInfoForms[0].billingAddress : ''}
      onChange={(e) => setbillingInfoForms([{ ...billingInfoForms[0], billingAddress: e.target.value }])}
    />
    <input
      className="inputProfilePage"
      type="text"
      placeholder="City"
      value={billingInfoForms && billingInfoForms.length > 0 ? billingInfoForms[0].city : ''}
      onChange={(e) => setbillingInfoForms([{ ...billingInfoForms[0], city: e.target.value }])}
    />
    <input
      className="inputProfilePage"
      type="text"
      placeholder="State"
      value={billingInfoForms && billingInfoForms.length > 0 ? billingInfoForms[0].state : ''}
      onChange={(e) => setbillingInfoForms([{ ...billingInfoForms[0], state: e.target.value }])}
    />
    <input
      className="inputProfilePage"
      type="number"
      placeholder="Zip Code"
      value={billingInfoForms && billingInfoForms.length > 0 ? billingInfoForms[0].zipCode : ''}
      onChange={(e) => setbillingInfoForms([{ ...billingInfoForms[0], zipCode: e.target.value }])}
    />
    <button type="submit" className='editButtonProfilePage'>Edit</button>
  </form>
)}
      </div>
    </div>
  );
};


export default ProfilePage;