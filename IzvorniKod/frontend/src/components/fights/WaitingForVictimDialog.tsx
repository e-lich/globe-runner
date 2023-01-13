import { CircularProgress, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
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
          ) {
            onClose();
            alert(challengeResponse);
          }

          if (challengeResponse === "accepted") navigate("/fights");
        }
      }, 2000);

      return () => {
        clearInterval(interval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const fetchChallengeResponse = async () => {
    try {
      const res = await axios.get("/fight/challenges/response");
      challengeResponse = res.data.challengeStatus;
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
        <DialogTitle id="alert-dialog-title">Challange Request</DialogTitle>

        <DialogContent sx={{ display: "flex", textAlign: "center" }}>
          <Typography
            variant="body1"
            gutterBottom
            component="div"
            sx={{ mr: 2 }}
          >
            Waiting for victim to respond...
          </Typography>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    </div>
  );
}
