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
import EditProfileDialog from "./EditProfileDialog";
import BanUserDialog from "./BanUserDialog";

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
        <ListItemText primary={props.oldUser.username} />
        <IconButton onClick={() => setIsBanOpen(true)}>
          <BlockIcon />
        </IconButton>
        <IconButton onClick={() => setIsEditOpen(true)}>
          <EditIcon />
        </IconButton>
      </ListItem>

      <EditProfileDialog
        open={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
        }}
        oldUser={props.oldUser}
      />
      <BanUserDialog
        open={isBanOpen}
        onClose={() => {
          setIsBanOpen(false);
        }}
        oldUser={props.oldUser}
      />
    </>
  );
}
