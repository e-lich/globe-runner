import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CartographerRegister() {
  const [file, setFile] = useState<string | Blob>("");
  const [fileID, setFileID] = useState<string | Blob>("");

  let [email, setEmail] = useState("");
  let [fullName, setFullName] = useState("");
  let [IBAN, setIBAN] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [submitDisabled, setSubmitDisabled] = useState(true);
  let [error, setError] = useState<Array<String>>([]);

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
    setError((prev) =>
      prev.filter((e) => e !== "Image must be a jpeg and less than 1MB")
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
        "Image must be a jpeg and less than 1MB",
      ]);
    }
  }

  function IDPictureChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (
      e.target.files &&
      e.target.files[0] &&
      e.target.files[0].size < 1000000 &&
      e.target.files[0].type === "image/jpeg"
    ) {
      setError((prev) =>
        prev.filter((e) => e !== "Image must be a jpeg and less than 1MB")
      );
      setFileID(e.target.files[0]);
    } else {
      setError((prev) =>
        prev.filter((e) => e !== "Image must be a jpeg and less than 1MB")
      );
      setError((previousValue) => [
        ...previousValue,
        "Image must be a jpeg and less than 1MB",
      ]);
    }
  }

  const baseURL = "http://127.0.0.1:5000";

  function saveUserData(data: any) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  // TODO
  function handleRegister() {
    return new Promise((resolve, reject) => {
      axios
        .post(baseURL + "/register", {
          name: fullName,
          username: username,
          iban: IBAN,
          email: email,
          photo: "slika",
          id: "slika osobne",
          password: password,
        })
        .then(function (response) {
          console.log(response);
          if (response.data.email === undefined) {
            setError(response.data);
          } else {
            saveUserData(response.data);
            navigate("/home");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  useEffect(() => {
    if (
      email !== "" &&
      email.includes("@") &&
      email.substring(0, email.indexOf("@")).length > 0 &&
      email.substring(email.indexOf("@"), email.length - 1).length > 0 &&
      password !== "" &&
      password.length >= 8 &&
      fullName !== "" &&
      IBAN !== "" &&
      username !== "" &&
      file !== "" &&
      fileID !== "" &&
      !error.includes("Image must be a jpeg and less than 1MB")
    )
      setSubmitDisabled(false);
    else setSubmitDisabled(true);
  }, [email, password, fullName, IBAN, username, file, fileID, error]);
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" style={{ width: "40%" }}>
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
            <label>Username</label>
            <input
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              onChange={(e) => handleUsernameChange(e)}
            />
          </div>
          <div className="form-group mt-3">
            <label>IBAN</label>
            <input
              type="string"
              className="form-control mt-1"
              placeholder="e.g HR111423431212"
              onChange={(e) => handleIBANChange(e)}
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
              id="profile_file"
              type="file"
              onChange={(e) => profilePictureChange(e)}
            />
          </div>
          <div className="form-group mt-3">
            <label>ID Picture</label>
            <input
              id="id_file"
              type="file"
              onChange={(e) => IDPictureChange(e)}
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

export default CartographerRegister;
