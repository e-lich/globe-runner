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
import * as Yup from "yup";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  oldUser: any;
  open: boolean;
  onClose: any;
};

export default function EditMyProfileDialog({ oldUser, open, onClose }: Props) {
  const navigate = useNavigate();
  function handleLogout() {
    const logout = async () => {
      try {
        const response = await axios.post("/logout");

        if (response.status !== 200) {
          console.log("Something went wrong while logging out");
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    logout();
    localStorage.removeItem("user");

    navigate("/login");
  }

  function handleDelete() {
    axios
      .delete(`/users/delete`)
      .then((res) => {
        if (res.status === 200) {
          handleLogout();
        } else {
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return;
  }

  const handleEdit = async (values: any) => {
    let formData = new FormData();

    formData.append("username", values.username);
    formData.append("password", values.password);
    formData.append("photo", values.photo);

    axios
      .post(`/users/update`, formData)
      .then((res) => {
        if (res.status === 200) {
          onClose();
        } else {
          console.log(res.data);
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
          Edit my information
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
                        <Typography noWrap sx={{ mb: 1 }}>
                          New profile picture
                        </Typography>
                        <label htmlFor="photo">
                          <Fab component="span" sx={{ mb: 3 }}>
                            <ImageSearchIcon />
                          </Fab>
                        </label>
                      </Grid>
                      <Grid item xs={0}>
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
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        {props.values.photo !== undefined &&
                          props.values.photo !== "" && (
                            <Box
                              component="img"
                              alt="profile pic"
                              src={URL.createObjectURL(props.values.photo)}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "10em",
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
                        sx={{ mt: 2 }}
                      >
                        Save
                      </Button>
                      <Button
                        type="submit"
                        color="error"
                        variant="contained"
                        disabled={!props.isValid}
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={() => {
                          window.confirm(
                            "Are you sure you want to delete your profile?"
                          ) && handleDelete();
                        }}
                      >
                        Delete my profile
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
