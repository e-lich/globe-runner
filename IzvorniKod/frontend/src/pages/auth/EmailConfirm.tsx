import { useNavigate, useNavigation } from "react-router-dom";

function EmailConfirm() {

    const navigator = useNavigate();

    return (
        <div className="d-flex justify-content-center m-4 Auth-form-container align-items-center">
            <h1>Confirm your email</h1>
            <button className="btn btn-primary" onClick={() => {
                navigator("/login");
            }}>Sign in</button>
        </div>
    );
}

export default EmailConfirm;