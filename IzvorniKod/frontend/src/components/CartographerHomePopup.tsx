import { Container, TextField, InputAdornment, Button, Paper } from "@mui/material";
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
      <Paper
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
      <div>{/*need to center this*/}
        <div style={{
          justifyContent: "center", 
          alignItems: "center",
          display: "flex",
          flexWrap: "wrap",
        } /*center content*/}>
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
        </div>
        
        <hr/>
        <div style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexWrap: "wrap",
        }}>
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
        </div>
      
        <hr/>
        <div style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexWrap: "wrap",
        }}>
          <img style={{ height: "100px" }} src={locationData.photo} alt=""></img>
            {/*MISSING IMAGE UPLOAD!!! */}
        </div>
        <hr/> 
        <div style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexWrap: "wrap",
        }}>
          <Button 
            variant="contained"
            sx={{margin: 1}}
            color="primary"
            onClick={()=>{
              console.log("Saving changes")
            }}>
            Save
          </Button>
          <Button 
            onClick={() => {
              console.log("Saving changes")
              onClose()}} 
            color="success"
            variant="contained"
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
          Cancel
          </Button>
        </div>
      </div>
      </Paper>
    </div>
  );
};

export default CartographerHomePopup;
