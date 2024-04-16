import React, { useState, useEffect } from "react";
import '../css/BookingTickets/Payment.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Payment = (props) => {
  const username = localStorage.getItem('username')
  console.log(username);
  const [id, setId] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/user/${username}`);
          setId(response.data.id); 
          
          
         
        } catch (error) {
          console.error('Error fetching card data:', error);
        }
      };
  
      fetchUserData();
  }, []);
  const navigate = useNavigate();
    //console.log(props.location.state.totalAmount);
    //const { totalAmount } = props.location.state;
    //console.log(props);
  //const totalAmount = 15; 
  const totalAmount = sessionStorage.getItem('fullTotal');

  const [cardOne, setCardOne] = useState('No saved card');
  const [cardTwo, setCardTwo] = useState('No saved card');
  const [cardThree, setCardThree] = useState('No saved card');
  const [usingSavedCard, setUsingSavedCard] = useState(false);

  const [cards, setCards] = useState([]);

  function formatDate(expirationDate) {
    const date = new Date(expirationDate);
    const month = date.getMonth() + 1; // Month is zero-based
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  useEffect(() => {
    const fetchCardData = async () => {
        try {
          console.log(id);
          const response = await axios.get(`http://localhost:3000/users/${id}/payment-info`);
          setCards(response.data.paymentInfo); 
          
          //console.log(response.data);
          //console.log(cards);

          //console.log(cards);
         
        } catch (error) {
          console.error('Error fetching card data:', error);
        }
      };
  
      fetchCardData();
  }, [id]);

  useEffect(() => {
    console.log(cards); 
    console.log(cards[0]);
  }, [cards]);

    const [paymentInfo, setPaymentInfo] = useState({
        cardType: '',
        cardNumber: '',
        expirationDate: '',
        securityCode: '',
        name: ''
      });
    
      const [billingAddress, setBillingAddress] = useState({
        streetAddress: '',
        city: '',
        state: '',
        zipCode: ''
      });
    
      const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo({ ...paymentInfo, [name]: value });
      };
    
      const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setBillingAddress({ ...billingAddress, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
          alert('Please fill out all fields.');
          return;
        }
        const paymentData = {
          paymentInfo,
          billingAddress
        };
        console.log(paymentData);
        //navigate('/paymentconfirm')
        navigate(`/ordersummary`);

      };
    
      const validateForm = () => {
        for (let key in paymentInfo) {
          if (paymentInfo[key] === '') {
            return false;
          }
        }
        for (let key in billingAddress) {
          if (billingAddress[key] === '') {
            return false;
          }
        }
        return true;
      };

      const handleUseSavedCard = () => {
        setUsingSavedCard(true);
      }
    
      return (
        <div id="center-payment-page">
          <div id="payment-page">
            <h2>Total: ${totalAmount }</h2>
            <h2 onClick={handleUseSavedCard} id="click-me" className="red">[Click to Use Saved Card]</h2>
            {usingSavedCard && (
                <div>
                {cards.map((card, index) => (
                  <Link to='/ordersummary'>
                  <div key={index}>
                    Card {index + 1}: {card.cardType} - {formatDate(card.expirationDate)}
                  </div>
                  </Link>
                ))}
              </div>
            )}
            <h2 className="red">Payment Information</h2>
            <form onSubmit={handleSubmit}>
              <label>
                <div className="label-title">Card Type:</div>
                <input type="text" name="cardType" value={paymentInfo.cardType} onChange={handlePaymentChange} className="payment-input" />
              </label>
              <br />
              <label>
                <div className="label-title">Card Number:</div>
                <input type="text" name="cardNumber" value={paymentInfo.cardNumber} onChange={handlePaymentChange} className="payment-input" />
              </label>
              <br />
              <label>
                <div className="label-title">Expiration Date:</div>
                <input type="text" name="expirationDate" value={paymentInfo.expirationDate} onChange={handlePaymentChange} className="payment-input" />
              </label>
              <br />
              <label>
                <div className="label-title">Security Code:</div>
                <input type="text" name="securityCode" value={paymentInfo.securityCode} onChange={handlePaymentChange} className="payment-input" />
              </label>
              <br />
              <label>
                <div className="label-title">Name:</div>
                <input type="text" name="name" value={paymentInfo.name} onChange={handlePaymentChange} className="payment-input" />
              </label>
              <br />
      
              <div id="form-two">
                <h2 className="red">Billing Address Information</h2>
                <label>
                  <div className="label-title">Street Address:</div>
                  <input type="text" name="streetAddress" value={billingAddress.streetAddress} onChange={handleAddressChange} className="payment-input" />
                </label>
                <br />
                <label>
                  <div className="label-title">City:</div>
                  <input type="text" name="city" value={billingAddress.city} onChange={handleAddressChange} className="payment-input" />
                </label>
                <br />
                <label>
                  <div className="label-title">State:</div>
                  <input type="text" name="state" value={billingAddress.state} onChange={handleAddressChange} className="payment-input" />
                </label>
                <br />
                <label>
                  <div className="label-title">Zip Code:</div>
                  <input type="text" name="zipCode" value={billingAddress.zipCode} onChange={handleAddressChange} className="payment-input" />
                </label>
                <br />
              </div>
              <button type="submit">Go to Order Confirmation</button>
            </form>
          </div>
        </div>
      );
      
      




}

export default Payment;