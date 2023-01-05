import { CSSProperties } from "react";
import { Container, Button } from "react-bootstrap";

type Props = {
  open: Boolean;
  onClose: any;
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

const ChallengePopup = ({ open, onClose }: Props) => {
  // popup se hendla iz parent komponente - treba imat useState koji mijenja open varijalbi na true/false (ovisno jel popup otvoren ili ne)
  // i onClose funkciju koja mijenja open varijablu na false (zatvara popup) - to ce samo biti setOpen(false) u parent komponenti
  if (!open) return null;

  return (
    <div style={OVERLAY}>
      <h1>~ You have been challenged bish ~</h1>
      <Button onClick={onClose} variant="contained">
        Close
      </Button>
    </div>
  );
};

export default ChallengePopup;
