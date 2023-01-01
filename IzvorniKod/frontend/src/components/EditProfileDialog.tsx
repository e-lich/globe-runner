import {
  Alert,
  Box,
  Fab,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  oldUser: any;
  open: boolean;
  onClose: any;
};

export default function FormDialog({ oldUser, open, onClose }: Props) {
  let [error, setError] = useState<Array<String>>([]);

  const handleEdit = async (values: any) => {
    setError([]);

    let formData = new FormData();

    formData.append("username", values.username);
    formData.append("password", values.password);
    formData.append("photo", values.photo);

    axios
      .post(`/users/update/${oldUser.userId}`, formData)
      .then((res) => {
        if (res.data === undefined) {
          onClose();
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
    username: oldUser.username,
    photo: undefined,
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(8),
    username: Yup.string().required("Required"),
    photo: Yup.mixed().test("photoSize", "Photo too large", photoSizeCheck),
  });

  function photoSizeCheck(photo?: Blob): boolean {
    if (photo === undefined) {
      return true;
    }
    return photo.size <= 1000000;
  }

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle
          sx={{
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Edit user information
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box justifyContent="center" display="flex" sx={{ p: 3 }}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              sx={{ width: "80%", height: "80%" }}
            >
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
                          error={
                            props.errors.username && props.touched.username
                          }
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
                          error={
                            props.errors.password && props.touched.password
                          }
                          helperText={<ErrorMessage name="password" />}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ErrorMessage name="photo" />
                      </Grid>
                      <Grid item xs={12}>
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
                            New profile picture
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
                      <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={!props.isValid}
                        fullWidth
                      >
                        Save
                      </Button>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
