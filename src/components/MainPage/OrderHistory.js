import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../css/HomePage/OrderHistory.css';
import MovieCard from './MovieCard';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarPopup from './SidebarPopup';
import UserContext from "../context/UserContext";

const OrderHistory = () => {

    const DUMMY_ORDERS = [
        {
            movieTitle: 'The Emoji Movie',
            movieTime: '2/23/2024',
            total: 12,
            numberOfTickets: 3,
        },
    ]


    return (
        <div id="order-history-page">
            <div id="order-page-header">
                <h1 id="order-page-title">E-Cinema Booking</h1>
            </div>
            <div id="order-title">
                <h2>Order History</h2>
            </div>
        </div>
    )

}

export default OrderHistory; 