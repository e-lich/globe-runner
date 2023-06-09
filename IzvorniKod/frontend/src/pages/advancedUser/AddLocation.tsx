import PlayerNavbar from "../../components/navbars/PlayerNavbar";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PlayerNavbar />
      <Grid container style={{ padding: 10 }}>
        <Grid
          item
          xs={12}
          sm={8}
          style={{ height: "82vh", width: "100%", padding: 10 }}
        >
          <AddLocationMap
            setLat={setLat}
            setLong={setLong}
            setUserLatitude={setUserLatitude}
            setUserLongitude={setUserLongitude}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </Grid>
        <Grid item xs={12} sm={4} style={{ padding: 10 }}>
          <div className="align-items-center Auth-container">
            <div style={{ padding: "20px" }}>
              <h3 className="Auth-form-title" style={{ marginBottom: 0 }}>
                Add Location
              </h3>
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
