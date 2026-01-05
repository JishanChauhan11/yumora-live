import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle, Lock, AlertCircle, 
  User, Smartphone, MapPin, Building, Hash, ShoppingBag 
} from 'lucide-react';
import { apiRequest } from '../utils/api';
import './PreOrder.css';

// Product configurations for visual mapping
const PRODUCT_VARIANTS = {
  "Turbo Energy": { color: "#eab308", tag: "Citrus Rush" },
  "Pure Hydration": { color: "#3b82f6", tag: "Ocean Blue" },
  "Cold Brew": { color: "#8d6e63", tag: "Midnight Roast" }
};

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

  const currentVariant = PRODUCT_VARIANTS[formData.flavor] || PRODUCT_VARIANTS["Turbo Energy"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      await apiRequest('/orders', 'POST', formData);
      setStatus({ loading: false, error: null, success: true });
      setTimeout(() => navigate('/'), 3500);
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: false });
    }
  };

  if (status.success) {
    return (
      <div className="preorder-success">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="success-card"
        >
          <div className="success-icon">
            <CheckCircle size={64} color="#10b981" />
          </div>
          <h2>Order Secured!</h2>
          <p>We have received your pre-order for <strong>{formData.flavor}</strong>.</p>
          <p className="sub-text">Redirecting you to the homepage...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="preorder-page">
      <div className="preorder-container">
        
        {/* HEADER SECTION */}
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={20} /> <span className="desktop-only">Back</span>
          </button>
          <h1>Secure Your Supply</h1>
        </div>

        <div className="content-grid">
          {/* LEFT COL: PRODUCT SUMMARY */}
          <motion.div 
            className="summary-card"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="card-header">
              <ShoppingBag size={20} className="header-icon" />
              <h3>Order Summary</h3>
            </div>

            <div className="product-preview" style={{ '--variant-color': currentVariant.color }}>
              <div className="product-glow"></div>
              <div className="product-details">
                <span className="variant-tag">{currentVariant.tag}</span>
                <h2>{formData.flavor}</h2>
                {isLocked && <div className="locked-badge"><Lock size={12} /> Selection Locked</div>}
              </div>
            </div>

            <div className="summary-row">
              <label>Flavor</label>
              {isLocked ? (
                <span className="value locked">{formData.flavor}</span>
              ) : (
                <select 
                  name="flavor" 
                  value={formData.flavor} 
                  onChange={handleChange}
                  className="flavor-select"
                >
                  {Object.keys(PRODUCT_VARIANTS).map(flavor => (
                    <option key={flavor} value={flavor}>{flavor}</option>
                  ))}
                </select>
              )}
            </div>

            <div className="summary-row">
              <label>Quantity (6-Pack)</label>
              <div className="qty-control">
                <input 
                  type="number" 
                  name="quantity" 
                  min="1" 
                  max="50" 
                  value={formData.quantity} 
                  onChange={handleChange} 
                />
              </div>
            </div>
          </motion.div>

          {/* RIGHT COL: SHIPPING FORM */}
          <motion.div 
            className="form-card"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card-header">
              <h3>Shipping Details</h3>
            </div>

            {status.error && (
              <div className="error-banner">
                <AlertCircle size={16} /> {status.error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="input-group full">
                  <User className="input-icon" size={18} />
                  <input type="text" name="name" required placeholder="Full Name" onChange={handleChange} />
                </div>

                <div className="input-group full">
                  <Smartphone className="input-icon" size={18} />
                  <input type="tel" name="phone" required placeholder="Phone Number" onChange={handleChange} />
                </div>

                <div className="input-group full">
                  <MapPin className="input-icon" size={18} />
                  <textarea name="address" required placeholder="Street Address" rows="2" onChange={handleChange}></textarea>
                </div>

                <div className="input-group">
                  <Building className="input-icon" size={18} />
                  <input type="text" name="city" required placeholder="City" onChange={handleChange} />
                </div>

                <div className="input-group">
                  <Hash className="input-icon" size={18} />
                  <input type="text" name="zip" required placeholder="Zip Code" onChange={handleChange} />
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={status.loading}>
                {status.loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>CONFIRM PRE-ORDER <span className="arrow">→</span></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PreOrder;