import * as React from "react";

import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import { Typography } from "@mui/material";

export default function CardDialog({ onClose, open, locationCard }: any) {
  const placeholder = require("../images/placeholder-LocationCard.png");

  return (
    <div
      style={{
        margin: 10,
      }}
    >
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{
          margin: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          noWrap
          style={{ textAlign: "center", margin: 30 }}
        >
          {locationCard.title}
        </Typography>

        <DialogContent
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div>{locationCard.description}</div>
          <img
            style={{ height: "200px" }}
            src={
              locationCard.photo === "None"
                ? placeholder
                : locationCard.photo.startsWith("http")
                ? locationCard.photo
                : `data:image/jpeg;base64,${locationCard.photo}`
            }
            alt=""
          />
          <div style={{ textAlign: "center" }}>STRENGTH 7/10</div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
