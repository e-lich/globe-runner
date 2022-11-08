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
    <>
      <div className="Auth-form-container form">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <div className="text-center">
              <h1 className="Auth-form-title">Register</h1>
              <div className="text-center">
                Already registered?{" "}
                <span className="link-primary" onClick={props.changeAuthMode}>
                  Sign in
                </span>
              </div>
              <div className="flex-column">
                <button
                  onClick={() => setIsBasic(!isBasic)}
                  className="padding-button btn-primary btn"
                >
                  Basic user
                </button>
                <button
                  onClick={() => setIsCartographer(!isCartographer)}
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
