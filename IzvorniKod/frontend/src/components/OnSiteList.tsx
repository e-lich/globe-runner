import { Box, List, Typography } from "@mui/material";
import ClaimedLocationCard from "./ClaimedLocationCard";
import PlayerCard from "./PlayerCard";




export default function OnSiteList() {
    const claimedLocations = [
        {
          cardID: 1,	
          title: "Card_01",
          lat: 15.2132,
          lng: 45.154425,
          image: "../images/card_photo.jpg",
        },
        {
          cardID: 2,
          title: "Card_02",
          lat: 15.214,
          lng: 45.1545,
          image: "../images/card_photo.jpg",
        },
        {
          cardID: 3,
          title: "Card_03",
          lat: 15.215,
          lng: 45.15455,
          image: "../images/card_photo.jpg",
        },
        {
          cardID: 4,
          title: "Card_04",
          lat: 15.2155,
          lng: 45.1546,
          image: "../images/card_photo.jpg",
        },
      ];
    return (
        <>
            <Typography variant="h4" component="h1">
                    On Site Approval
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    height: "600px",
                    bgcolor: "background.paper",
                    overflow: "auto",
                }}
             >
            <List
                sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", textAlign: "center" }}
                >
                {claimedLocations.map((claimedLocation, key) => (
                    <ClaimedLocationCard key={key} claimedLocation={claimedLocation} />
                ))}
            </List>
        </Box>
        </>
        
    )
}