import PlayerNavbar from "../../components/navbars/PlayerNavbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartographerHomeMap from "../../components/CartographerHomeMap";
import CartographerNavbar from "../../components/navbars/CartographerNavbar";

export default function AddLocation() {
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
      <CartographerHomeMap />
    </>
  );
}
