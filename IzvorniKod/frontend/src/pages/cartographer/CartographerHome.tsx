import Navbar from "../../components/Navbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CartographerHome() {
  const navigate = useNavigate();

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage === null) navigate("/signIn");

    if (!(JSON.parse(userFromLocalStorage!).userType === "cartographer"))
      navigate("/home");
  });

  return (
    <>
      <Navbar />
      <div className="align-items-center Auth-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Cartographer Home</h3>
          </div>
        </form>
      </div>
    </>
  );
}
