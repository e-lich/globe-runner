import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function UserProfile() {
  const [userData, setData] = useState({
    username: "username",
    password: "",
    passwordConfirmation: "",
  });

  // TODO Handle password changes

  const navigate = useNavigate();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [authMode, setAuthMode] = useState("basic");
  const [user, setUser] = useState(localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  const handleChanges = (e: any) => {
    setData({ ...userData, [e.target.name]: e.target.value });
  };

  const changeAuthMode = () => {
    setAuthMode(authMode === "basic" ? "change" : "basic");
  };

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage === null) navigate("/login");

    if (
      !JSON.parse(userFromLocalStorage!)
        .userType.toLowerCase()
        .includes("player")
    )
      navigate("/home");
  });

  useEffect(() => {
    if (
      userData.password !== "" &&
      userData.password.length >= 8 &&
      userData.password === userData.passwordConfirmation
    )
      setSubmitDisabled(false);
    else setSubmitDisabled(true);
  }, [userData.password, userData.passwordConfirmation]);

  if (authMode === "basic") {
    return (
      <>
        <Navbar />
        <div className="Auth-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Profile information</h3>
              {user && (
                <img
                  src={`data:image/jpeg;base64,${JSON.parse(user).photo}`}
                  alt="profile"
                  className="img-fluid mt-2 border border-dark rounded"
                />
              )}
              <div className="form-group mt-3">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control mt-1"
                  value={user ? JSON.parse(user).username : "username"}
                  disabled={true}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={changeAuthMode}
                >
                  Change Password
                </button>
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="Auth-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Profile information</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder={user ? JSON.parse(user).email : "email"}
                disabled={true}
              />
            </div>
            <div className="form-group mt-3">
              <label>New Password</label>
              <input
                type="password"
                name="password"
                value={userData.password}
                className="form-control mt-1"
                placeholder="Password"
                onChange={(e) => handleChanges(e)}
              />
            </div>
            <div className="form-group mt-3">
              <label>New Password Confirmation</label>
              <input
                type="password"
                name="passwordConfirmation"
                value={userData.passwordConfirmation}
                className="form-control mt-1"
                placeholder="Password Confirmation"
                onChange={(e) => handleChanges(e)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => {
                  /*TODO*/
                }}
                disabled={submitDisabled}
              >
                Submit
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={changeAuthMode}
              >
                Cancel Password Change
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
