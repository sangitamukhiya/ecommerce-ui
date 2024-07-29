import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  LinearProgress,
  Stack,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { Formik } from "formik";

import { productCategories } from "../constants/general.constant";
import addProductValidationSchema from "../validationSchema/add.product.schema";
import { useNavigate } from "react-router-dom";
import $axios from "../lib/axios/axios.instance";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";
import axios from "axios";

const AddProduct = () => {
  const [productImage, setProductImage] = useState(null);
  const [localUrl, setLocalUrl] = useState("");

  const [imageUploadLoding, setImageUploadLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["add-product"],
    mutationFn: async (values) => {
      return await $axios.post("/product/add", values);
    },
    onSuccess: (res) => {
      navigate("/products");
      dispatch(openSuccessSnackbar(res?.data?.message));
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });
  if (isPending || imageUploadLoding) {
    return <CircularProgress />;
  }
  return (
    <>
      {/* {isPending && <LinearProgress color="success" />} */}
      <Box>
        <Formik
          initialValues={{
            image: null,
            name: "",
            brand: "",
            price: 0,
            availableQuantity: 1,
            freeShipping: false,
            category: "",
            description: "",
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
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <Typography variant="h5">Add Product</Typography>
              {localUrl && (
                <Stack sx={{ height: "250px" }}>
                  <img src={localUrl} alt="" height="100%" />
                </Stack>
              )}
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

              {/* <FormControl fullWidth>
                <TextField
                  label="Price"
                  {...formik.getFieldProps("price")}
                  type="number"
                  required
                />

                {formik.touched.price && formik.errors.price ? (
                  <FormHelperText error>{formik.errors.price}</FormHelperText>
                ) : null}
              </FormControl> */}
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel>Price</InputLabel>
                <OutlinedInput
                  startAdornment={
                    <InputAdornment position="start">Rs.</InputAdornment>
                  }
                  label="Price"
                  {...formik.getFieldProps("price")}
                />
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
                    <Checkbox {...formik.getFieldProps("freeShipping")} />
                  }
                  label="Free Shipping"
                />
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
                  <FormHelperText error>
                    {formik.errors.category}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  required
                  multiline
                  rows={4}
                  label="Description"
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description ? (
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                ) : null}
              </FormControl>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="success"
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default AddProduct;
