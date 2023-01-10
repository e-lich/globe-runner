import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useEffect } from "react";

export default function WaitingForVictimDialog({ onClose, open }: any) {
  var res;

  useEffect(() => {
    let interval = setInterval(async () => {
      console.log("Checking for challenge response!");
      fetchChallengeResponse();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchChallengeResponse = async () => {
    // try {
    //   res = await axios.get("/fight/challenges/response");
    // } catch (e) {
    //   alert(e);
    // }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
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
