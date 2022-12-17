import Navbar from "../../components/Navbar";
import React, { useEffect } from "react";
import "./AllUsers.css";
import { useNavigate } from "react-router-dom";

export default function AllUsers() {
  const navigate = useNavigate();

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage === null) navigate("/signIn");

    if (!(JSON.parse(userFromLocalStorage!).userType === "admin"))
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
  var mockAllUsers = [
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

  function getAllUsers() {
    // TODO change this with get request for all users!
    allUsers = mockAllUsers; // TODO change this to the return value of the post request!
  }

  if (allUsers)
    var listItems = allUsers!.map((user, key) => (
      <li key={key}>
        <div className="user-information">
          <img className="user--image" src={placeholder} alt=""></img>
          <div className="user--username">
            <div>{user.username}</div>
          </div>
        </div>
        <div className="user-buttons">
          <button>Edit</button>
          <button>Ban</button>
        </div>
        <hr />
      </li>
    ));

  return (
    <>
      <Navbar />
      <div className="align-items-center Auth-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">All users</h3>
            <div className="closest-player-list">
              <div className="closest-players-title">
                <h2>Closest Players:</h2>
              </div>
              <hr />
              <hr />
              <ul className="closest-players">{listItems!}</ul>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
