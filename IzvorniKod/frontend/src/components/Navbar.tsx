import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { useEffect, useState } from "react";
import ChallengePopup from "./ChallengePopup";
import ChallengesDialog from "./ChallengesDialog";

export default function Navbar() {
  const navigate = useNavigate();
  var user = JSON.parse(localStorage.getItem("user") || "{}");

  const [challenges, setChallenges] = useState<any>();
  const [openChallenges, setOpenChallenges] = useState<any>();

  const challengesDummy: Array<{ challengeID: number; challenger: String }> = [
    { challengeID: 1, challenger: "Lovro" },
    { challengeID: 2, challenger: "Pero" },
    { challengeID: 3, challenger: "Vlado" },
  ];

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage === null) navigate("/login");
  }, []);

  useEffect(() => {
    let interval = setInterval(async () => {
      console.log("Checking for battles!");
      await fetchFights;
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchFights = async () => {
    try {
      const res = await axios.get("/fight/challenges");

      setChallenges(res.data);
    } catch (e) {
      alert(e);
    }
  };

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
      <>
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
                <Dropdown.Item
                  onClick={() => navigate("/cartographerRequests")}
                >
                  Cartographer Requests
                </Dropdown.Item>
              ) : null}

              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Link to="/">
            <div className="title">
              <img
                className="logo"
                src={require("../images/logo.png")}
                alt="logo"
              />
              <h1 className="globe-runner-title">GlobeRunner</h1>
            </div>
          </Link>
          <ul className="nav--links">
            <li>
              {true ? ( // TODO - switch true to challenges, if there are challenges load prompt!
                <button onClick={() => setOpenChallenges(true)}>
                  Challenges
                </button>
              ) : null}
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
        <ChallengesDialog
          open={openChallenges}
          onClose={() => setOpenChallenges(false)}
          challenges={challengesDummy} // TODO - SWITCH THIS TO CHALLENGES
        />
      </>
    );
  return <></>;
}
