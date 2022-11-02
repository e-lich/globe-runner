import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicRegister from "./BasicRegister";
import CartographerRegister from "./CartographerRegister";

function Register(props: any) {
  let navigator = useNavigate();

  let [isBasic, setIsBasic] = useState(false);
  let [isCartographer, setIsCartographer] = useState(false);

  function navigateToCartographerRegister() {
    navigator("/auth/cartographer");
  }

  function navigateToBasicRegister() {
    navigator("/auth/basic");
  }

  function reverseUserType() {
    setIsBasic(!isBasic);
    setIsCartographer(!isCartographer);
  }

  if (isBasic) {
    return (
      <BasicRegister
        changeAuthMode={props.changeAuthMode}
        handleEmailChange={props.handleEmailChange}
        handlePasswordChange={props.handlePasswordChange}
        submitDisabled={props.submitDisabled}
        navigate={props.navigate}
        changeUserType={reverseUserType}
      ></BasicRegister>
    );
  } else if (isCartographer) {
    return (
      <CartographerRegister
        changeAuthMode={props.changeAuthMode}
        handleEmailChange={props.handleEmailChange}
        handlePasswordChange={props.handlePasswordChange}
        submitDisabled={props.submitDisabled}
        navigate={props.navigate}
        reverseUserType={reverseUserType}
        profilePictureChange={props.profilePictureChange}
      ></CartographerRegister>
    );
  }

  return (
    <div className="Auth-form-container text-center flex">
      <button onClick={() => setIsBasic(!isBasic)} className="padding">
        Register as a basic user
      </button>
      <button
        onClick={() => setIsCartographer(!isCartographer)}
        className="padding"
      >
        Register as a cartographer
      </button>
    </div>
  );
}

export default Register;
