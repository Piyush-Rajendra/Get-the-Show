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

 const [billingInfoForms, setbillingInfoForms] = useState({
      billingAddress: '',
      city: '',
      state: '',
      zipCode: '',
    },
  );

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

      const billingResponse = await axios.get(`http://localhost:3000/billing-address/user/${userId}`);
      setbillingInfoForms(billingResponse.data[billingResponse.data.length - 1]);

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
      console.log(userInfo);
      await axios.put(`http://localhost:3000/users/${userId}`, {
        fullName: userInfo.fullName,
        username: userInfo.username,
        city: userInfo.city,
        street: userInfo.street,
        state: userInfo.state,
        zipCode: userInfo.zipCode,
        phoneNumber: userInfo.phoneNumber,
        profilePhoto: userInfo.profilePhoto,
        email: userInfo.email,
        registerForPromotions: userInfo.registerForPromotions,
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
    const amount = await axios.get(`http://localhost:3000/billing-address/user/${userId}`)    
    if (amount.length > 1) {
      return 0;
    }
    try {
      console.log(billingInfoForms);
      await axios.post(`http://localhost:3000/billing-address/${userId}`, {
        billingAddress: billingInfoForms.billingAddress,
        city: billingInfoForms.city,
        state: billingInfoForms.state,
        zipCode: billingInfoForms.zipCode,
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
            required minlength="10" maxlength="10" size="10"
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
                      className="inputProfilePage" type="text" placeholder="Card Number"
                      pattern="\d{16}" title="Card Number must be exactly 16 digits" maxLength="16"
                      value={newPaymentInfo.cardNumberHash}
                      onChange={(e) => {
                        if (/^\d{0,16}$/.test(e.target.value)) {
                          setNewPaymentInfo({ ...newPaymentInfo, cardNumberHash: e.target.value });
                        }
                      }}
                    />
                    <input
                      className="inputProfilePage"
                      type="number"
                      placeholder="Card Pin"
                      pattern="\d{3}" title="Card Number must be exactly 3 digits" maxLength="3"
                      required minlength="3" maxlength="3" size="3"
                      value={newPaymentInfo.cardPINHash}
                      onChange={(e) => {
                        if (/^\d{0,3}$/.test(e.target.value)) {
                          setNewPaymentInfo({ ...newPaymentInfo, cardPINHash: e.target.value });
                        }
                      }}
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
          <input
            className="inputProfilePage" type="text" placeholder="Zip Code" pattern="\d{5}"
            title="Zip Code must be exactly 5 digits" maxLength="5"
            value={userInfo && userInfo.zipCode}
            onChange={(e) => {
              if (/^\d{0,5}$/.test(e.target.value)) {
                setUserInfo({ ...userInfo, zipCode: e.target.value });
              }
            }}
          />
            <button className='editButtonProfilePage'>Edit</button>
          </form>
        )}
{activeTab === 'billing' && (
  <form onSubmit={handleEditBillingAddress}>
    <input
      className="inputProfilePage"
      type="text"
      placeholder="Street"
      value={billingInfoForms && billingInfoForms.billingAddress}
      onChange={(e) => setbillingInfoForms({ ...billingInfoForms, billingAddress: e.target.value })}
    />
    <input
      className="inputProfilePage"
      type="text"
      placeholder="City"
      value={billingInfoForms && billingInfoForms.city}
      onChange={(e) => setbillingInfoForms({ ...billingInfoForms, city: e.target.value })}
    />
    <input
      className="inputProfilePage"
      type="text"
      placeholder="State"
      value={billingInfoForms && billingInfoForms.state}
      onChange={(e) => setbillingInfoForms({ ...billingInfoForms, state: e.target.value })}
    />
    <input
      className="inputProfilePage" type="text" placeholder="Zip Code"
      pattern="\d{5}" title="Zip Code must be exactly 5 digits"maxLength="5"
      value={billingInfoForms && billingInfoForms.zipCode}
      onChange={(e) => {
        if (/^\d{0,5}$/.test(e.target.value)) {
          setbillingInfoForms({ ...billingInfoForms, zipCode: e.target.value });
        }
      }}
    />

    <button type="submit" className='editButtonProfilePage'>Edit</button>
  </form>
)}
      </div>
    </div>
  );
};


export default ProfilePage;