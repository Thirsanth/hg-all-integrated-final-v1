
const express = require('express');
const router = express.Router();
const InventoryLog = require("../models/Inventory");

router.get('/', async (req, res) => {
  try {
    const logs = await InventoryLog.find({}).sort({ date: -1 }); // Sort by date descending
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch inventory logs', error: err.message });
  }
});

// POST a new inventory log
router.post('/', async (req, res) => {
  try {
    const newLog = new InventoryLog(req.body);
    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add inventory log', error: err.message });
  }
});

module.exports = router;