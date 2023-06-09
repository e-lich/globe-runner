import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Fab,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

function BasicRegister() {
  let [error, setError] = useState<Array<String>>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (values: any) => {
    setError([]);

    let formData = new FormData();

    formData.append("name", values.fullName);
    formData.append("email", values.email);
    formData.append("username", values.username);
    formData.append("photo", values.photo);
    formData.append("password", values.password);
    formData.append("iban", ""); // TODO - ovo je quick fix, bilo bi ljepse to hendlati na backendu

    setLoading(true);

    axios
      .post("/register", formData)
      .then((res) => {
        console.log(res);
        if (res.data.email === undefined) {
          setLoading(false);
          setError(res.data);
        } else {
          setLoading(false);
          navigate("/confirm");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(["Something went wrong."]);
      });

    return;
  };

  const initialValues = {
    fullName: "",
    email: "",
    username: "",
    password: "",
    photo: undefined,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Required"),
    password: Yup.string().min(8).required("Required"),
    fullName: Yup.string().required("Required"),
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
    <Box justifyContent="center" display="flex">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ width: 0.4, minHeight: "100vh" }}
      >
        <Typography
          sx={{ textAlign: "center", mb: 2, fontSize: 24, fontWeight: 800 }}
        >
          Register as User{" "}
        </Typography>
        {error.map((err, key) => (
          <Alert key={key} severity="error" sx={{ mb: 1 }}>
            <strong>Error: </strong> {err}
          </Alert>
        ))}

        <Box
          sx={{
            display: "flex",
            mb: 1,
          }}
        >
          <Link href="/login" variant="body2">
            Already have a profile? Log in here!
          </Link>
        </Box>

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
                    label="Email"
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
                </Grid>
                {/* ovaj error se pokazuje kada su gore prikazani errori vazani uz backend, znaci kada se klikne submit, a inicijalno sumbit se disable ako ne prode
              vaidadciju, ali ne napise nikakav error msg (al ocito postoji jer inace ne bi disableo submit) */}

                {loading && (
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <CircularProgress
                      sx={{
                        size: 20,
                      }}
                    />
                  </Grid>
                )}

                {!loading && (
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={!props.isValid}
                    fullWidth
                  >
                    Register
                  </Button>
                )}
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export default BasicRegister;
