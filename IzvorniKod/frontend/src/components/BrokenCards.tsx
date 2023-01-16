import { Box, Grid, List, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import LocationCard from "./LocationCard";

export default function BrokenCards() {
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
      {InventoryCards.length > 0 && (
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
      )}
      {InventoryCards.length === 0 && (
        <Box justifyContent="center" display="flex">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ width: 0.4, minHeight: "70vh" }}
          >
            <Typography
              variant="h6"
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              You are broke. You have no locations.
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
}
