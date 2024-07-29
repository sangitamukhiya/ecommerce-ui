import React from "react";
import SellerProductList from "../component/SellerProductList";
import BuyerProductList from "../component/BuyerProductList";

const ProductList = () => {
  const userRole = localStorage.getItem("role");

  return (
    <>{userRole === "seller" ? <SellerProductList /> : <BuyerProductList />}</>
  );
};

export default ProductList;
