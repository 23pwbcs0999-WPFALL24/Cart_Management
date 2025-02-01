import React from "react";

const Product = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product._id, 1)}>Add to Cart</button>
    </div>
  );
};

export default Product;
