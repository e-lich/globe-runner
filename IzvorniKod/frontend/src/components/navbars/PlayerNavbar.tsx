import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { useEffect, useState } from "react";
import ChallengesDialog from "../fights/ChallengesDialog";
import ChallengeButtonIcon from "../fights/ChallengeButtonIcon";

import PersonIcon from "@mui/icons-material/Person";

export default function PlayerNavbar() {
  const navigate = useNavigate();
  var user = JSON.parse(localStorage.getItem("user") || "{}");

  const [challenges, setChallenges] = useState<any>([]);
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
      await fetchFights();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchFights = async () => {
    try {
      const res = await axios.get("/fight/challenges");
      setChallenges(res.data);
      console.log(res.data);
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
              <Dropdown.Item onClick={() => navigate("/home")}>
                Home
              </Dropdown.Item>

              <Dropdown.Item onClick={() => navigate("/globalStats")}>
                Global Stats
              </Dropdown.Item>

              <Dropdown.Item onClick={() => navigate("/nearbyPlayers")}>
                Nearby Players
              </Dropdown.Item>

              {user &&
              user.userType &&
              user!.userType.toLowerCase() === "advancedplayer" ? (
                <Dropdown.Item onClick={() => navigate("/addLocation")}>
                  Add Location
                </Dropdown.Item>
              ) : null}
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
            <li
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {challenges && challenges[0] ? (
                <ChallengeButtonIcon setOpen={() => setOpenChallenges(true)} />
              ) : null}
            </li>
            <li>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <PersonIcon />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate("/userProfile")}>
                    My Profile
                  </Dropdown.Item>

                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
        <ChallengesDialog
          open={openChallenges}
          onClose={() => setOpenChallenges(false)}
          challenges={challenges}
        />
      </>
    );
  return <></>;
}
