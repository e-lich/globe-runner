import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeafletMap from "../../components/LeafletMap";

import Navbar from "../../components/Navbar";
const placeholder = require("../../images/profile_picture.jpg");

export default function UserHome() {
  const navigate = useNavigate();

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
        <LeafletMap />
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
