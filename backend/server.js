require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// ✅ 1. Robust CORS Configuration
app.use(cors({
  origin: ["https://yumora-live.vercel.app", "http://localhost:5173"], // Allow Vercel & Localhost
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ 2. Connect Database (with error handling)
connectDB();

// ✅ 3. Health Check Route (To test if server is alive)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
// Note: Ensure your file names match EXACTLY (case-sensitive)
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));