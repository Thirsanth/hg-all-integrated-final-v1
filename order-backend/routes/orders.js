const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
// const InventoryLog = require('../models/Inventory');
// const Product = require('../models/product')

// --- Fetch All Orders ---
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Fetch Single Order by ID ---
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Fetch All Order "Details" (alias for all orders) ---
router.get('/details/all', async (req, res) => {
  try {
    const details = await Order.find().sort({ createdAt: -1 });
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Fetch Single Order "Details" by Order ID ---
router.get('/details/:orderId', async (req, res) => {
  try {
    const details = await Order.findOne({ orderId: req.params.orderId });
    if (!details) return res.status(404).json({ message: 'Details not found' });
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// monthly stats
router.get('/order/monthly-stats', async (req, res) => {
  try {
    const orders = await Order.find();

    const monthlyStats = {};
    for (let month = 0; month < 12; month++) {
      monthlyStats[new Date(0, month).toLocaleString('default', { month: 'short' })] = {
        completed: 0,
        pending: 0,
        cancelled: 0,
      };
    }

    orders.forEach(order => {
      const month = new Date(order.createdAt).toLocaleString('default', { month: 'short' });
      if (monthlyStats[month]) {
        monthlyStats[month][order.orderStatus] += 1;
      }
    });

    res.json(monthlyStats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:orderId', async (req, res) => {
  try {
    const result = await Order.findOneAndDelete({ orderId: req.params.orderId });
    if (!result) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});



// GET all products
// router.get('/products', async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch products', error: err.message });
//   }
// });

// // GET product by ID
// router.get('/products/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: 'Product not found' });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch product', error: err.message });
//   }
// });

// // POST a new product
// router.post('/products', async (req, res) => {
//   try {
//     const newProduct = new Product(req.body);
//     const savedProduct = await newProduct.save();
//     res.status(201).json(savedProduct);
//   } catch (err) {
//     res.status(400).json({ message: 'Failed to add product', error: err.message });
//   }
// });

// // PATCH (update) a product by ID
// router.patch('/products/:id', async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true, runValidators: true } // Return the updated document and run schema validators
//     );
//     if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
//     res.json(updatedProduct);
//   } catch (err) {
//     res.status(400).json({ message: 'Failed to update product', error: err.message });
//   }
// });

// // DELETE a product by ID
// router.delete('/products/:id', async (req, res) => {
//   try {
//     const deletedProduct = await Product.findByIdAndDelete(req.params.id);
//     if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
//     res.json({ message: 'Product deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to delete product', error: err.message });
//   }
// });



// // GET all inventory logs
// router.get('/inventory-logs', async (req, res) => {
//   try {
//     const logs = await InventoryLog.find({}).sort({ date: -1 }); // Sort by date descending
//     res.json(logs);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch inventory logs', error: err.message });
//   }
// });

// // POST a new inventory log
// router.post('/inventory-logs', async (req, res) => {
//   try {
//     const newLog = new InventoryLog(req.body);
//     const savedLog = await newLog.save();
//     res.status(201).json(savedLog);
//   } catch (err) {
//     res.status(400).json({ message: 'Failed to add inventory log', error: err.message });
//   }
// });

module.exports = router;
