import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlayerNavbar from "../../components/navbars/PlayerNavbar";
import UserInventory from "../../components/UserProfile/UserInventory";
import UserProfileCard from "../../components/UserProfile/UserProfileCard";
import UserStatsCard from "../../components/UserProfile/UserStatsCard";

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage === null) navigate("/login");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetch current user information
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get("/user/current");
        setUser(JSON.stringify(res.data));
      } catch (e) {
        alert(e);
      }
    };

    fetchCurrentUser();
    // todo add a refresh
  }, [refresh]);

  return (
    <>
      <PlayerNavbar />
      <Grid container spacing={2} style={{ height: "90vh", padding: 10 }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h5" sx={{ m: 2 }}>
            My profile
          </Typography>
          <Grid container spacing={4}>
            <Grid
              item
              xs={12}
              style={{
                height: "15em",
                marginBottom: 32,
              }}
            >
              <UserProfileCard
                user={JSON.parse(user!)}
                canEdit={true}
                numberOfLocations={JSON.parse(user!).numOfCards}
                refresh={() => {
                  setRefresh(!refresh);
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                height: "25em",
              }}
            >
              <UserStatsCard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h5" sx={{ m: 2 }}>
            Inventory
          </Typography>
          <UserInventory />
        </Grid>
      </Grid>
    </>
  );
}
