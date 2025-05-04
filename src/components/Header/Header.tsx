import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import skipLogo from "./../../assets/skip-logo.png";
import { Link } from "react-router-dom";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{ borderRadius: 2, width: "99%", margin: "auto", backgroundColor: "#5a5a5a" }}
        position="static"
      >
        <Toolbar>
          <img
            style={{ width: "100px", margin: "10px" }}
            src={skipLogo}
            alt=""
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link style={{color: "white"}} to="">SKI-Portugal - Karate Score App</Link>
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
