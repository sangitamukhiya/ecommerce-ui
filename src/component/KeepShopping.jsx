import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const KeepShopping = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Typography variant="h6">No item is added to card...</Typography>
      <Button
        variant="contained"
        color="success"
        fullWidth
        onClick={() => {
          navigate("/products");
        }}
      >
        Keep Shopping
      </Button>
    </Box>
  );
};

export default KeepShopping;
