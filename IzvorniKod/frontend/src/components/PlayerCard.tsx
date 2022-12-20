import { ListItem, ListItemAvatar, Avatar } from "@mui/material";
import { Button } from "react-bootstrap";
import ChallengeIcon from "./ChallengeIcon";

export default function PlayerCard(props: any) {
  const placeholder = require("../images/profile_picture.jpg");
  return (
    <ListItem alignItems="center" sx={{ justifyContent: "center" }}>
      <ListItemAvatar sx={{ m: 0 }}>
        <Avatar alt="profile picture" src={placeholder} />
      </ListItemAvatar>
      <div className="player-buttons">
        <Button
          color="primary"
          onClick={() => {
            console.log("DISPLAY USER PROFILE");
          }}
        >
          {props.battle ? props.closestPlayer.username : props.username}
        </Button>
        {props.battle ? <ChallengeIcon swords={props.swords} /> : <></>}
      </div>
    </ListItem>
  );
}
