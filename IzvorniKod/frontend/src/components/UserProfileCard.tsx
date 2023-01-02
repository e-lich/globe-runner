import { CardContent, Typography, Card, Avatar } from "@mui/material";
import { Box } from "@mui/system";

// type user = {
//   userID: string;
//   username: string;
//   fullName: string;
//   email: string;
//   photo: string;
// };

export default function UserProfileCard({
  user,
  numberOfLocations,
}: {
  user: any;
  numberOfLocations: number;
}) {
  return (
    <Card variant="outlined">
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-around",
          allignItems: "center",
        }}
      >
        <Avatar
          src={`data:image/jpeg;base64,${user.photo}`}
          alt="profile"
          sx={{ width: 150, height: 150 }}
        ></Avatar>
        <Box
          sx={{
            display: "flex-column",
            justifyContent: "center",
            allignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {user.username}
          </Typography>
          {/* TODO - user needs to have a fullName, alongside everything else */}
          <Typography variant="body2" color="text.secondary">
            {/* {user.fullName} */} Lovro Kovacic
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {numberOfLocations} collected locations
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
