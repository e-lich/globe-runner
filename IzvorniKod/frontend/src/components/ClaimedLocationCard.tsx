import Button from "@mui/material/Button";
import { Grid } from "@material-ui/core";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
const placeholder = require("../images/card_photo.png");

export default function ClaimedLocationCard(props: any): JSX.Element {
  const handleUnclaim = (cardID: number) => {
    console.log("unclaiming " + cardID);
//todo unclaim
  }

  const handleVerify = (cardID: number) => {
    console.log("verifying " + cardID);
//todo verify
  }

  return (
    <>
      <Box sx={{ justifyContent: "center", display: "flex", }}>
        <Card sx={{ width: 300, maxHeight: 200, m: 1 }}>
          <CardActionArea onClick={props.cardOnClick}>
            <CardMedia
              sx={{ display: "flex", objectFit: "cover" }}
              height="100"
              component="img"
              image={placeholder}
              alt="beautiful landscape"
            />
            <CardContent sx={{ p: 0.5, justifyContent: "center" }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ justifyContent: "center", m: 0 }}
              >
                {props.claimedLocation.title}
              </Typography>
              <hr></hr>
            </CardContent>
          </CardActionArea>

        
            <CardActions sx={{ justifyContent: "center", p: 0.5 }}>
              <Button
                size="medium"
                color="primary"
                variant="contained"
                sx={{ p: 0.5 }}
                onClick={() => handleUnclaim(props.claimedLocation.cardID)}
              >
                Unclaim
              </Button>
              <Button
                size="medium"
                color="primary"
                variant="contained"
                sx={{ p: 0.5 }}
                onClick={() => handleVerify(props.claimedLocation.cardID)}
              >
                Verify
              </Button>
            </CardActions>
           
        </Card>
      </Box>
    </>
  );
}
