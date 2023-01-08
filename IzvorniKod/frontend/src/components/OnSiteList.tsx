import { Box, List, Typography } from "@mui/material";
import ClaimedLocationCard from "./ClaimedLocationCard";
import PlayerCard from "./PlayerCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OnSiteList({
  refresh,
  setRefresh,
}: {
  refresh: boolean;
  setRefresh: Function;
}) {
  var [claimedLocations, setClaimedLocations] = useState<any>();

  useEffect(() => {
    axios.get("/locations/claimed").then((response) => {
      console.log(response.data);
      setClaimedLocations(response.data);
    });
  }, [refresh]);

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
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            textAlign: "center",
          }}
        >
          {claimedLocations ? (
            claimedLocations?.map(
              (claimedLocation: any, key: number) =>
                claimedLocations[0] !==
                  "No claimed locations found for this cartographer" && (
                  <ClaimedLocationCard
                    key={key}
                    claimedLocation={claimedLocation}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                )
            )
          ) : (
            <></>
          )}

          {claimedLocations ? (
            claimedLocations[0] ===
              "No claimed locations found for this cartographer" && (
              <div>You haven't claimed claimed any locations</div>
            )
          ) : (
            <div>Loading...</div>
          )}
        </List>
      </Box>
    </>
  );
}
