import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

const OrderSummary = ({ orderSummary }) => {
  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h6">Order Summary</Typography>
        </Toolbar>
        <Table
          sx={{
            width: "400px",
          }}
        >
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography>Sub total</Typography>
              </TableCell>
              <TableCell>
                <Typography>Rs. {orderSummary?.allProductSubTotal}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>Discount</Typography>
              </TableCell>
              <TableCell>
                <Typography>Rs. {orderSummary?.discountAmount}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>Grand total</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: "bold" }}>
                  Rs. {orderSummary?.grandTotal}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ borderRadius: 0 }}
        >
          proceed to checkout
        </Button>
      </TableContainer>
    </Box>
  );
};

export default OrderSummary;
