import { Box, Container, Fab, Grid } from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Props = {
  open: Boolean;
  onClose: any;
};
const OVERLAY: CSSProperties = {
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  paddingTop: "50px",
  backgroundColor: "rgba(0,0,0,0.7)",
  zIndex: "1000",
};

const EditProfilePopup = ({ open, onClose }: Props) => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [file, setFile] = useState<Blob>();
  let [username, setUsername] = useState(JSON.parse(user!).username);
  let [password, setPassword] = useState("");
  let [submitDisabled, setSubmitDisabled] = useState(true);
  let [error, setError] = useState<Array<String>>([]);

  const navigate = useNavigate();

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
        if (res.data.username === undefined) {
          setError(res.data); //todo pogledaj kak ovo radi
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
    if (
      password !== "" &&
      password.length >= 8 &&
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
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, username, file]);

  if (!open) return null;

  return (
    <div style={OVERLAY}>
      <Container
        sx={{
          backgroundColor: "white",
          padding: "20px 20px",
          borderRadius: "10px",
          margin: "0 auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form>
          {error.length > 0 &&
            error.map((err, key) => (
              <div className="alert-danger alert p-1" role="alert" key={key}>
                {err}
              </div>
            ))}
          <Grid container justifyContent="center" spacing={1} rowSpacing={2}>
            <Grid item xs={6}>
              <label>Username</label>
              <input
                className="form-control mt-1"
                placeholder="e.g CoolKid123"
                onChange={(e) => handleUsernameChange(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                onChange={(e) => handlePasswordChange(e)}
              />
            </Grid>
            <Grid item xs={6}>
              {user && (
                <img
                  src={`data:image/jpeg;base64,${JSON.parse(user).photo}`}
                  alt="profile"
                  className="img-fluid mt-2 border border-dark rounded"
                />
              )}
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <input
                  hidden
                  id="contained-button-file"
                  type="file"
                  accept="image/jpeg"
                  onChange={(e) => profilePictureChange(e)}
                />
                <label htmlFor="contained-button-file">
                  <Fab component="span" sx={{ mb: 3 }}>
                    <ImageSearchIcon />
                  </Fab>
                </label>

                {file !== undefined && (
                  <Box
                    component="img"
                    alt="profile pic"
                    src={URL.createObjectURL(file)}
                    // the image has a round border
                    sx={{
                      width: 0.5,
                      aspectRatio: 0.5,
                      border: 3,
                      borderRadius: "2%",
                      alignSelf: "center",
                    }}
                  />
                )}
              </Box>
            </Grid>
          </Grid>

          <div>
            <div>
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
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  onClose();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default EditProfilePopup;
