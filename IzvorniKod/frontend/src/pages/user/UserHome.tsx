import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserHomeMap from "../../components/UserHomeMap";
import LocationCard from "../../components/LocationCard";
import { List } from "@mui/material";

import Navbar from "../../components/Navbar";
import { Grid, Paper } from "@material-ui/core";
import axios from "axios";

export default function UserHome() {
  const navigate = useNavigate();
  var [refresh, setRefresh] = useState<boolean>(false);
  var [closestLocations, setClosestLocations] = useState<any>();

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage === null) navigate("/login");

    if (
      !JSON.parse(userFromLocalStorage!)
        .userType.toLowerCase()
        .includes("player")
    )
      navigate("/home");
  });

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
      <Navbar />
      <Grid container>
        <Grid item xs={12} sm={9} style={{ height: "70vh" }}>
          <UserHomeMap refresh={refresh} setRefresh={setRefresh} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <div className="closest-cards-title">
            <h2>Closest Cards:</h2>
          </div>
          <Paper style={{ maxHeight: "45%", overflow: "auto" }}>
            <List sx={{ textAlign: "center", border: 2 }}>
              {closestLocations &&
              closestLocations[0] !== "No locations found close by" ? (
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
                          console.log(res);
                        })
                        .catch((err) => {
                          console.log(err);
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
