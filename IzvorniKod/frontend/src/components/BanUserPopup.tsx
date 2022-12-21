import { Box, Container, Fab, Grid, Typography } from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Props = {
  open: Boolean;
  onClose: any;
  oldUser: any;
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

const BanUserProfile = ({ open, onClose, oldUser }: Props) => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [error, setError] = useState<Array<String>>([]);

  if (!open) return null;

  function handleBanUser() {
    console.log("User banned!");
    onClose();
  }

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
        {error.length > 0 &&
          error.map((err, key) => (
            <div className="alert-danger alert p-1" role="alert" key={key}>
              {err}
            </div>
          ))}

        <div>
          <div>
            <button
              type="submit"
              className="btn btn-primary m-2"
              onClick={(e) => {
                e.preventDefault();
                handleBanUser();
              }}
            >
              Ban user "{oldUser.username}"
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={(e) => {
                onClose();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BanUserProfile;
