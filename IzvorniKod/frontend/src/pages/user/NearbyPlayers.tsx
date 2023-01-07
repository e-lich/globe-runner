import { List } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NavbarCustom from "../../components/Navbar";
import PlayerCard from "../../components/PlayerCard";

export default function NearbyPlayers() {
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

  const closestPlayers = [
    {
      photo: "../images/profile_picture.jpg",
      username: "Player_01",
      fullName: "Player_01",
      email: "lovro.kovacic@gmail.com",
      userType: "Player",
    },
    {
      photo: "../images/profile_picture.jpg",
      username: "Player_02",
      fullName: "Player_02",
      email: "lovro.kovacic@gmail.com",
      userType: "Player",
    },
    {
      photo: "../images/profile_picture.jpg",
      username: "Player_03",
      fullName: "Player_03",
      email: "lovro.kovacic@gmail.com",
      userType: "Player",
    },
    {
      photo: "../images/profile_picture.jpg",
      username: "Player_04",
      fullName: "Player_04",
      email: "lovro.kovacic@gmail.com",
      userType: "Player",
    },
  ];
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
              {closestPlayers.map((closestPlayer, key) => (
                <PlayerCard key={key} closestPlayer={closestPlayer} />
              ))}
            </List>
          </div>
        </div>
      </div>
    </>
  );
}
