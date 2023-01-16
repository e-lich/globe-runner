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
  const [fightResult, setFightResult] = useState<any>(null);

  const [endFightOpen, setEndFightOpen] = useState(false);
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
    try {
      setReady(true);
      await axios.post("fight/cards", {
        cardID1: chosenCards[0].cardID,
        cardID2: chosenCards[1].cardID,
        cardID3: chosenCards[2].cardID,
      });
    } catch (error: any) {
      if (error.response.status === 404) {
        alert("No fight found");
      } else {
        alert("Something went wrong");
      }
    }
  }

  useEffect(() => {
    let interval: any;
    if (ready) {
      interval = setInterval(async () => {
        await fetchFightResults();
      }, 10000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  async function fetchFightResults() {
    try {
      let response = await axios.get("/fight/result");
      if (response.data && response.data.points1) {
        setReady(false);
        setFightResult({
          points1: response.data.points1,
          points2: response.data.points2,
          winner: response.data.winner,
          eloScore: response.data.newElo,
          brokenCards: response.data.brokenCards,
        });
        setEndFightOpen(true);
      } else {
        console.log(response.data);
      }
    } catch (error: any) {
      alert("Something went wrong!");
      setReady(false);
      if (!fightResult) {
        navigate("/home");
      }
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
                      if (isCardPicked(InventoryCard)) {
                      } else {
                        pickThisCard(InventoryCard);
                      }
                    }}
                    hasPopup={false}
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
      {fightResult && (
        <EndFightDialog
          open={endFightOpen}
          onClose={() => {
            setEndFightOpen(false);
            navigate("/home");
          }}
          fightResults={fightResult}
        ></EndFightDialog>
      )}
    </Box>
  );
}
