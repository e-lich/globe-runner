import {
  CardContent,
  Card,
  Avatar,
  CardHeader,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

export default function UserStatsCard() {
  const placeholder = require("../images/pieChart.jpeg");
  return (
    <Card variant="outlined">
      <CardHeader title="User stats" />

      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-around",
          allignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex-column",
            justifyContent: "center",
            allignItems: "center",
          }}
        >
          <Avatar
            src={placeholder}
            alt="profile"
            sx={{ width: 250, height: 250 }}
          ></Avatar>

          <Typography variant="body2" color="text.secondary">
            Ovje moze jos ici lista koja prikazuje sve bivse borbe npr, a graf
            je neki graficki prikaz
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
