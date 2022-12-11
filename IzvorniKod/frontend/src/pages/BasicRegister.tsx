import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BasicRegister() {
  const [file, setFile] = useState<Blob>();
  let [email, setEmail] = useState("");
  let [fullName, setFullName] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [submitDisabled, setSubmitDisabled] = useState(true);
  let [error, setError] = useState<Array<String>>([]);
  let fileString = undefined;

  const navigate = useNavigate();

  function handleEmailChange(e: React.FormEvent<HTMLInputElement>): void {
    setEmail(e.currentTarget.value);
  }

  function handleFullNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setFullName(e.target.value);
  }

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  function profilePictureChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setError((prev) =>
      prev.filter((e) => e !== "Image must be less than 1MB!")
    );
    if (
      e.target.files &&
      e.target.files[0] &&
      e.target.files[0].size < 1000000 &&
      e.target.files[0].type === "image/jpeg"
    ) {
      setFile(e.target.files[0]);
    } else {
      setError((previousValue) => [
        ...previousValue,
        "Image must be less than 1MB!",
      ]);
    }
  }

  const baseURL = "http://127.0.0.1:5000";

  function handleRegister() {
    if (!file) {
      setError((previousValue) => [
        ...previousValue,
        "You must upload a profile picture!",
      ]);
      return;
    }

    let formData = new FormData();

    formData.append("name", fullName); //append the values with key, value pair
    formData.append("email", email);
    formData.append("username", username);
    formData.append("photo", file);
    formData.append("password", password);
    formData.append("iban", ""); // TODO - ovo je quick fix, bilo bi ljepse to hendlati na backendu

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
      .post(baseURL + "/register", formData, config)
      .then((res) => {
        console.log(res);
        if (res.data.email === undefined) {
          setError(res.data);
        } else {
          saveUserData(res.data);
          navigate("/confirm");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return;
  }

  function saveUserData(data: any) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  useEffect(() => {
    setError((prev) =>
      prev.filter((e) => e !== "Password must be at least 8 characters long!")
    );
    setError((prev) => prev.filter((e) => e !== "Enter a valid email!"));
    if (
      email !== "" &&
      email.includes("@") &&
      email.substring(0, email.indexOf("@")).length > 0 &&
      email.substring(email.indexOf("@"), email.length - 1).length > 0 &&
      password !== "" &&
      password.length >= 8 &&
      fullName !== "" &&
      username !== "" &&
      file !== undefined &&
      !error.includes("Image must be less than 1MB!")
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
      if (password.length < 8) {
        setError((prevValue) => [
          ...prevValue,
          "Password must be at least 8 characters long!",
        ]);
      }
      if (
        email === "" ||
        !email.includes("@") ||
        email.substring(0, email.indexOf("@")).length === 0 ||
        email.substring(email.indexOf("@"), email.length - 1).length === 0
      ) {
        setError((prevValue) => [...prevValue, "Enter a valid email!"]);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password, fullName, username, file]);

  return (
    <div className="d-flex justify-content-center m-4">
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
          {error.length > 0 &&
            error.map((err, key) => (
              <div className="alert-danger alert p-1" role="alert" key={key}>
                {err}
              </div>
            ))}
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              onChange={(e) => handleFullNameChange(e)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type=""
              className="form-control mt-1"
              placeholder="Email Address"
              onInput={(e) => handleEmailChange(e)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              className="form-control mt-1"
              placeholder="e.g CoolKid123"
              onChange={(e) => handleUsernameChange(e)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Profile Picture</label>
            <input
              id="file"
              type="file"
              accept="image/jpeg"
              onChange={(e) => profilePictureChange(e)}
            />
            {file !== undefined && (
              <img
                alt="profile pic"
                src={URL.createObjectURL(file)}
                className="img-fluid mt-2 border border-dark rounded"
              ></img>
            )}
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
        </div>
      </form>
    </div>
  );
}

export default BasicRegister;
