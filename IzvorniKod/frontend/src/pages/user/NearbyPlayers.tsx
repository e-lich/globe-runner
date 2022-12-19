import {
  Avatar,
  Button,
  Icon,
  List,
  ListItem,
  ListItemAvatar,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarCustom from "../../components/Navbar";

export default function NearbyPlayers() {
  const navigate = useNavigate();

  const placeholder = require("../../images/profile_picture.jpg");
  const swords = require("../../images/swords.png");

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage === null) navigate("/signIn");

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

  const listItems = closestPlayers.map((closestPlayer, key) => (
    <ListItem alignItems="center" key={key} sx={{ justifyContent: "center" }}>
      <ListItemAvatar sx={{ m: 0 }}>
        <Avatar alt="profile picture" src={placeholder} />
      </ListItemAvatar>
      <div className="player-buttons">
        <Button
          size="medium"
          color="primary"
          onClick={() => {
            console.log("DISPLAY USER PROFILE");
          }}
        >
          {closestPlayer.username}
        </Button>
        <ChallengeIcon />
      </div>
    </ListItem>
  ));

  function ChallengeIcon() {
    return (
      <>
        <Navbar />
        <Button
          variant="text"
          color="primary"
          size="large"
          onClick={() => {
            console.log("CHALLENGE THIS USER");
          }}
        >
          <Icon>
            <div style={{ width: "100%", height: "100%" }}>
              <img
                src={swords}
                alt="battle"
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                  verticalAlign: "top",
                }}
              />
            </div>
          </Icon>
        </Button>
      </>
    );
  }

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
              {listItems}
            </List>
          </div>
        </div>
      </div>
    </>
  );
}
