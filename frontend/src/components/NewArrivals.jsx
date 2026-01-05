import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';
import './NewArrivals.css'; // ✅ Import the new CSS

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiRequest('/products')
      .then(data => setProducts(data.data || []))
      .catch(err => console.error("Failed to load products"));
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="new-arrivals-section">
      <div className="section-header">
        <h2>New Arrivals</h2>
        <div className="section-line"></div>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <motion.div 
            key={product._id} 
            className="arrival-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="card-image">
               <img src={product.image} alt={product.name} />
            </div>
            
            <div className="card-info">
              <div>
                <h3>{product.name}</h3>
                <span className="flavor-tag">{product.flavor}</span>
              </div>
              
              <div className="action-row">
                <span className="price">${product.price}</span>
                <button 
                  className="buy-now-btn"
                  onClick={() => navigate('/pre-order', { 
                    state: { product: product.flavor, locked: true } 
                  })}
                >
                  PRE-ORDER
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;