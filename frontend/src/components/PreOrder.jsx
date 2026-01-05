import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Lock, AlertCircle } from 'lucide-react';
import { apiRequest } from '../utils/api'; // ✅ Import helper
import './PreOrder.css';

const PreOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialProduct = location.state?.product || "Turbo Energy";
  const isLocked = location.state?.locked || false;

  const [formData, setFormData] = useState({
    flavor: initialProduct,
    quantity: 1,
    name: '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  });

  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      // ✅ Use the cleaner API helper
      await apiRequest('/orders', 'POST', formData);
      
      setStatus({ loading: false, error: null, success: true });
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: false });
    }
  };

  if (status.success) {
    return (
      <div className="preorder-success">
        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="success-message">
          <CheckCircle size={80} color="#4ade80" />
          <h2>Order Confirmed!</h2>
          <p>Redirecting to home...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="preorder-page">
      <button className="back-btn" onClick={() => navigate('/')}>
        <ArrowLeft size={20} /> Back
      </button>

      <motion.div className="form-container" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <h2>PRE-ORDER YOUR FUEL</h2>
        
        {status.error && (
          <div className="error-banner">
            <AlertCircle size={16} /> {status.error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Flavor</label>
            {isLocked ? (
              <div className="locked-input">
                <span>{formData.flavor}</span><Lock size={14} />
              </div>
            ) : (
              <select name="flavor" value={formData.flavor} onChange={handleChange}>
                <option value="Turbo Energy">Turbo Energy (Citrus Rush)</option>
                <option value="Pure Hydration">Pure Hydration (Ocean Blue)</option>
                <option value="Cold Brew">Cold Brew (Midnight Roast)</option>
              </select>
            )}
          </div>

          {/* ... (Keep the rest of your input fields exactly as they were) ... */}
          
          <div className="form-group">
            <label>Quantity</label>
            <input type="number" name="quantity" min="1" max="20" value={formData.quantity} onChange={handleChange} />
          </div>
          <div className="form-row">
            <input type="text" name="name" required placeholder="Full Name" onChange={handleChange} />
            <input type="tel" name="phone" required placeholder="Phone Number" onChange={handleChange} />
          </div>
          <textarea name="address" required placeholder="Shipping Address" rows="2" onChange={handleChange}></textarea>
          <div className="form-row">
            <input type="text" name="city" required placeholder="City" onChange={handleChange} />
            <input type="text" name="zip" required placeholder="Zip Code" onChange={handleChange} />
          </div>

          <button type="submit" className="submit-btn" disabled={status.loading}>
            {status.loading ? "PROCESSING..." : "CONFIRM PRE-ORDER"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default PreOrder;