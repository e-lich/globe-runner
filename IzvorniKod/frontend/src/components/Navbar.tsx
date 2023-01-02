import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  var user = JSON.parse(localStorage.getItem("user") || "{}");

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
            {user!.userType.toLowerCase().includes("player") ? (
              <Dropdown.Item onClick={() => navigate("/home")}>
                Home
              </Dropdown.Item>
            ) : null}

            {user!.userType.toLowerCase().includes("player") ||
            user!.userType.toLowerCase() === "admin" ? (
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

            {user!.userType.toLowerCase() === "advancedplayer" ? (
              <Dropdown.Item onClick={() => navigate("/addLocation")}>
                Add Location
              </Dropdown.Item>
            ) : null}

            {user!.userType.toLowerCase() === "cartographer" ? (
              <Dropdown.Item onClick={() => navigate("/cartographerHome")}>
                Home
              </Dropdown.Item>
            ) : null}

            {user!.userType.toLowerCase() === "cartographer" ? (
              <Dropdown.Item onClick={() => navigate("/cartographerProfile")}>
                My Profile
              </Dropdown.Item>
            ) : null}

            {user!.userType.toLowerCase() === "cartographer" ? (
              <Dropdown.Item onClick={() => navigate("/onSiteApproval")}>
                On-site Approval
              </Dropdown.Item>
            ) : null}

            {user!.userType.toLowerCase() === "admin" ? (
              <Dropdown.Item onClick={() => navigate("/adminHome")}>
                Home
              </Dropdown.Item>
            ) : null}

            {user!.userType.toLowerCase() === "admin" ? (
              <Dropdown.Item onClick={() => navigate("/allUsers")}>
                All Users
              </Dropdown.Item>
            ) : null}

            {user!.userType.toLowerCase() === "admin" ? (
              <Dropdown.Item onClick={() => navigate("/cartographerRequests")}>
                Cartographer Requests
              </Dropdown.Item>
            ) : null}

            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
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
