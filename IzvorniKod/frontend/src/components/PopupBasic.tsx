import { CSSProperties } from "react";
import { Container, Button } from "react-bootstrap";

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

const PopupBasic = ({ open, onClose }: Props) => {
  // popup se hendla iz parent komponente - treba imat useState koji mijenja open varijalbi na true/false (ovisno jel popup otvoren ili ne)
  // i onClose funkciju koja mijenja open varijablu na false (zatvara popup) - to ce samo biti setOpen(false) u parent komponenti
  if (!open) return null;

  return (
    <div style={OVERLAY}>
      ALO ALO ALO
      {/* unutar ovo Contaier se moze stavljat sadrzaj Popup-a */}
      <Button onClick={onClose} variant="contained">
        Close
      </Button>
    </div>
  );
};

export default PopupBasic;
