import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Card,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";

export default function LeaderboardPlayers(props: any) {
  const [playersInfo, setPlayersInfo] = useState<any>(null);

  useEffect(() => {
    const getPlayersInfo = async () => {
      const response = await axios.get(
        `/players/info/${props.topPlayer.userID}`
      );
      setPlayersInfo(response.data);
    };
    getPlayersInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {playersInfo && (
        <Card
          sx={{
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            padding: 1,
            borderRadius: 0,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", width: "3em" }}>
            <Typography variant="h5" sx={{ ml: 2 }}>
              {props.counter + 1}
            </Typography>
          </Box>
          <Avatar
            alt="profile picture"
            src={`data:image/jpeg;base64,${playersInfo.profilePhoto}`}
            sx={{
              width: 56,
              height: 56,
              border: "1px solid black",
              mr: 2,
              ml: 2,
            }}
          />
          <Box
            sx={{
              flexDirection: "column",
              alignItems: "center",
              ml: 2,
            }}
          >
            <Typography variant="h5">{playersInfo.username}</Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Typography variant="subtitle1">
                Elo score : {playersInfo.eloScore}
              </Typography>
            </Box>
          </Box>
        </Card>
      )}
    </>
  );
}
