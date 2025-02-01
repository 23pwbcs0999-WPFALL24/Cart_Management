import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import Product from "./Product";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Replace YOUR_VERCEL_URL with your actual Vercel deployment URL
        const response = await axios.get(
          "https://cart-management.vercel.app/api/products"
        );
        // Ensure response.data is an array
        setProducts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Set to empty array on error
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map((product) => (
          <Product key={product._id} product={product} addToCart={addToCart} />
        ))
      )}
    </div>
  );
};

export default ProductList;
