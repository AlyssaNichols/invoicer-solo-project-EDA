import React from "react";
import "./Footer.css";
import Box from '@mui/material/Box';

function Footer() {
  const bullet = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  return (
    <footer>
      &copy; Invoicer 2023 {bullet} Alyssa Nichols
      <br />
    </footer>
  );
}

export default Footer;
