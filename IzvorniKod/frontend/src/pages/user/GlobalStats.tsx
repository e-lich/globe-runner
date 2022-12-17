import Navbar from "../../components/Navbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GlobalStats() {
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

  return (
    <>
      <Navbar />
      <div className="align-items-center Auth-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Stats</h3>
            <div className="form-group mt-3 align-items-center">
              <p> This is where your stats are going to show up!</p>
            </div>
            <hr></hr>
            <div className="form-group mt-3 align-items-center">
              <p> Start playing now :))</p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
