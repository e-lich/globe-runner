import { CSSProperties } from "react";
import { Container, Button } from "react-bootstrap";

type Props = {
  open: Boolean;
  onClose: any;
  player: any;
};

const OVERLAY: CSSProperties = {
  position: "fixed",
  display: "grid",
  justifyContent: "center",

  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",

  backgroundColor: "#555",
  color: "#fff",
  textAlign: "center",
  borderRadius: "6px",

  zIndex: "1000",
  width: "450px",
  height: "600px",
};

const ViewProfilePopup = ({ open, onClose, player }: Props) => {
  // popup se hendla iz parent komponente - treba imat useState koji mijenja open varijalbi na true/false (ovisno jel popup otvoren ili ne)
  // i onClose funkciju koja mijenja open varijablu na false (zatvara popup) - to ce samo biti setOpen(false) u parent komponenti
  if (!open) return null;

  return (
    <div style={OVERLAY}>
      <h1>~ Profile Information ~</h1>
      {/* unutar ovo Contaier se moze stavljat sadrzaj Popup-a */}
      <div style={{ width: "380px", fontSize: "30px" }}>
        {player.username}
        <hr></hr>
        This is a beautiful profile inside a popup that is working, we can
        display anything we want in here and pass any type of a property we
        want! Love you all! &#60;3
      </div>
      <Button onClick={onClose} variant="contained">
        Close
      </Button>
    </div>
  );
};

export default ViewProfilePopup;
