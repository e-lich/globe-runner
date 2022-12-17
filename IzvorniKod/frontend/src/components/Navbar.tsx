import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

export default function Navbar() {
  const navigate = useNavigate();
  var user:
    | {
        email: String;
        photo: String;
        username: String;
        userType: String;
      }
    | undefined = JSON.parse(localStorage.getItem("user")!);

  if (user)
    return (
      <div className="nav">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Menu
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {user!.userType.toLowerCase().includes("player") ? (
              <Dropdown.Item onClick={() => navigate("/home")}>
                Home
              </Dropdown.Item>
            ) : null}

            {user!.userType.toLowerCase().includes("player") ? (
              <Dropdown.Item onClick={() => navigate("/userProfile")}>
                My Profile
              </Dropdown.Item>
            ) : null}

            {user!.userType.toLowerCase().includes("player") ? (
              <Dropdown.Item onClick={() => navigate("/globalStats")}>
                Global Stats
              </Dropdown.Item>
            ) : null}

            {user!.userType.toLowerCase().includes("player") ? (
              <Dropdown.Item onClick={() => navigate("/nearbyPlayers")}>
                Nearby Players
              </Dropdown.Item>
            ) : null}

            {user!.userType === "advancedPlayer" ? (
              <Dropdown.Item onClick={() => navigate("/addLocation")}>
                Add Location
              </Dropdown.Item>
            ) : null}

            {user!.userType === "cartographer" ? (
              <Dropdown.Item onClick={() => navigate("/cartographerHome")}>
                Home
              </Dropdown.Item>
            ) : null}

            {user!.userType === "cartographer" ? (
              <Dropdown.Item onClick={() => navigate("/cartographerProfile")}>
                My Profile
              </Dropdown.Item>
            ) : null}

            {user!.userType === "cartographer" ? (
              <Dropdown.Item onClick={() => navigate("/onSiteApproval")}>
                On-site Approval
              </Dropdown.Item>
            ) : null}

            {user!.userType === "admin" ? (
              <Dropdown.Item onClick={() => navigate("/adminHome")}>
                Home
              </Dropdown.Item>
            ) : null}

            {user!.userType === "admin" ? (
              <Dropdown.Item onClick={() => navigate("/allUsers")}>
                All Users
              </Dropdown.Item>
            ) : null}

            {user!.userType === "admin" ? (
              <Dropdown.Item onClick={() => navigate("/cartographerRequests")}>
                Cartographer Requests
              </Dropdown.Item>
            ) : null}
          </Dropdown.Menu>
        </Dropdown>

        <div className="title">
          <img
            className="logo"
            src={require("../images/logo.png")}
            alt="logo"
          />
          <h1>GlobeRunner</h1>
        </div>
        <ul className="nav--links">
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    );
  return <></>;
}
