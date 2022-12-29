import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddLocationMap from "../../components/AddLocationMap";
import AddLocationForm from "../../components/AddLocationForm";

export default function AddLocation() {
  const navigate = useNavigate();

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage === null) navigate("/login");

    if (
      !(
        JSON.parse(userFromLocalStorage!).userType.toLowerCase() ===
        "advancedplayer"
      )
    )
      navigate("/home");
  });

  return (
    <>
      <Navbar />
      <AddLocationMap />
      <div className="align-items-center Auth-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Add Locations</h3>
            <AddLocationForm />
          </div>
        </form>
      </div>
    </>
  );
}
