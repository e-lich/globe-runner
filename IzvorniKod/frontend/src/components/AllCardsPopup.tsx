import { CSSProperties } from "react";
import { Container, Button } from "react-bootstrap";

type Props = {
  open: Boolean;
  onClose: any;
};

const OVERLAY: CSSProperties = {
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",

  backgroundColor: "#555",
  color: "#fff",
  textAlign: "center",
  borderRadius: "6px",

  zIndex: "1000",
  width: "400px",
  height: "450px",
};

const AllCardsPopup = ({ open, onClose }: Props) => {
  // popup se hendla iz parent komponente - treba imat useState koji mijenja open varijalbi na true/false (ovisno jel popup otvoren ili ne)
  // i onClose funkciju koja mijenja open varijablu na false (zatvara popup) - to ce samo biti setOpen(false) u parent komponenti
  if (!open) return null;

  var locationData = JSON.parse(localStorage.getItem("adminLocationData")!);

  return (
    <div style={OVERLAY}>
      <h1>~ Card Editing ~</h1>
      {/* unutar ovo Contaier se moze stavljat sadrzaj Popup-a */}
      <hr></hr>
      <h6>You are currently editing</h6>
      <h4>{locationData.title}</h4>
      <h4>This cards' coordinates are:</h4>
      <h4>
        lat: {locationData.longitude}, lng: {locationData.latitude}
      </h4>
      <hr />
      <h6>Card image:</h6>
      <img style={{ width: "50px" }} src={locationData.photo} alt=""></img>
      <hr />
      <Button onClick={onClose} variant="contained">
        Close
      </Button>
    </div>
  );
};

export default AllCardsPopup;
