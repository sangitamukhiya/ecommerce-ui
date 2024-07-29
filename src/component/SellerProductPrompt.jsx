import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const SellProductPrompt = () => {
  return (
    <Box
      sx={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",

        boxShadow:
          " rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      }}
    >
      <Typography variant="h6">
        Listing your products is the first step to unlocking the full potential
        of our e-commerce platform.
      </Typography>
      <Link to="/add-product">Add product and begin your business here...</Link>
    </Box>
  );
};

export default SellProductPrompt;
