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
const placeholder = require("../images/card_photo.png");

export default function LocationCard(props: any): JSX.Element {
  const background = props.chosen ? "green" : "white";

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
              sx={{ display: "flex", objectFit: "cover" }}
              height="100"
              component="img"
              image={
                props.closestCard.locationPhoto === "None"
                  ? placeholder
                  : props.closestCard.locationPhoto.startsWith("http")
                  ? props.closestCard.locationPhoto
                  : `data:image/jpeg;base64,${props.closestCard.locationPhoto}`
              }
              alt="beautiful landscape"
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
              <hr></hr>
            </CardContent>
          </CardActionArea>

          {props.hasButton ? (
            <CardActions sx={{ justifyContent: "center", p: 0.5 }}>
              <Button
                size="medium"
                color="primary"
                variant="contained"
                sx={{ p: 0.5 }}
                onClick={props.buttonOnClick}
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
