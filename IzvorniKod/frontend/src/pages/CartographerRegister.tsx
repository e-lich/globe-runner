import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CartographerRegister() {
  let [authMode, setAuthMode] = useState("signin");

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

  useEffect(() => {
    if (
      email !== "" &&
      email.includes("@") &&
      email.substring(0, email.indexOf("@")).length > 0 &&
      email.substring(email.indexOf("@"), email.length - 1).length > 0 &&
      password !== "" &&
      password.length >= 8
    )
      setSubmitDisabled(false);
    else setSubmitDisabled(true);
  }, [email, password]);
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Register as Cartographer</h3>
          <div className="text-center">
            Already registered?{" "}
            <span
              className="link-primary"
              onClick={() => {
                navigate("/signIn");
              }}
            >
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="username"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label>IBAN</label>
            <input
              type="string"
              className="form-control mt-1"
              placeholder="e.g HR111423431212"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(e) => handleEmailChange(e)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Profile Picture</label>
            <input
              id="file"
              type="file"
              onChange={(e) => profilePictureChange(e)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(e) => handlePasswordChange(e)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => navigate("/home")}
              disabled={submitDisabled}
            >
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default CartographerRegister;
