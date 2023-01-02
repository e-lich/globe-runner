import { Grid, List, Paper } from "@mui/material";
import { Card } from "react-bootstrap";
import LocationCard from "../LocationCard";

const InventoryCards = [
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

export default function UserInventory() {
  return (
    <>
      <Paper style={{ maxHeight: "73%", overflow: "auto" }} elevation={1}>
        <List sx={{ textAlign: "center", borderRadius: "0.5%" }}>
          <Grid container>
            {InventoryCards.map((InventoryCard, key) => (
              <Grid item xs={4} spacing={3}>
                <LocationCard
                  closestCard={InventoryCard}
                  hasButton={false}
                  buttonText={""}
                  buttonOnClick={() => {
                    console.log("");
                  }}
                  cardOnClick={() => {
                    console.log("Select this card.");
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </List>
      </Paper>
    </>
  );
}
