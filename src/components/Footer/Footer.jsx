import React from "react";
import "./Footer.css";
import Box from "@mui/material/Box";
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
  const handleMoreInfoClick = (e) => {
    e.preventDefault(); // Prevent the default anchor behavior (page reload)
    history.push("/info");
  };

  return (
    <footer>
      &copy; Invoicer 2023 {bullet}{" "}
      <a href="#" onClick={handleMoreInfoClick}>
        More Info
      </a>{" "}
      {bullet} Alyssa
      <br />
    </footer>
  );
}

export default Footer;
