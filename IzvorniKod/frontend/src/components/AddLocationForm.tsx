import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Alert, Button, Fab, Typography } from "@mui/material";
import axios from "axios";
import * as Yup from "yup";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AddLocationForm({
  lat,
  setLat,
  long,
  setLong,
  userLatitude,
  userLongitude,
  refresh,
  setRefresh,
}: {
  lat: Number | undefined;
  setLat: Function;
  long: Number | undefined;
  setLong: Function;
  userLatitude: Number | undefined;
  userLongitude: Number | undefined;
  refresh: boolean;
  setRefresh: Function;
}) {
  let [error, setError] = useState<Array<String>>([]);
  const navigate = useNavigate();

  const setUserLocation = async () => {
    console.log("setting form location to the user location!");
    setLat(userLatitude);
    setLong(userLongitude);
  };

  const initialValues = {
    title: "",
    description: "",
    lat: lat,
    long: long,
    locationPhoto: undefined,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().min(20).required("Required"),
    lat: Yup.number().required("Required"),
    long: Yup.number().required("Required"),
    locationPhoto: Yup.mixed()
      .test("photoSize", "Photo too large", photoSizeCheck)
      .required("Required"),
  });

  function photoSizeCheck(locationPhoto?: Blob): boolean {
    if (locationPhoto === undefined) {
      return false;
    }
    return locationPhoto.size <= 1000000;
  }

  const handleSubmit = async (values: any) => {
    console.log("saving location");

    setError([]);

    let formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("lat", lat!.toString());
    formData.append("long", long!.toString());
    formData.append("photo", values.locationPhoto);

    values.title = "";
    values.description = "";
    setLat(0);
    setLong(0);
    values.locationPhoto = undefined;

    axios
      .post("/locations/add/", formData)
      .then((res) => {
        console.log(res);
        if (res.data.success !== true) {
          setError(res.data);
        } else {
          window.alert("Location added!");
          navigate("/addLocation");
          setRefresh((refresh: any) => !refresh);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return;
  };

  return (
    <>
      {error.length > 0
        ? error.map((err, key) => (
            <Alert key={key} severity="error" sx={{ mb: 1 }}>
              <strong>Error: </strong> {err}
            </Alert>
          ))
        : ""}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Field
                  as={TextField}
                  label="Card title"
                  name="title"
                  placeholder="Edit location title"
                  fullWidth
                  required
                  error={props.errors.title && props.touched.title}
                  helperText={<ErrorMessage name="title" />}
                  sx={{ m: 1, width: "80%", margin: "1px" }}
                />
                <Field
                  as={TextField}
                  label="Description"
                  name="description"
                  placeholder="Edit location description"
                  fullWidth
                  multiline
                  required
                  error={props.errors.description && props.touched.description}
                  helperText={<ErrorMessage name="description" />}
                  sx={{ m: 1, width: "80%", margin: "1px" }}
                />
              </Box>
              <hr />
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Field
                  as={TextField}
                  label="Latitude"
                  name="lat"
                  placeholder="Edit location lat"
                  fullWidth
                  value={lat}
                  disabled
                  required
                  error={props.errors.lat && props.touched.lat}
                  helperText={<ErrorMessage name="lat" />}
                  sx={{ m: 1, width: "80%", margin: "1px" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">°</InputAdornment>
                    ),
                    inputProps: { min: -90, max: 90, step: "any" },
                  }}
                  type="decimal"
                />
                <Field
                  as={TextField}
                  label="Longitude"
                  name="long"
                  placeholder="Edit location longitude"
                  fullWidth
                  value={long}
                  disabled
                  required
                  error={props.errors.long && props.touched.long}
                  helperText={<ErrorMessage name="long" />}
                  sx={{ m: 1, width: "80%", margin: "1px" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">°</InputAdornment>
                    ),
                    inputProps: { min: -180, max: 180, step: "any" },
                  }}
                  type="decimal"
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                  textAlign="center"
                >
                  Click on the map or use the button below!
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={setUserLocation}
                >
                  Use my location
                </Button>
              </Box>

              <hr />
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  hidden
                  id="locationPhoto"
                  name="locationPhoto"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    props.setFieldValue(
                      "locationPhoto",
                      event.currentTarget.files![0]
                    );
                    console.log("added pic  " + props.values.locationPhoto);
                  }}
                />
                <label htmlFor="locationPhoto">
                  <Typography
                    noWrap
                    sx={{ mb: 1 }}
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                  >
                    Location picture
                  </Typography>
                  <Fab
                    component="span"
                    sx={{
                      mb: 3,
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "row",
                      margin: 0,
                      marginLeft: "20px",
                    }}
                  >
                    <ImageSearchIcon />
                  </Fab>
                </label>

                {props.values.locationPhoto !== undefined && (
                  <Box
                    component="img"
                    alt="location pic"
                    src={URL.createObjectURL(props.values.locationPhoto)}
                    sx={{
                      border: 3,
                      borderRadius: "2%",
                      height: "120px",
                      marginLeft: "20px",
                    }}
                  />
                )}
              </Box>
              <hr style={{ margin: "5px" }} />
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={!props.isValid}
                  sx={{ margin: 1 }}
                >
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}
