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
      username: string;
      userId: number;
      userImage: string;
    }>
  >([]);

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage === null) navigate("/login");

    if (!(JSON.parse(userFromLocalStorage!).userType.toLowerCase() === "admin"))
      navigate("/home");
    // fetchUsers makes a fet request on the  URL /users/all using axios
    // and sets the response to the state variable allUsers
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
            {allUsers!.map((user, key) => (
              <UserCard
                key={key}
                battle={false}
                username={user.username}
                oldUser={user}
              />
            ))}
          </div>
        </form>
      </div>
    </>
  );
}
