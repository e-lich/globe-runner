import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import BasicRegister from "./BasicRegister";
import CartographerRegister from "./CartographerRegister";

function Register(props: any) {
  let navigator = useNavigate();

  const [file, setFile] = useState<string | Blob>("");

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [submitDisabled, setSubmitDisabled] = useState(true);

  const navigate = useNavigate();

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  function profilePictureChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  return (
    <>
      <div className="Auth-form-container align-items-center">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <div className="text-center">
              <h1 className="Auth-form-title">Register</h1>
              <div className="text-center">
                Already registered?{" "}
                <span
                  className="link-primary"
                  onClick={() => navigate("/signIn")}
                >
                  Sign in
                </span>
              </div>
              <div className="flex-column">
                <button
                  onClick={() => navigator("/register/basic")}
                  className="padding-button btn-primary btn"
                >
                  Basic user
                </button>
                <button
                  onClick={() => navigator("/register/cartographer")}
                  className="padding-button btn-primary btn"
                >
                  Cartographer
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
