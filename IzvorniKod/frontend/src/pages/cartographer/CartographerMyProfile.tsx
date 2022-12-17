import Navbar from "../../components/Navbar";
import React from "react";

export default function CartographerMyProfile() {
  return (
    <>
      <Navbar />
      <div className="align-items-center Auth-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Cartographer Profile</h3>
          </div>
        </form>
      </div>
    </>
  );
}
