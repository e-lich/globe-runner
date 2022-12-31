import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddLocationMap from "../../components/AddLocationMap";
import AddLocationForm from "../../components/AddLocationForm";

export default function AddLocation() {
  const navigate = useNavigate();
  var [latitude, setLatitude] = useState<Number>(0);
  var [longitude, setLongitude] = useState<Number>(0);
  var [userLatitude, setUserLatitude] = useState<Number>(0);
  var [userLongitude, setUserLongitude] = useState<Number>(0);

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
      <AddLocationMap
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        setUserLatitude={setUserLatitude}
        setUserLongitude={setUserLongitude}
      />
      <div className="align-items-center Auth-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Add Locations</h3>
            <AddLocationForm
              latitude={latitude}
              setLatitude={setLatitude}
              longitude={longitude}
              setLongitude={setLongitude}
              userLatitude={userLatitude}
              userLongitude={userLongitude}
            />
          </div>
        </form>
      </div>
    </>
  );
}
