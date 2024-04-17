import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../css/HomePage/OrderHistory.css';
import MovieCard from './MovieCard';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarPopup from './SidebarPopup';
import UserContext from "../context/UserContext";

const OrderHistory = () => {
    const username = localStorage.getItem('username');
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();


    const DUMMY_ORDERS = [
        {
            bookingNumber: 1,
            ticketNumber: 3,
            movieTitle: 'The Emoji Movie',
            movieDate: '2/23/2024',
            movieTime: '3:00 P.M.',
            creditCard: 123456789,
            total: 12.00,
        },
        {
            bookingNumber: 2,
            ticketNumber: 2,
            movieTitle: 'Frozen',
            movieDate: '2/23/2024',
            movieTime: '4:00 P.M.',
            creditCard: 123456789,
            total: 9.00,
        },
        {
            bookingNumber: 3,
            ticketNumber: 4,
            movieTitle: 'Apollo 13',
            movieDate: '4/01/2024',
            movieTime: '7:00 P.M.',
            creditCard: 123456789,
            total: 32.90,
        },
    ]

    useEffect(() => {
        setOrders(DUMMY_ORDERS);
        /*async function fetchPromotions() {
          try {
            const response = await axios.get('http://localhost:3000/promotions'); // Use Axios to make a GET request
            setPromotions(response.data); // Set the promotions data into the state
          } catch (error) {
            console.error('Error fetching promotions:', error);
          }
        }
    
        fetchPromotions();*/
      }, [orders]);

      const navigateHome = () => {
        navigate('/');
    }


    return (
        <div id="order-history-page">
            <div id="order-page-header">
                <h1 id="order-page-title" onClick={navigateHome}>E-Cinema Booking</h1>
            </div>
            <div id="order-title">
                <h2 id="name-title">{username}'s Order History</h2>
            </div>
            <div id="order-container">
            {orders.map((orders, index) => (
                <div className="card" key={index}>
                    <h2>{orders.movieTitle}</h2>
                    <p>Order Number: {orders.bookingNumber}</p>
                    <p>Number of Tickets: {orders.ticketNumber}</p>
                    <p>Date: {orders.movieDate} @ {orders.movieTime}</p>
                    <p>Total: ${orders.total.toFixed(2)}</p>
                    
                </div>
            ))}
            </div>
        </div>
    )

}

export default OrderHistory; 