import { Grid, List, Paper } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import LocationCard from "../LocationCard";

export default function UserInventory() {
  const [InventoryCards, setInventoryCards] = useState([]);

  useEffect(() => {
    const getInventoryCards = async () => {
      const response = await axios.get("locations/owned");
      setInventoryCards(response.data);
    };

    getInventoryCards();
  }, []);

  return (
    <>
      <Paper
        style={{
          height: "40em",
          maxHeight: "40em",
          overflow: "auto",
        }}
        elevation={1}
      >
        <List sx={{ textAlign: "center", borderRadius: "0.5%" }}>
          <Grid container>
            {InventoryCards.map((InventoryCard, key) => (
              <Grid item xs={4} key={key}>
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
