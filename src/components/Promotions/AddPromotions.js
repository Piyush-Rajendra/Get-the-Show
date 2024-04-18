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
  let newValue = type === 'checkbox' ? checked : value;

  if (name === 'percentoffPromo' && newValue) {
    setFormData({
      ...formData,
      percentoffPromo: true,
      valueoffPromo: false,
      percentoff: Math.max(0, Math.min(1, formData.percentoff)), 
      valueoff: 0
    });
  } else if (name === 'valueoffPromo' && newValue) {
    setFormData({
      ...formData,
      percentoffPromo: false,
      valueoffPromo: true,
      percentoff: 0,
      valueoff: 0
    });
  } else if ((name === 'percentoffPromo' && !newValue && formData.valueoffPromo) ||
            (name === 'valueoffPromo' && !newValue && formData.percentoffPromo)) {
    setFormData({
      ...formData,
      percentoffPromo: false,
      valueoffPromo: false,
      percentoff: 0,
      valueoff: 0
    });
  } else {
    if (name === 'percentoff') {
      newValue = Math.max(0, Math.min(1, newValue)); 
    }
    setFormData({
      ...formData,
      [name]: newValue
    });
  }
};

const navigate = useNavigate();
    
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.promoCode || !formData.description ||
        (formData.percentoffPromo && !formData.percentoff) ||
        (formData.valueoffPromo && !formData.valueoff)) {
      alert('Please fill out all required fields.');
      return;
    }
    try {
        axios.post('http://localhost:3000/promotions/', formData); 
        navigate("/promotions");
      } catch (error) {
        alert("Error submitting promotion :" + error);
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
        <Link to="/promotions">
          <button className="backButtonPromotionUserAdmin">Back</button>
        </Link>   
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