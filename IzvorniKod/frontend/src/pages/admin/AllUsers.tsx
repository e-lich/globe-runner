import PlayerNavbar from "../../components/navbars/PlayerNavbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "../../components/UserCard";
import axios from "axios";
import AdminNavbar from "../../components/navbars/AdminNavbar";
import { Box, Typography } from "@mui/material";

export default function AllUsers() {
  const navigate = useNavigate();
  const [error, setError] = useState<Array<String>>([]);
  const [allUsers, setAllUsers] = useState<
    Array<{
      confirmed: boolean;
      email: string;
      profilePhoto: string;
      userID: number;
      userType: string;
      username: string;
    }>
  >([]);

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage === null) navigate("/login");

    if (!(JSON.parse(userFromLocalStorage!).userType.toLowerCase() === "admin"))
      navigate("/home");

    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users/all");
        setAllUsers(response.data);
      } catch (error: any) {
        setError(error.response.data);
      }
    };

    fetchUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AdminNavbar />
      <Box justifyContent="center" display="flex" style={{ height: "90vh" }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h3"
            sx={{ m: 2, fontWeight: "bold", paddingBottom: 5 }}
          >
            All users
          </Typography>

          {allUsers.map((user, key) => (
            <UserCard key={key} oldUser={user} />
          ))}
        </Box>
      </Box>
    </>
  );
}
