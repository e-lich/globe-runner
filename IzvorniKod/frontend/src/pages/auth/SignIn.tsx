import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [submitDisabled, setSubmitDisabled] = useState(true);
  let [error, setError] = useState<Array<String>>([]);

  const navigate = useNavigate();
  const baseURL = "http://127.0.0.1:5000";

  function handleEmailAndUsernameChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  function handleLogin() {
    return new Promise((resolve, reject) => {
      axios
        .post(baseURL + "/login", {
          username_or_email: email,
          password: password
        }, {withCredentials: true})
        .then((res) => {
          console.log(res);
          if (res.data.email === undefined) {
            setError(res.data);
          } else {
            saveUserData(res.data);
            navigate("/home");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  function saveUserData(data: any) {
    // localStorage.setItem(
    //   "user",
    //   JSON.stringify({
    //     email: "pero@zmaj",
    //     photo: null,
    //     username: "peroZmaj",
    //     userType: "cartographer",
    //   })
    // );

    // when we have userType (“player”, “advancedPlayer”, “cartographer”, “admin”)
    // TODO switch to this instead:

    localStorage.setItem("user", JSON.stringify(data));
  }

  useEffect(() => {
    setError((prev) =>
      prev.filter((e) => e !== "Password must be at least 8 characters long!")
    );
    if (email !== "" && password !== "" && password.length >= 8) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
      if (password.length < 8) {
        setError(["Password must be at least 8 characters long!"]);
      }
    }
  }, [email, password]);

  return (
    <div className="d-flex justify-content-center m-4 Auth-form-container align-items-center">
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
          {error.length > 0 &&
            error.map((err, key) => (
              <div className="alert-danger alert p-1" role="alert" key={key}>
                {err}
              </div>
            ))}
          <div className="form-group mt-3">
            <label>Email address or username</label>
            <input
              type=""
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(e) => handleEmailAndUsernameChange(e)}
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
        </div>
      </form>
    </div>
  );
}
