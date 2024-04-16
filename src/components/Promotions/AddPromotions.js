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
        percentoffPromo: false,
        valueoffPromo: true,
        percentoff: 0,
        valueoff: 0
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
        try {
            // Send form data to your server, which will interact with MongoDB
            axios.post('http://localhost:3000/promotions/', formData); // Replace with your server endpoint
            console.log('Form submitted successfully:', formData);
            //clear
          } catch (error) {
            console.error('Error submitting form:', error);
          }

        setFormData({
            name: '',
            promoCode: '',
            description: '',
            percentoffPromo: false,
            valueoffPromo: true,
            percentoff: 0,
            valueoff: 0
          });
      };

     
    
      return (
        <div id="add-promo-page">
        <div id="add-promo-header">
            <h1>E-Cinema Booking</h1>
        </div>
        <div id="add-promo">
            <h2>Add Promo</h2>
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
            <input type="checkbox" name="percentoffPromo" checked={formData.percentoffPromo} onChange={handleChange} />
          </label>
          <div></div>
          <label className="add-promo-label">
            Value Off Promo:
            <div></div>
            <input type="checkbox" name="valueoffPromo" checked={formData.valueoffPromo} onChange={handleChange} />
          </label>
          <div></div>
          {formData.percentoffPromo && (
            <label className="add-promo-label">
              Percent Off (decimal notation):
              <div></div>
              <input type="number" name="percentoff" value={formData.percentoff} onChange={handleChange} />
            </label>
          )}
          <div></div>
          {formData.valueoffPromo && (
            <label className="add-promo-label">
              Value Off:
              <div></div>
              <input type="number" name="valueoff" value={formData.valueoff} onChange={handleChange} />
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