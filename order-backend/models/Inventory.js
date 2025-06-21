const mongoose = require('mongoose');

const inventoryLogSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true },
  sku: { type: String, required: true },
  date: { type: Date, default: Date.now },
  quantityChange: { type: Number, required: true },
  actionType: {
    type: String,
    enum: ['Added', 'Removed', 'Updated'],
    required: true
  },
  by: { type: String, required: true },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('InventoryLog', inventoryLogSchema);