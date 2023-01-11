import * as React from "react";

import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import ChallengerCard from "./ChallengerCard";

export default function ChallengesDialog({ onClose, open, challenges }: any) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>These people want to challenge you!</DialogTitle>

        <DialogContent>
          {challenges.map((challenge: any, key: any) => (
            <ChallengerCard key={key} challenge={challenge} onClose={onClose} />
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
}
