import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHome from "./admin/AllCards";
import UserHome from "./user/UserHome";
import CartographerHome from "./cartographer/CartographerHome";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  var user:
    | {
        email: String;
        photo: String;
        username: String;
        userType: String;
        userID: number;
      }
    | undefined = JSON.parse(localStorage.getItem("user")!);

  useEffect(() => {
    if (localStorage.getItem("user") === null) navigate("/login");

    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get("/user/current");
        if (res.data[0] !== "User not logged in") {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
      } catch (e) {
        alert(e);
      }
    };

    fetchCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user && user.userType && user.userType.toLowerCase() === "admin")
    return <AdminHome />;

  if (user && user.userType && user.userType.toLowerCase() === "cartographer")
    return <CartographerHome />;

  if (user && user.userType && user.userType.toLowerCase().includes("player"))
    return <UserHome />;

  return <></>;
}
