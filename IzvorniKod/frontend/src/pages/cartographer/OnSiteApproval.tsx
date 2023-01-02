import Navbar from "../../components/Navbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OnSiteMap from "../../components/OnSiteMap";
import OnSiteList from "../../components/OnSiteList";
import { Grid } from "@mui/material";

export default function OnSiteApproval() {
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
  });

  return (
    <>
      <Navbar />
      <Grid container>
        <Grid item xs={12} sm={9} style={{ height: "70vh" }}>
          <OnSiteMap />
        </Grid>
        <Grid item xs={12} sm={3}>
          <OnSiteList />
        </Grid>
      </Grid>
    </>
  );
}
