import PlayerNavbar from "../../components/navbars/PlayerNavbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartographerProfileMap from "../../components/CartographerProfileMap";
import CartographerNavbar from "../../components/navbars/CartographerNavbar";

export default function CartographerMyProfile() {
  const navigate = useNavigate();

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage === null) navigate("/login");

    if (
      !(
        JSON.parse(userFromLocalStorage!).userType.toLowerCase() ===
        "cartographer"
      )
    )
      navigate("/home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CartographerNavbar />
      <CartographerProfileMap />
    </>
  );
}
