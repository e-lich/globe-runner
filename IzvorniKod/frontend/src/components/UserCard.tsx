import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import EditProfilePopup from "./EditProfilePopup";

export default function UserCard(props: any) {
  const placeholder = require("../images/profile_picture.jpg");
  const [isOpen, setIsOpen] = useState(false);

  function handleEdit(): void {
    setIsOpen(true);
  }

  return (
    <>
      <ListItem alignItems="center" sx={{ justifyContent: "center" }}>
        <ListItemAvatar sx={{ m: 0 }}>
          <Avatar alt="profile picture" src={placeholder} />
        </ListItemAvatar>
        <ListItemText primary={props.username} />
        <IconButton onClick={() => console.log("BLOCK THIS USER")}>
          <BlockIcon />
        </IconButton>
        <IconButton onClick={() => handleEdit()}>
          <EditIcon />
        </IconButton>
      </ListItem>

      <EditProfilePopup
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        oldUser={props.oldUser}
      />
    </>
  );
}
