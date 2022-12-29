import {
  Alert,
  Box,
  Button,
  Container,
  CssBaseline,
  Fab,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

function CartographerRegister() {
  let [error, setError] = useState<Array<String>>([]);

  const navigate = useNavigate();

  const baseURL = "http://127.0.0.1:5000";

  const handleRegister = async (values: any) => {
    let formData = new FormData();

    formData.append("name", values.fullName);
    formData.append("email", values.email);
    formData.append("username", values.username);
    formData.append("password", values.password);
    formData.append("iban", values.IBAN);
    formData.append("photo", values.photo);
    formData.append("id", values.idPhoto);

    const config = {
      withCredentials: true,
    };

    axios
      .post(baseURL + "/register", formData, config)
      .then((response) => {
        console.log(response);
        if (response.data.email === undefined) {
          setError(response.data);
        } else {
          navigate("/confirm");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const initialValues = {
    fullName: "",
    email: "",
    username: "",
    password: "",
    photo: undefined,
    idPhoto: undefined,
    IBAN: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Required"),
    password: Yup.string().min(8).required("Required"),
    fullName: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    IBAN: Yup.string()
      .matches(/^HR\d{19}$/, "Invalid IBAN")
      .required("Required"),
    photo: Yup.mixed()
      .test("photoSize", "Profile Photo too large", photoSizeCheck)
      .required("Required"),
    idPhoto: Yup.mixed()
      .test("idPhotoSize", "ID Photo too large", photoSizeCheck)
      .required("Required"),
  });

  function photoSizeCheck(photo?: Blob): boolean {
    if (photo === undefined) {
      return false;
    }
    return photo.size <= 1000000;
  }

  return (
    <Box justifyContent="center" display="flex">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ width: 0.4, minHeight: "100vh" }}
      >
        <Typography
          sx={{
            textAlign: "center",
            mb: 2,
            mt: 5,
            fontSize: 24,
            fontWeight: 800,
          }}
        >
          Register as Cartographer
        </Typography>
        {error.map((err, key) => (
          <Alert key={key} severity="error" sx={{ mb: 1 }}>
            <strong>Error: </strong> {err}
          </Alert>
        ))}

        <Grid container justifyContent="flex-start">
          <Grid item sx={{ mb: 2 }}>
            <Link href="/login" variant="body2">
              Already have a profile? Log in here!
            </Link>
          </Grid>
        </Grid>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {(props) => (
            <Form>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    label="Full name"
                    name="fullName"
                    placeholder="Enter full name"
                    fullWidth
                    required
                    error={props.errors.fullName && props.touched.fullName}
                    helperText={<ErrorMessage name="fullName" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    label="email"
                    name="email"
                    placeholder="Enter email"
                    type="email"
                    fullWidth
                    required
                    error={props.errors.email && props.touched.email}
                    helperText={<ErrorMessage name="email" />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    label="username"
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
                    label="password"
                    name="password"
                    placeholder="Enter password"
                    type="password"
                    fullWidth
                    required
                    error={props.errors.password && props.touched.password}
                    helperText={<ErrorMessage name="password" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    label="IBAN"
                    name="IBAN"
                    placeholder="Enter IBAN"
                    type="IBAN"
                    fullWidth
                    required
                    error={props.errors.IBAN && props.touched.IBAN}
                    helperText={<ErrorMessage name="IBAN" />}
                  />
                </Grid>
                <Grid item xs={4}>
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
                <Grid item xs={8} sx={{ display: "flex-center" }}>
                  {props.values.photo !== undefined &&
                    props.values.photo !== "" && (
                      <Box
                        component="img"
                        alt="profile pic"
                        src={URL.createObjectURL(props.values.photo)}
                        sx={{
                          width: 0.6,
                          border: 3,
                          borderRadius: "2%",
                        }}
                      />
                    )}
                </Grid>
                <Grid item xs={12}>
                  <ErrorMessage name="photo" />
                </Grid>
                <Grid item xs={4}>
                  <input
                    hidden
                    id="idPhoto"
                    name="idPhoto"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      props.setFieldValue(
                        "idPhoto",
                        event.currentTarget.files![0]
                      );
                    }}
                  />
                  <label htmlFor="idPhoto">
                    <Typography noWrap sx={{ mb: 1 }}>
                      ID Picture
                    </Typography>
                    <Fab component="span" sx={{ mb: 3 }}>
                      <ImageSearchIcon />
                    </Fab>
                  </label>
                </Grid>
                <Grid item xs={8} sx={{ display: "flex-center" }}>
                  {props.values.idPhoto !== undefined &&
                    props.values.idPhoto !== "" && (
                      <Box
                        component="img"
                        alt="id picture"
                        src={URL.createObjectURL(props.values.idPhoto)}
                        sx={{
                          width: 0.6,
                          border: 3,
                          borderRadius: "2%",
                        }}
                      />
                    )}
                </Grid>
                <Grid item xs={12}>
                  <ErrorMessage name="idPhoto" />
                </Grid>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={!props.isValid}
                  sx={{ mt: 3, mb: 2 }}
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default CartographerRegister;
