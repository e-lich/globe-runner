import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export default function AddLocationForm({
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  useMyLocation,
  setUseMyLocation,
}: {
  latitude: Number | undefined;
  setLatitude: Function;
  longitude: Number | undefined;
  setLongitude: Function;
  useMyLocation: boolean;
  setUseMyLocation: Function;
}) {
  //  MAKE POST REQUEST!
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  /* const [file, setFile] = useState<Blob>();
  let [error, setError] = useState<Array<String>>([]);
  let [submitDisabled, setSubmitDisabled] = useState(true);

  function locationPhotoChange(e: React.ChangeEvent<HTMLInputElement>): void {
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

  function handleSubmit() {
    if (!file) {
      setError((previousValue) => [
        ...previousValue,
        "You must upload a location picture!",
      ]);
      return;
    }

    let formData = new FormData();

    formData.append("title", title); //append the values with key, value pair
    formData.append("description", description);
    formData.append("lat", lat);
    formData.append("long", long);

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    //axios
    console.log(formData)
    return;
  }*/

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <div>
        {/*need to center this*/}
        <TextField
          label="Card title"
          id="title"
          sx={{ m: 1, width: "25ch" }}
          type="text"
        />
        <TextField
          id="description"
          label="Description"
          placeholder="Please describe the location in couple of sentences"
          multiline
          sx={{ m: 1, width: "25ch" }}
        />
        <hr />
        <TextField
          label="Location latitude"
          disabled={true}
          value={latitude}
          id="lat"
          sx={{ m: 1, width: "25ch" }}
          InputProps={{
            endAdornment: <InputAdornment position="end">°</InputAdornment>,
            inputProps: { min: -90, max: 90 },
          }}
          type="number"
        />
        <TextField
          label="Location longitude"
          disabled={true}
          value={longitude}
          id="long"
          sx={{ m: 1, width: "25ch" }}
          InputProps={{
            endAdornment: <InputAdornment position="end">°</InputAdornment>,
            inputProps: { min: -180, max: 180 },
          }}
          type="number"
          helperText="You can click on the map or use your location!"
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            setUseMyLocation(true);
            console.log("setting my location to true");
          }}
        >
          Use my location
        </Button>
        <hr />
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            console.log("Clicked submit");
          }}
        >
          Submit
        </Button>
        <hr />
      </div>
    </Box>
  );
}
