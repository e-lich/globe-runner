import { Icon } from "@mui/material";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function ChallengeIcon(props: any) {
  const swords = require("../images/swords.png");

  const createChallenge = async () => {
    try {
      await axios.post("/fight/challenges/create/" + props.userInfo.userID);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <Button
        variant="text"
        color="primary"
        onClick={() => {
          createChallenge();
          props.setOpen();
        }}
      >
        <Icon>
          <div style={{ width: "100%", height: "100%" }}>
            <img
              src={swords}
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
    </>
  );
}
