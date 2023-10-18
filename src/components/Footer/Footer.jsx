import React from "react";
import { useHistory } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const history = useHistory(); // Use the useHistory hook to get the history object

  const goToHomePage = () => {
    history.push('/home'); // Use history.push to navigate to the home page
  };

  return (
    <footer>
      &copy; figure out footer eventually
      <br />
      <center>
        <button onClick={goToHomePage}>Go Home</button>
      </center>
    </footer>
  );
}

export default Footer;
