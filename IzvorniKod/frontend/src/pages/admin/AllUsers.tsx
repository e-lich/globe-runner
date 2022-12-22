import Navbar from "../../components/Navbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlayerCard from "../../components/PlayerCard";
import UserCard from "../../components/UserCard";
import EditProfilePopup from "../../components/EditProfilePopup";

// TODO - Ovaj kod je samo za testiranje, ovu cijelu komponentu treba reworkat vjerojatno ispočetka!!!

export default function AllUsers() {
  const navigate = useNavigate();

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage === null) navigate("/login");

    if (!(JSON.parse(userFromLocalStorage!).userType.toLowerCase() === "admin"))
      navigate("/home");
  });

  var allUsers:
    | Array<{
        username: string;
        userId: number;
        userImage: string;
      }>
    | undefined;

  const placeholder = require("../../images/profile_picture.jpg"); // TODO remove this and use actual picture!

  // mock location data that we need to switch with an API call
  allUsers = [
    {
      username: "peroZmaj",
      userId: 55,
      userImage: "pathToImage",
    },
    {
      username: "pericaZmaj",
      userId: 56,
      userImage: "pathToImage2",
    },
    {
      username: "peroZmaj",
      userId: 55,
      userImage: "pathToImage",
    },
    {
      username: "pericaZmaj",
      userId: 56,
      userImage: "pathToImage2",
    },
    {
      username: "peroZmaj",
      userId: 55,
      userImage: "pathToImage",
    },
    {
      username: "pericaZmaj",
      userId: 56,
      userImage: "pathToImage2",
    },
    {
      username: "peroZmaj",
      userId: 55,
      userImage: "pathToImage",
    },
    {
      username: "pericaZmaj",
      userId: 56,
      userImage: "pathToImage2",
    },
    {
      username: "peroZmaj",
      userId: 55,
      userImage: "pathToImage",
    },
    {
      username: "pericaZmaj",
      userId: 56,
      userImage: "pathToImage2",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="align-items-center Auth-container">
        <form className="Auth-form">
          <div className="closest-players-title">
            <h2>All Users:</h2>
          </div>
          <div className="closest-players">
            {allUsers!.map((user, key) => (
              <UserCard
                key={key}
                battle={false}
                username={user.username}
                oldUser={user}
              />
            ))}
          </div>
        </form>
      </div>
    </>
  );
}
