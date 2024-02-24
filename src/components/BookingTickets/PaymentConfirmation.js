import React, { useState, useEffect } from "react";
import '../css/BookingTickets/PaymentConfirmation.css';
import { Link, useNavigate, useSearchParams, useLocation} from 'react-router-dom';
import axios from "axios";

const PaymentConfirmation = () => {
    const navigate = useNavigate();
  
    
    //const [searchParams] = useSearchParams();
    //const total = searchParams.get('total');
    

    /*useEffect(() => {
        const handleBackButton = (e) => {
            e.preventDefault();
            navigate('/');
        };

        window.addEventListener('popstate', handleBackButton);

        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, [navigate]);*/

    return (
        <div id="confirm-page">
            <h1 id="payment-confirm">Payment Confirmed! Thanks for choosing E-Cinema Booking!</h1>
            <h3>You many now leave this page.</h3>
            <Link to={`/`}>
            <h4 id="return">Click here to return to the home page.</h4>
            </Link>
        </div>
    )

}

export default PaymentConfirmation; 