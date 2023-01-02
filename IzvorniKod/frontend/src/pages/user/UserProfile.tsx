import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import UserInventory from "../../components/UserProfile/UserInventory";
import UserProfileCard from "../../components/UserProfile/UserProfileCard";
import UserStatsCard from "../../components/UserProfile/UserStatsCard";

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("user"));

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage === null) navigate("/login");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h4" sx={{ m: 2 }}>
            My profile
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <UserProfileCard
                user={JSON.parse(user!)}
                numberOfLocations={12}
              />
            </Grid>
            <Grid item xs={12}>
              <UserStatsCard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4" sx={{ m: 2 }}>
            Inventory
          </Typography>
          <UserInventory />
        </Grid>
      </Grid>
    </>
  );
}
