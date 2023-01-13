import PlayerNavbar from "../../components/navbars/PlayerNavbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Typography } from "@mui/material";
import axios from "axios";
import CartographerCard from "../../components/verifyCartographers/CartographerCard";
import AdminNavbar from "../../components/navbars/AdminNavbar";

export default function CartographerRequests() {
  const navigate = useNavigate();
  const [unverifiedCartographers, setUnverifiedCartographers] =
    React.useState<any>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage === null) navigate("/login");

    if (!(JSON.parse(userFromLocalStorage!).userType.toLowerCase() === "admin"))
      navigate("/home");
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const getUnverifiedCartographers = async () => {
      try {
        const response = await axios.get("/cartographers/unverified");
        setUnverifiedCartographers(response.data);
      } catch {
        console.log("Error");
      }
    };

    getUnverifiedCartographers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return (
    <>
      <AdminNavbar />
      <Box justifyContent="center" display="flex">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5" sx={{ m: 2, fontWeight: "bold" }}>
            Cartographer requests
          </Typography>
          {unverifiedCartographers.map((cartographer: any, key: any) => (
            <>
              <CartographerCard
                cartographer={cartographer}
                key={key}
                refresh={() => setRefresh((prev) => !prev)}
              ></CartographerCard>
              <Divider />
            </>
          ))}
          {unverifiedCartographers.length === 0 && (
            <Typography variant="body1" sx={{ m: 2, textAlign: "center" }}>
              Good job! There are no more cartographer requests.
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}
