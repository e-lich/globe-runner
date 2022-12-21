import { Icon } from "@mui/material";
import { Button } from "react-bootstrap";

export default function ChallengeIcon(props: any) {
  const swords = require("../images/swords.png");
  return (
    <>
      <Button
        variant="text"
        color="primary"
        onClick={() => {
          console.log("CHALLENGE THIS USER");
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
