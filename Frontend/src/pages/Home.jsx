import React from "react";
import ProductList from "../Components/ProductList";

const Home = () => {
  return (
    <div>
      <h2 style={{ textAlign: "center", color: "white", fontSize: "1.8rem" }}>
        Product List
      </h2>
      <ProductList />
    </div>
  );
};

export default Home;
