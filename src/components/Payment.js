import React, { useState, useEffect } from "react";
import './css/Payment.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Payment = (props) => {
    const navigate = useNavigate();
    //console.log(props.location.state.totalAmount);
    //const { totalAmount } = props.location.state;
    //console.log(props);
    
    const totalAmount  = 1500;

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
        navigate('/paymentconfirm')

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
    
      return (
        <div id="payment-page">
            <h2>Total: { totalAmount }</h2>
          <h2>Payment Information</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Card Type:
              <input type="text" name="cardType" value={paymentInfo.cardType} onChange={handlePaymentChange} />
            </label>
            <br />
            <label>
              Card Number:
              <input type="text" name="cardNumber" value={paymentInfo.cardNumber} onChange={handlePaymentChange} />
            </label>
            <br />
            <label>
              Expiration Date:
              <input type="text" name="expirationDate" value={paymentInfo.expirationDate} onChange={handlePaymentChange} />
            </label>
            <br />
            <label>
              Security Code:
              <input type="text" name="securityCode" value={paymentInfo.securityCode} onChange={handlePaymentChange} />
            </label>
            <br />
            <label>
              Name:
              <input type="text" name="name" value={paymentInfo.name} onChange={handlePaymentChange} />
            </label>
            <br />
            <h2>Billing Address Information</h2>
            <label>
              Street Address:
              <input type="text" name="streetAddress" value={billingAddress.streetAddress} onChange={handleAddressChange} />
            </label>
            <br />
            <label>
              City:
              <input type="text" name="city" value={billingAddress.city} onChange={handleAddressChange} />
            </label>
            <br />
            <label>
              State:
              <input type="text" name="state" value={billingAddress.state} onChange={handleAddressChange} />
            </label>
            <br />
            <label>
              Zip Code:
              <input type="text" name="zipCode" value={billingAddress.zipCode} onChange={handleAddressChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      );




}

export default Payment;