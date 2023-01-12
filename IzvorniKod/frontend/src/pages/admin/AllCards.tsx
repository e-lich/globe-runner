import PlayerNavbar from "../../components/navbars/PlayerNavbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AllCardsMap from "../../components/AllCardsMap";

export default function AllCards() {
  const navigate = useNavigate();

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage === null) navigate("/login");

    if (!(JSON.parse(userFromLocalStorage!).userType.toLowerCase() === "admin"))
      navigate("/home");
  });

  return (
    <>
      <PlayerNavbar />
      <AllCardsMap />
      <div className="align-items-center Auth-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Admin Home</h3>
          </div>
        </form>
      </div>
    </>
  );
}
