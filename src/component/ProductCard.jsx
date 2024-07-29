import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Chip, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { fallbackImage } from "../constants/general.constant";

const ProductCard = (props) => {
  const params = useParams();

  // console.log(params)
  // console.log(props);
  const navigate = useNavigate();
  return (
    <Card
      sx={{ width: "360px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
    >
      <CardMedia
        sx={{
          height: 300,
          width: "100%",
          cursor: "pointer",
          objectFit: "cover",
        }}
        image={props?.image || fallbackImage}
        title={`${props?.name} -${props?.brand}`}
        onClick={() => {
          navigate(`/product-details/${props._id}`);
        }}
      />
      <CardContent>
        {/* //stack=div ho by default direction column */}
        <Stack direction="row" justifyContent="space-between">
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Chip label={props.brand} color="secondary" variant="outlined" />
        </Stack>
        <Typography variant="h6" sx={{ display: "flex" }}>
          Rs.{props.price}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            height: "80px",
            textAlign: "justify",
          }}
        >
          {props.description}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => {
            navigate(`/product-details/${props._id}`);
          }}
        >
          Explore
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
