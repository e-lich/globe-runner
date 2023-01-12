import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";

export default function CartographerNavbar() {
  const navigate = useNavigate();
  var user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage === null) navigate("/login");
  }, []);

  function handleLogout() {
    const logout = async () => {
      try {
        const response = await axios.post("/logout");

        if (response.status !== 200) {
          console.log("Something went wrong while logging out");
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    logout();
    localStorage.removeItem("user");

    navigate("/login");
  }

  if (user)
    return (
      <div className="nav">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Menu
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => navigate("/cartographerHome")}>
              Home
            </Dropdown.Item>

            <Dropdown.Item onClick={() => navigate("/onSiteApproval")}>
              On-site Approval
            </Dropdown.Item>

            <Dropdown.Item onClick={() => navigate("/about")}>
              About
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Link to="/">
          <div className="title">
            <img
              className="logo"
              src={require("../../images/logo.png")}
              alt="logo"
            />
            <h1 className="globe-runner-title">GlobeRunner</h1>
          </div>
        </Link>
        <ul className="nav--links">
          <li>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <PersonIcon />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/cartographerProfile")}>
                  My Profile
                </Dropdown.Item>

                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>
    );
  return <></>;
}
