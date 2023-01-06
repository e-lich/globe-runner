import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddLocationMap from "../../components/AddLocationMap";
import AddLocationForm from "../../components/AddLocationForm";
import { Grid } from "@mui/material";

export default function AddLocation() {
  const navigate = useNavigate();
  var [lat, setLat] = useState<Number>(0);
  var [long, setLong] = useState<Number>(0);
  var [userLatitude, setUserLatitude] = useState<Number>(0);
  var [userLongitude, setUserLongitude] = useState<Number>(0);
  var [refresh, setRefresh] = useState<boolean>(false);

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
      <Grid container>
        <Grid item xs={12} sm={7} style={{ height: "70vh" }}>
          <AddLocationMap
            setLat={setLat}
            setLong={setLong}
            setUserLatitude={setUserLatitude}
            setUserLongitude={setUserLongitude}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <div className="align-items-center Auth-container">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Add Locations</h3>
              <AddLocationForm
                lat={lat}
                setLat={setLat}
                long={long}
                setLong={setLong}
                userLatitude={userLatitude}
                userLongitude={userLongitude}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
