import {
  List,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ChallengeIcon from "../../components/ChallengeIcon";
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
      image: "../images/profile_picture.jpg",
      username: "Player_01",
    },
    {
      image: "../images/profile_picture.jpg",
      username: "Player_02",
    },
    {
      image: "../images/profile_picture.jpg",
      username: "Player_03",
    },
    {
      image: "../images/profile_picture.jpg",
      username: "Player_04",
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
                <PlayerCard
                  key={key}
                  closestPlayer={closestPlayer}
                  battle={true}
                />
              ))}
            </List>
          </div>
        </div>
      </div>
    </>
  );
}
