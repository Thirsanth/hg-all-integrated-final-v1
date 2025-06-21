const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  sku: { type: String, required: true, unique: true },
  description: { type: String },
  stockQty: { type: Number, required: true, default: 0 },
  status: {
    type: String,
    enum: ['Full Stock', 'Low Stock', 'Out of Stock'],
    default: 'Full Stock'
  },
  image: { type: String },
  tags: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);