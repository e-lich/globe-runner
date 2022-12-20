import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CartographerRegister() {
  let [file, setFile] = useState<Blob>();
  let [fileID, setFileID] = useState<Blob>();

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

  function IDPictureChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setError((prev) =>
      prev.filter((e) => e !== "Image must be less than 1MB!")
    );
    if (
      e.target.files &&
      e.target.files[0] &&
      e.target.files[0].size < 1000000 &&
      e.target.files[0].type === "image/jpeg"
    ) {
      setFileID(e.target.files[0]);
    } else {
      setError((previousValue) => [
        ...previousValue,
        "Image must be less than 1MB!",
      ]);
    }
  }

  const baseURL = "http://127.0.0.1:5000";

  function saveUserData(data: any) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  // TODO
  function handleRegister() {
    if (!file || !fileID) {
      setError((previousValue) => [
        ...previousValue,
        "You must upload a profile picture and ID picture!",
      ]);
      return;
    }

    let formData = new FormData();

    formData.append("name", fullName);
    formData.append("username", username);
    formData.append("iban", IBAN);
    formData.append("email", email);
    formData.append("photo", file);
    formData.append("id", fileID);
    formData.append("username", username);
    formData.append("password", password);

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };

    axios
      .post(baseURL + "/register", formData, config)
      .then((response) => {
        console.log(response);
        if (response.data.email === undefined) {
          setError(response.data);
        } else {
          saveUserData(response.data);
          navigate("/confirm");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
      IBAN !== "" &&
      username !== "" &&
      file !== undefined &&
      fileID !== undefined &&
      !error.includes("Image must be less than 1MB!")
    )
      setSubmitDisabled(false);
    else {
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
  }, [email, password, fullName, IBAN, username, file, fileID]);

  return (
    <div className="d-flex justify-content-center m-4">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Register as Cartographer</h3>
          <div className="text-center">
            Already registered?{" "}
            <span
              className="link-primary"
              onClick={() => {
                navigate("/login");
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
              placeholder="e.g CoolKid123"
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
            <label>ID Picture</label>
            <input
              id="id_file"
              type="file"
              accept="image/jpeg"
              onChange={(e) => IDPictureChange(e)}
            />
            {fileID !== undefined && (
              <img
                alt="id pic"
                src={URL.createObjectURL(fileID)}
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

export default CartographerRegister;
