import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import $axios from "../lib/axios/axios.instance";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import {
  fallbackImage,
  productCategories,
} from "../constants/general.constant";
import addProductValidationSchema from "../validationSchema/add.product.schema";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";
import axios from "axios";

const EditProduct = () => {
  const [productImage, setProductImage] = useState(null);
  const [localUrl, setLocalUrl] = useState("");
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const productId = params?.id;

  //   fetch product details
  const { isPending, data } = useQuery({
    queryKey: ["get-product-details"],
    queryFn: async () => {
      return await $axios.post(`/product/details/${productId}`);
    },
  });
  // console.log(data);

  const productDetail = data?.data?.productDetails;

  //edit product api hit
  const { isPending: editProductPending, mutate } = useMutation({
    mutationKey: ["edit-product"],
    mutationFn: async (values) => {
      return await $axios.put(`/product/edit/${productId}`, values);
    },
    onSuccess: (res) => {
      navigate(`/product-details/${productId}`);
      dispatch(openSuccessSnackbar(res?.data?.message));
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });
  if (isPending) {
    return <CircularProgress />;
  }

  //fetch product details

  return (
    <Box>
      {editProductPending && <LinearProgress color="success" />}
      <Formik
        // enableReinitialize
        initialValues={{
          image: productDetail?.image || null,
          name: productDetail?.name || "",
          brand: productDetail?.brand || "",
          price: productDetail?.price || 0,
          availableQuantity: productDetail?.availableQuantity || 1,
          freeShipping: productDetail?.freeShipping || false,
          category: productDetail?.category || "",
          description: productDetail?.description || "",
        }}
        validationSchema={addProductValidationSchema}
        onSubmit={async (values) => {
          let imageUrl = null;
          if (productImage) {
            const data = new FormData();
            const cloudName = "djqkwapnn";
            const uploadPreset = "nepal_emart";

            data.append("file", productImage);
            data.append("upload_preset", uploadPreset);
            data.append("cloud_name", cloudName);
            try {
              setImageUploadLoading(true);
              const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
                data
              );
              imageUrl = response?.data?.secure_url;
              setImageUploadLoading(false);
            } catch (error) {
              setImageUploadLoading(false);
              console.log(error.message);
            }
          }

          values.image = imageUrl;
          mutate(values);
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "1rem",
              gap: "1rem",
              width: "450px",
              marginTop: "2rem",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            <Typography variant="h5">Edit Product</Typography>

            <Stack sx={{ height: "250px" }}>
              <img
                src={localUrl || productDetail?.image || fallbackImage}
                alt=""
                height="100%"
              />
            </Stack>
            <FormControl>
              <input
                type="file"
                onChange={(event) => {
                  const file = event.target.files[0];
                  setProductImage(file);
                  setLocalUrl(URL.createObjectURL(file));
                }}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Name"
                {...formik.getFieldProps("name")}
                required
              />

              {formik.touched.name && formik.errors.name ? (
                <FormHelperText error>{formik.errors.name}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Brand"
                {...formik.getFieldProps("brand")}
                required
              />
              {formik.touched.brand && formik.errors.brand ? (
                <FormHelperText error>{formik.errors.brand}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Price"
                {...formik.getFieldProps("price")}
                type="number"
                required
              />

              {formik.touched.price && formik.errors.price ? (
                <FormHelperText error>{formik.errors.price}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Quantity"
                {...formik.getFieldProps("availableQuantity")}
                type="number"
                required
              />

              {formik.touched.availableQuantity &&
              formik.errors.availableQuantity ? (
                <FormHelperText error>
                  {formik.errors.availableQuantity}
                </FormHelperText>
              ) : null}
            </FormControl>
            <FormControl fullWidth>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.freeShipping}
                    onChange={(event, value) => {
                      formik.setFieldValue("freeShipping", value);
                    }}
                  />
                }
                label="Free Shipping"
              />
              {/* {console.log(formik.values)} */}
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select label="Category" {...formik.getFieldProps("category")}>
                {productCategories.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>

              {formik.touched.category && formik.errors.category ? (
                <FormHelperText error>{formik.errors.category}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                required
                multiline
                rows={5}
                label="Description"
                {...formik.getFieldProps("description")}
              />
              {formik.touched.description && formik.errors.description ? (
                <FormHelperText error>
                  {formik.errors.description}
                </FormHelperText>
              ) : null}
            </FormControl>
            <Button fullWidth type="submit" variant="contained" color="success">
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EditProduct;
