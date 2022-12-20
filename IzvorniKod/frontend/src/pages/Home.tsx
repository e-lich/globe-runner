import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHome from "./admin/AdminHome";
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
      }
    | undefined = JSON.parse(localStorage.getItem("user")!);

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage === null) navigate("/login");
  });

  if (user!.userType === "admin") return <AdminHome />;

  if (user!.userType === "cartographer") return <CartographerHome />;

  return <UserHome />;
}
