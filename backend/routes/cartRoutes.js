const express = require('express');
const Cart = require('../models/Cart');

const router = express.Router();

// GET /api/cart/:userId
router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const totalPrice = cart.products.reduce((total, item) => total + item.productId.price * item.quantity, 0);
        res.json({ cart, totalPrice });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/cart
router.post('/', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity; // Update quantity
        } else {
            cart.products.push({ productId, quantity }); // Add new product
        }

        const savedCart = await cart.save();
        res.status(201).json(savedCart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /api/cart/:userId
router.put('/:userId', async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
        if (productIndex > -1) {
            cart.products[productIndex].quantity = quantity; // Update quantity
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/cart/:userId/:productId
router.delete('/:userId/:productId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        // Remove the product from the cart
        cart.products = cart.products.filter(item => item.productId.toString() !== req.params.productId);

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;