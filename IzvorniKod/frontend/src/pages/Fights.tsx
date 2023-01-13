import {
  Box,
  Button,
  CircularProgress,
  Grid,
  List,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EndFightDialog from "../components/EndFightDialog";
import LocationCard from "../components/LocationCard";

export default function Fights() {
  const [InventoryCards, setInventoryCards] = useState([]);
  const [chosenCards, setChosenCards] = useState<any>([]);
  const [ready, setReady] = useState(false);
  const [fightResult, setFightResult] = useState<any>({
    points1: 12,
    points2: 23,
    winner: true,
    eloScore: 523,
    brokenCards: [],
  });

  const [endFightOpen, setEndFightOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getInventoryCards = async () => {
      const response = await axios.get("locations/owned");
      setInventoryCards(response.data);
    };

    getInventoryCards();
  }, []);

  function pickThisCard(InventoryCard: any) {
    if (chosenCards.length < 3) {
      setChosenCards([...chosenCards, InventoryCard]);
    }
  }

  function isCardPicked(InventoryCard: any) {
    if (chosenCards.length === 0) {
      return false;
    }
    for (let i = 0; i < chosenCards.length; i++) {
      if (chosenCards[i].cardID === InventoryCard.cardID) {
        return true;
      }
    }
    return false;
  }
  async function handleFight() {
    setReady(true);
    const response = await axios.post("fights/cards", {
      cardID1: chosenCards[0].cardID,
      cardID2: chosenCards[1].cardID,
      cardID3: chosenCards[2].cardID,
    });
    console.log(response);
  }

  useEffect(() => {
    let interval: any;
    if (ready) {
      interval = setInterval(async () => {
        console.log("Checking for battles!");
        await fetchFightResults();
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [ready]);

  async function fetchFightResults() {
    let response = await axios.get("fight/result");
    if (response.data && response.data.points) {
      console.log("FIGHT RESPONSE: " + response.data);
      setReady(false);
      // setFightResult({
      //   points1: response.data.points1,
      //   points2: response.data.points2,
      //   winner: response.data.winner,
      //   eloScore: response.data.eloScore,
      //   brokenCards: response.data.brokenCards,
      // });
      setEndFightOpen(true);
    } else {
      console.log("Other player not yet ready!!!!");
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h2" sx={{ textAlign: "center", fontWeight: "bold" }}>
        Pick 3 Cards to fight
      </Typography>
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
                    chosen={isCardPicked(InventoryCard)}
                    closestCard={InventoryCard}
                    hasButton={false}
                    buttonText={""}
                    buttonOnClick={() => {
                      console.log("");
                    }}
                    cardOnClick={() => {
                      pickThisCard(InventoryCard);
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
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {!ready ? (
          <Button
            disabled={chosenCards.length === 3 ? false : true}
            sx={{ display: "inline", mt: 4 }}
            size="large"
            onClick={() => {
              console.log("Fight");
              handleFight();
            }}
          >
            <Typography
              variant="h4"
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              Fight
            </Typography>
          </Button>
        ) : (
          <CircularProgress sx={{ mt: 4 }} />
        )}
      </Box>
      <EndFightDialog
        open={endFightOpen}
        onClose={() => {
          setEndFightOpen(false);
          navigate("/home");
        }}
        fightResults={fightResult}
      ></EndFightDialog>
    </Box>
  );
}
