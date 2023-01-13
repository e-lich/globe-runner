import { Box, Divider, List, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NavbarCustom from "../../components/navbars/PlayerNavbar";
import PlayerCard from "../../components/PlayerCard";
import WaitingForVictimDialog from "../../components/fights/WaitingForVictimDialog";

export default function NearbyPlayers() {
  const navigate = useNavigate();
  const [closestPlayers, setClosestPlayers] = useState<any>([]);

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage === null) navigate("/login");

    if (
      !JSON.parse(userFromLocalStorage!)
        .userType.toLowerCase()
        .includes("player")
    )
      navigate("/home");

    const getClosebyPlayers = async () => {
      const response = await axios.get("/players/close-by");
      setClosestPlayers(response.data);
      console.log(response.data);
    };

    getClosebyPlayers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavbarCustom />
      <Box justifyContent="center" display="flex" style={{ height: "90vh" }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h3" sx={{ m: 2, fontWeight: "bold" }}>
            Nearby players
          </Typography>

          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {closestPlayers.lenght !== 0 &&
              closestPlayers.map((closestPlayer: any, key: any) => (
                <>
                  <PlayerCard key={key} closestPlayer={closestPlayer} />
                  <Divider />
                </>
              ))}
          </List>
          {closestPlayers.length === 0 && (
            <Typography variant="body1" sx={{ m: 2 }}>
              No players nearby
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}
