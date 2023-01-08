import { ListItem, ListItemAvatar, Avatar, IconButton } from "@mui/material";
import { Button } from "react-bootstrap";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

export default function CartographerCard(props: any) {
  async function verifyCartographer(): Promise<void> {
    try {
      const response = await axios.post(
        `/cartographers/verify/${props.cartographer.userID}`
      );
      if (response.status === 200) {
        console.log("Cartographer verified");
        props.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function denyCartographer(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <ListItem alignItems="center" sx={{ justifyContent: "center" }}>
        <Avatar
          alt="profile picture"
          //   todo fix this
          // src={`data:image/jpeg;base64,${props.cartographer.photo}`}
        />
        <Button variant="text" color="primary" onClick={() => {}}>
          {props.cartographer.username}
        </Button>
        <IconButton onClick={() => verifyCartographer()}>
          <DoneIcon />
        </IconButton>
        <IconButton onClick={() => denyCartographer()}>
          <CloseIcon />
        </IconButton>
      </ListItem>
    </>
  );
}
