import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddLocationMap from "../../components/AddLocationMap";

export default function AddLocation() {
  const navigate = useNavigate();

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage === null) navigate("/signIn");

    if (!(JSON.parse(userFromLocalStorage!).userType === "advancedPlayer"))
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
          </div>
        </form>
      </div>
    </>
  );
}
