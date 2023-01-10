import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function WaitingForVictimDialog({ onClose, open }: any) {
  var challengeResponse: String | undefined;
  var navigate = useNavigate();

  useEffect(() => {
    if (open) {
      let interval = setInterval(async () => {
        console.log("Checking for challenge response!");
        await fetchChallengeResponse();

        if (challengeResponse) {
          if (
            challengeResponse === "went too far" ||
            challengeResponse === "declined"
          )
            window.location.reload();

          if (challengeResponse === "accepted") navigate("/fights");
        }
      }, 2000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [open]);

  const fetchChallengeResponse = async () => {
    try {
      const res = await axios.get("/fight/challenges/response");
      challengeResponse = res.data;
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={(event, reason) => {
          onClose();
          axios.delete("/fight/challenges/delete");
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Waiting for victim to respond!"}
        </DialogTitle>

        <DialogContent></DialogContent>
      </Dialog>
    </div>
  );
}
