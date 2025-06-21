const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const orderRoutes = require('./routes/orders');
app.use('/api/orders', orderRoutes);

const productRoutes = require('./routes/products');
app.use('/api/products',productRoutes)

const inventoryRoutes = require('./routes/inventory');
app.use('/api/inventory-logs',inventoryRoutes);

// DB Connect & Start Server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch(err => console.error('MongoDB connection failed:', err));
