import React from "react";
import "./Footer.css";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function Footer() {
  const history = useHistory();
  const bullet = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );


  return (
    <footer>
      &copy; Invoicer 2023 {bullet} Alyssa
      <br />
    </footer>
  );
}

export default Footer;
