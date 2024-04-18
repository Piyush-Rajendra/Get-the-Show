import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../css/HomePage/OrderHistory.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
            alert("Error fetching card data: " + error);
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

          }
        }
    
        fetchOrderHistory();
      }, [orders, id]);


      const navigateHome = () => {
        navigate('/');
    }


    return (
        <div id="order-hi story-page">
            <Link to="/Profile">
              <button className="backButtonOrderHistoryPage">Back</button>
            </Link>
            <div id="order-page-header">
                <h1 id="order-page-title" onClick={navigateHome}>E-Cinema Booking</h1>
            </div>
            <div id="order-title">
                <h2 id="name-title">{username}'s Order History</h2>
            </div>
            <div id="order-container">
            {orders.map((orders, index) => (
                <div className="card" id="order-card" key={index}>
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