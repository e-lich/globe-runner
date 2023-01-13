import { ListItem, ListItemAvatar, Avatar, Icon } from "@mui/material";
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

  const graySwords = require("../images/swords-unavailable.png");

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
          {userInfo && !userInfo.challengeable && (
            <Button
              variant="text"
              color="primary"
              onClick={() => {
                alert("Player not challengeable!");
              }}
            >
              <Icon>
                <div style={{ width: "100%", height: "100%" }}>
                  <img
                    src={graySwords}
                    alt="battle"
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                      verticalAlign: "top",
                    }}
                  />
                </div>
              </Icon>
            </Button>
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
