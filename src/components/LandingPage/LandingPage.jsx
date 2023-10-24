import React from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";
import { Button, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";



function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <div className="container">
      <div className="aboutDiv">
        <h1 className="mainUserHeader">
          Easily Generate A <br />
          <span className="professionalInvoice">Professional Invoice</span>
          <br />
          for your Business
        </h1>
        <p className="infoParagraph">
          With Invoicer, you have the power to effortlessly craft tailor-made,
          <br />
          polished invoices for your valued clients and customers.
          <br />
          The best part? It's absolutely free. Don't hesitate, give it a try
          today!
        </p>
        <br />
      </div>
      <center>
        <Paper
          elevation={3}
          style={{
            width: "30%",
            paddingBottom: "40px",
            paddingTop: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <center>
              <Typography variant="h8" component="div">
                <h2
                  style={{
                    marginTop: "5px",
                    marginBottom: "25px",
                  }}
                >
                  Invoicer Members: <br />
                  Please Login
                </h2>
              </Typography>
              <center>
                <Button
                  style={{
                    backgroundColor: "#9a5c6f",
                    color: "white",
                    width: "140px",
                    height: "40px",
                    fontSize: "16px",
                  }}
                  variant="contained"
                  onClick={onLogin}
                >
                  Login
                </Button>
              </center>
            </center>
          </div>
        </Paper>
      </center>
    </div>
  );
}

export default LandingPage;
