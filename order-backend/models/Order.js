const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: String,
  amount: Number,
  status: {
    type: String,
    enum: ['pending', 'completed', 'refund', 'cancelled'],
    default: 'pending',
  },
  // paymentStatus: {
  //   type: String,
  //   enum: ['initiated', 'success', 'failed', 'refunded', 'cancelled'],
  //   default: 'initiated',
  // },
  orderStatus: {
    type: String,
    enum: ['pending', 'completed', 'refund', 'cancelled'],
    default: 'pending',
  },
  // productType: {
  //   type: String,
  //   enum: ['kids candies', 'adult candies', 'soul worms'],
  //   required: true,
  // },
  products: [
    {
      id: Number,
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    }
  ],
  payer: {
    email: String,
    name: String,
  },
  
  create_time: String,
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);