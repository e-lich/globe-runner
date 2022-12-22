import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserHomeMap from "../../components/UserHomeMap";
import LocationCard from "../../components/LocationCard";
import { List } from "@mui/material";

import Navbar from "../../components/Navbar";
import { Grid, Paper } from "@material-ui/core";

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

  return (
    <>
      <Navbar />
      <Grid container>
        <Grid item xs={12} sm={9} style={{ height: "70vh" }}>
          <UserHomeMap />
        </Grid>
        <Grid item xs={12} sm={3}>
          <div className="closest-cards-title">
            <h2>Closest Cards:</h2>
          </div>
          <Paper style={{ maxHeight: "45%", overflow: "auto" }}>
            <List sx={{ textAlign: "center", border: 2 }}>
              {closestCards.map((closestCard, key) => (
                <LocationCard
                  key={key}
                  closestCard={closestCard}
                  hasButton={true}
                  buttonText={"Collect"}
                  buttonOnClick={() => {
                    console.log("Collect this card.");
                  }}
                  cardOnClick={() => {
                    console.log("You clicked on the card.");
                  }}
                />
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
