import PlayerNavbar from "../../components/navbars/PlayerNavbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OnSiteMap from "../../components/OnSiteMap";
import OnSiteList from "../../components/OnSiteList";
import { Grid } from "@mui/material";
import CartographerNavbar from "../../components/navbars/CartographerNavbar";

export default function OnSiteApproval() {
  const navigate = useNavigate();
  var [refresh, setRefresh] = useState<boolean>(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CartographerNavbar />
      <Grid container>
        <Grid item xs={12} sm={9} style={{ height: "70vh" }}>
          <OnSiteMap refresh={refresh} setRefresh={setRefresh} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <OnSiteList refresh={refresh} setRefresh={setRefresh} />
        </Grid>
      </Grid>
    </>
  );
}
