import { List, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NavbarCustom from "../../components/Navbar";
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
      <div className="align-items-center">
        <div className="closest-player-list">
          <div className="closest-players-title">
            <h2>Closest Players:</h2>
          </div>
          <hr />
          <hr />
          <div className="align-items-center">
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {closestPlayers.lenght !== 0 &&
                closestPlayers.map((closestPlayer: any, key: any) => (
                  <PlayerCard key={key} closestPlayer={closestPlayer} />
                ))}
              {closestPlayers.length === 0 && (
                <Typography variant="h6" sx={{ m: 2 }}>
                  No players nearby
                </Typography>
              )}
            </List>
          </div>
        </div>
      </div>
    </>
  );
}
