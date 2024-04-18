import React, { useState, useEffect } from "react";
import '../css/BookingTickets/OrderSummary.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


const OrderSummary = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const [ticketNumber, setTicketNumber] =useState(0); 
    const [cost, setCost] = useState(0);
    const [tax, setTax] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [fees, setFees] = useState(0);
    const [total, setTotal] = useState(0);
    const [promoUsed, setPromoUsed] = useState(false);
    const [time, setTime] = useState();

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


    useEffect(() => {
        setTicketNumber(sessionStorage.getItem('numberOfTickets'));
        setTime(sessionStorage.getItem('movie-time'));
        setCost(parseFloat(sessionStorage.getItem('cost')));
        setTax(parseFloat(sessionStorage.getItem('tax')));
        setTotal(parseFloat(sessionStorage.getItem('cost'))  + parseFloat(sessionStorage.getItem('tax'))
                    + fees - discount);
    }, []);

    const handleCancelOrder = () => {
       navigate('/');
    }
    
    const handleSubmitOrder = async () => {
        sessionStorage.setItem('finalTotal', total);
        const order = {
            userId: id,
            movieName: sessionStorage.getItem('movie-title'),
            price: total,
            showDate: time,
            //cardType: "MasterCard",
            number_of_tickets: ticketNumber
        }
        try {
            axios.post('http://localhost:3000/order-history', order); 
            //clear
          } catch (error) {
            console.error('Error submitting form:', error);
          }

        const retrievedArrayString = sessionStorage.getItem('seats');
        const seats = JSON.parse(retrievedArrayString);
        //alert(seats);


        
        navigate('/paymentconfirm');
        
    }

    const promotionsApplier = async () => {
        const inputValue = document.getElementById('myInput').value;

        // Display an alert with the inputted text
        //alert(`Inputted text: ${inputValue}`);
        try {
            // Send an update request to the server
            //alert(`Inputted text: ${inputValue}`);
            if (promoUsed == false) {
            const response = await axios.get(`http://localhost:3000/promotions/${inputValue}`);
            if (response.data.percentoffPromo == 1) {
                setDiscount((parseFloat(discount) + parseFloat(total * response.data.percentoff)).toFixed(2));
                setTotal(total - (total * response.data.percentoff));
                let totalValue = parseFloat(total)
                if (totalValue < 0) {
                    setTotal(0);
                }
            }
            else if (response.data.valueoffPromo == 1) {
                setDiscount((parseFloat(discount) + (response.data.valueoff)).toFixed(2));
                setTotal(total - response.data.valueoff);
                let totalValue = parseFloat(total - response.data.valueoff)
                if (totalValue < 0) {
                    setTotal(0);
                }
            }
            setPromoUsed(true);
            alert('Promo Applied!');
        }

        else {
            alert("Promotions cannot be combined.");
        }

          } catch (error) {
            if (error.response && error.response.status === 404) {
                // Display an alert indicating that the promo was not found
                alert('Promo not found');
            } else {
                // Display an alert for other errors
                alert('An error occurred while fetching promotion data');
            }
          }

        // Clear the input field
        document.getElementById('myInput').value = '';

    }



    return (
        <div id="summary-page">
            <Link to={`/`} className="backButtonpaymentConfirmation">
                <button className="backButtonPaymentTickets">Cancel Tickets</button>
            </Link>
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
                        <h4 className="order-details-value">${cost.toFixed(2)}</h4>
                    </div>
                    <div className="order-details-container">
                        <h4 className="order-details-label">Promo Code</h4>
                        <div id="input-apply">
                            <input type="text" id="myInput" name="myInput"/>
                            <button id="apply" onClick={promotionsApplier} className="summary-page-buttons">Apply</button>
                        </div>
                    </div>
                    <div className="order-details-container">
                        <h4 className="order-details-label">Discount</h4>
                        <h4 className="order-details-value">- ${discount}</h4>
                    </div>
                    <div className="order-details-container">
                        <h4 className="order-details-label">Fees</h4>
                        <h4 className="order-details-value">${fees}</h4>
                    </div>
                    <div className="order-details-container">
                        <h4 className="order-details-label">Tax</h4>
                        <h4 className="order-details-value">${tax.toFixed(2)}</h4>
                    </div>
                    <div className="order-details-container">
                        <h4 className="order-details-label">Total</h4>
                        <h4 className="order-details-value">${total.toFixed(2)}</h4>
                    </div>
                </div>
                <div id="summary-buttons">
                    <button className="summary-page-buttons" onClick={handleCancelOrder}>Cancel Order</button>
                    <button className="summary-page-buttons" onClick={handleSubmitOrder}>Submit Order</button>
                </div>

            </div>
        </div>
    )


}

export default OrderSummary;