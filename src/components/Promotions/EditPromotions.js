import React, { useState, useEffect, useContext } from "react";
import '../css/Promotions/AddPromotions.css';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import UserContext from "../context/UserContext";

const AddPromotions = () => {

    const [formData, setFormData] = useState({
        name: '',
        promoCode: '',
        description: '',
        percentOffPromo: false,
        valueOffPromo: true,
        percentOff: 0,
        valueOff: 0
      });
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
    
        // Special handling for toggling percentOffPromo and valueOffPromo
        if (name === 'percentOffPromo' && newValue) {
          setFormData({
            ...formData,
            percentOffPromo: true,
            valueOffPromo: false,
            percentOff: 0,
            valueOff: 0
          });
        } else if (name === 'valueOffPromo' && newValue) {
          setFormData({
            ...formData,
            percentOffPromo: false,
            valueOffPromo: true,
            percentOff: 0,
            valueOff: 0
          });
        } else {
          setFormData({
            ...formData,
            [name]: newValue
          });
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // This will log the updated object upon submission
        // You can perform further actions here like sending the data to a server

        setFormData({
            name: '',
            promoCode: '',
            description: '',
            percentOffPromo: false,
            valueOffPromo: true,
            percentOff: 0,
            valueOff: 0
          });
      };

     
    
      return (
        <div id="add-promo-page">
        <div id="add-promo-header">
            <h1>E-Cinema Booking</h1>
        </div>
        <div id="add-promo">
            <h2>Edit Promo</h2>
        </div>
        <div id="promo-add-form-center">
        <form id="promo-add-form" className="form-container" onSubmit={handleSubmit}>
          <label className="add-promo-label">
            Name:
            <div></div>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <div></div>
          <label className="add-promo-label">
            Promo Code:
            <div></div>
            <input type="text" name="promoCode" value={formData.promoCode} onChange={handleChange} />
          </label>
          <div></div>
          <label className="add-promo-label">
            Description:
            <div></div>
            <input type="text" name="description" value={formData.description} onChange={handleChange} />
          </label>
          <div></div>
          <label className="add-promo-label">
            Percent Off Promo:
            <div></div>
            <input type="checkbox" name="percentOffPromo" checked={formData.percentOffPromo} onChange={handleChange} />
          </label>
          <div></div>
          <label className="add-promo-label">
            Value Off Promo:
            <div></div>
            <input type="checkbox" name="valueOffPromo" checked={formData.valueOffPromo} onChange={handleChange} />
          </label>
          <div></div>
          {formData.percentOffPromo && (
            <label className="add-promo-label">
              Percent Off:
              <div></div>
              <input type="number" name="percentOff" value={formData.percentOff} onChange={handleChange} />
            </label>
          )}
          <div></div>
          {formData.valueOffPromo && (
            <label className="add-promo-label">
              Value Off:
              <div></div>
              <input type="number" name="valueOff" value={formData.valueOff} onChange={handleChange} />
            </label>
          )}
          <div></div>
          <button id="add-promo-button" type="submit">Submit</button>
        </form>
        </div>
        </div>
      );
    }


export default AddPromotions; 