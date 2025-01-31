const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().limit(10);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/products
router.post("/", async (req, res) => {
  const product = new Product(req.body);
  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
