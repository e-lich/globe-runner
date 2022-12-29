import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Register(props: any) {
  let navigator = useNavigate();

  return (
    <Box justifyContent="center" display="flex">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ width: 0.6, minHeight: "100vh" }}
      >
        <Typography
          sx={{ textAlign: "center", mb: 2, fontSize: 24, fontWeight: 800 }}
        >
          Register as
        </Typography>
        <Button
          onClick={() => navigator("/register/basic")}
          variant="contained"
          sx={{ mb: 1 }}
        >
          Basic user
        </Button>
        <Button
          onClick={() => navigator("/register/cartographer")}
          variant="contained"
        >
          Cartographer
        </Button>
      </Box>
    </Box>
  );
}

export default Register;
