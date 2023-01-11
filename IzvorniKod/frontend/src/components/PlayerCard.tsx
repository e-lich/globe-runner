import { ListItem, ListItemAvatar, Avatar } from "@mui/material";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import ChallengeIcon from "./fights/ChallengeIcon";
import ViewPlayerProfileDialog from "./ViewPlayerProfileDialog";
import axios from "axios";
import WaitingForVictimDialog from "./fights/WaitingForVictimDialog";

export default function PlayerCard(props: any) {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [openWaiting, setOpenWaiting] = useState<any>(false);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await axios.get(
        `/players/info/${props.closestPlayer.userId}`
      );
      setUserInfo(response.data);
    };
    getUserInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ListItem alignItems="center" sx={{ justifyContent: "center" }}>
        <ListItemAvatar sx={{ m: 0 }}>
          <Avatar
            alt="profile picture"
            src={`data:image/jpeg;base64,${props.closestPlayer.photo}`}
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
          {userInfo && userInfo.challengeable && (
            <ChallengeIcon
              userInfo={userInfo}
              setOpen={() => setOpenWaiting(true)}
            />
          )}
        </div>
      </ListItem>

      {userInfo && (
        <ViewPlayerProfileDialog
          open={isViewOpen}
          onClose={() => {
            setIsViewOpen(false);
          }}
          userInfo={userInfo}
        />
      )}
      {openWaiting && (
        <WaitingForVictimDialog
          open={openWaiting}
          onClose={() => {
            setOpenWaiting(false);
          }}
        />
      )}
    </>
  );
}
