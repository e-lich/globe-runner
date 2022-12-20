import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserHomeMap from "../../components/UserHomeMap";

import Navbar from "../../components/Navbar";
import Button from "@mui/material/Button";
import { Grid } from "@material-ui/core";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
const placeholder = require("../../images/card_photo.png");

export default function UserHome() {
  const navigate = useNavigate();

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage === null) navigate("/login");

    if (
      !JSON.parse(userFromLocalStorage!)
        .userType.toLowerCase()
        .includes("player")
    )
      navigate("/home");
  });

  const closestCards = [
    {
      title: "Card_01",
      lat: 15.2132,
      lng: 45.154425,
      image: "../images/card_photo.jpg",
    },
    {
      title: "Card_02",
      lat: 15.214,
      lng: 45.1545,
      image: "../images/card_photo.jpg",
    },
    {
      title: "Card_03",
      lat: 15.215,
      lng: 45.15455,
      image: "../images/card_photo.jpg",
    },
    {
      title: "Card_04",
      lat: 15.2155,
      lng: 45.1546,
      image: "../images/card_photo.jpg",
    },
  ];

  const listItems = closestCards.map((closestCard, key) => (
    <li key={key}>
      <Box sx={{ justifyContent: "center", display: "flex" }}>
        <Card sx={{ width: 300, maxHeight: 200, m: 1 }}>
          <CardActionArea>
            <CardMedia
              sx={{ display: "flex", objectFit: "cover" }} //objfit
              height="100"
              component="img"
              image={placeholder}
              alt="beautiful landscape"
            />
            <CardContent sx={{ p: 0.5, justifyContent: "center" }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ justifyContent: "center", m: 0 }}
              >
                {closestCard.title}
              </Typography>
              <hr></hr>
            </CardContent>
          </CardActionArea>
          <CardActions sx={{ justifyContent: "center", p: 0.5 }}>
            <Button
              size="medium"
              color="primary"
              variant="contained"
              sx={{ p: 0.5 }}
            >
              Collect
            </Button>
          </CardActions>
        </Card>
      </Box>
    </li>
  ));

  return (
    <>
      <Navbar />
      <Grid container alignItems="center">
        <Grid item xs={12} sm={9} className="main">
          <UserHomeMap />
        </Grid>
        <Grid item xs={12} sm={3}>
          <div className="closest-cards-title">
            <h2>Closest Cards:</h2>
          </div>
          <hr />
          <hr />
          <ul className="closest-cards">{listItems}</ul>
        </Grid>
      </Grid>
    </>
  );
}
