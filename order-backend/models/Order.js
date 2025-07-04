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
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
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
  address: {
    contact: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
    },
    shipping: {
      house: String,
      addressLine: String,
      city: String,
      state: String,
      postalCode: String,
      landmark: String,
    },
    billing: {
      house: String,
      addressLine: String,
      city: String,
      state: String,
      postalCode: String,
      landmark: String,
    }
  },
  create_time: String,
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);