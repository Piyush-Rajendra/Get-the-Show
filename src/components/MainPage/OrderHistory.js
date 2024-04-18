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

    function formatDate(dateString) {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        
        // Ensure two-digit format
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;
      
        return `${formattedMonth}/${formattedDay}/${year}`;
      }

    useEffect(() => {
        async function fetchOrderHistory() {
          try {
            const response = await axios.get(`http://localhost:3000/order-history/${id}`);
             // Use Axios to make a GET request
            setOrders(response.data); // Set the promotions data into the state
          } catch (error) {
            console.error('Error fetching promotions:', error);
          }
        }
    
        fetchOrderHistory();
      }, [orders, id]);


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
                    <h2>{orders.movieName}</h2>
                    <p>Order Number: {orders.id}</p>
                    <p>Number of Tickets: {orders.number_of_tickets}</p>
                    <p>Date: {formatDate(orders.showDate)}</p>
                    <p>Total: ${orders.price.toFixed(2)}</p>
                    
                </div>
            ))}
            </div>
        </div>
    )

}

export default OrderHistory; 