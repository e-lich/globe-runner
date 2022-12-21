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
import BanUserProfile from "./BanUserPopup";

export default function UserCard(props: any) {
  const placeholder = require("../images/profile_picture.jpg");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isBanOpen, setIsBanOpen] = useState(false);

  return (
    <>
      <ListItem alignItems="center" sx={{ justifyContent: "center" }}>
        <ListItemAvatar sx={{ m: 0 }}>
          <Avatar alt="profile picture" src={placeholder} />
        </ListItemAvatar>
        <ListItemText primary={props.username} />
        <IconButton>
          <BlockIcon onClick={() => setIsBanOpen(true)} />
        </IconButton>
        <IconButton onClick={() => setIsEditOpen(true)}>
          <EditIcon />
        </IconButton>
      </ListItem>

      <EditProfilePopup
        open={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
        }}
        oldUser={props.oldUser}
      />
      <BanUserProfile
        open={isBanOpen}
        onClose={() => {
          setIsBanOpen(false);
        }}
        oldUser={props.oldUser}
      />
    </>
  );
}
