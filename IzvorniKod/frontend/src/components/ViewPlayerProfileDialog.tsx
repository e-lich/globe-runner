import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import UserProfileCard from "./UserProfile/UserProfileCard";
import UserStatsCard from "./UserProfile/UserStatsCard";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewPlayerProfileDialog({
  open,
  onClose,
  player,
}: any) {
  // TODO - use the info from backedn to display stats and evetything else
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await axios.get(`/players/info/${player.userID}`);
      setUserInfo(response.data);
    };
    getUserInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box justifyContent="center" display="flex" sx={{ p: 3 }}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ width: "80%", height: "80%" }}
          >
            <Grid container spacing={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <UserProfileCard
                    user={player}
                    numberOfLocations={12}
                    canEdit={false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <UserStatsCard />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
