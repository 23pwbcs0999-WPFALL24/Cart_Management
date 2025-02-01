import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.productId._id} className="cart-item">
            <h3>{item.productId.name}</h3>
            <p>Quantity: {item.quantity}</p>
            {/* <button onClick={() => removeFromCart(item._id)}>Remove</button> */}
            <button onClick={() => removeFromCart(item.productId._id)}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
