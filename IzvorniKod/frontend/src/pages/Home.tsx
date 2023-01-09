import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHome from "./admin/AllCards";
import UserHome from "./user/UserHome";
import CartographerHome from "./cartographer/CartographerHome";

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

  if (user!.userType.toLowerCase() === "admin") return <AdminHome />;

  if (user!.userType.toLowerCase() === "cartographer")
    return <CartographerHome />;

  return <UserHome />;
}
