import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
const placeholder = require("../images/profile_picture.jpg");

export default function Home() {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (localStorage.getItem("user") === null) navigate("/signIn");
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
    <li key={key}>
      <div className="player-information">
        <img className="player--image" src={placeholder} alt=""></img>
        <div className="player--username">
          <div>{closestPlayer.username}</div>
        </div>
      </div>
      <div className="player-buttons">
        <button>View Profile</button>
        <button>Battle</button>
      </div>
      <hr />
    </li>
  ));

  return (
    <>
      <Navbar />
      <section className="main">
        {/* <Map /> */}
        <div id="map">
          <h1 className="map-placeholder">Map Placeholder</h1>
          <h1>Map currently doesn't work!</h1>
        </div>
        <div className="closest-player-list">
          <div className="closest-players-title">
            <h2>Closest Players:</h2>
          </div>
          <hr />
          <hr />
          <ul className="closest-players">{listItems}</ul>
        </div>
      </section>
    </>
  );
}
