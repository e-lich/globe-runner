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

export default function ViewPlayerProfileDialog({
  open,
  onClose,
  userInfo,
}: any) {
  // TODO - use the info from backedn to display stats and evetything else

  console.log("THIS IS THE USER INFO: ", userInfo);

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
                    user={userInfo}
                    numberOfLocations={userInfo.numOfCards}
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
