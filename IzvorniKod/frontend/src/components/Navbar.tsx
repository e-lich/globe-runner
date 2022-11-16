import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

export default function Navbar() {
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
    <div className="nav">
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Menu
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => navigate("/")}>Home</Dropdown.Item>
          <Dropdown.Item onClick={() => navigate("/stats")}>
            Stats
          </Dropdown.Item>
          <Dropdown.Item onClick={() => navigate("/about")}>
            About
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div className="title">
        <img className="logo" src={require("../images/logo.png")} alt="logo" />
        <h1>GlobeRunner</h1>
      </div>
      <ul className="nav--links">
        <li>
          <Link to="/profile">My Profile</Link>
        </li>
      </ul>
    </div>
  );
}
