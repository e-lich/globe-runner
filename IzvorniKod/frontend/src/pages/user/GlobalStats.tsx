import PlayerNavbar from "../../components/navbars/PlayerNavbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, List, Typography } from "@mui/material";
import LeaderboardPlayers from "./LeaderboardPlayers";

export default function GlobalStats() {
  const navigate = useNavigate();

  const [globalStats, setGlobalStats] = useState<any>(null);

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage === null) navigate("/login");

    if (
      !JSON.parse(userFromLocalStorage!)
        .userType.toLowerCase()
        .includes("player")
    )
      navigate("/home");

    const fetchGlobalStats = async () => {
      const response = await axios.get("/stats/leaderboard");
      setGlobalStats(response.data);
      console.log(globalStats);
    };

    fetchGlobalStats();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PlayerNavbar />
      <Box justifyContent="center" display="flex">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5" sx={{ m: 2, fontWeight: "bold" }}>
            Global Stats
          </Typography>
          {globalStats && (
            <>
              <Typography variant="h6">
                {globalStats.numberOfFights} fights played
              </Typography>
              <Typography variant="h6">
                {globalStats.numberOfPlayers} total players
              </Typography>
              <Typography variant="h5" sx={{ m: 2, fontWeight: "bold" }}>
                Leaderboard
              </Typography>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {globalStats.topPlayers.map((topPlayer: any, key: number) => (
                  <LeaderboardPlayers
                    key={key}
                    topPlayer={topPlayer}
                    counter={key}
                  />
                ))}
              </List>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
