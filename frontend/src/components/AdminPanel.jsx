import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, MapPin, Smartphone, Clock, LogOut, Search, 
  CheckCircle, Plus, Trash2, ShoppingBag 
} from 'lucide-react';
import { apiRequest } from '../utils/api';
import AdminLogin from './AdminLogin';
import './AdminPanel.css';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('adminAuth') === 'true'
  );
  
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'products'
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // New Product Form State
  const [newProduct, setNewProduct] = useState({ name: '', flavor: '', price: 29.99, description: '', image: '' });

  const fetchData = async () => {
    setLoading(true);
    try {
      const orderData = await apiRequest('/orders');
      setOrders(orderData.data || []);
      
      const productData = await apiRequest('/products');
      setProducts(productData.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) fetchData();
  }, [isAuthenticated]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await apiRequest('/products', 'POST', newProduct);
      setNewProduct({ name: '', flavor: '', price: 29.99, description: '' }); // Reset form
      fetchData(); // Refresh list
    } catch (err) {
      alert("Failed to add product");
    }
  };

  const handleDeleteProduct = async (id) => {
    if(!confirm("Delete this product permanently?")) return;
    try {
      await apiRequest(`/products/${id}`, 'DELETE');
      fetchData();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  if (!isAuthenticated) return <AdminLogin onLogin={() => { setIsAuthenticated(true); localStorage.setItem('adminAuth', 'true'); }} />;

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="brand">
          <h1>Command Center</h1>
        </div>
        <div className="tab-switcher">
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>Orders</button>
          <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Products</button>
        </div>
        <button onClick={handleLogout} className="logout-btn"><LogOut size={16} /> Logout</button>
      </header>

      {/* --- ORDERS TAB --- */}
      {activeTab === 'orders' && (
        <div className="table-wrapper">
          <table className="order-table">
            <thead>
              <tr><th>Date</th><th>Customer</th><th>Items</th><th>Address</th></tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td><strong>{order.name}</strong><br/><small>{order.phone}</small></td>
                  <td><span className="product-pill">{order.flavor}</span> x{order.quantity}</td>
                  <td>{order.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- PRODUCTS TAB --- */}
      {activeTab === 'products' && (
        <div className="products-manager">
          
          {/* Add Product Form */}
          <div className="add-product-card">
            <h3><Plus size={18}/> Add New Arrival</h3>
            <form onSubmit={handleAddProduct}>
          <div className="form-row">
            <input 
              type="text" 
              placeholder="Product Name (e.g. HyperFuel)" 
              value={newProduct.name} 
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} 
              required 
            />
            <input 
              type="text" 
              placeholder="Flavor (e.g. Cosmic Berry)" 
              value={newProduct.flavor} 
              onChange={(e) => setNewProduct({...newProduct, flavor: e.target.value})} 
              required 
            />
          </div>

          {/* ✅ NEW: Image URL Input */}
          <div className="form-row">
            <input 
              type="url" 
              placeholder="Image URL (e.g. https://imgur.com/...)" 
              value={newProduct.image} 
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} 
              style={{ gridColumn: 'span 2' }} // Make it full width
            />
          </div>

          <div className="form-row">
            <input 
              type="number" 
              placeholder="Price" 
              value={newProduct.price} 
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} 
              required 
            />
            <input 
              type="text" 
              placeholder="Description" 
              value={newProduct.description} 
              onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} 
            />
          </div>
          <button type="submit" className="add-btn">Launch Product</button>
        </form>
          </div>

          {/* Product List */}
          <div className="product-grid-admin">
            {products.map((p) => (
              <div key={p._id} className="admin-product-card">
                <div className="p-info">
                  <h4>{p.name}</h4>
                  <p className="p-flavor">{p.flavor}</p>
                  <p className="p-price">${p.price}</p>
                </div>
                <button className="delete-btn" onClick={() => handleDeleteProduct(p._id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;