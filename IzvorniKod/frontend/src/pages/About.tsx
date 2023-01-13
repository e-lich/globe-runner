import PlayerNavbar from "../components/navbars/PlayerNavbar";
import React from "react";
import { Box, Paper } from "@mui/material";

export default function About() {
  return (
    <>
      <PlayerNavbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <Paper sx={{ width: 500, height: 400 }}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">General information</h3>
            <div className="form-group mt-3" style={{ textAlign: "justify" }}>
              Igra GlobeRunner zamišljena je kao način da se ljude potakne na
              istraživanje lokalnih povijesnih i prirodnih znamenitosti. Pri
              posjetima znamenitostima kretat ćete se na otvorenom, što je
              svakako bolja alternativa provođenju vremena u zatvorenom
              prostoru.
            </div>
            <hr></hr>
            <div className="form-group mt-3" style={{ textAlign: "justify" }}>
              Kroz same bitke, odnosno odabir kartica za njih, bolje ćete se
              upoznati s bitnim atributima lokalnih znamenitosti kraj kojih
              često prolaze bez razmišljanja jer će vam pažljiv odabir
              znamenitosti donositi pobjede u bitkama protiv drugih igrača.
            </div>
          </div>
        </Paper>
      </Box>
    </>
  );
}
