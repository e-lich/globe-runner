import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Alert, Button, Fab, Typography } from "@mui/material";
import axios from "axios";
import * as Yup from "yup";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { error } from "console";
import { useState } from "react";


export default function AddLocationForm({
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  userLatitude,
  userLongitude,
}: {
  latitude: Number | undefined;
  setLatitude: Function;
  longitude: Number | undefined;
  setLongitude: Function;
  userLatitude: Number | undefined;

  userLongitude: Number | undefined;
}) {
  let [error, setError] = useState<Array<String>>([]);
  const navigate = useNavigate();

  const setUserLocation = async () => {
    console.log("setting form location to the user location!");
    setLatitude(userLatitude);
    setLongitude(userLongitude);
  };

  const initialValues = {
    title: "",
    description: "",
    latitude: latitude,
    longitude: longitude,
    locationPhoto: undefined,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().min(20).required("Required"),
    latitude: Yup.number().required("Required"),
    longitude: Yup.number().required("Required"),
    LocationPhoto: Yup.mixed()
      .test("photoSize", "Photo too large", photoSizeCheck)
      .required("Required"),
  });

  function photoSizeCheck(locationPhoto?: Blob): boolean {
    if (locationPhoto === undefined) {
      console.log("photo undefined");
      return false;
    }
    console.log("photo size: " + locationPhoto.size);
    return locationPhoto.size <= 1000000;
  }

  const handleSubmit = async (values: any) => {
    console.log("saving location");

    setError([]);

    let formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("latitude", values.latitude);
    formData.append("longitude", values.longitude);
    formData.append("locationPhoto", values.locationPhoto);

    axios
      .post("/locations/add/submitted", formData)
      .then((res) => {
        console.log(res);
        if (res.data.success != true) {
          setError(res.data);
        } else {
          navigate("/addLocation");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return;
  }

  return (
    <>
    {error.length > 0 ? 
          error.map((err, key) => (
            <Alert key={key} severity="error" sx={{ mb: 1 }}>
              <strong>Error: </strong> {err}
            </Alert>
    )) : ""}
        
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
                  sx={{ m: 1, width: '25ch' }}
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
                  sx={{ m: 1, width: '25ch' }}

                />
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
              <Field
                as={TextField}
                label="Latitude"
                name="latitude"
                placeholder="Edit location latitude"
                fullWidth
                value = {latitude}
                required
                error={props.errors.latitude && props.touched.latitude}
                helperText={<ErrorMessage name="latitude" />}
                sx={{ m: 1, width: '25ch' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">°</InputAdornment>),
                    inputProps: { min: -90, max: 90},
                }}
                type="number"
                />
              <Field
                as={TextField}
                label="Longitude"
                name="longitude"
                placeholder="Edit location longitude"
                fullWidth
                value = {longitude}
                required
                error={props.errors.longitude && props.touched.longitude}
                helperText={<ErrorMessage name="longitude" />}
                sx={{ m: 1, width: '25ch' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">°</InputAdornment>),
                    inputProps: { min: -180, max: 180},
                }}
                type="number"
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                  textAlign="center"
                >
                  Click on the map or use the button below!
                </Typography>
                <Button variant="outlined" color="primary" onClick={setUserLocation}>
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
                    noWrap sx={{ mb: 1 }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Location picture
                  </Typography>
                  <Fab component="span" sx={{ mb: 3 }}>
                    <ImageSearchIcon />
                  </Fab>
                </label>

                {props.values.locationPhoto !== undefined &&(
                    <Box
                      component="img"
                      alt="location pic"
                      src={URL.createObjectURL(props.values.locationPhoto)}
                      sx={{
                        width: 0.3,
                        border: 3,
                        borderRadius: "2%",
                      }}
                    />
                  )}

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
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={!props.isValid}
                sx={{margin: 1}}
              >
                Submit
              </Button>
            </Box>
          </Form>)}
      </Formik>
    </Box>
    </>

   
  );
}
