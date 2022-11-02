import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicRegister from "./BasicRegister";
import CartographerRegister from "./CartographerRegister";
import Register from "./Register";
import SignIn from "./SignIn";

export default function Auth() {
  let [authMode, setAuthMode] = useState("signin");

  const [file, setFile] = useState<string | Blob>("");

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [submitDisabled, setSubmitDisabled] = useState(true);

  const navigate = useNavigate();

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "register" : "signin");
  };

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

  if (authMode === "signin") {
    return (
      <SignIn
        changeAuthMode={changeAuthMode}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        submitDisabled={submitDisabled}
        navigate={navigate}
      ></SignIn>
    );
  }

  return (
    <Register
      changeAuthMode={changeAuthMode}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      submitDisabled={submitDisabled}
      navigate={navigate}
      profilePictureChange={profilePictureChange}
    ></Register>
  );
}
