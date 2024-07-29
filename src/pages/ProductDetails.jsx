import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import $axios from "../lib/axios/axios.instance";
import DeleteProductDialog from "../component/DeleteProductDialog";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";
import { fallbackImage } from "../constants/general.constant";
import Loader from "../component/Loader";
// Box => div
// Stack => div which has display flex and direction column
const ProductDetail = () => {
  const dispatch = useDispatch();
  // const [productCount, setProductCount] = useState(1);
  const [orderedQuantity, setOrderedQuantity] = useState(1);
  const navigate = useNavigate();
  const params = useParams();
  const productId = params?.id;

  const queryClient = useQueryClient();
  // get user role
  const userRole = localStorage.getItem("role");

  //   fetch product details
  const { isPending, data } = useQuery({
    queryKey: ["get-product-detail"],
    queryFn: async () => {
      return await $axios.post(`/product/details/${productId}`);
    },
  });

  const productDetail = data?.data?.productDetails;
  //order quantity tracking

  //add to card api hit
  const { isPending: addItemToCartPending, mutate } = useMutation({
    mutationKey: ["add-item-to-cart"],
    mutationFn: async () => {
      return await $axios.post("/cart/item/add", {
        productId,
        orderedQuantity,
      });
    },

    onSuccess: (res) => {
      navigate("/carts");
      dispatch(openSuccessSnackbar(res?.data?.message));
      QueryClient.invalidateQueries("get-cart-item-count");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  // console.log(productDetail);
  // return <div>productDetails</div>;

  if (isPending || addItemToCartPending) {
    return <Loader />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        padding: "3rem",
        mt: "5rem",
        width: "70%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "50%",
        }}
      >
        <img
          src={productDetail?.image || fallbackImage}
          alt=""
          style={{ width: "90%" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "flex-start",
          // width: "500px",
          gap: "2rem",
        }}
      >
        <Typography variant="h5">{productDetail?.name}</Typography>
        <Chip
          label={productDetail?.brand}
          variant="outlined"
          color="success"
          sx={{ fontSize: "1rem" }}
        />
        <Typography sx={{ textAlign: "justify" }}>
          {productDetail?.description}
        </Typography>
        <Typography variant="h6">Price: Rs.{productDetail?.price}</Typography>

        <Chip
          variant="outlined"
          color="success"
          label={productDetail?.category}
          sx={{ fontSize: "1rem", textTransform: "capitalize" }}
        />

        <Typography variant="h6">
          Available quantity: {productDetail?.availableQuantity}
        </Typography>

        <Stack direction="row" spacing={4}>
          <Typography variant="h6">Free shipping:</Typography>
          <Chip
            variant="outlined"
            color={productDetail.freeShipping ? "success" : "error"}
            label={productDetail.freeShipping ? "Yes" : "No"}
            sx={{ fontSize: "1rem" }}
          />
        </Stack>

        {userRole === "seller" && (
          <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<EditIcon />}
              fullWidth
              onClick={() => {
                navigate(`/product-edit/${productDetail?._id}`);
              }}
            >
              Edit
            </Button>

            <DeleteProductDialog />
          </Stack>
        )}

        {userRole === "buyer" && (
          <>
            {""}
            <Stack direction="row" spacing={2}>
              <IconButton
                disabled={setOrderedQuantity === 1}
                onClick={() => {
                  setOrderedQuantity((prev) => prev - 1);
                }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="h5">{setOrderedQuantity}</Typography>
              <IconButton
                disabled={
                  setOrderedQuantity === productDetail?.availableQuantity
                }
                onClick={() => {
                  setOrderedQuantity((prev) => prev + 1);
                }}
              >
                <AddIcon />
              </IconButton>
            </Stack>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                mutate();
              }}
            >
              Add to cart
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProductDetail;
