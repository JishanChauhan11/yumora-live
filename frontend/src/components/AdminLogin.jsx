import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Fingerprint, ChevronRight, AlertTriangle } from 'lucide-react';
import { apiRequest } from '../utils/api';
import './AdminLogin.css'; // ✅ CHANGED THIS IMPORT

// ... (Rest of component stays exactly the same)

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await apiRequest('/admin/login', 'POST', { password });
      onLogin(); 
    } catch (err) {
      setError('ACCESS DENIED');
      // Shake animation trigger can go here if we used more complex state
    }
    setLoading(false);
  };

  return (
    <div className="admin-login-wrapper">
      <div className="login-background">
        <div className="grid-overlay"></div>
      </div>

      <motion.div 
        className="login-card"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Security Icon Header */}
        <div className="security-header">
          <div className="icon-circle">
            <Fingerprint size={48} className="fingerprint-icon" />
            <motion.div 
              className="scan-line"
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <h2>SYSTEM LOCKED</h2>
          <p>Restricted Personnel Only</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={`input-container ${error ? 'error-state' : ''}`}>
            <Lock size={18} className="field-icon" />
            <input 
              type="password" 
              placeholder="Enter Access Key" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading || !password} className="unlock-btn">
            {loading ? (
              <span className="spinner"></span>
            ) : (
              <>AUTHENTICATE <ChevronRight size={18} /></>
            )}
          </button>
        </form>

        {error && (
          <motion.div 
            className="error-banner"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <AlertTriangle size={16} /> {error}
          </motion.div>
        )}

        <div className="system-status">
          <div className="status-dot"></div> Secure Connection Active
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;