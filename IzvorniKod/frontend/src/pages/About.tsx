import Navbar from "../components/Navbar";
import React from "react";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="align-items-center Auth-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Application information</h3>
            <div className="form-group mt-3">
              Želite li igrati Pokemon Go, ali na našim prostorima i s našim
              lokacijama? Na pravom ste mjestu!
            </div>
            <hr></hr>
            <div>
              Globerunner je igrica koja nam omogucuje da igramo igrice i
              ostanemo aktivni! Pridruzi se sad :) Uživajte!
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
