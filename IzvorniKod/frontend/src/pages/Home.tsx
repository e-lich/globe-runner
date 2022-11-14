import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (localStorage.getItem("user") === null) navigate("/signIn");
  });

  return (
    <div>
      Home is here! User data:
      <p>{user.username}</p>
      <p>{user.email}</p>
      <p>{user.photo}</p>
    </div>
  );
}
