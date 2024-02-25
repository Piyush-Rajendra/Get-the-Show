import React, { useState, useEffect } from "react";
import '../css/BookingTickets/BuyTickets.css';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";

const Promotions = () => {
    const DUMMY_PROMOTIONS = [
        {
            name: 'Promo1',
            promoCode: 'GHUYYRT34',
            percentOffPromo: false,
            valueOffPromo: true,
            percentOff: 0,
            valueOff: 2
        },
        {
            name: 'Promo2',
            promoCode: '567FHB8',
            percentOffPromo: true,
            valueOffPromo: false,
            percentOff: 0.15,
            valueOff: 0
        },
        {
            name: 'Promo3',
            promoCode: '8QY7JNB35',
            percentOffPromo: true,
            valueOffPromo: false,
            percentOff: 0.20,
            valueOff: 0
        },
        {
            name: 'Promo4',
            promoCode: '78778BHG',
            percentOffPromo: false,
            valueOffPromo: true,
            percentOff: 0,
            valueOff: 20
        }

    ]
    const [promotions, setPromotions] = useState([DUMMY_PROMOTIONS]);



    return (
        hi
    )
}

export default Promotions; 
