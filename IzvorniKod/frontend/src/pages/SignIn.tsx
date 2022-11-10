import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

export default function SignIn() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [submitDisabled, setSubmitDisabled] = useState(true);

  const navigate = useNavigate();
  const baseURL = "http://localhost:5000";

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  // function handleLogin() {
  //   axios
  //     .post(baseURL + "/register", {
  //       username_or_email: email,
  //       password: password,
  //     })
  //     .then(function (response) {
  //       console.log(response); // only for testing
  //       // set session user to response's user
  //       navigate("/home");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }
  function handleLogin() {
    return new Promise((resolve, reject) => {
      axios
        .post("http://127.0.0.1:5000/signIn", {
          username_or_email: email,
          password: password,
        })
        .then(
          (res) => {
            console.log(res); // only for testing
          },
          (err) => {
            console.log(err);
          }
        );
    });
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
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <span
              className="link-primary"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </span>
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
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => handlePasswordChange(e)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(event) => {
                event.preventDefault();
                handleLogin();
              }}
              disabled={submitDisabled}
            >
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            <a href="#">Forgot password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}
