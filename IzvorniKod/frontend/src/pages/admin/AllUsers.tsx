import Navbar from "../../components/Navbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "../../components/UserCard";
import axios from "axios";

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
      <Navbar />
      <div className="align-items-center Auth-container">
        <form className="Auth-form">
          <div className="closest-players-title">
            <h2>All Users:</h2>
          </div>
          <div className="closest-players">
            {allUsers.map((user, key) => (
              <UserCard key={key} oldUser={user} />
            ))}
          </div>
        </form>
      </div>
    </>
  );
}
