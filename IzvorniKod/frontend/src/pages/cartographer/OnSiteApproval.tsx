import Navbar from "../../components/Navbar";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OnSiteMap from "../../components/OnSiteMap";

export default function OnSiteApproval() {
  const navigate = useNavigate();

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");

    if (userFromLocalStorage === null) navigate("/login");

    if (
      !(
        JSON.parse(userFromLocalStorage!).userType.toLowerCase() ===
        "cartographer"
      )
    )
      navigate("/home");
  });

  return (
    <>
      <Navbar />
      <OnSiteMap />
      <div className="align-items-center Auth-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">On-site Approval</h3>
          </div>
        </form>
      </div>
    </>
  );
}
