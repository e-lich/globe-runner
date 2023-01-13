import Button from "@mui/material/Button";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
const placeholder = require("../images/placeholder-LocationCard.png");

export default function LocationCard(props: any): JSX.Element {
  const background = props.chosen ? "green" : "white";
  const objectFitStyle =
    props.closestCard.photo === "None" ? "contain" : "cover";

  const [collected, setCollected] = useState<boolean>(false);

  return (
    <>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Card
          sx={{
            width: 300,
            maxHeight: 200,
            m: 1,
            backgroundColor: { background },
          }}
        >
          <CardActionArea onClick={props.cardOnClick}>
            <CardMedia
              sx={{ display: "flex", objectFit: objectFitStyle }}
              height="100"
              component="img"
              image={
                props.closestCard.photo === "None"
                  ? placeholder
                  : props.closestCard.photo.startsWith("http")
                  ? props.closestCard.photo
                  : `data:image/jpeg;base64,${props.closestCard.photo}`
              }
              alt="Location Ping"
            />
            <CardContent sx={{ p: 0.5, justifyContent: "center" }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                noWrap
                sx={{
                  justifyContent: "center",
                  m: 0,
                  height: 32,
                }}
              >
                {props.closestCard.title}
              </Typography>
            </CardContent>
          </CardActionArea>

          {props.hasButton ? (
            <CardActions sx={{ justifyContent: "center", p: 1 }}>
              <Button
                size="medium"
                color="success"
                variant="contained"
                sx={{ pl: 2, pr: 2 }}
                onClick={() => {
                  props.buttonOnClick();
                  setCollected(true);
                }}
                startIcon={collected ? <DoneIcon /> : <></>}
              >
                {props.buttonText}
              </Button>
            </CardActions>
          ) : (
            <></>
          )}
        </Card>
      </Box>
    </>
  );
}
