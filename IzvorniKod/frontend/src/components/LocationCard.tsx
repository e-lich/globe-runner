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

export default function LocationCard(props: any): JSX.Element {
	return(
		<>
			<Box sx={{ justifyContent: "center", display: "flex" }}>
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
								{props.closestCard.title}
							</Typography>
							<hr></hr>
						</CardContent>
					</CardActionArea>

					{props.hasButton ? <CardActions sx={{ justifyContent: "center", p: 0.5 }}>
						<Button
							size="medium"
							color="primary"
							variant="contained"
							sx={{ p: 0.5 }}
							onClick={props.buttonOnClick}
							>
						{props.buttonText}
						</Button>
					</CardActions> : <></>
					}

				</Card>
			</Box>        
		</>
	)
}