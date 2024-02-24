import React, { useState, useEffect } from "react";
import './css/Payment.css';
import { Link, useNavigate} from 'react-router-dom';
import axios from "axios";

const PaymentConfirmation = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleBackButton = (e) => {
            e.preventDefault();
            navigate('/');
        };

        window.addEventListener('popstate', handleBackButton);

        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, [navigate]);

    return (
        <div id="confirm-page">
            <h1>Payment Confirmed! Thanks for choosing E-Cinema Booking!</h1>
            <h3>You many now leave this page.</h3>
            <h4>You can click back to return to the home page.</h4>
        </div>
    )

}

export default PaymentConfirmation; 