import { ListItem, ListItemAvatar, Avatar } from "@mui/material";
import { Button } from "react-bootstrap";
import { useState } from "react";
import ChallengeIcon from "./ChallengeIcon";
import ViewPlayerProfileDialog from "./ViewPlayerProfileDialog";

export default function PlayerCard(props: any) {
  const placeholder = require("../images/profile_picture.jpg");
  const [isViewOpen, setIsViewOpen] = useState(false);

  return (
    <>
      <ListItem alignItems="center" sx={{ justifyContent: "center" }}>
        <ListItemAvatar sx={{ m: 0 }}>
          <Avatar
            alt="profile picture"
            src={`data:image/jpeg;base64,${props.closestCard.photo}`}
          />
        </ListItemAvatar>
        <div className="player-buttons">
          <Button
            variant="text"
            color="primary"
            onClick={() => {
              setIsViewOpen(true);
            }}
          >
            {props.closestPlayer.username}
          </Button>
          <ChallengeIcon swords={props.swords} />
        </div>
      </ListItem>

      <ViewPlayerProfileDialog
        open={isViewOpen}
        onClose={() => {
          setIsViewOpen(false);
        }}
        player={props.closestPlayer}
      />
    </>
  );
}
