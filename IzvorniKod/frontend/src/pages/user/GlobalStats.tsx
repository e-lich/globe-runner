import PlayerNavbar from "../../components/navbars/PlayerNavbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GlobalStats() {
  const navigate = useNavigate();

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage === null) navigate("/login");

    if (
      !JSON.parse(userFromLocalStorage!)
        .userType.toLowerCase()
        .includes("player")
    )
      navigate("/home");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PlayerNavbar />
    </>
  );
}
