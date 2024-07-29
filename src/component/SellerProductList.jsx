import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Box, Pagination } from "@mui/material";
import ProductCard from "./ProductCard";
import $axios from "../lib/axios/axios.instance";
import SellProductPrompt from "./SellerProductPrompt";
import Loader from "./Loader";

const SellerProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // return <div>sellerProductlist</div>;
  const navigate = useNavigate();
  const { isPending, data } = useQuery({
    queryKey: ["get-seller-products", currentPage],
    queryFn: async () => {
      return await $axios.post("/product/list/seller", {
        page: currentPage,
        limit: 3,
      });
    },
  });

  const productList = data?.data?.productList;
  // console.log(productList);
  const totalPage = data?.data?.totalPage;

  if (isPending) {
    return <Loader />;
  }
  // return <div>sellerProductlist</div>;

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          navigate("/add-product");
        }}
        sx={{ mb: "2rem", marginTop: "2rem" }}
      >
        Add Product
      </Button>

      {productList.length === 0 && <SellProductPrompt />}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
          mb: "2rem",
        }}
      >
        {productList.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </Box>
      <Pagination
        count={totalPage}
        color="secondary"
        page={currentPage}
        onChange={(_, value) => {
          setCurrentPage(value);
        }}
      />
    </>
  );
};

export default SellerProductList;
