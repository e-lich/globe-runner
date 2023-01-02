import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function AlertDialog({ onClose, open, oldUser }: any) {
  // makes an axios request to ban the user on the url /users/ban/:userID

  const handleBan = () => {
    axios
      .post(`/users/ban/${oldUser.userID}`)
      .then((res) => {
        if (res.status === 200) {
          onClose();
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Ban user"}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to ban user {oldUser.username}? This action is
            temporary and can be undone - but broken trust is hard to regain.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} autoFocus>
            No
          </Button>
          <Button onClick={handleBan}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
