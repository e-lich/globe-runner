import { Alert, Box, Button, Link, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function SignIn() {
  let [error, setError] = useState<Array<String>>([]);

  const navigate = useNavigate();

  const handleLogin = async (values: any) => {
    setError([]);
    return new Promise((resolve, reject) => {
      axios
        .post("/login", {
          username_or_email: values.email,
          password: values.password,
        })
        .then((res) => {
          console.log(res);
          if (res.data.email === undefined) {
            setError(res.data);
          } else {
            setError([]);
            saveUserData(res.data);
            navigate("/home");
          }
        })
        .catch((err) => {
          setError(["Something went wrong."]);
        });
    });
  };

  function saveUserData(data: any) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
    password: Yup.string().min(8).required("Required"),
  });

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          Log in{" "}
        </Typography>
        {error.map((err, key) => (
          <Alert key={key} severity="error" sx={{ mb: 2 }}>
            <strong>Error: </strong> {err}
          </Alert>
        ))}
        <Box sx={{ mb: 1 }}>
          <Link href="/register" variant="body2">
            Don't have a profile? Register here!
          </Link>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {(props: any) => (
            <Form>
              <Field
                as={TextField}
                label="email or username"
                name="email"
                placeholder="Enter email or username"
                fullWidth
                required
                error={props.errors.email && props.touched.email}
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                label="password"
                sx={{ mt: 1, mb: 2 }}
                name="password"
                placeholder="Enter password"
                type="password"
                fullWidth
                required
                error={props.errors.password && props.touched.password}
                helperText={<ErrorMessage name="password" />}
              />

              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={
                  !props.touched.password && !props.touched.email
                    ? true
                    : !props.isValid
                }
                sx={{ mt: 3, mb: 2 }}
                fullWidth
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
