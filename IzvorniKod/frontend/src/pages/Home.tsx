import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    // if (localStorage.getItem("user") === null) navigate("/signIn"); TODO - removed for testing
  });

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/signIn");
  }

  return (
    <>
      <Navbar />
      <div>
        User data:
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.photo}</p>
        <Button onClick={handleLogout}>Sign Out</Button>
      </div>
    </>
  );
}
