import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BasicRegister() {
  const [file, setFile] = useState<string | Blob>("");

  let [email, setEmail] = useState("");
  let [fullName, setFullName] = useState("");
  let [IBAN, setIBAN] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [submitDisabled, setSubmitDisabled] = useState(true);

  const navigate = useNavigate();

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
  }
  function handleFullNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setFullName(e.target.value);
  }
  function handleIBANChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setIBAN(e.target.value);
  }
  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  function profilePictureChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  const baseURL = "http://127.0.0.1:4000";

  function handleRegister() {
    return new Promise((resolve, reject) => {
      axios
        .post(baseURL + "/register", {
          name: fullName,
          email: email,
          username: username,
          photo: "photohihi",
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
          <h3 className="Auth-form-title">Register as User</h3>
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
            <input className="form-control mt-1" placeholder="e.g Jane Doe" />
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
            <label>Username</label>
            <input
              className="form-control mt-1"
              placeholder="e.g CoolKid69420"
              onChange={(e) => handleUsernameChange(e)}
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
              onClick={(e) => {
                e.preventDefault();
                handleRegister();
              }}
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

export default BasicRegister;
