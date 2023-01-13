import {
  CardContent,
  Typography,
  Card,
  Avatar,
  IconButton,
  CardActions,
} from "@mui/material";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import EditMyProfileDialog from "./EditMyProfileDialog";

export default function UserProfileCard(props: any) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card variant="elevation">
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-around",
            allignItems: "center",
          }}
        >
          <Avatar
            src={
              props.user.profilePhoto
                ? `data:image/jpeg;base64,${props.user.profilePhoto}`
                : undefined
            }
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
              {props.user.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.numberOfLocations} collected cards
            </Typography>
          </Box>
        </CardContent>
        {props.canEdit && (
          <CardActions sx={{ display: "flex", justifyContent: "end" }}>
            <IconButton onClick={() => setOpen(true)}>
              <EditIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
      <EditMyProfileDialog
        open={open}
        onClose={() => {
          setOpen(false);
          props.refresh();
        }}
        oldUser={props.user}
      />
    </>
  );
}
