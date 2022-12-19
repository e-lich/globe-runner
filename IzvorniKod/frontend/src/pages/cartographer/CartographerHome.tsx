import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartographerHomeMap from "../../components/CartographerHomeMap";

export default function AddLocation() {
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
      <CartographerHomeMap />
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