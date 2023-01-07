import { Dialog, Grid, Typography } from "@mui/material";
import UserInventory from "./UserProfile/UserInventory";
import UserProfileCard from "./UserProfile/UserProfileCard";
import UserStatsCard from "./UserProfile/UserStatsCard";

export default function ViewPlayerProfileDialog({
  open,
  onClose,
  player,
}: any) {
  return (
    <Dialog open={open} onClose={onClose}>
      <Grid container spacing={2}>
        <Grid item xs={4.5}>
          <Typography variant="h5" sx={{ m: 2 }}>
            My profile
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <UserProfileCard user={player} numberOfLocations={12} />
            </Grid>
            <Grid item xs={12}>
              <UserStatsCard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6.5}>
          <Typography variant="h5" sx={{ m: 2 }}>
            Inventory
          </Typography>
          <UserInventory />
        </Grid>
      </Grid>
    </Dialog>
  );
}
