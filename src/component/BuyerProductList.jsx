import React, { useState } from "react";
import ProductCard from "./ProductCard";
import {
  Box,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import $axios from "../lib/axios/axios.instance";
import Loader from "./Loader";
import SearchIcon from "@mui/icons-material/Search";
import ProductFilterDialog from "./ProductFilterDialog";

import { useSelector } from "react-redux";

// import Loader from "./Loader";

const BuyerProductList = () => {
  const [searchText, setSearchText] = useState("");
  // console.log(searchText);
  const [currentPage, setCurrentPage] = useState(1);
  const { Category, minPrice, maxPrice } = useSelector(
    (state) => state.product
  );

  const { isPending, data } = useQuery({
    queryKey: [
      "get-buyer-products",
      currentPage,
      searchText,
      Category,
      minPrice,
      maxPrice,
    ],
    queryFn: async () => {
      return await $axios.post("/product/list/buyer", {
        page: currentPage,
        limit: 3,
        searchText: searchText || null,
        Category: Category || null,
        minPrice: minPrice || 0,
        maxPrice: maxPrice || 0,
      });
    },
  });

  const productList = data?.data?.productList;
  const totalPage = data?.data?.totalPage;

  if (isPending) {
    return <Loader />;
  }
  return (
    // <div>Buyer product</div>
    <>
      {/* <TextField
        placeholder="Search Product"
        variant="outlined"
        onChange={(event) => {
          const searchText = event?.target?.value;

          setSearchText(searchText);
        }}
      /> */}

      <Stack direction="row" spacing={4}>
        <ProductFilterDialog />
        <FormControl variant="standard">
          <OutlinedInput
            onChange={(event) => {
              setSearchText(event?.target?.value);
              setCurrentPage(1);
            }}
            placeholder="Search products here..."
            startAdornment={
              <InputAdornment position="start" sx={{ color: "purple" }}>
                <SearchIcon sx={{ fontSize: "2rem" }} />
              </InputAdornment>
            }
          />
        </FormControl>
      </Stack>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
          margin: "2rem 0",
        }}
      >
        {productList.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </Box>
      <Pagination
        page={currentPage}
        count={totalPage}
        color="secondary"
        onChange={(_, value) => {
          setCurrentPage(value);
        }}
      />
    </>
  );
};

export default BuyerProductList;
