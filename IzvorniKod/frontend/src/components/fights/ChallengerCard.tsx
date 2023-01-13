import { ListItem, ListItemAvatar, Avatar, IconButton } from "@mui/material";
import { Button } from "react-bootstrap";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ChallengerCard({ challenge, onClose, refresh }: any) {
  const navigator = useNavigate();
  async function acceptChallenge(): Promise<void> {
    try {
      const response = await axios.post(
        `fight/challenges/respond/${challenge.challengeID}`,
        { response: "accept" }
      );
      if (response.status === 200) {
        console.log("Challenge accepted!");
        navigator("/fights");
        // todo redirect to battle
      } else {
        alert("Something went wrong while accepting the challenge!");
        refresh();
      }
    } catch (error) {
      alert(error);
      refresh();
    }
  }

  async function denyChallenge(): Promise<void> {
    try {
      const response = await axios.post(
        `fight/challenges/respond/${challenge.challengeID}`,
        { response: "decline" }
      );
      if (response.status === 200) {
        console.log("Challenge denied!");
        refresh();
      }
    } catch (error) {
      alert(error);
      refresh();
    }
  }

  return (
    <>
      <ListItem alignItems="center" sx={{ justifyContent: "center" }}>
        <Avatar
          alt="profile picture"
          src={
            challenge.photo ? `data:image/jpeg;base64,${challenge.photo}` : ""
          }
        />
        <Button variant="text" color="primary" onClick={() => {}}>
          {challenge.challenger}
        </Button>
        <IconButton onClick={() => acceptChallenge()}>
          <DoneIcon />
        </IconButton>
        <IconButton onClick={() => denyChallenge()}>
          <CloseIcon />
        </IconButton>
      </ListItem>
    </>
  );
}
