import {
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import LocationCard from "./LocationCard";

export default function EndFightDialog({ open, onClose, fightResults }: any) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography
          variant="h4"
          component="div"
          align="center"
          sx={{ fontWeight: "bold" }}
        >
          Fight results
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {fightResults.winner ? (
            <Typography
              variant="h4"
              component="div"
              color="green"
              align="center"
            >
              You won!
            </Typography>
          ) : (
            <Typography variant="h5" component="div">
              You lost!
            </Typography>
          )}

          <Divider>
            <Chip label="points" />
          </Divider>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography variant="h3" component="div">
                {/* Your points: {fightResults.currentPlayerPoints} */}
                {fightResults.points1}
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{ alignSelf: "baseline", ml: 1, mr: 2 }}
              >
                points
              </Typography>
            </Box>
            <Typography variant="h5" component="div">
              VS
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography variant="h3" component="div" sx={{ ml: 2, mr: 1 }}>
                {/* Your points: {fightResults.currentPlayerPoints} */}
                {fightResults.points2}
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{ alignSelf: "baseline" }}
              >
                points
              </Typography>
            </Box>
          </Box>

          <Divider></Divider>

          <Typography variant="h5" component="div">
            Current ELO score: {fightResults.eloScore}
          </Typography>
          <Typography variant="h5" component="div">
            Cards broken during battle:
          </Typography>
          {fightResults.brokenCards.map((card: any) => (
            <LocationCard
              closestCard={card}
              hasButton={false}
              hasPopup={true}
            />
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
