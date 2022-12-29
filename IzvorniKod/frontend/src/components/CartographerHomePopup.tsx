import { Container, TextField, InputAdornment, Button } from "@mui/material";
import { CSSProperties } from "react";
type Props = {
  open: Boolean;
  onClose: any;
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

const CartographerHomePopup = ({ open, onClose }: Props) => {
  if (!open) return null;

  var locationData = JSON.parse(localStorage.getItem("locationData")!);

  return (
    <div style={OVERLAY}>
      <Container
        sx={{
          backgroundColor: "white",
          padding: "20px 20px",
          borderRadius: "10px",
          margin: "0 auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
      <div>{/*need to center this*/}
        <TextField
          label="Card title"
          id="title"
          sx={{ m: 1, width: '25ch' }}
          type="text"
          defaultValue={locationData.title}
        />
        <TextField
          id="description"
          label="Description"
          placeholder="Please describe the location in couple of sentences"
          multiline
          sx={{ m: 1, width: '25ch' }}
          defaultValue={locationData.description}
        />
        <hr/>
        <TextField
          label="Location latitude"
          id="lat"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            endAdornment: <InputAdornment position="end">°</InputAdornment>,
            inputProps: {min: -90, max: 90}
          }}
          type="number"
          defaultValue={locationData.latitude}
        />
        <TextField
          label="Location longitude"
          id="long"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            endAdornment: <InputAdornment position="end">°</InputAdornment>,
            inputProps: {min: -180, max: 180}
          }}
          type="number"
          defaultValue={locationData.longitude}
        />
        <hr/>
        <img style={{ width: "50px" }} src={locationData.photo} alt=""></img>
          {/*MISSING IMAGE UPLOAD!!! */}
        <hr/>
        <Button 
          variant="contained"
          sx={{margin: 1}}
          color="primary"
          onClick={()=>{
            console.log("Clicked save")
          }}>
          Save
        </Button>
        <Button 
          onClick={onClose} 
          variant="contained"
          sx={{margin: 1}}
          >
        Save & Close
        </Button>
      </div>
      </Container>
    </div>
  );
};

export default CartographerHomePopup;
