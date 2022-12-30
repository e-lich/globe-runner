import { Container, TextField, InputAdornment, Button, Paper, Alert, Box, Fab, Grid, Link, Typography } from "@mui/material";
import { error } from "console";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { CSSProperties } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";


type Props = {
  open: Boolean;
  onClose: any;
  fetchLocations: Function;
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
//  .../locations/update/submitted/


const CartographerHomePopup = ({ open, onClose, fetchLocations }: Props) => {
  let [error, setError] = useState<Array<String>>([]);
  const navigate = useNavigate();

  if (!open) return null;
  var locationData = JSON.parse(localStorage.getItem("locationData")!);

  const baseURL = "http://127.0.0.1:5000";

  const handleSave = async (values: any) => {
    setError([]);

    let formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("locationPhoto", values.locationPhoto);

    const config = {
      withCredentials: true,
    };

    axios
      .post(baseURL + "/locations/update/submitted/" + locationData.cardID, formData, config)
      .then((res) => {
        console.log(res);
        if (res.data.success != true) {
          setError(res.data);
        } else {
          fetchLocations().catch(console.error);
          onClose();
          navigate("/home");

        }
      })
      .catch((err) => {
        console.log(err);
      });

    return;
  };

  const initialValues = {
    title: locationData.title,
    description: locationData.description===null ? "" : locationData.description,
    locationPhoto: undefined,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().min(20).required("Required"),
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

  return (
    <div style={OVERLAY}>
      <Box
        sx={{
          backgroundColor: "white",
          padding: "20px 20px",
          borderRadius: "10px",
          margin: "0 auto",
          justifyContent: "center",
          alignItems: "center",
          width: "75%",
        }}  
      >
        <Typography
          sx={{ textAlign: "center", mb: 2, fontSize: 24, fontWeight: 800 }}
        >
          Editing location <i>{locationData.title}</i>
        </Typography>
        
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
            onSubmit={handleSave}
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
                      )
                      console.log("added pic  " + props.values.locationPhoto);
                    }}
                  />
                    <label htmlFor="locationPhoto">
                      <Typography noWrap sx={{ mb: 1 }}>
                        Location picture
                      </Typography>
                      <Fab component="span" sx={{ mb: 3 }}>
                        <ImageSearchIcon />
                      </Fab>
                    </label>

                    {props.values.locationPhoto !== undefined &&
                      props.values.locationPhoto !== "" && (
                        <Box
                          component="img"
                          alt="new location pic"
                          src={URL.createObjectURL(props.values.locationPhoto)}
                          sx={{
                            width: 0.3,
                            border: 3,
                            borderRadius: "2%",
                          }}
                        />
                      )}

                    {props.values.locationPhoto === undefined &&
                      locationData.locationPhoto !== 'None' && (
                        <Box
                          component="img"
                          alt="old location pic"
                          src={locationData.locationPhoto}
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
                    Save & Close
                  </Button>
                  <Button 
                    onClick={() => {
                      console.log("Not saving changes")
                      onClose()}} 
                    variant="contained"
                    color="error"
                    sx={{margin: 1}}
                  >
                    Close without saving
                  </Button>
                </Box>
              </Form>)}
          </Formik>
        </Box>
      </Box>
    </div>
  );
};

export default CartographerHomePopup;
