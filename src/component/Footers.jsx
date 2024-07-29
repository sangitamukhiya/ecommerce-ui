import { Box, Typography } from "@mui/material";
import React from "react";

const Footers = () => {
  return (
    <Box
      sx={{
        background: "#BB8493",
        height: "70px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        padding: "0",
      }}
    >
      <Typography variant="h5" sx={{ color: "#fff" }}>
        © 2020 Copyright: Nepal Electronic Mart
      </Typography>
    </Box>
  );
};

export default Footers;
