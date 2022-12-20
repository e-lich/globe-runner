import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { Button } from "react-bootstrap";
import ChallengeIcon from "./ChallengeIcon";

export default function UserCard(props: any) {
  const placeholder = require("../images/profile_picture.jpg");
  return (
    <ListItem alignItems="center" sx={{ justifyContent: "center" }}>
      <ListItemAvatar sx={{ m: 0 }}>
        <Avatar alt="profile picture" src={placeholder} />
      </ListItemAvatar>
      <ListItemText primary={props.username} />
    </ListItem>
  );
}
