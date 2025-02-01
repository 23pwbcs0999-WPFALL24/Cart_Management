const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate(
      "products.productId"
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const totalPrice = cart.products.reduce((total, item) => {
      const price = item.productId?.price || 0;
      return total + price * item.quantity;
    }, 0);

    res.json({ cart, totalPrice });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity; // Update quantity
    } else {
      cart.products.push({ productId, quantity }); // Add new product
    }

    const savedCart = await cart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding to cart", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ "products._id": req.params.id });
    if (!cart) return res.status(404).json({ message: "Cart item not found" });

    const product = cart.products.find(
      (item) => item._id.toString() === req.params.id
    );
    if (!product)
      return res.status(404).json({ message: "Product not found in cart" });

    product.quantity = quantity; // Update quantity
    await cart.save();
    res.json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating cart", error: error.message });
  }
});

// router.delete("/:id", async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ "products._id": req.params.id });
//     if (!cart) return res.status(404).json({ message: "Cart item not found" });

//     cart.products = cart.products.filter(
//       (item) => item._id.toString() !== req.params.id
//     );

//     if (cart.products.length === 0) {
//       await Cart.findByIdAndDelete(cart._id); // Delete empty cart
//       return res.json({ message: "Cart emptied successfully" });
//     }

//     await cart.save();
//     res.json(cart);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error deleting from cart", error: error.message });
//   }
// });
// router.delete("/:id", async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ "products._id": req.params.id });
//     if (!cart) return res.status(404).json({ message: "Cart item not found" });

//     cart.products = cart.products.filter(
//       (item) => item._id.toString() !== req.params.id
//     );

//     if (cart.products.length === 0) {
//       await Cart.findByIdAndDelete(cart._id); // Delete empty cart
//       return res.json({ message: "Cart emptied successfully" });
//     }

//     await cart.save();
//     res.json(cart);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error deleting from cart", error: error.message });
//   }
// });
router.delete("/:id", async (req, res) => {
  try {
    let cart = await Cart.findOne({ "products._id": req.params.id });

    if (!cart) return res.status(404).json({ message: "Cart item not found" });

    // Remove the item from the products array
    cart.products = cart.products.filter(
      (item) => item._id.toString() !== req.params.id
    );

    if (cart.products.length === 0) {
      await Cart.deleteOne({ _id: cart._id }); // Ensure cart is deleted properly
      return res.json({ message: "Cart emptied successfully" });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting from cart", error: error.message });
  }
});

module.exports = router;
