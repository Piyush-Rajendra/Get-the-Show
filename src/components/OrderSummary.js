import React, { useState, useEffect } from "react";
import './css/OrderSummary.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


const OrderSummary = () => {
    const navigate = useNavigate();
    const [ticketNumber, setTicketNumber] =useState(0); 
    const [cost, setCost] = useState(0);
    const [tax, setTax] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [fees, setFees] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTicketNumber(sessionStorage.getItem('numberOfTickets'));
        setCost(sessionStorage.getItem('cost'));
        setTax(sessionStorage.getItem('tax'));
        setTotal(parseFloat(sessionStorage.getItem('cost'))  + parseFloat(sessionStorage.getItem('tax'))
                    + fees - discount);

        
    }, []);

    const handleCancelOrder = () => {
       navigate('/');
    }
    
    const handleSubmitOrder = () => {
        navigate('/paymentconfirm');
        
    }



    return (
        <div id="summary-page">
            <div id="checkout-title">
                <h1>Checkout</h1>
            </div>
            <div id="order-summary">
                <div id="order-summary-label">
                    <h3 id="order-summary-title">Order Summary</h3>
                </div>
                <div id="order-summary-details">
                    <div className="order-details-container">
                        <h4 className="order-details-label">Number of Tickets</h4>
                        <h4 className="order-details-value">{ticketNumber}</h4>
                    </div>
                    <div className="order-details-container">
                        <h4 className="order-details-label">Cost</h4>
                        <h4 className="order-details-value">${cost}</h4>
                    </div>
                    <div className="order-details-container">
                        <h4 className="order-details-label">Promo Code</h4>
                        <div id="input-apply">
                            <input type="text" id="myInput" name="myInput"/>
                            <button id="apply" className="summary-page-buttons">Apply</button>
                        </div>
                    </div>
                    <div className="order-details-container">
                        <h4 className="order-details-label">Discount</h4>
                        <h4 className="order-details-value">${discount}</h4>
                    </div>
                    <div className="order-details-container">
                        <h4 className="order-details-label">Fees</h4>
                        <h4 className="order-details-value">${fees}</h4>
                    </div>
                    <div className="order-details-container">
                        <h4 className="order-details-label">Tax</h4>
                        <h4 className="order-details-value">${tax}</h4>
                    </div>
                    <div className="order-details-container">
                        <h4 className="order-details-label">Total</h4>
                        <h4 className="order-details-value">${total}</h4>
                    </div>
                </div>
                <div id="summary-buttons">
                    <button className="summary-page-buttons" onClick={handleCancelOrder}>Cancel Order</button>
                    <button className="summary-page-buttons" onClick={handleSubmitOrder}>Sumbit Order</button>
                </div>

            </div>
        </div>
    )


}

export default OrderSummary;