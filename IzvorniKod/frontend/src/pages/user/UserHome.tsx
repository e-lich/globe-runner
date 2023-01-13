import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserHomeMap from "../../components/UserHomeMap";
import LocationCard from "../../components/LocationCard";
import { List, Typography } from "@mui/material";

import PlayerNavbar from "../../components/navbars/PlayerNavbar";
import { Grid, Paper } from "@material-ui/core";
import axios from "axios";

export default function UserHome() {
  const navigate = useNavigate();
  var [refresh, setRefresh] = useState<boolean>(false);
  var [closestLocations, setClosestLocations] = useState<any>();

  useEffect(() => {
    var user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user === null) navigate("/login");

    if (
      !user ||
      !user.userType ||
      !user.userType.toLowerCase().includes("player")
    )
      navigate("/home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axios.get("/locations/closest").then((response) => {
      console.log(response.data);
      console.log("fetching closest");
      setClosestLocations(response.data);
      console.log(response.data);
    });
  }, [refresh]);

  return (
    <>
      <PlayerNavbar />
      <Grid container style={{ height: "90vh", padding: 10 }}>
        <Grid item xs={12} sm={9} style={{ height: "100%", padding: 10 }}>
          <UserHomeMap refresh={refresh} setRefresh={setRefresh} />
        </Grid>
        <Grid item xs={12} sm={3} style={{ height: "100%", padding: 10 }}>
          <Typography
            variant="h5"
            sx={{ m: 2, fontWeight: "bold", textAlign: "center" }}
          >
            Closest locations
          </Typography>
          <Paper
            style={{
              maxHeight: "88%",
              minHeight: "28.8em",
              overflow: "auto",
            }}
          >
            <List sx={{ textAlign: "center" }}>
              {closestLocations &&
              closestLocations[0] !== "No locations found close by" &&
              closestLocations[0] !== "User not logged in" ? (
                closestLocations?.map((closestCard: any, key: number) => (
                  <LocationCard
                    key={key}
                    closestCard={closestCard}
                    hasButton={true}
                    buttonText={"Collect"}
                    buttonOnClick={() => {
                      setRefresh((refresh: any) => !refresh);

                      axios
                        .post("/locations/collect/" + closestCard["cardId"])
                        .then((res) => {
                          if (res.status === 200) {
                            console.log("Collected!");
                          } else {
                            alert("Error collecting card!");
                          }
                        })
                        .catch((err) => {
                          alert("Error collecting card!");
                        });
                    }}
                    cardOnClick={() => {
                      console.log("You clicked on the card.");
                    }}
                  />
                ))
              ) : (
                <></>
              )}

              {closestLocations ? (
                closestLocations[0] === "No locations found close by" && (
                  <div>There are no nearby locations!</div>
                )
              ) : (
                <div>Loading...</div>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
