import PlayerNavbar from "../../components/navbars/PlayerNavbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AllCardsMap from "../../components/AllCardsMap";
import AdminNavbar from "../../components/navbars/AdminNavbar";

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
      <AdminNavbar />
      <AllCardsMap />
    </>
  );
}
