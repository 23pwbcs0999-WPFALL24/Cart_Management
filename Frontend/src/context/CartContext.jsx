import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const userId = "1";
  const baseURL = "https://cart-management.vercel.app";

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/cart/${userId}`);

        setCartItems(response.data.cart ? response.data.cart.products : []);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartItems([]);
      }
    };
    fetchCart();
  }, [userId]);

  const addToCart = async (productId, quantity) => {
    try {
      await axios.post(`${baseURL}/api/cart`, { userId, productId, quantity });
      const updatedCart = await axios.get(`${baseURL}/api/cart/${userId}`);
      setCartItems(updatedCart.data.cart.products);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  //   const removeFromCart = async (productId) => {
  //     try {
  //       await axios.delete(`${baseURL}/api/cart/${productId}`);
  //       const updatedCart = await axios.get(`${baseURL}/api/cart/${userId}`);
  //       setCartItems(updatedCart.data.cart.products);
  //     } catch (error) {
  //       console.error("Error removing from cart:", error);
  //     }
  //   };
  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete(`${baseURL}/api/cart/${cartItemId}`);
      const updatedCart = await axios.get(`${baseURL}/api/cart/${userId}`);
      setCartItems(updatedCart.data.cart.products);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
