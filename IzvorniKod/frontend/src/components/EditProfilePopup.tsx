import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
  Fab,
} from "@mui/material";
import { CSSProperties, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

type Props = {
  open: Boolean;
  onClose: any;
  oldUser: any;
};
const OVERLAY: CSSProperties = {
  position: "fixed",
  display: "grid",
  justifyContent: "center",

  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",

  backgroundColor: "#e6e6e6",
  color: "#fff",
  textAlign: "center",
  borderRadius: "6px",

  zIndex: "1000",
  width: "500px",
  height: "500px",
};

const EditProfilePopup = ({ open, onClose, oldUser }: Props) => {
  let [error, setError] = useState<Array<String>>([]);
  const navigate = useNavigate();

  if (!open) return null;

  const handleEdit = async (values: any) => {
    setError([]);

    let formData = new FormData();

    formData.append("username", values.username);
    formData.append("password", values.password);
    formData.append("photo", values.photo);

    axios
      .post(`/users/update/${oldUser.userId}`, formData)
      .then((res) => {
        if (res.status === 200) {
          navigate("/confirm");
        } else {
          setError(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return;
  };

  const initialValues = {
    password: "",
    username: "",
    photo: undefined,
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(8).required("Required"),
    username: Yup.string().required("Required"),
    photo: Yup.mixed()
      .test("photoSize", "Photo too large", photoSizeCheck)
      .required("Required"),
  });

  function photoSizeCheck(photo?: Blob): boolean {
    if (photo === undefined) {
      return false;
    }
    return photo.size <= 1000000;
  }

  return (
    <div style={OVERLAY}>
      <Box justifyContent="center" display="flex">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "80%", height: "80%" }}
        >
          <Typography
            sx={{ textAlign: "center", mb: 2, fontSize: 24, fontWeight: 800 }}
          >
            Edit User{" "}
          </Typography>
          {error.map((err, key) => (
            <Alert key={key} severity="error" sx={{ mb: 1 }}>
              <strong>Error: </strong> {err}
            </Alert>
          ))}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleEdit}
          >
            {(props) => (
              <Form>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      label="Username"
                      name="username"
                      type="username"
                      placeholder="Enter username"
                      fullWidth
                      required
                      error={props.errors.username && props.touched.username}
                      helperText={<ErrorMessage name="username" />}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      label="Password"
                      name="password"
                      placeholder="Enter password"
                      type="password"
                      fullWidth
                      required
                      error={props.errors.password && props.touched.password}
                      helperText={<ErrorMessage name="password" />}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <input
                      hidden
                      id="photo"
                      name="photo"
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        props.setFieldValue(
                          "photo",
                          event.currentTarget.files![0]
                        );
                      }}
                    />
                    <label htmlFor="photo">
                      <Typography noWrap sx={{ mb: 1 }}>
                        Profile picture
                      </Typography>
                      <Fab component="span" sx={{ mb: 3 }}>
                        <ImageSearchIcon />
                      </Fab>
                    </label>
                  </Grid>
                  <Grid item xs={10} sx={{ display: "flex-center" }}>
                    {props.values.photo !== undefined &&
                      props.values.photo !== "" && (
                        <Box
                          component="img"
                          alt="profile pic"
                          src={URL.createObjectURL(props.values.photo)}
                          sx={{
                            width: 0.3,
                            border: 3,
                            borderRadius: "2%",
                          }}
                        />
                      )}
                    {props.values.photo === undefined && (
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography component="label">
                          Current profile picture
                        </Typography>

                        <img
                          src={`data:image/jpeg;base64,${oldUser.photo}`}
                          alt="this should display users profile"
                          className="img-fluid mt-2 border border-dark rounded"
                        />
                      </Box>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <ErrorMessage name="photo" />
                  </Grid>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={!props.isValid}
                    fullWidth
                  >
                    Login
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
          <Button onClick={onClose} variant="contained">
            Close
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default EditProfilePopup;
