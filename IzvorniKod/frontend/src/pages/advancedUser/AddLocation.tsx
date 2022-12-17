import Navbar from "../../components/Navbar";
import React from "react";

export default function AddLocation() {
  return (
    <>
      <Navbar />
      <div className="align-items-center Auth-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Add Location</h3>
          </div>
        </form>
      </div>
    </>
  );
}
